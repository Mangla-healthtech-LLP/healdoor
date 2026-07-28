import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_services_blocks_product_grid_display_mode" AS ENUM('rent', 'buy', 'both');
  CREATE TYPE "public"."enum_services_blocks_item_grid_columns" AS ENUM('2', '3');
  CREATE TYPE "public"."enum_pages_blocks_hero_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_pages_blocks_cta_background_color" AS ENUM('teal', 'white', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_product_grid_display_mode" AS ENUM('rent', 'buy', 'both');
  CREATE TYPE "public"."enum_pages_blocks_item_grid_columns" AS ENUM('2', '3');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_testimonials_type" AS ENUM('written', 'video');
  CREATE TABLE "services_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE "services_blocks_product_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_title" varchar,
  	"section_description" varchar,
  	"display_mode" "enum_services_blocks_product_grid_display_mode" DEFAULT 'both',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_product_collection" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_title" varchar,
  	"section_description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_pricing_grid_plans_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_pricing_grid_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"price" varchar NOT NULL,
  	"billing_period" varchar,
  	"is_popular" boolean DEFAULT false,
  	"button_text" varchar DEFAULT 'Get Started'
  );
  
  CREATE TABLE "services_blocks_pricing_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_title" varchar,
  	"section_description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_item_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"icon" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"link" varchar
  );
  
  CREATE TABLE "services_blocks_item_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_title" varchar,
  	"section_description" varchar,
  	"columns" "enum_services_blocks_item_grid_columns" DEFAULT '3',
  	"block_name" varchar
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" jsonb,
  	"hero_image_id" integer,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_canonical" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "services_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"faqs_id" integer,
  	"products_id" integer,
  	"product_categories_id" integer
  );
  
  CREATE TABLE "leads" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"mobile" varchar NOT NULL,
  	"email" varchar,
  	"service_id" integer,
  	"service_slug_history" varchar NOT NULL,
  	"product_slug" varchar,
  	"location" varchar NOT NULL,
  	"message" varchar,
  	"source_url" varchar NOT NULL,
  	"utm_params" jsonb,
  	"form_token" varchar,
  	"ip_hash" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"sub_heading" varchar,
  	"primary_button_text" varchar,
  	"primary_button_link" varchar,
  	"secondary_button_text" varchar,
  	"secondary_button_link" varchar,
  	"background_image_id" integer,
  	"alignment" "enum_pages_blocks_hero_alignment" DEFAULT 'left',
  	"show_stats" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"button_text" varchar,
  	"button_link" varchar,
  	"background_color" "enum_pages_blocks_cta_background_color" DEFAULT 'teal',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_feature_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_feature" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_title" varchar,
  	"section_description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_title" varchar,
  	"section_description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonial_testimonial_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"designation" varchar,
  	"rating" numeric DEFAULT 5,
  	"photo_id" integer,
  	"review" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_testimonial" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_product_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_title" varchar,
  	"section_description" varchar,
  	"display_mode" "enum_pages_blocks_product_grid_display_mode" DEFAULT 'both',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_steps_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL,
  	"icon" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_title" varchar,
  	"section_description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_doctor_grid_doctors" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"qualification" varchar,
  	"experience" varchar,
  	"badge" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_doctor_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_title" varchar,
  	"section_description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_product_collection" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_title" varchar,
  	"section_description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_pricing_grid_plans_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_pricing_grid_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"price" varchar NOT NULL,
  	"billing_period" varchar,
  	"is_popular" boolean DEFAULT false,
  	"button_text" varchar DEFAULT 'Get Started'
  );
  
  CREATE TABLE "pages_blocks_pricing_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_title" varchar,
  	"section_description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_item_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"icon" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"link" varchar
  );
  
  CREATE TABLE "pages_blocks_item_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_title" varchar,
  	"section_description" varchar,
  	"columns" "enum_pages_blocks_item_grid_columns" DEFAULT '3',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"status" "enum_pages_status" DEFAULT 'draft',
  	"published_at" timestamp(3) with time zone,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer,
  	"product_categories_id" integer
  );
  
  CREATE TABLE "blogs_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE "blogs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"featured_image_id" integer,
  	"content" jsonb,
  	"category" varchar,
  	"author_id" integer,
  	"publish_date" timestamp(3) with time zone,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum_testimonials_type" DEFAULT 'written' NOT NULL,
  	"name" varchar NOT NULL,
  	"handle" varchar,
  	"designation" varchar,
  	"organization" varchar,
  	"image_id" integer,
  	"video_file_id" integer,
  	"rating" numeric,
  	"testimonial" varchar NOT NULL,
  	"time_ago" varchar,
  	"social_media_link" varchar,
  	"instagram_link" varchar,
  	"is_verified" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "faqs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" jsonb NOT NULL,
  	"category" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "products_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE "products" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"image_id" integer,
  	"rent_price" numeric,
  	"buy_price" numeric,
  	"rating" numeric DEFAULT 0,
  	"rating_count" numeric DEFAULT 0,
  	"rating5_star" numeric DEFAULT 0,
  	"rating4_star" numeric DEFAULT 0,
  	"rating3_star" numeric DEFAULT 0,
  	"rating2_star" numeric DEFAULT 0,
  	"rating1_star" numeric DEFAULT 0,
  	"is_featured" boolean DEFAULT false,
  	"is_available_for_rent" boolean DEFAULT true,
  	"is_available_for_purchase" boolean DEFAULT true,
  	"sort_order" numeric DEFAULT 0,
  	"description" jsonb,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_canonical" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "products_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"product_categories_id" integer,
  	"faqs_id" integer
  );
  
  CREATE TABLE "product_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "homepage_settings_hero_slides_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_settings_hero_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"heading" varchar NOT NULL,
  	"cta_text" varchar,
  	"cta_href" varchar,
  	"image_id" integer,
  	"quality_badge_line1" varchar,
  	"quality_badge_line2" varchar
  );
  
  CREATE TABLE "homepage_settings_service_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"image_id" integer,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_settings_trust_badges" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "homepage_settings_problems_section_problems" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_settings_rent_or_buy_section_rent_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_settings_rent_or_buy_section_buy_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_settings_expert_doctors_section_doctors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"qualification" varchar,
  	"experience" varchar,
  	"badge" varchar,
  	"image_id" integer,
  	"linkedin" varchar,
  	"twitter" varchar,
  	"instagram" varchar
  );
  
  CREATE TABLE "homepage_settings_before_after_section_stories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"patient_name" varchar NOT NULL,
  	"age" numeric,
  	"condition" varchar,
  	"quote" varchar,
  	"before_image_id" integer,
  	"after_image_id" integer,
  	"patient_image_id" integer,
  	"full_story_link" varchar
  );
  
  CREATE TABLE "homepage_settings_our_story_section_team_badges" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_settings_our_story_section_team_education" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_settings_our_story_section_team_experience" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_settings_our_story_section_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "homepage_settings_how_it_works_section_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL,
  	"icon" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "homepage_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"healthcare_intro_heading" varchar DEFAULT 'Healthcare at your doorstep',
  	"healthcare_intro_description" varchar DEFAULT 'Professional care and medical services delivered safely at your home.',
  	"problems_section_heading" varchar DEFAULT 'Are you facing these Problems ?',
  	"problems_section_description" varchar DEFAULT 'We are here to help you with the best care and support at your doorstep.',
  	"highest_selling_section_heading" varchar DEFAULT 'Highest Selling Products',
  	"highest_selling_section_description" varchar DEFAULT 'Trusted by thousands of customers across India.',
  	"rent_or_buy_section_heading" varchar DEFAULT 'Rent or Buy — Your Choice',
  	"rent_or_buy_section_description" varchar DEFAULT 'Flexible options to suit your healthcare needs and budget.',
  	"expert_doctors_section_heading" varchar DEFAULT 'Our Expert Doctors',
  	"expert_doctors_section_description" varchar DEFAULT 'Experienced professionals dedicated to your health and well-being.',
  	"testimonials_section_heading" varchar DEFAULT 'Testimonials',
  	"testimonials_section_description" varchar DEFAULT 'Real stories from real people who chose HealDoor.',
  	"before_after_section_heading" varchar DEFAULT 'Before vs After — Real Results',
  	"before_after_section_description" varchar DEFAULT 'See the difference HealDoor care can make.',
  	"our_story_section_heading" varchar DEFAULT 'Our Story',
  	"our_story_section_narrative" jsonb,
  	"blogs_section_heading" varchar DEFAULT 'Health & Wellness Blogs',
  	"blogs_section_description" varchar DEFAULT 'Tips, guides and insights to help you live a healthier life.',
  	"how_it_works_section_heading" varchar DEFAULT 'How It Works',
  	"how_it_works_section_description" varchar DEFAULT 'Simple 4-step process to get care at home',
  	"location_section_heading" varchar DEFAULT 'Our Location',
  	"location_section_company_name" varchar DEFAULT 'HealDoor Healthcare',
  	"location_section_address" varchar DEFAULT '264, Pocket H-17, Sector-7, Rohini, Delhi-110085',
  	"location_section_map_embed_url" varchar,
  	"location_section_get_directions_link" varchar DEFAULT 'https://maps.google.com/?q=264+pocket+H-17+sector-7+Rohini+Delhi+110085',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users" ADD COLUMN "enable_a_p_i_key" boolean;
  ALTER TABLE "users" ADD COLUMN "api_key" varchar;
  ALTER TABLE "users" ADD COLUMN "api_key_index" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "services_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "leads_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "blogs_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "testimonials_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "faqs_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "products_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "product_categories_id" integer;
  ALTER TABLE "services_features" ADD CONSTRAINT "services_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_product_grid" ADD CONSTRAINT "services_blocks_product_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_product_collection" ADD CONSTRAINT "services_blocks_product_collection_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_pricing_grid_plans_features" ADD CONSTRAINT "services_blocks_pricing_grid_plans_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_pricing_grid_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_pricing_grid_plans" ADD CONSTRAINT "services_blocks_pricing_grid_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_pricing_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_pricing_grid" ADD CONSTRAINT "services_blocks_pricing_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_item_grid_items" ADD CONSTRAINT "services_blocks_item_grid_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_item_grid_items" ADD CONSTRAINT "services_blocks_item_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_item_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_item_grid" ADD CONSTRAINT "services_blocks_item_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_product_categories_fk" FOREIGN KEY ("product_categories_id") REFERENCES "public"."product_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "leads" ADD CONSTRAINT "leads_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_features" ADD CONSTRAINT "pages_blocks_feature_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature" ADD CONSTRAINT "pages_blocks_feature_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_faq_items" ADD CONSTRAINT "pages_blocks_faq_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonial_testimonial_items" ADD CONSTRAINT "pages_blocks_testimonial_testimonial_items_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonial_testimonial_items" ADD CONSTRAINT "pages_blocks_testimonial_testimonial_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonial"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonial" ADD CONSTRAINT "pages_blocks_testimonial_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text" ADD CONSTRAINT "pages_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_product_grid" ADD CONSTRAINT "pages_blocks_product_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_steps_steps" ADD CONSTRAINT "pages_blocks_steps_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_steps" ADD CONSTRAINT "pages_blocks_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_doctor_grid_doctors" ADD CONSTRAINT "pages_blocks_doctor_grid_doctors_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_doctor_grid_doctors" ADD CONSTRAINT "pages_blocks_doctor_grid_doctors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_doctor_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_doctor_grid" ADD CONSTRAINT "pages_blocks_doctor_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_product_collection" ADD CONSTRAINT "pages_blocks_product_collection_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_grid_plans_features" ADD CONSTRAINT "pages_blocks_pricing_grid_plans_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_grid_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_grid_plans" ADD CONSTRAINT "pages_blocks_pricing_grid_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_grid" ADD CONSTRAINT "pages_blocks_pricing_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_item_grid_items" ADD CONSTRAINT "pages_blocks_item_grid_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_item_grid_items" ADD CONSTRAINT "pages_blocks_item_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_item_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_item_grid" ADD CONSTRAINT "pages_blocks_item_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_product_categories_fk" FOREIGN KEY ("product_categories_id") REFERENCES "public"."product_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blogs_tags" ADD CONSTRAINT "blogs_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blogs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blogs" ADD CONSTRAINT "blogs_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blogs" ADD CONSTRAINT "blogs_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_video_file_id_media_id_fk" FOREIGN KEY ("video_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_features" ADD CONSTRAINT "products_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_product_categories_fk" FOREIGN KEY ("product_categories_id") REFERENCES "public"."product_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_settings_hero_slides_bullets" ADD CONSTRAINT "homepage_settings_hero_slides_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_settings_hero_slides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_settings_hero_slides" ADD CONSTRAINT "homepage_settings_hero_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_settings_hero_slides" ADD CONSTRAINT "homepage_settings_hero_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_settings_service_categories" ADD CONSTRAINT "homepage_settings_service_categories_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_settings_service_categories" ADD CONSTRAINT "homepage_settings_service_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_settings_trust_badges" ADD CONSTRAINT "homepage_settings_trust_badges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_settings_problems_section_problems" ADD CONSTRAINT "homepage_settings_problems_section_problems_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_settings_rent_or_buy_section_rent_benefits" ADD CONSTRAINT "homepage_settings_rent_or_buy_section_rent_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_settings_rent_or_buy_section_buy_benefits" ADD CONSTRAINT "homepage_settings_rent_or_buy_section_buy_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_settings_expert_doctors_section_doctors" ADD CONSTRAINT "homepage_settings_expert_doctors_section_doctors_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_settings_expert_doctors_section_doctors" ADD CONSTRAINT "homepage_settings_expert_doctors_section_doctors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_settings_before_after_section_stories" ADD CONSTRAINT "homepage_settings_before_after_section_stories_before_image_id_media_id_fk" FOREIGN KEY ("before_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_settings_before_after_section_stories" ADD CONSTRAINT "homepage_settings_before_after_section_stories_after_image_id_media_id_fk" FOREIGN KEY ("after_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_settings_before_after_section_stories" ADD CONSTRAINT "homepage_settings_before_after_section_stories_patient_image_id_media_id_fk" FOREIGN KEY ("patient_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_settings_before_after_section_stories" ADD CONSTRAINT "homepage_settings_before_after_section_stories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_settings_our_story_section_team_badges" ADD CONSTRAINT "homepage_settings_our_story_section_team_badges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_settings_our_story_section_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_settings_our_story_section_team_education" ADD CONSTRAINT "homepage_settings_our_story_section_team_education_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_settings_our_story_section_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_settings_our_story_section_team_experience" ADD CONSTRAINT "homepage_settings_our_story_section_team_experience_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_settings_our_story_section_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_settings_our_story_section_team" ADD CONSTRAINT "homepage_settings_our_story_section_team_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_settings_our_story_section_team" ADD CONSTRAINT "homepage_settings_our_story_section_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_settings_how_it_works_section_steps" ADD CONSTRAINT "homepage_settings_how_it_works_section_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "services_features_order_idx" ON "services_features" USING btree ("_order");
  CREATE INDEX "services_features_parent_id_idx" ON "services_features" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_product_grid_order_idx" ON "services_blocks_product_grid" USING btree ("_order");
  CREATE INDEX "services_blocks_product_grid_parent_id_idx" ON "services_blocks_product_grid" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_product_grid_path_idx" ON "services_blocks_product_grid" USING btree ("_path");
  CREATE INDEX "services_blocks_product_collection_order_idx" ON "services_blocks_product_collection" USING btree ("_order");
  CREATE INDEX "services_blocks_product_collection_parent_id_idx" ON "services_blocks_product_collection" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_product_collection_path_idx" ON "services_blocks_product_collection" USING btree ("_path");
  CREATE INDEX "services_blocks_pricing_grid_plans_features_order_idx" ON "services_blocks_pricing_grid_plans_features" USING btree ("_order");
  CREATE INDEX "services_blocks_pricing_grid_plans_features_parent_id_idx" ON "services_blocks_pricing_grid_plans_features" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_pricing_grid_plans_order_idx" ON "services_blocks_pricing_grid_plans" USING btree ("_order");
  CREATE INDEX "services_blocks_pricing_grid_plans_parent_id_idx" ON "services_blocks_pricing_grid_plans" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_pricing_grid_order_idx" ON "services_blocks_pricing_grid" USING btree ("_order");
  CREATE INDEX "services_blocks_pricing_grid_parent_id_idx" ON "services_blocks_pricing_grid" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_pricing_grid_path_idx" ON "services_blocks_pricing_grid" USING btree ("_path");
  CREATE INDEX "services_blocks_item_grid_items_order_idx" ON "services_blocks_item_grid_items" USING btree ("_order");
  CREATE INDEX "services_blocks_item_grid_items_parent_id_idx" ON "services_blocks_item_grid_items" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_item_grid_items_image_idx" ON "services_blocks_item_grid_items" USING btree ("image_id");
  CREATE INDEX "services_blocks_item_grid_order_idx" ON "services_blocks_item_grid" USING btree ("_order");
  CREATE INDEX "services_blocks_item_grid_parent_id_idx" ON "services_blocks_item_grid" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_item_grid_path_idx" ON "services_blocks_item_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "services_slug_idx" ON "services" USING btree ("slug");
  CREATE INDEX "services_hero_image_idx" ON "services" USING btree ("hero_image_id");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX "services_rels_order_idx" ON "services_rels" USING btree ("order");
  CREATE INDEX "services_rels_parent_idx" ON "services_rels" USING btree ("parent_id");
  CREATE INDEX "services_rels_path_idx" ON "services_rels" USING btree ("path");
  CREATE INDEX "services_rels_faqs_id_idx" ON "services_rels" USING btree ("faqs_id");
  CREATE INDEX "services_rels_products_id_idx" ON "services_rels" USING btree ("products_id");
  CREATE INDEX "services_rels_product_categories_id_idx" ON "services_rels" USING btree ("product_categories_id");
  CREATE INDEX "leads_service_idx" ON "leads" USING btree ("service_id");
  CREATE UNIQUE INDEX "leads_form_token_idx" ON "leads" USING btree ("form_token");
  CREATE INDEX "leads_updated_at_idx" ON "leads" USING btree ("updated_at");
  CREATE INDEX "leads_created_at_idx" ON "leads" USING btree ("created_at");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_background_image_idx" ON "pages_blocks_hero" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_cta_order_idx" ON "pages_blocks_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_parent_id_idx" ON "pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_path_idx" ON "pages_blocks_cta" USING btree ("_path");
  CREATE INDEX "pages_blocks_feature_features_order_idx" ON "pages_blocks_feature_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_features_parent_id_idx" ON "pages_blocks_feature_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_order_idx" ON "pages_blocks_feature" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_parent_id_idx" ON "pages_blocks_feature" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_path_idx" ON "pages_blocks_feature" USING btree ("_path");
  CREATE INDEX "pages_blocks_faq_faq_items_order_idx" ON "pages_blocks_faq_faq_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_faq_items_parent_id_idx" ON "pages_blocks_faq_faq_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_order_idx" ON "pages_blocks_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_parent_id_idx" ON "pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_path_idx" ON "pages_blocks_faq" USING btree ("_path");
  CREATE INDEX "pages_blocks_testimonial_testimonial_items_order_idx" ON "pages_blocks_testimonial_testimonial_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonial_testimonial_items_parent_id_idx" ON "pages_blocks_testimonial_testimonial_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonial_testimonial_items_photo_idx" ON "pages_blocks_testimonial_testimonial_items" USING btree ("photo_id");
  CREATE INDEX "pages_blocks_testimonial_order_idx" ON "pages_blocks_testimonial" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonial_parent_id_idx" ON "pages_blocks_testimonial" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonial_path_idx" ON "pages_blocks_testimonial" USING btree ("_path");
  CREATE INDEX "pages_blocks_rich_text_order_idx" ON "pages_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_text_parent_id_idx" ON "pages_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_path_idx" ON "pages_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_product_grid_order_idx" ON "pages_blocks_product_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_product_grid_parent_id_idx" ON "pages_blocks_product_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_product_grid_path_idx" ON "pages_blocks_product_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_steps_steps_order_idx" ON "pages_blocks_steps_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_steps_steps_parent_id_idx" ON "pages_blocks_steps_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_steps_order_idx" ON "pages_blocks_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_steps_parent_id_idx" ON "pages_blocks_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_steps_path_idx" ON "pages_blocks_steps" USING btree ("_path");
  CREATE INDEX "pages_blocks_doctor_grid_doctors_order_idx" ON "pages_blocks_doctor_grid_doctors" USING btree ("_order");
  CREATE INDEX "pages_blocks_doctor_grid_doctors_parent_id_idx" ON "pages_blocks_doctor_grid_doctors" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_doctor_grid_doctors_image_idx" ON "pages_blocks_doctor_grid_doctors" USING btree ("image_id");
  CREATE INDEX "pages_blocks_doctor_grid_order_idx" ON "pages_blocks_doctor_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_doctor_grid_parent_id_idx" ON "pages_blocks_doctor_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_doctor_grid_path_idx" ON "pages_blocks_doctor_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_product_collection_order_idx" ON "pages_blocks_product_collection" USING btree ("_order");
  CREATE INDEX "pages_blocks_product_collection_parent_id_idx" ON "pages_blocks_product_collection" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_product_collection_path_idx" ON "pages_blocks_product_collection" USING btree ("_path");
  CREATE INDEX "pages_blocks_pricing_grid_plans_features_order_idx" ON "pages_blocks_pricing_grid_plans_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_grid_plans_features_parent_id_idx" ON "pages_blocks_pricing_grid_plans_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_grid_plans_order_idx" ON "pages_blocks_pricing_grid_plans" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_grid_plans_parent_id_idx" ON "pages_blocks_pricing_grid_plans" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_grid_order_idx" ON "pages_blocks_pricing_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_grid_parent_id_idx" ON "pages_blocks_pricing_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_grid_path_idx" ON "pages_blocks_pricing_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_item_grid_items_order_idx" ON "pages_blocks_item_grid_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_item_grid_items_parent_id_idx" ON "pages_blocks_item_grid_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_item_grid_items_image_idx" ON "pages_blocks_item_grid_items" USING btree ("image_id");
  CREATE INDEX "pages_blocks_item_grid_order_idx" ON "pages_blocks_item_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_item_grid_parent_id_idx" ON "pages_blocks_item_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_item_grid_path_idx" ON "pages_blocks_item_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_products_id_idx" ON "pages_rels" USING btree ("products_id");
  CREATE INDEX "pages_rels_product_categories_id_idx" ON "pages_rels" USING btree ("product_categories_id");
  CREATE INDEX "blogs_tags_order_idx" ON "blogs_tags" USING btree ("_order");
  CREATE INDEX "blogs_tags_parent_id_idx" ON "blogs_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "blogs_slug_idx" ON "blogs" USING btree ("slug");
  CREATE INDEX "blogs_featured_image_idx" ON "blogs" USING btree ("featured_image_id");
  CREATE INDEX "blogs_author_idx" ON "blogs" USING btree ("author_id");
  CREATE INDEX "blogs_updated_at_idx" ON "blogs" USING btree ("updated_at");
  CREATE INDEX "blogs_created_at_idx" ON "blogs" USING btree ("created_at");
  CREATE INDEX "testimonials_image_idx" ON "testimonials" USING btree ("image_id");
  CREATE INDEX "testimonials_video_file_idx" ON "testimonials" USING btree ("video_file_id");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE INDEX "faqs_updated_at_idx" ON "faqs" USING btree ("updated_at");
  CREATE INDEX "faqs_created_at_idx" ON "faqs" USING btree ("created_at");
  CREATE INDEX "products_features_order_idx" ON "products_features" USING btree ("_order");
  CREATE INDEX "products_features_parent_id_idx" ON "products_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "products_slug_idx" ON "products" USING btree ("slug");
  CREATE INDEX "products_image_idx" ON "products" USING btree ("image_id");
  CREATE INDEX "products_updated_at_idx" ON "products" USING btree ("updated_at");
  CREATE INDEX "products_created_at_idx" ON "products" USING btree ("created_at");
  CREATE INDEX "products_rels_order_idx" ON "products_rels" USING btree ("order");
  CREATE INDEX "products_rels_parent_idx" ON "products_rels" USING btree ("parent_id");
  CREATE INDEX "products_rels_path_idx" ON "products_rels" USING btree ("path");
  CREATE INDEX "products_rels_product_categories_id_idx" ON "products_rels" USING btree ("product_categories_id");
  CREATE INDEX "products_rels_faqs_id_idx" ON "products_rels" USING btree ("faqs_id");
  CREATE UNIQUE INDEX "product_categories_slug_idx" ON "product_categories" USING btree ("slug");
  CREATE INDEX "product_categories_updated_at_idx" ON "product_categories" USING btree ("updated_at");
  CREATE INDEX "product_categories_created_at_idx" ON "product_categories" USING btree ("created_at");
  CREATE INDEX "homepage_settings_hero_slides_bullets_order_idx" ON "homepage_settings_hero_slides_bullets" USING btree ("_order");
  CREATE INDEX "homepage_settings_hero_slides_bullets_parent_id_idx" ON "homepage_settings_hero_slides_bullets" USING btree ("_parent_id");
  CREATE INDEX "homepage_settings_hero_slides_order_idx" ON "homepage_settings_hero_slides" USING btree ("_order");
  CREATE INDEX "homepage_settings_hero_slides_parent_id_idx" ON "homepage_settings_hero_slides" USING btree ("_parent_id");
  CREATE INDEX "homepage_settings_hero_slides_image_idx" ON "homepage_settings_hero_slides" USING btree ("image_id");
  CREATE INDEX "homepage_settings_service_categories_order_idx" ON "homepage_settings_service_categories" USING btree ("_order");
  CREATE INDEX "homepage_settings_service_categories_parent_id_idx" ON "homepage_settings_service_categories" USING btree ("_parent_id");
  CREATE INDEX "homepage_settings_service_categories_image_idx" ON "homepage_settings_service_categories" USING btree ("image_id");
  CREATE INDEX "homepage_settings_trust_badges_order_idx" ON "homepage_settings_trust_badges" USING btree ("_order");
  CREATE INDEX "homepage_settings_trust_badges_parent_id_idx" ON "homepage_settings_trust_badges" USING btree ("_parent_id");
  CREATE INDEX "homepage_settings_problems_section_problems_order_idx" ON "homepage_settings_problems_section_problems" USING btree ("_order");
  CREATE INDEX "homepage_settings_problems_section_problems_parent_id_idx" ON "homepage_settings_problems_section_problems" USING btree ("_parent_id");
  CREATE INDEX "homepage_settings_rent_or_buy_section_rent_benefits_order_idx" ON "homepage_settings_rent_or_buy_section_rent_benefits" USING btree ("_order");
  CREATE INDEX "homepage_settings_rent_or_buy_section_rent_benefits_parent_id_idx" ON "homepage_settings_rent_or_buy_section_rent_benefits" USING btree ("_parent_id");
  CREATE INDEX "homepage_settings_rent_or_buy_section_buy_benefits_order_idx" ON "homepage_settings_rent_or_buy_section_buy_benefits" USING btree ("_order");
  CREATE INDEX "homepage_settings_rent_or_buy_section_buy_benefits_parent_id_idx" ON "homepage_settings_rent_or_buy_section_buy_benefits" USING btree ("_parent_id");
  CREATE INDEX "homepage_settings_expert_doctors_section_doctors_order_idx" ON "homepage_settings_expert_doctors_section_doctors" USING btree ("_order");
  CREATE INDEX "homepage_settings_expert_doctors_section_doctors_parent_id_idx" ON "homepage_settings_expert_doctors_section_doctors" USING btree ("_parent_id");
  CREATE INDEX "homepage_settings_expert_doctors_section_doctors_image_idx" ON "homepage_settings_expert_doctors_section_doctors" USING btree ("image_id");
  CREATE INDEX "homepage_settings_before_after_section_stories_order_idx" ON "homepage_settings_before_after_section_stories" USING btree ("_order");
  CREATE INDEX "homepage_settings_before_after_section_stories_parent_id_idx" ON "homepage_settings_before_after_section_stories" USING btree ("_parent_id");
  CREATE INDEX "homepage_settings_before_after_section_stories_before_im_idx" ON "homepage_settings_before_after_section_stories" USING btree ("before_image_id");
  CREATE INDEX "homepage_settings_before_after_section_stories_after_ima_idx" ON "homepage_settings_before_after_section_stories" USING btree ("after_image_id");
  CREATE INDEX "homepage_settings_before_after_section_stories_patient_i_idx" ON "homepage_settings_before_after_section_stories" USING btree ("patient_image_id");
  CREATE INDEX "homepage_settings_our_story_section_team_badges_order_idx" ON "homepage_settings_our_story_section_team_badges" USING btree ("_order");
  CREATE INDEX "homepage_settings_our_story_section_team_badges_parent_id_idx" ON "homepage_settings_our_story_section_team_badges" USING btree ("_parent_id");
  CREATE INDEX "homepage_settings_our_story_section_team_education_order_idx" ON "homepage_settings_our_story_section_team_education" USING btree ("_order");
  CREATE INDEX "homepage_settings_our_story_section_team_education_parent_id_idx" ON "homepage_settings_our_story_section_team_education" USING btree ("_parent_id");
  CREATE INDEX "homepage_settings_our_story_section_team_experience_order_idx" ON "homepage_settings_our_story_section_team_experience" USING btree ("_order");
  CREATE INDEX "homepage_settings_our_story_section_team_experience_parent_id_idx" ON "homepage_settings_our_story_section_team_experience" USING btree ("_parent_id");
  CREATE INDEX "homepage_settings_our_story_section_team_order_idx" ON "homepage_settings_our_story_section_team" USING btree ("_order");
  CREATE INDEX "homepage_settings_our_story_section_team_parent_id_idx" ON "homepage_settings_our_story_section_team" USING btree ("_parent_id");
  CREATE INDEX "homepage_settings_our_story_section_team_image_idx" ON "homepage_settings_our_story_section_team" USING btree ("image_id");
  CREATE INDEX "homepage_settings_how_it_works_section_steps_order_idx" ON "homepage_settings_how_it_works_section_steps" USING btree ("_order");
  CREATE INDEX "homepage_settings_how_it_works_section_steps_parent_id_idx" ON "homepage_settings_how_it_works_section_steps" USING btree ("_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_leads_fk" FOREIGN KEY ("leads_id") REFERENCES "public"."leads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blogs_fk" FOREIGN KEY ("blogs_id") REFERENCES "public"."blogs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_product_categories_fk" FOREIGN KEY ("product_categories_id") REFERENCES "public"."product_categories"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_leads_id_idx" ON "payload_locked_documents_rels" USING btree ("leads_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_blogs_id_idx" ON "payload_locked_documents_rels" USING btree ("blogs_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_faqs_id_idx" ON "payload_locked_documents_rels" USING btree ("faqs_id");
  CREATE INDEX "payload_locked_documents_rels_products_id_idx" ON "payload_locked_documents_rels" USING btree ("products_id");
  CREATE INDEX "payload_locked_documents_rels_product_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("product_categories_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "services_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks_product_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks_product_collection" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks_pricing_grid_plans_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks_pricing_grid_plans" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks_pricing_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks_item_grid_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks_item_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "leads" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_feature_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_feature" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq_faq_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_testimonial_testimonial_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_testimonial" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_rich_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_product_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_steps_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_doctor_grid_doctors" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_doctor_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_product_collection" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_pricing_grid_plans_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_pricing_grid_plans" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_pricing_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_item_grid_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_item_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blogs_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blogs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "faqs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "product_categories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_settings_hero_slides_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_settings_hero_slides" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_settings_service_categories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_settings_trust_badges" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_settings_problems_section_problems" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_settings_rent_or_buy_section_rent_benefits" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_settings_rent_or_buy_section_buy_benefits" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_settings_expert_doctors_section_doctors" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_settings_before_after_section_stories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_settings_our_story_section_team_badges" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_settings_our_story_section_team_education" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_settings_our_story_section_team_experience" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_settings_our_story_section_team" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_settings_how_it_works_section_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_settings" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "services_features" CASCADE;
  DROP TABLE "services_blocks_product_grid" CASCADE;
  DROP TABLE "services_blocks_product_collection" CASCADE;
  DROP TABLE "services_blocks_pricing_grid_plans_features" CASCADE;
  DROP TABLE "services_blocks_pricing_grid_plans" CASCADE;
  DROP TABLE "services_blocks_pricing_grid" CASCADE;
  DROP TABLE "services_blocks_item_grid_items" CASCADE;
  DROP TABLE "services_blocks_item_grid" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "services_rels" CASCADE;
  DROP TABLE "leads" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_cta" CASCADE;
  DROP TABLE "pages_blocks_feature_features" CASCADE;
  DROP TABLE "pages_blocks_feature" CASCADE;
  DROP TABLE "pages_blocks_faq_faq_items" CASCADE;
  DROP TABLE "pages_blocks_faq" CASCADE;
  DROP TABLE "pages_blocks_testimonial_testimonial_items" CASCADE;
  DROP TABLE "pages_blocks_testimonial" CASCADE;
  DROP TABLE "pages_blocks_rich_text" CASCADE;
  DROP TABLE "pages_blocks_product_grid" CASCADE;
  DROP TABLE "pages_blocks_steps_steps" CASCADE;
  DROP TABLE "pages_blocks_steps" CASCADE;
  DROP TABLE "pages_blocks_doctor_grid_doctors" CASCADE;
  DROP TABLE "pages_blocks_doctor_grid" CASCADE;
  DROP TABLE "pages_blocks_product_collection" CASCADE;
  DROP TABLE "pages_blocks_pricing_grid_plans_features" CASCADE;
  DROP TABLE "pages_blocks_pricing_grid_plans" CASCADE;
  DROP TABLE "pages_blocks_pricing_grid" CASCADE;
  DROP TABLE "pages_blocks_item_grid_items" CASCADE;
  DROP TABLE "pages_blocks_item_grid" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "blogs_tags" CASCADE;
  DROP TABLE "blogs" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "faqs" CASCADE;
  DROP TABLE "products_features" CASCADE;
  DROP TABLE "products" CASCADE;
  DROP TABLE "products_rels" CASCADE;
  DROP TABLE "product_categories" CASCADE;
  DROP TABLE "homepage_settings_hero_slides_bullets" CASCADE;
  DROP TABLE "homepage_settings_hero_slides" CASCADE;
  DROP TABLE "homepage_settings_service_categories" CASCADE;
  DROP TABLE "homepage_settings_trust_badges" CASCADE;
  DROP TABLE "homepage_settings_problems_section_problems" CASCADE;
  DROP TABLE "homepage_settings_rent_or_buy_section_rent_benefits" CASCADE;
  DROP TABLE "homepage_settings_rent_or_buy_section_buy_benefits" CASCADE;
  DROP TABLE "homepage_settings_expert_doctors_section_doctors" CASCADE;
  DROP TABLE "homepage_settings_before_after_section_stories" CASCADE;
  DROP TABLE "homepage_settings_our_story_section_team_badges" CASCADE;
  DROP TABLE "homepage_settings_our_story_section_team_education" CASCADE;
  DROP TABLE "homepage_settings_our_story_section_team_experience" CASCADE;
  DROP TABLE "homepage_settings_our_story_section_team" CASCADE;
  DROP TABLE "homepage_settings_how_it_works_section_steps" CASCADE;
  DROP TABLE "homepage_settings" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_services_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_leads_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_pages_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_blogs_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_testimonials_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_faqs_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_products_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_product_categories_fk";
  
  DROP INDEX "payload_locked_documents_rels_services_id_idx";
  DROP INDEX "payload_locked_documents_rels_leads_id_idx";
  DROP INDEX "payload_locked_documents_rels_pages_id_idx";
  DROP INDEX "payload_locked_documents_rels_blogs_id_idx";
  DROP INDEX "payload_locked_documents_rels_testimonials_id_idx";
  DROP INDEX "payload_locked_documents_rels_faqs_id_idx";
  DROP INDEX "payload_locked_documents_rels_products_id_idx";
  DROP INDEX "payload_locked_documents_rels_product_categories_id_idx";
  ALTER TABLE "users" DROP COLUMN "enable_a_p_i_key";
  ALTER TABLE "users" DROP COLUMN "api_key";
  ALTER TABLE "users" DROP COLUMN "api_key_index";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "services_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "leads_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "pages_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "blogs_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "testimonials_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "faqs_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "products_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "product_categories_id";
  DROP TYPE "public"."enum_services_blocks_product_grid_display_mode";
  DROP TYPE "public"."enum_services_blocks_item_grid_columns";
  DROP TYPE "public"."enum_pages_blocks_hero_alignment";
  DROP TYPE "public"."enum_pages_blocks_cta_background_color";
  DROP TYPE "public"."enum_pages_blocks_product_grid_display_mode";
  DROP TYPE "public"."enum_pages_blocks_item_grid_columns";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum_testimonials_type";`)
}
