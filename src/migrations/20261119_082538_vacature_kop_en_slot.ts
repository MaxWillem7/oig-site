import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "vacatures" ADD COLUMN "seeking_title" varchar;
  ALTER TABLE "vacatures" ADD COLUMN "seeking_outro" varchar;
  ALTER TABLE "vacatures" ADD COLUMN "profile_title" varchar;
  ALTER TABLE "vacatures" ADD COLUMN "profile_outro" varchar;
  ALTER TABLE "vacatures" ADD COLUMN "tasks_title" varchar;
  ALTER TABLE "vacatures" ADD COLUMN "tasks_outro" varchar;
  ALTER TABLE "vacatures" ADD COLUMN "offer_title" varchar;
  ALTER TABLE "vacatures" ADD COLUMN "offer_outro" varchar;
  ALTER TABLE "_vacatures_v" ADD COLUMN "version_seeking_title" varchar;
  ALTER TABLE "_vacatures_v" ADD COLUMN "version_seeking_outro" varchar;
  ALTER TABLE "_vacatures_v" ADD COLUMN "version_profile_title" varchar;
  ALTER TABLE "_vacatures_v" ADD COLUMN "version_profile_outro" varchar;
  ALTER TABLE "_vacatures_v" ADD COLUMN "version_tasks_title" varchar;
  ALTER TABLE "_vacatures_v" ADD COLUMN "version_tasks_outro" varchar;
  ALTER TABLE "_vacatures_v" ADD COLUMN "version_offer_title" varchar;
  ALTER TABLE "_vacatures_v" ADD COLUMN "version_offer_outro" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "vacatures" DROP COLUMN "seeking_title";
  ALTER TABLE "vacatures" DROP COLUMN "seeking_outro";
  ALTER TABLE "vacatures" DROP COLUMN "profile_title";
  ALTER TABLE "vacatures" DROP COLUMN "profile_outro";
  ALTER TABLE "vacatures" DROP COLUMN "tasks_title";
  ALTER TABLE "vacatures" DROP COLUMN "tasks_outro";
  ALTER TABLE "vacatures" DROP COLUMN "offer_title";
  ALTER TABLE "vacatures" DROP COLUMN "offer_outro";
  ALTER TABLE "_vacatures_v" DROP COLUMN "version_seeking_title";
  ALTER TABLE "_vacatures_v" DROP COLUMN "version_seeking_outro";
  ALTER TABLE "_vacatures_v" DROP COLUMN "version_profile_title";
  ALTER TABLE "_vacatures_v" DROP COLUMN "version_profile_outro";
  ALTER TABLE "_vacatures_v" DROP COLUMN "version_tasks_title";
  ALTER TABLE "_vacatures_v" DROP COLUMN "version_tasks_outro";
  ALTER TABLE "_vacatures_v" DROP COLUMN "version_offer_title";
  ALTER TABLE "_vacatures_v" DROP COLUMN "version_offer_outro";`)
}
