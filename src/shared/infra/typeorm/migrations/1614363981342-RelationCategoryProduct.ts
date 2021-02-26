import { MigrationInterface, QueryRunner } from 'typeorm';

export class RelationCategoryProduct1614363981342
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "products_categories" ("product_id" uuid NOT NULL, "category_id" uuid NOT NULL, CONSTRAINT "PK_5131c830636d855568d3a70c352" PRIMARY KEY ("product_id", "category_id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "products_categories" ADD CONSTRAINT "FK_4347fec6e6cc3be4ce39d9d9f36" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "products_categories" ADD CONSTRAINT "FK_80456ff2d7fd676c1ac2d107f31" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products_categories" DROP CONSTRAINT "FK_80456ff2d7fd676c1ac2d107f31"`
    );
    await queryRunner.query(
      `ALTER TABLE "products_categories" DROP CONSTRAINT "FK_4347fec6e6cc3be4ce39d9d9f36"`
    );
    await queryRunner.query(`DROP TABLE "products_categories"`);
  }
}
