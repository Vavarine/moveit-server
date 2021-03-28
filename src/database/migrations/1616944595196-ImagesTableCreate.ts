import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class images1616944236372 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'images',
			columns: [
				{
					name: 'id',
					type: 'integer',
					isPrimary: true,
					unsigned: true,
					isGenerated: true,
					generationStrategy: 'increment'
				},
				{
					name: 'file_name',
					type: 'varchar',
					isUnique: true,
					isNullable: false
				},
				{
					name: 'user_id',
					type: 'integer',
					unsigned: true,
				}
			],
			foreignKeys: [
				{
					name: 'user_image',
					columnNames: ['user_id'],
					referencedTableName: 'users',
					referencedColumnNames: ['id'],
					onDelete: 'CASCADE',
					onUpdate: 'CASCADE'
				}
			]
		}))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('images')
	}

}
