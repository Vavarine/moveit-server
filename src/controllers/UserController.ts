import { Request, Response } from "express"
import { getRepository } from "typeorm"
import * as yup from 'yup'
import bcrypt from "bcrypt"

import User from "../database/models/User"

export default {
	async index(req: Request, res: Response) {
		const usersRepository = getRepository(User)

		usersRepository.find().then(data => {
			res.status(200).json(data)
		}).catch(err => {
			res.status(404).json({ message: 'Nothing found' })
		})
	},

	async show(req: Request, res: Response) {
		const { id } = req.params;
		const usersRepository = getRepository(User)

		usersRepository.findOneOrFail(id).then(data => {
			res.status(200).json(data)
		}).catch(err => {
			res.status(404).json({ message: 'Not found' })
		})
	},

	async indexByLevel(req: Request, res: Response) {
		const usersRepository = getRepository(User)

		usersRepository.find({ order: { level: "DESC" } }).then(data => {
			res.status(200).json(data)
		}).catch(err => {
			res.status(404).json({ message: 'Nothing found' })
		})
	},

	async create(req: Request, res: Response) {
		const usersRepository = getRepository(User)
		const saltRounds = 10
		const profile_image = req.file.filename

		console.log(profile_image)

		const schema = yup.object().shape({
			email: yup.string().required().max(150),
			username: yup.string().required().max(150),
			password: yup.string().required().max(150),
			experience: yup.number().required().positive().integer(),
			challenges_completed: yup.number().required().positive().integer(),
			level: yup.number().required().positive().integer(),
			profile_image: yup.string()
		})

		await schema.validate(req.body, { abortEarly: false })
		bcrypt.hash(req.body.password.replace(/(\r\n|\n|\r)/gm, ""), saltRounds, (err, hash) => {
			const user = usersRepository.create({
				email: req.body.email.replace(/(\r\n|\n|\r)/gm, ""),
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

				if (err.code === "SQLITE_CONSTRAINT") {
					return res.status(400).json({ message: 'Email already in use' });
				} else {
					return res.status(500).send({ message: 'Internal server error' });
				}
			})
		})
	}
}