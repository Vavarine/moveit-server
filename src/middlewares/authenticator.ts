import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'

interface DecodedToken {
	id: number
}

const authenticator = (req: Request, res: Response, next: NextFunction) => {
	if(req.url.includes('public')) return next() 

	const { authorization } = req.headers
	
	if(!authorization) return res.status(401).json({ error: 'No token provided'})
		
	const parts = authorization.split(' ')
		
	if(parts.length !== 2) return res.status(401).json({ error: 'Token error'})
		
	const [ scheme, token ] = parts
			
	if(!scheme.includes('Bearer')) return res.status(401).json({ error: 'Token error'})

	jwt.verify(token, process.env.SECRET as string, (err, decoded) => {
		if(err) return res.status(401).json({ error: 'Invalid token'})
		
		const { id } = decoded as DecodedToken

		req.body.id = id
	})

	next()
}

export default authenticator
