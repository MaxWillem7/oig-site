import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "instellingen" ADD COLUMN "insurance_home_tile" boolean DEFAULT true;
  ALTER TABLE "instellingen" ADD COLUMN "insurance_home_tile_from" timestamp(3) with time zone DEFAULT '2026-11-15T12:00:00.000Z';
  ALTER TABLE "instellingen" ADD COLUMN "insurance_home_tile_until" timestamp(3) with time zone DEFAULT '2027-01-15T12:00:00.000Z';
  ALTER TABLE "_instellingen_v" ADD COLUMN "version_insurance_home_tile" boolean DEFAULT true;
  ALTER TABLE "_instellingen_v" ADD COLUMN "version_insurance_home_tile_from" timestamp(3) with time zone DEFAULT '2026-11-15T12:00:00.000Z';
  ALTER TABLE "_instellingen_v" ADD COLUMN "version_insurance_home_tile_until" timestamp(3) with time zone DEFAULT '2027-01-15T12:00:00.000Z';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "instellingen" DROP COLUMN "insurance_home_tile";
  ALTER TABLE "instellingen" DROP COLUMN "insurance_home_tile_from";
  ALTER TABLE "instellingen" DROP COLUMN "insurance_home_tile_until";
  ALTER TABLE "_instellingen_v" DROP COLUMN "version_insurance_home_tile";
  ALTER TABLE "_instellingen_v" DROP COLUMN "version_insurance_home_tile_from";
  ALTER TABLE "_instellingen_v" DROP COLUMN "version_insurance_home_tile_until";`)
}
