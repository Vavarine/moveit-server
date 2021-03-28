import multer from "multer"
import crypto from "crypto"
import path from "path"

export default {
	storage: multer.diskStorage({
		destination: path.join(__dirname, '..', '..', 'uploads'),
		filename: (req, file, cb) => {
			const hash = crypto.randomBytes(6).toString('hex')
			const filename = `${hash}-${file.originalname}`

			cb(null, filename)
		}
	})
}