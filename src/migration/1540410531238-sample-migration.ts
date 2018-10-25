import { MigrationInterface, QueryRunner } from 'typeorm';

// tslint:disable-next-line:class-name
export class sampleMigration1540410531238 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    // await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "title" RENAME TO "name"`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    // reverts things made in "up" method
    // await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "name" RENAME TO "title"`);
  }

}
