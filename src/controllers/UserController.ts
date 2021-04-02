import { Request, Response } from "express"
import { getRepository } from "typeorm"
import * as yup from 'yup'
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

import User from "../database/models/User"

export default {
	async index(req: Request, res: Response) {
		const usersRepository = getRepository(User)

		usersRepository.find().then(data => {
			return res.status(200).json(data)
		}).catch(err => {
			return res.status(404).json({ message: 'Nothing found' })
		})
	},

	async show(req: Request, res: Response) {
		const { id } = req.params;
		const usersRepository = getRepository(User)

		usersRepository.findOneOrFail(id).then(data => {
			return res.status(200).json(data)
		}).catch(err => {
			return res.status(404).json({ message: 'Not found' })
		})
	},

	async indexByLevel(req: Request, res: Response) {
		const usersRepository = getRepository(User)

		usersRepository.find({ order: { level: "DESC" } }).then(data => {
			return res.status(200).json(data)
		}).catch(err => {
			return res.status(404).json({ message: 'Nothing found' })
		})
	},

	async create(req: Request, res: Response) {
		const usersRepository = getRepository(User)
		const saltRounds = 6
		const profile_image = req.file?.filename || 'default.png'

		const schema = yup.object().shape({
			username: yup.string().required().max(150),
			password: yup.string().required().max(150),
			experience: yup.number().required().positive().integer(),
			challenges_completed: yup.number().required().positive().integer(),
			level: yup.number().required().positive().integer(),
			profile_image: yup.string()
		})

		await schema.validate(req.body, { abortEarly: false })
		bcrypt.hash(req.body.password, saltRounds).then(hash => {
			const user = usersRepository.create({
				username: req.body.username.replace(/(\r\n|\n|\r)/gm, ""),
				password: hash,
				experience: req.body.experience,
				challenges_completed: req.body.challenges_completed,
				level: req.body.level,
				profile_image
			})

			usersRepository.save(user).then(data => {
				return res.status(201).json(data)
			}).catch(err => {
				console.log(err);
	
				if (err.code === "ER_DUP_ENTRY") {
					return res.status(400).json({ message: 'Username already in use' });
				} else {
					return res.status(500).send({ message: 'Internal server error' });
				}
			})
		}).catch(err => {
			return res.status(500).send({ message: 'Internal server error' });
		})
	},

	async login(req: Request, res: Response) {
		const schema = yup.object().shape({
			username: yup.string().required(),
			password: yup.string().required()
		})
		await schema.validate(req.body, { abortEarly: false })

		const { username, password } = req.body
		const usersRepository = getRepository(User)

		usersRepository.findOneOrFail({ username }).then(user => {	
			bcrypt.compare(password, user.password).then(data => {
				if(!data) return res.status(401).json({ auth: false })
				const { id } = user

				const token = jwt.sign({ id }, process.env.SECRET as string, {
					expiresIn: 604800
				})

				return res.status(200).json({ auth: true, token })
			}).catch(err => {
				console.log(err)
				
				return res.status(500).json({ auth: false })
			})
		})
	}
}