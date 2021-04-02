import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class UserTableCreate1616884134373 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'users',
			columns: [
				{
					name: 'id',
					type: 'integer',
					unsigned: true,
					isPrimary: true,
					isGenerated: true,
					generationStrategy: "increment"
				},
				{
					name: 'username',
					type: 'varchar',
					isUnique: true
				},
				{
					name: 'password',
					type: 'varchar',
				},
				{
					name: 'challenges_completed',
					type: 'integer',
				},
				{
					name: 'experience',
					type: 'integer',
				},
				{
					name: 'level',
					type: 'integer',
				},
				{
					name: 'profile_image',
					type: 'varchar',
				},
			]
		}))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('users')
	}
}
