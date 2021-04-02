import User from '../database/models/User'
import * as yup from 'yup'

export default {
	render(user: User) {
		return {
			id: user.id,
			username: user.username,
			experience: 1,
			challenges_completed: 1,
			level: 50,
			profileImageUrl: `${process.env.URL}/uploads/${user.profile_image}`
		}
	},

	renderMany(users: User[]) {
		return users.map(user => this.render(user))
	}
}