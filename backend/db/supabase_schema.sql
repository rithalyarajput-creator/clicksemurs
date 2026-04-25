-- ============================================================
--  Clicksemurs — Supabase Schema
--  Run this in Supabase SQL Editor
-- ============================================================

-- Leads from contact form
CREATE TABLE IF NOT EXISTS leads (
  id         BIGSERIAL PRIMARY KEY,
  name       VARCHAR(100)  NOT NULL,
  email      VARCHAR(100)  NOT NULL,
  phone      VARCHAR(20),
  service    VARCHAR(100),
  message    TEXT          NOT NULL,
  is_read    BOOLEAN       NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- Blog posts
CREATE TABLE IF NOT EXISTS blogs (
  id           BIGSERIAL PRIMARY KEY,
  title        VARCHAR(200)  NOT NULL,
  slug         VARCHAR(200)  NOT NULL UNIQUE,
  category     VARCHAR(100),
  thumbnail    VARCHAR(255),
  content      TEXT,
  is_published BOOLEAN       NOT NULL DEFAULT false,
  created_at   TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id          BIGSERIAL PRIMARY KEY,
  client_name VARCHAR(100) NOT NULL,
  company     VARCHAR(100),
  review      TEXT         NOT NULL,
  rating      INT          NOT NULL DEFAULT 5,
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Portfolio / Case Studies
CREATE TABLE IF NOT EXISTS portfolio (
  id          BIGSERIAL PRIMARY KEY,
  client_name VARCHAR(100) NOT NULL,
  industry    VARCHAR(100),
  challenge   TEXT,
  solution    TEXT,
  result      TEXT,
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Site settings
CREATE TABLE IF NOT EXISTS settings (
  id            BIGSERIAL PRIMARY KEY,
  setting_key   VARCHAR(100) NOT NULL UNIQUE,
  setting_value TEXT
);

-- ============================================================
--  Seed Data
-- ============================================================

INSERT INTO settings (setting_key, setting_value) VALUES
('phone',     '+91 XXXXX XXXXX'),
('email',     'hello@clicksemurs.com'),
('address',   'India'),
('whatsapp',  '91XXXXXXXXXX'),
('facebook',  '#'),
('instagram', '#'),
('linkedin',  '#'),
('youtube',   '#'),
('twitter',   '#')
ON CONFLICT (setting_key) DO NOTHING;

INSERT INTO testimonials (client_name, company, review, rating) VALUES
('Rahul Sharma',  'CEO, TechSpark Solutions',      'Clicksemurs transformed our digital presence completely. Within 6 months, our organic traffic tripled and our leads doubled. They are not just an agency — they are a true growth partner.', 5),
('Priya Mehta',   'Founder, StyleHouse Fashion',   'We worked with several agencies before Clicksemurs, and the difference is night and day. They actually understand our business, deliver on time, and the results are incredible. Our ROI went up by 400% in 8 months.', 5),
('Amit Khanna',   'Director, GreenBuild Infra',    'The Clicksemurs team is exceptional. Their 360° approach meant we did not have to manage multiple vendors. Everything — from our website to social media to Google Ads — was handled perfectly.', 5);

INSERT INTO portfolio (client_name, industry, challenge, solution, result) VALUES
('TechSpark Solutions',       'Technology',  'Low organic traffic and poor search visibility',       'Full SEO overhaul + content strategy + technical fixes',    '300% organic traffic increase in 6 months'),
('StyleHouse Fashion',        'Fashion',     'High ad spend with very low ROAS on Meta Ads',         'Audience restructure + creative A/B testing + retargeting', '400% ROI improvement in 8 months'),
('GreenBuild Infrastructure', 'Real Estate', 'No digital presence and zero online lead generation',  'Full website design + SEO + Google Ads launch',             '120+ qualified leads per month from zero');

INSERT INTO blogs (title, slug, category, content, is_published) VALUES
('10 SEO Tips That Will Dominate Google in 2024', 'seo-tips-2024', 'SEO',
'Search engine optimization continues to evolve. Here are 10 proven strategies driving results right now.

## 1. Prioritize Core Web Vitals
Google rewards fast, stable, responsive websites.

## 2. Focus on Search Intent
Match your content to what users actually want.

## 3. Build Topical Authority
Create interconnected content clusters, not isolated posts.

## 4. Optimize for Featured Snippets
Use Q&A formats and numbered lists.

## 5. Leverage AI Content Responsibly
Add human expertise and original insights to everything.

## 6. Master Local SEO
Optimize Google My Business and build local citations.

## 7. Build High-Authority Backlinks
One link from DA 70+ beats 100 low-quality links.

## 8. Optimize for Voice Search
Use conversational, long-tail keywords.

## 9. Technical SEO Fundamentals
Clean URLs, proper canonicals, XML sitemaps, structured data.

## 10. Track and Iterate
Measure everything. Adjust monthly based on real data.', true),
('The Complete Guide to Meta Ads for E-Commerce in 2024', 'meta-ads-guide', 'Paid Ads',
'Meta Ads remain one of the most powerful tools for e-commerce businesses.

## Understanding Campaign Structure
Organize by awareness, consideration, and conversion objectives.

## Audience Strategy
Build custom audiences from your customer list, then create lookalikes.

## Creative Testing
Test 3-5 creative variants per ad set. Let data decide the winner.

## Retargeting
Target website visitors, add-to-cart abandoners, and past purchasers separately.

## Scaling
Once you find a winning combination, scale budgets by 20% every 3 days.', true);

-- ============================================================
--  RLS Policies (Row Level Security)
--  Allow public read for blogs, testimonials, portfolio, settings
--  Allow public insert for leads (contact form)
--  Admin panel uses service role key (bypass RLS)
-- ============================================================

ALTER TABLE leads        ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs        ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio    ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings     ENABLE ROW LEVEL SECURITY;

-- Public can read published blogs
CREATE POLICY "public read blogs" ON blogs FOR SELECT USING (is_published = true);

-- Public can read testimonials
CREATE POLICY "public read testimonials" ON testimonials FOR SELECT USING (true);

-- Public can read portfolio
CREATE POLICY "public read portfolio" ON portfolio FOR SELECT USING (true);

-- Public can read settings
CREATE POLICY "public read settings" ON settings FOR SELECT USING (true);

-- Public can insert leads (contact form)
CREATE POLICY "public insert leads" ON leads FOR INSERT WITH CHECK (true);

-- Admin panel full access — use SERVICE ROLE KEY in admin (bypass RLS)
