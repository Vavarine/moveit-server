import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity('users')
export default class User {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	email: string

	@Column()
	username: string

	@Column()
	password: string

	@Column()
	experience: number

	@Column()
	challenges_completed: number

	@Column()
	level: number

	@Column()
	profile_image: string
}