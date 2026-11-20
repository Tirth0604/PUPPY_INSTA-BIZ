-- Run with an authorized Supabase migration role, never an anonymous client.
CREATE TABLE public.puppies (
 id uuid PRIMARY KEY, slug text UNIQUE NOT NULL, name text NOT NULL, breed text NOT NULL,
 gender text NOT NULL, age_display text NOT NULL, origin text NOT NULL CHECK(origin IN ('local','imported')),
 status text NOT NULL CHECK(status IN ('available','adopted')), description text NOT NULL DEFAULT '',
 cover_image text NOT NULL, featured boolean NOT NULL DEFAULT false, sort_order integer NOT NULL,
 created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX puppies_filters ON public.puppies(status,origin,breed,sort_order);
CREATE TABLE public.puppy_media(id text PRIMARY KEY,puppy_id uuid REFERENCES public.puppies(id) ON DELETE CASCADE,media_type text CHECK(media_type IN ('image','video')),media_url text NOT NULL,thumbnail_url text,alt_text text NOT NULL,sort_order integer NOT NULL);
CREATE INDEX puppy_media_order ON public.puppy_media(puppy_id,sort_order);
CREATE TABLE public.family_gallery(id text PRIMARY KEY,image_url text NOT NULL,caption text NOT NULL DEFAULT '',alt_text text NOT NULL,sort_order integer NOT NULL);
CREATE TABLE public.faqs(id uuid PRIMARY KEY,question text NOT NULL,answer text NOT NULL,sort_order integer NOT NULL);
CREATE TABLE public.enquiries(id uuid PRIMARY KEY,name text NOT NULL,phone text NOT NULL,email text NOT NULL DEFAULT '',area text NOT NULL DEFAULT '',puppy_id uuid REFERENCES public.puppies(id),message text NOT NULL DEFAULT '',source_page text NOT NULL,status text NOT NULL DEFAULT 'new',request_key uuid UNIQUE NOT NULL,fingerprint text UNIQUE NOT NULL,created_at timestamptz NOT NULL DEFAULT now());
CREATE INDEX enquiries_created_at ON public.enquiries(created_at);
CREATE TABLE public.enquiry_rate_limits(key text PRIMARY KEY,count integer NOT NULL,expires_at timestamptz NOT NULL);
CREATE INDEX enquiry_rate_limits_expiry ON public.enquiry_rate_limits(expires_at);
ALTER TABLE public.puppies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.puppy_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.family_gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiry_rate_limits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public puppy reads" ON public.puppies FOR SELECT USING(true);
CREATE POLICY "public media reads" ON public.puppy_media FOR SELECT USING(true);
CREATE POLICY "public family reads" ON public.family_gallery FOR SELECT USING(true);
CREATE POLICY "public faq reads" ON public.faqs FOR SELECT USING(true);
REVOKE ALL ON public.enquiries,public.enquiry_rate_limits FROM anon,authenticated;
-- No public enquiry read/write policies. Server-only DB connection performs validated writes.
