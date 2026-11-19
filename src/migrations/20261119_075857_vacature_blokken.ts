import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "vacatures_blocks_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "vacatures_blocks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"intro" varchar,
  	"outro" varchar
  );
  
  CREATE TABLE "_vacatures_v_version_blocks_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_vacatures_v_version_blocks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"intro" varchar,
  	"outro" varchar,
  	"_uuid" varchar
  );
  
  ALTER TABLE "vacatures_blocks_items" ADD CONSTRAINT "vacatures_blocks_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vacatures_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vacatures_blocks" ADD CONSTRAINT "vacatures_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vacatures"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_vacatures_v_version_blocks_items" ADD CONSTRAINT "_vacatures_v_version_blocks_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_vacatures_v_version_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_vacatures_v_version_blocks" ADD CONSTRAINT "_vacatures_v_version_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_vacatures_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "vacatures_blocks_items_order_idx" ON "vacatures_blocks_items" USING btree ("_order");
  CREATE INDEX "vacatures_blocks_items_parent_id_idx" ON "vacatures_blocks_items" USING btree ("_parent_id");
  CREATE INDEX "vacatures_blocks_order_idx" ON "vacatures_blocks" USING btree ("_order");
  CREATE INDEX "vacatures_blocks_parent_id_idx" ON "vacatures_blocks" USING btree ("_parent_id");
  CREATE INDEX "_vacatures_v_version_blocks_items_order_idx" ON "_vacatures_v_version_blocks_items" USING btree ("_order");
  CREATE INDEX "_vacatures_v_version_blocks_items_parent_id_idx" ON "_vacatures_v_version_blocks_items" USING btree ("_parent_id");
  CREATE INDEX "_vacatures_v_version_blocks_order_idx" ON "_vacatures_v_version_blocks" USING btree ("_order");
  CREATE INDEX "_vacatures_v_version_blocks_parent_id_idx" ON "_vacatures_v_version_blocks" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "vacatures_blocks_items" CASCADE;
  DROP TABLE "vacatures_blocks" CASCADE;
  DROP TABLE "_vacatures_v_version_blocks_items" CASCADE;
  DROP TABLE "_vacatures_v_version_blocks" CASCADE;`)
}
