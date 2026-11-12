import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_team_group" AS ENUM('inkoopadvies', 'aanbestedingsdesk', 'contracten', 'directie', 'kantoor');
  CREATE TYPE "public"."enum_team_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__team_v_version_group" AS ENUM('inkoopadvies', 'aanbestedingsdesk', 'contracten', 'directie', 'kantoor');
  CREATE TYPE "public"."enum__team_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_vacatures_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__vacatures_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_premies_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__premies_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_vragen_page" AS ENUM('aanbesteden', 'subsidiedesk', 'ondersteuning-inkoop', 'inkoopsegmenten', 'premiedesk', 'verzekeringen', 'inkoopbeleid', 'fietsplan-onderwijs', 'werkwijze', 'vacatures');
  CREATE TYPE "public"."enum_vragen_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__vragen_v_version_page" AS ENUM('aanbesteden', 'subsidiedesk', 'ondersteuning-inkoop', 'inkoopsegmenten', 'premiedesk', 'verzekeringen', 'inkoopbeleid', 'fietsplan-onderwijs', 'werkwijze', 'vacatures');
  CREATE TYPE "public"."enum__vragen_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_whitepapers_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__whitepapers_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_inzendingen_form_type" AS ENUM('contact', 'inkoopscan', 'whitepaper', 'sollicitatie');
  CREATE TYPE "public"."enum_inzendingen_status" AS ENUM('nieuw', 'bezig', 'afgerond');
  CREATE TYPE "public"."enum_users_role" AS ENUM('redacteur', 'beheerder');
  CREATE TYPE "public"."enum_oauth_tokens_type" AS ENUM('code', 'access', 'refresh');
  CREATE TABLE "team" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"group" "enum_team_group" DEFAULT 'inkoopadvies',
  	"photo_id" integer,
  	"phone" varchar,
  	"email" varchar,
  	"on_home" boolean DEFAULT false,
  	"order" numeric DEFAULT 10,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_team_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_team_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_role" varchar,
  	"version_group" "enum__team_v_version_group" DEFAULT 'inkoopadvies',
  	"version_photo_id" integer,
  	"version_phone" varchar,
  	"version_email" varchar,
  	"version_on_home" boolean DEFAULT false,
  	"version_order" numeric DEFAULT 10,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__team_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "vacatures_seeking_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "vacatures_profile_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "vacatures_tasks_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "vacatures_offer_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "vacatures" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"teaser" varchar,
  	"hours" varchar,
  	"education" varchar,
  	"location" varchar DEFAULT 'Zeewolde',
  	"intro" varchar,
  	"about" varchar,
  	"seeking_intro" varchar,
  	"profile_intro" varchar,
  	"tasks_intro" varchar,
  	"offer_intro" varchar,
  	"salary_min" numeric,
  	"salary_max" numeric,
  	"date_posted" timestamp(3) with time zone,
  	"valid_through" timestamp(3) with time zone,
  	"order" numeric DEFAULT 10,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_vacatures_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "vacatures_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "_vacatures_v_version_seeking_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_vacatures_v_version_profile_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_vacatures_v_version_tasks_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_vacatures_v_version_offer_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_vacatures_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_teaser" varchar,
  	"version_hours" varchar,
  	"version_education" varchar,
  	"version_location" varchar DEFAULT 'Zeewolde',
  	"version_intro" varchar,
  	"version_about" varchar,
  	"version_seeking_intro" varchar,
  	"version_profile_intro" varchar,
  	"version_tasks_intro" varchar,
  	"version_offer_intro" varchar,
  	"version_salary_min" numeric,
  	"version_salary_max" numeric,
  	"version_date_posted" timestamp(3) with time zone,
  	"version_valid_through" timestamp(3) with time zone,
  	"version_order" numeric DEFAULT 10,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__vacatures_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_vacatures_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "premies_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "premies_rows_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "premies_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "premies" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"year" numeric,
  	"insurer" varchar,
  	"note" varchar,
  	"order" numeric DEFAULT 10,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_premies_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_premies_v_version_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_premies_v_version_rows_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_premies_v_version_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_premies_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_year" numeric,
  	"version_insurer" varchar,
  	"version_note" varchar,
  	"version_order" numeric DEFAULT 10,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__premies_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "vragen" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"page" "enum_vragen_page",
  	"order" numeric DEFAULT 10,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_vragen_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_vragen_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_question" varchar,
  	"version_answer" varchar,
  	"version_page" "enum__vragen_v_version_page",
  	"version_order" numeric DEFAULT 10,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__vragen_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "whitepapers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"summary" varchar,
  	"file_id" integer,
  	"image_id" integer,
  	"path" varchar,
  	"gated" boolean DEFAULT true,
  	"order" numeric DEFAULT 10,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_whitepapers_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_whitepapers_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_summary" varchar,
  	"version_file_id" integer,
  	"version_image_id" integer,
  	"version_path" varchar,
  	"version_gated" boolean DEFAULT true,
  	"version_order" numeric DEFAULT 10,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__whitepapers_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "paginas" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"path" varchar NOT NULL,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"focus" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_portret_url" varchar,
  	"sizes_portret_width" numeric,
  	"sizes_portret_height" numeric,
  	"sizes_portret_mime_type" varchar,
  	"sizes_portret_filesize" numeric,
  	"sizes_portret_filename" varchar,
  	"sizes_kaart_url" varchar,
  	"sizes_kaart_width" numeric,
  	"sizes_kaart_height" numeric,
  	"sizes_kaart_mime_type" varchar,
  	"sizes_kaart_filesize" numeric,
  	"sizes_kaart_filename" varchar,
  	"sizes_breed_url" varchar,
  	"sizes_breed_width" numeric,
  	"sizes_breed_height" numeric,
  	"sizes_breed_mime_type" varchar,
  	"sizes_breed_filesize" numeric,
  	"sizes_breed_filename" varchar
  );
  
  CREATE TABLE "documenten" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "inzendingen" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"form_type" "enum_inzendingen_form_type" NOT NULL,
  	"status" "enum_inzendingen_status" DEFAULT 'nieuw',
  	"afgerond_op" timestamp(3) with time zone,
  	"email" varchar,
  	"samenvatting" varchar,
  	"data" jsonb,
  	"pagina" varchar,
  	"mail_status" varchar,
  	"notitie" varchar,
  	"ip_hash" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "inzendingen_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"cv_bestanden_id" integer
  );
  
  CREATE TABLE "cv_bestanden" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"naam" varchar,
  	"role" "enum_users_role" DEFAULT 'redacteur' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "oauth_clients" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"client_id" varchar NOT NULL,
  	"client_name" varchar,
  	"redirect_uris" jsonb NOT NULL,
  	"last_used_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "oauth_tokens" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum_oauth_tokens_type" NOT NULL,
  	"token_hash" varchar NOT NULL,
  	"user_id" integer,
  	"client_id" integer,
  	"family" varchar NOT NULL,
  	"resource" varchar,
  	"scope" varchar,
  	"expires_at" timestamp(3) with time zone NOT NULL,
  	"used_at" timestamp(3) with time zone,
  	"code_challenge" varchar,
  	"redirect_uri" varchar,
  	"write_count" numeric DEFAULT 0,
  	"write_window_start" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"team_id" integer,
  	"vacatures_id" integer,
  	"premies_id" integer,
  	"vragen_id" integer,
  	"whitepapers_id" integer,
  	"paginas_id" integer,
  	"media_id" integer,
  	"documenten_id" integer,
  	"inzendingen_id" integer,
  	"cv_bestanden_id" integer,
  	"users_id" integer,
  	"oauth_clients_id" integer,
  	"oauth_tokens_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "instellingen" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"figures_boards" varchar DEFAULT '400+',
  	"figures_schools" varchar DEFAULT '2.700+',
  	"figures_saving" varchar DEFAULT '37%',
  	"figures_years" varchar DEFAULT '16 jaar',
  	"figures_insurance_discount" varchar DEFAULT 'tot 16%',
  	"contact_phone" varchar DEFAULT '036 820 10 00',
  	"contact_email" varchar DEFAULT 'info@onderwijsinkoopgroep.nl',
  	"contact_street" varchar DEFAULT 'Gildenveld 3',
  	"contact_postal_code" varchar DEFAULT '3892 DC',
  	"contact_city" varchar DEFAULT 'Zeewolde',
  	"contact_kvk" varchar,
  	"contact_linkedin" varchar,
  	"contact_portal_url" varchar DEFAULT 'https://mijnoig.onderwijsinkoopgroep.nl/',
  	"insurance_year" numeric DEFAULT 2027,
  	"insurance_notice" varchar DEFAULT 'De premies voor 2027 volgen zodra de verzekeraars ze bekend hebben gemaakt. Zodra ze er zijn, staan ze op deze pagina.',
  	"recipients_contact" varchar DEFAULT 'max@digitaldudes.nl',
  	"recipients_inkoopscan" varchar DEFAULT 'max@digitaldudes.nl',
  	"recipients_whitepaper" varchar DEFAULT 'max@digitaldudes.nl',
  	"recipients_sollicitatie" varchar DEFAULT 'max@digitaldudes.nl',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_instellingen_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_figures_boards" varchar DEFAULT '400+',
  	"version_figures_schools" varchar DEFAULT '2.700+',
  	"version_figures_saving" varchar DEFAULT '37%',
  	"version_figures_years" varchar DEFAULT '16 jaar',
  	"version_figures_insurance_discount" varchar DEFAULT 'tot 16%',
  	"version_contact_phone" varchar DEFAULT '036 820 10 00',
  	"version_contact_email" varchar DEFAULT 'info@onderwijsinkoopgroep.nl',
  	"version_contact_street" varchar DEFAULT 'Gildenveld 3',
  	"version_contact_postal_code" varchar DEFAULT '3892 DC',
  	"version_contact_city" varchar DEFAULT 'Zeewolde',
  	"version_contact_kvk" varchar,
  	"version_contact_linkedin" varchar,
  	"version_contact_portal_url" varchar DEFAULT 'https://mijnoig.onderwijsinkoopgroep.nl/',
  	"version_insurance_year" numeric DEFAULT 2027,
  	"version_insurance_notice" varchar DEFAULT 'De premies voor 2027 volgen zodra de verzekeraars ze bekend hebben gemaakt. Zodra ze er zijn, staan ze op deze pagina.',
  	"version_recipients_contact" varchar DEFAULT 'max@digitaldudes.nl',
  	"version_recipients_inkoopscan" varchar DEFAULT 'max@digitaldudes.nl',
  	"version_recipients_whitepaper" varchar DEFAULT 'max@digitaldudes.nl',
  	"version_recipients_sollicitatie" varchar DEFAULT 'max@digitaldudes.nl',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "juridisch" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"privacy" jsonb,
  	"privacy_updated" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "team" ADD CONSTRAINT "team_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_team_v" ADD CONSTRAINT "_team_v_parent_id_team_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."team"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_team_v" ADD CONSTRAINT "_team_v_version_photo_id_media_id_fk" FOREIGN KEY ("version_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "vacatures_seeking_items" ADD CONSTRAINT "vacatures_seeking_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vacatures"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vacatures_profile_items" ADD CONSTRAINT "vacatures_profile_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vacatures"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vacatures_tasks_items" ADD CONSTRAINT "vacatures_tasks_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vacatures"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vacatures_offer_items" ADD CONSTRAINT "vacatures_offer_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vacatures"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vacatures_rels" ADD CONSTRAINT "vacatures_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."vacatures"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vacatures_rels" ADD CONSTRAINT "vacatures_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_vacatures_v_version_seeking_items" ADD CONSTRAINT "_vacatures_v_version_seeking_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_vacatures_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_vacatures_v_version_profile_items" ADD CONSTRAINT "_vacatures_v_version_profile_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_vacatures_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_vacatures_v_version_tasks_items" ADD CONSTRAINT "_vacatures_v_version_tasks_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_vacatures_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_vacatures_v_version_offer_items" ADD CONSTRAINT "_vacatures_v_version_offer_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_vacatures_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_vacatures_v" ADD CONSTRAINT "_vacatures_v_parent_id_vacatures_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."vacatures"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_vacatures_v_rels" ADD CONSTRAINT "_vacatures_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_vacatures_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_vacatures_v_rels" ADD CONSTRAINT "_vacatures_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "premies_columns" ADD CONSTRAINT "premies_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."premies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "premies_rows_cells" ADD CONSTRAINT "premies_rows_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."premies_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "premies_rows" ADD CONSTRAINT "premies_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."premies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_premies_v_version_columns" ADD CONSTRAINT "_premies_v_version_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_premies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_premies_v_version_rows_cells" ADD CONSTRAINT "_premies_v_version_rows_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_premies_v_version_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_premies_v_version_rows" ADD CONSTRAINT "_premies_v_version_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_premies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_premies_v" ADD CONSTRAINT "_premies_v_parent_id_premies_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."premies"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_vragen_v" ADD CONSTRAINT "_vragen_v_parent_id_vragen_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."vragen"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "whitepapers" ADD CONSTRAINT "whitepapers_file_id_documenten_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."documenten"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "whitepapers" ADD CONSTRAINT "whitepapers_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_whitepapers_v" ADD CONSTRAINT "_whitepapers_v_parent_id_whitepapers_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."whitepapers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_whitepapers_v" ADD CONSTRAINT "_whitepapers_v_version_file_id_documenten_id_fk" FOREIGN KEY ("version_file_id") REFERENCES "public"."documenten"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_whitepapers_v" ADD CONSTRAINT "_whitepapers_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "inzendingen_rels" ADD CONSTRAINT "inzendingen_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."inzendingen"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "inzendingen_rels" ADD CONSTRAINT "inzendingen_rels_cv_bestanden_fk" FOREIGN KEY ("cv_bestanden_id") REFERENCES "public"."cv_bestanden"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "oauth_tokens" ADD CONSTRAINT "oauth_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "oauth_tokens" ADD CONSTRAINT "oauth_tokens_client_id_oauth_clients_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."oauth_clients"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_team_fk" FOREIGN KEY ("team_id") REFERENCES "public"."team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_vacatures_fk" FOREIGN KEY ("vacatures_id") REFERENCES "public"."vacatures"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_premies_fk" FOREIGN KEY ("premies_id") REFERENCES "public"."premies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_vragen_fk" FOREIGN KEY ("vragen_id") REFERENCES "public"."vragen"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_whitepapers_fk" FOREIGN KEY ("whitepapers_id") REFERENCES "public"."whitepapers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_paginas_fk" FOREIGN KEY ("paginas_id") REFERENCES "public"."paginas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_documenten_fk" FOREIGN KEY ("documenten_id") REFERENCES "public"."documenten"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_inzendingen_fk" FOREIGN KEY ("inzendingen_id") REFERENCES "public"."inzendingen"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_cv_bestanden_fk" FOREIGN KEY ("cv_bestanden_id") REFERENCES "public"."cv_bestanden"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_oauth_clients_fk" FOREIGN KEY ("oauth_clients_id") REFERENCES "public"."oauth_clients"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_oauth_tokens_fk" FOREIGN KEY ("oauth_tokens_id") REFERENCES "public"."oauth_tokens"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "team_photo_idx" ON "team" USING btree ("photo_id");
  CREATE INDEX "team_updated_at_idx" ON "team" USING btree ("updated_at");
  CREATE INDEX "team_created_at_idx" ON "team" USING btree ("created_at");
  CREATE INDEX "team__status_idx" ON "team" USING btree ("_status");
  CREATE INDEX "_team_v_parent_idx" ON "_team_v" USING btree ("parent_id");
  CREATE INDEX "_team_v_version_version_photo_idx" ON "_team_v" USING btree ("version_photo_id");
  CREATE INDEX "_team_v_version_version_updated_at_idx" ON "_team_v" USING btree ("version_updated_at");
  CREATE INDEX "_team_v_version_version_created_at_idx" ON "_team_v" USING btree ("version_created_at");
  CREATE INDEX "_team_v_version_version__status_idx" ON "_team_v" USING btree ("version__status");
  CREATE INDEX "_team_v_created_at_idx" ON "_team_v" USING btree ("created_at");
  CREATE INDEX "_team_v_updated_at_idx" ON "_team_v" USING btree ("updated_at");
  CREATE INDEX "_team_v_latest_idx" ON "_team_v" USING btree ("latest");
  CREATE INDEX "vacatures_seeking_items_order_idx" ON "vacatures_seeking_items" USING btree ("_order");
  CREATE INDEX "vacatures_seeking_items_parent_id_idx" ON "vacatures_seeking_items" USING btree ("_parent_id");
  CREATE INDEX "vacatures_profile_items_order_idx" ON "vacatures_profile_items" USING btree ("_order");
  CREATE INDEX "vacatures_profile_items_parent_id_idx" ON "vacatures_profile_items" USING btree ("_parent_id");
  CREATE INDEX "vacatures_tasks_items_order_idx" ON "vacatures_tasks_items" USING btree ("_order");
  CREATE INDEX "vacatures_tasks_items_parent_id_idx" ON "vacatures_tasks_items" USING btree ("_parent_id");
  CREATE INDEX "vacatures_offer_items_order_idx" ON "vacatures_offer_items" USING btree ("_order");
  CREATE INDEX "vacatures_offer_items_parent_id_idx" ON "vacatures_offer_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "vacatures_slug_idx" ON "vacatures" USING btree ("slug");
  CREATE INDEX "vacatures_updated_at_idx" ON "vacatures" USING btree ("updated_at");
  CREATE INDEX "vacatures_created_at_idx" ON "vacatures" USING btree ("created_at");
  CREATE INDEX "vacatures__status_idx" ON "vacatures" USING btree ("_status");
  CREATE INDEX "vacatures_rels_order_idx" ON "vacatures_rels" USING btree ("order");
  CREATE INDEX "vacatures_rels_parent_idx" ON "vacatures_rels" USING btree ("parent_id");
  CREATE INDEX "vacatures_rels_path_idx" ON "vacatures_rels" USING btree ("path");
  CREATE INDEX "vacatures_rels_media_id_idx" ON "vacatures_rels" USING btree ("media_id");
  CREATE INDEX "_vacatures_v_version_seeking_items_order_idx" ON "_vacatures_v_version_seeking_items" USING btree ("_order");
  CREATE INDEX "_vacatures_v_version_seeking_items_parent_id_idx" ON "_vacatures_v_version_seeking_items" USING btree ("_parent_id");
  CREATE INDEX "_vacatures_v_version_profile_items_order_idx" ON "_vacatures_v_version_profile_items" USING btree ("_order");
  CREATE INDEX "_vacatures_v_version_profile_items_parent_id_idx" ON "_vacatures_v_version_profile_items" USING btree ("_parent_id");
  CREATE INDEX "_vacatures_v_version_tasks_items_order_idx" ON "_vacatures_v_version_tasks_items" USING btree ("_order");
  CREATE INDEX "_vacatures_v_version_tasks_items_parent_id_idx" ON "_vacatures_v_version_tasks_items" USING btree ("_parent_id");
  CREATE INDEX "_vacatures_v_version_offer_items_order_idx" ON "_vacatures_v_version_offer_items" USING btree ("_order");
  CREATE INDEX "_vacatures_v_version_offer_items_parent_id_idx" ON "_vacatures_v_version_offer_items" USING btree ("_parent_id");
  CREATE INDEX "_vacatures_v_parent_idx" ON "_vacatures_v" USING btree ("parent_id");
  CREATE INDEX "_vacatures_v_version_version_slug_idx" ON "_vacatures_v" USING btree ("version_slug");
  CREATE INDEX "_vacatures_v_version_version_updated_at_idx" ON "_vacatures_v" USING btree ("version_updated_at");
  CREATE INDEX "_vacatures_v_version_version_created_at_idx" ON "_vacatures_v" USING btree ("version_created_at");
  CREATE INDEX "_vacatures_v_version_version__status_idx" ON "_vacatures_v" USING btree ("version__status");
  CREATE INDEX "_vacatures_v_created_at_idx" ON "_vacatures_v" USING btree ("created_at");
  CREATE INDEX "_vacatures_v_updated_at_idx" ON "_vacatures_v" USING btree ("updated_at");
  CREATE INDEX "_vacatures_v_latest_idx" ON "_vacatures_v" USING btree ("latest");
  CREATE INDEX "_vacatures_v_rels_order_idx" ON "_vacatures_v_rels" USING btree ("order");
  CREATE INDEX "_vacatures_v_rels_parent_idx" ON "_vacatures_v_rels" USING btree ("parent_id");
  CREATE INDEX "_vacatures_v_rels_path_idx" ON "_vacatures_v_rels" USING btree ("path");
  CREATE INDEX "_vacatures_v_rels_media_id_idx" ON "_vacatures_v_rels" USING btree ("media_id");
  CREATE INDEX "premies_columns_order_idx" ON "premies_columns" USING btree ("_order");
  CREATE INDEX "premies_columns_parent_id_idx" ON "premies_columns" USING btree ("_parent_id");
  CREATE INDEX "premies_rows_cells_order_idx" ON "premies_rows_cells" USING btree ("_order");
  CREATE INDEX "premies_rows_cells_parent_id_idx" ON "premies_rows_cells" USING btree ("_parent_id");
  CREATE INDEX "premies_rows_order_idx" ON "premies_rows" USING btree ("_order");
  CREATE INDEX "premies_rows_parent_id_idx" ON "premies_rows" USING btree ("_parent_id");
  CREATE INDEX "premies_updated_at_idx" ON "premies" USING btree ("updated_at");
  CREATE INDEX "premies_created_at_idx" ON "premies" USING btree ("created_at");
  CREATE INDEX "premies__status_idx" ON "premies" USING btree ("_status");
  CREATE INDEX "_premies_v_version_columns_order_idx" ON "_premies_v_version_columns" USING btree ("_order");
  CREATE INDEX "_premies_v_version_columns_parent_id_idx" ON "_premies_v_version_columns" USING btree ("_parent_id");
  CREATE INDEX "_premies_v_version_rows_cells_order_idx" ON "_premies_v_version_rows_cells" USING btree ("_order");
  CREATE INDEX "_premies_v_version_rows_cells_parent_id_idx" ON "_premies_v_version_rows_cells" USING btree ("_parent_id");
  CREATE INDEX "_premies_v_version_rows_order_idx" ON "_premies_v_version_rows" USING btree ("_order");
  CREATE INDEX "_premies_v_version_rows_parent_id_idx" ON "_premies_v_version_rows" USING btree ("_parent_id");
  CREATE INDEX "_premies_v_parent_idx" ON "_premies_v" USING btree ("parent_id");
  CREATE INDEX "_premies_v_version_version_updated_at_idx" ON "_premies_v" USING btree ("version_updated_at");
  CREATE INDEX "_premies_v_version_version_created_at_idx" ON "_premies_v" USING btree ("version_created_at");
  CREATE INDEX "_premies_v_version_version__status_idx" ON "_premies_v" USING btree ("version__status");
  CREATE INDEX "_premies_v_created_at_idx" ON "_premies_v" USING btree ("created_at");
  CREATE INDEX "_premies_v_updated_at_idx" ON "_premies_v" USING btree ("updated_at");
  CREATE INDEX "_premies_v_latest_idx" ON "_premies_v" USING btree ("latest");
  CREATE INDEX "vragen_updated_at_idx" ON "vragen" USING btree ("updated_at");
  CREATE INDEX "vragen_created_at_idx" ON "vragen" USING btree ("created_at");
  CREATE INDEX "vragen__status_idx" ON "vragen" USING btree ("_status");
  CREATE INDEX "_vragen_v_parent_idx" ON "_vragen_v" USING btree ("parent_id");
  CREATE INDEX "_vragen_v_version_version_updated_at_idx" ON "_vragen_v" USING btree ("version_updated_at");
  CREATE INDEX "_vragen_v_version_version_created_at_idx" ON "_vragen_v" USING btree ("version_created_at");
  CREATE INDEX "_vragen_v_version_version__status_idx" ON "_vragen_v" USING btree ("version__status");
  CREATE INDEX "_vragen_v_created_at_idx" ON "_vragen_v" USING btree ("created_at");
  CREATE INDEX "_vragen_v_updated_at_idx" ON "_vragen_v" USING btree ("updated_at");
  CREATE INDEX "_vragen_v_latest_idx" ON "_vragen_v" USING btree ("latest");
  CREATE UNIQUE INDEX "whitepapers_slug_idx" ON "whitepapers" USING btree ("slug");
  CREATE INDEX "whitepapers_file_idx" ON "whitepapers" USING btree ("file_id");
  CREATE INDEX "whitepapers_image_idx" ON "whitepapers" USING btree ("image_id");
  CREATE INDEX "whitepapers_updated_at_idx" ON "whitepapers" USING btree ("updated_at");
  CREATE INDEX "whitepapers_created_at_idx" ON "whitepapers" USING btree ("created_at");
  CREATE INDEX "whitepapers__status_idx" ON "whitepapers" USING btree ("_status");
  CREATE INDEX "_whitepapers_v_parent_idx" ON "_whitepapers_v" USING btree ("parent_id");
  CREATE INDEX "_whitepapers_v_version_version_slug_idx" ON "_whitepapers_v" USING btree ("version_slug");
  CREATE INDEX "_whitepapers_v_version_version_file_idx" ON "_whitepapers_v" USING btree ("version_file_id");
  CREATE INDEX "_whitepapers_v_version_version_image_idx" ON "_whitepapers_v" USING btree ("version_image_id");
  CREATE INDEX "_whitepapers_v_version_version_updated_at_idx" ON "_whitepapers_v" USING btree ("version_updated_at");
  CREATE INDEX "_whitepapers_v_version_version_created_at_idx" ON "_whitepapers_v" USING btree ("version_created_at");
  CREATE INDEX "_whitepapers_v_version_version__status_idx" ON "_whitepapers_v" USING btree ("version__status");
  CREATE INDEX "_whitepapers_v_created_at_idx" ON "_whitepapers_v" USING btree ("created_at");
  CREATE INDEX "_whitepapers_v_updated_at_idx" ON "_whitepapers_v" USING btree ("updated_at");
  CREATE INDEX "_whitepapers_v_latest_idx" ON "_whitepapers_v" USING btree ("latest");
  CREATE UNIQUE INDEX "paginas_path_idx" ON "paginas" USING btree ("path");
  CREATE INDEX "paginas_updated_at_idx" ON "paginas" USING btree ("updated_at");
  CREATE INDEX "paginas_created_at_idx" ON "paginas" USING btree ("created_at");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_portret_sizes_portret_filename_idx" ON "media" USING btree ("sizes_portret_filename");
  CREATE INDEX "media_sizes_kaart_sizes_kaart_filename_idx" ON "media" USING btree ("sizes_kaart_filename");
  CREATE INDEX "media_sizes_breed_sizes_breed_filename_idx" ON "media" USING btree ("sizes_breed_filename");
  CREATE INDEX "documenten_updated_at_idx" ON "documenten" USING btree ("updated_at");
  CREATE INDEX "documenten_created_at_idx" ON "documenten" USING btree ("created_at");
  CREATE UNIQUE INDEX "documenten_filename_idx" ON "documenten" USING btree ("filename");
  CREATE INDEX "inzendingen_ip_hash_idx" ON "inzendingen" USING btree ("ip_hash");
  CREATE INDEX "inzendingen_updated_at_idx" ON "inzendingen" USING btree ("updated_at");
  CREATE INDEX "inzendingen_created_at_idx" ON "inzendingen" USING btree ("created_at");
  CREATE INDEX "inzendingen_rels_order_idx" ON "inzendingen_rels" USING btree ("order");
  CREATE INDEX "inzendingen_rels_parent_idx" ON "inzendingen_rels" USING btree ("parent_id");
  CREATE INDEX "inzendingen_rels_path_idx" ON "inzendingen_rels" USING btree ("path");
  CREATE INDEX "inzendingen_rels_cv_bestanden_id_idx" ON "inzendingen_rels" USING btree ("cv_bestanden_id");
  CREATE INDEX "cv_bestanden_updated_at_idx" ON "cv_bestanden" USING btree ("updated_at");
  CREATE INDEX "cv_bestanden_created_at_idx" ON "cv_bestanden" USING btree ("created_at");
  CREATE UNIQUE INDEX "cv_bestanden_filename_idx" ON "cv_bestanden" USING btree ("filename");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "oauth_clients_client_id_idx" ON "oauth_clients" USING btree ("client_id");
  CREATE INDEX "oauth_clients_last_used_at_idx" ON "oauth_clients" USING btree ("last_used_at");
  CREATE INDEX "oauth_clients_updated_at_idx" ON "oauth_clients" USING btree ("updated_at");
  CREATE INDEX "oauth_clients_created_at_idx" ON "oauth_clients" USING btree ("created_at");
  CREATE INDEX "oauth_tokens_type_idx" ON "oauth_tokens" USING btree ("type");
  CREATE UNIQUE INDEX "oauth_tokens_token_hash_idx" ON "oauth_tokens" USING btree ("token_hash");
  CREATE INDEX "oauth_tokens_user_idx" ON "oauth_tokens" USING btree ("user_id");
  CREATE INDEX "oauth_tokens_client_idx" ON "oauth_tokens" USING btree ("client_id");
  CREATE INDEX "oauth_tokens_family_idx" ON "oauth_tokens" USING btree ("family");
  CREATE INDEX "oauth_tokens_expires_at_idx" ON "oauth_tokens" USING btree ("expires_at");
  CREATE INDEX "oauth_tokens_updated_at_idx" ON "oauth_tokens" USING btree ("updated_at");
  CREATE INDEX "oauth_tokens_created_at_idx" ON "oauth_tokens" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_team_id_idx" ON "payload_locked_documents_rels" USING btree ("team_id");
  CREATE INDEX "payload_locked_documents_rels_vacatures_id_idx" ON "payload_locked_documents_rels" USING btree ("vacatures_id");
  CREATE INDEX "payload_locked_documents_rels_premies_id_idx" ON "payload_locked_documents_rels" USING btree ("premies_id");
  CREATE INDEX "payload_locked_documents_rels_vragen_id_idx" ON "payload_locked_documents_rels" USING btree ("vragen_id");
  CREATE INDEX "payload_locked_documents_rels_whitepapers_id_idx" ON "payload_locked_documents_rels" USING btree ("whitepapers_id");
  CREATE INDEX "payload_locked_documents_rels_paginas_id_idx" ON "payload_locked_documents_rels" USING btree ("paginas_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_documenten_id_idx" ON "payload_locked_documents_rels" USING btree ("documenten_id");
  CREATE INDEX "payload_locked_documents_rels_inzendingen_id_idx" ON "payload_locked_documents_rels" USING btree ("inzendingen_id");
  CREATE INDEX "payload_locked_documents_rels_cv_bestanden_id_idx" ON "payload_locked_documents_rels" USING btree ("cv_bestanden_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_oauth_clients_id_idx" ON "payload_locked_documents_rels" USING btree ("oauth_clients_id");
  CREATE INDEX "payload_locked_documents_rels_oauth_tokens_id_idx" ON "payload_locked_documents_rels" USING btree ("oauth_tokens_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "_instellingen_v_created_at_idx" ON "_instellingen_v" USING btree ("created_at");
  CREATE INDEX "_instellingen_v_updated_at_idx" ON "_instellingen_v" USING btree ("updated_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "team" CASCADE;
  DROP TABLE "_team_v" CASCADE;
  DROP TABLE "vacatures_seeking_items" CASCADE;
  DROP TABLE "vacatures_profile_items" CASCADE;
  DROP TABLE "vacatures_tasks_items" CASCADE;
  DROP TABLE "vacatures_offer_items" CASCADE;
  DROP TABLE "vacatures" CASCADE;
  DROP TABLE "vacatures_rels" CASCADE;
  DROP TABLE "_vacatures_v_version_seeking_items" CASCADE;
  DROP TABLE "_vacatures_v_version_profile_items" CASCADE;
  DROP TABLE "_vacatures_v_version_tasks_items" CASCADE;
  DROP TABLE "_vacatures_v_version_offer_items" CASCADE;
  DROP TABLE "_vacatures_v" CASCADE;
  DROP TABLE "_vacatures_v_rels" CASCADE;
  DROP TABLE "premies_columns" CASCADE;
  DROP TABLE "premies_rows_cells" CASCADE;
  DROP TABLE "premies_rows" CASCADE;
  DROP TABLE "premies" CASCADE;
  DROP TABLE "_premies_v_version_columns" CASCADE;
  DROP TABLE "_premies_v_version_rows_cells" CASCADE;
  DROP TABLE "_premies_v_version_rows" CASCADE;
  DROP TABLE "_premies_v" CASCADE;
  DROP TABLE "vragen" CASCADE;
  DROP TABLE "_vragen_v" CASCADE;
  DROP TABLE "whitepapers" CASCADE;
  DROP TABLE "_whitepapers_v" CASCADE;
  DROP TABLE "paginas" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "documenten" CASCADE;
  DROP TABLE "inzendingen" CASCADE;
  DROP TABLE "inzendingen_rels" CASCADE;
  DROP TABLE "cv_bestanden" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "oauth_clients" CASCADE;
  DROP TABLE "oauth_tokens" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "instellingen" CASCADE;
  DROP TABLE "_instellingen_v" CASCADE;
  DROP TABLE "juridisch" CASCADE;
  DROP TYPE "public"."enum_team_group";
  DROP TYPE "public"."enum_team_status";
  DROP TYPE "public"."enum__team_v_version_group";
  DROP TYPE "public"."enum__team_v_version_status";
  DROP TYPE "public"."enum_vacatures_status";
  DROP TYPE "public"."enum__vacatures_v_version_status";
  DROP TYPE "public"."enum_premies_status";
  DROP TYPE "public"."enum__premies_v_version_status";
  DROP TYPE "public"."enum_vragen_page";
  DROP TYPE "public"."enum_vragen_status";
  DROP TYPE "public"."enum__vragen_v_version_page";
  DROP TYPE "public"."enum__vragen_v_version_status";
  DROP TYPE "public"."enum_whitepapers_status";
  DROP TYPE "public"."enum__whitepapers_v_version_status";
  DROP TYPE "public"."enum_inzendingen_form_type";
  DROP TYPE "public"."enum_inzendingen_status";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_oauth_tokens_type";`)
}
