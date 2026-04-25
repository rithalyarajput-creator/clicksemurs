-- ============================================================
--  Clicksemurs Database Schema
--  Run this in MySQL / phpMyAdmin to set up the database
-- ============================================================

CREATE DATABASE IF NOT EXISTS clicksemurs_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE clicksemurs_db;

-- ── Leads from contact form ──────────────────────────────────
CREATE TABLE IF NOT EXISTS leads (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(100)  NOT NULL,
  email      VARCHAR(100)  NOT NULL,
  phone      VARCHAR(20),
  service    VARCHAR(100),
  message    TEXT          NOT NULL,
  is_read    TINYINT(1)    NOT NULL DEFAULT 0,
  created_at TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ── Blog posts ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS blogs (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  title        VARCHAR(200)  NOT NULL,
  slug         VARCHAR(200)  NOT NULL UNIQUE,
  category     VARCHAR(100),
  thumbnail    VARCHAR(255),
  content      LONGTEXT,
  is_published TINYINT(1)    NOT NULL DEFAULT 0,
  created_at   TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ── Testimonials ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS testimonials (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  client_name VARCHAR(100) NOT NULL,
  company     VARCHAR(100),
  review      TEXT         NOT NULL,
  rating      INT          NOT NULL DEFAULT 5,
  created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ── Portfolio / Case Studies ─────────────────────────────────
CREATE TABLE IF NOT EXISTS portfolio (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  client_name VARCHAR(100) NOT NULL,
  industry    VARCHAR(100),
  challenge   TEXT,
  solution    TEXT,
  result      TEXT,
  created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ── Admin users ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS admin_users (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  username   VARCHAR(50)  NOT NULL UNIQUE,
  password   VARCHAR(255) NOT NULL,
  created_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ── Site settings ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS settings (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  setting_key   VARCHAR(100) NOT NULL UNIQUE,
  setting_value TEXT
) ENGINE=InnoDB;


-- ============================================================
--  Seed Data
-- ============================================================

-- Default admin user (username: admin | password: Admin@123)
-- Password hash is for: Admin@123
INSERT INTO admin_users (username, password) VALUES
('admin', '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi')
ON DUPLICATE KEY UPDATE username = username;

-- Site settings
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
ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value);

-- Seed Testimonials
INSERT INTO testimonials (client_name, company, review, rating) VALUES
('Rahul Sharma',  'CEO, TechSpark Solutions',      'Clicksemurs transformed our digital presence completely. Within 6 months, our organic traffic tripled and our leads doubled. They are not just an agency — they are a true growth partner.', 5),
('Priya Mehta',   'Founder, StyleHouse Fashion',   'We worked with several agencies before Clicksemurs, and the difference is night and day. They actually understand our business, deliver on time, and the results are incredible. Our ROI went up by 400% in 8 months.', 5),
('Amit Khanna',   'Director, GreenBuild Infra',    'The Clicksemurs team is exceptional. Their 360° approach meant we did not have to manage multiple vendors. Everything — from our website to social media to Google Ads — was handled perfectly.', 5);

-- Seed Portfolio
INSERT INTO portfolio (client_name, industry, challenge, solution, result) VALUES
('TechSpark Solutions',   'Technology',     'Low organic traffic and poor search visibility',            'Full SEO overhaul + content strategy + technical fixes',      '300% organic traffic increase in 6 months'),
('StyleHouse Fashion',    'Fashion',        'High ad spend with very low ROAS on Meta Ads',              'Audience restructure + creative A/B testing + retargeting',   '400% ROI improvement in 8 months'),
('GreenBuild Infrastructure', 'Real Estate','No digital presence and zero online lead generation',       'Full website design + SEO + Google Ads launch',               '120+ qualified leads per month from zero');

-- Seed Blog Posts
INSERT INTO blogs (title, slug, category, content, is_published) VALUES
('10 SEO Tips That Will Dominate Google in 2024', 'seo-tips-2024', 'SEO',
'Search engine optimization continues to evolve. Here are 10 proven strategies that are driving results right now.\n\n## 1. Prioritize Core Web Vitals\nGoogle rewards fast, stable, responsive websites.\n\n## 2. Focus on Search Intent\nMatch your content to what users actually want.\n\n## 3. Build Topical Authority\nCreate interconnected content clusters, not isolated posts.\n\n## 4. Optimize for Featured Snippets\nUse Q&A formats and numbered lists.\n\n## 5. Leverage AI Content Responsibly\nAdd human expertise and original insights to everything.\n\n## 6. Master Local SEO\nOptimize Google My Business and build local citations.\n\n## 7. Build High-Authority Backlinks\nOne link from DA 70+ beats 100 low-quality links.\n\n## 8. Optimize for Voice Search\nUse conversational, long-tail keywords.\n\n## 9. Technical SEO Fundamentals\nClean URLs, proper canonicals, XML sitemaps, structured data.\n\n## 10. Track and Iterate\nMeasure everything. Adjust monthly based on real data.',
1),
('The Complete Guide to Meta Ads for E-Commerce in 2024', 'meta-ads-guide', 'Paid Ads',
'Meta Ads remain one of the most powerful tools for e-commerce businesses. Here is how to structure your campaigns for maximum ROAS.\n\n## Understanding Campaign Structure\nOrganize by awareness, consideration, and conversion objectives.\n\n## Audience Strategy\nBuild custom audiences from your customer list, then create lookalikes.\n\n## Creative Testing\nTest 3-5 creative variants per ad set. Let data decide the winner.\n\n## Retargeting\nTarget website visitors, add-to-cart abandoners, and past purchasers separately.\n\n## Scaling\nOnce you find a winning combination, scale budgets by 20% every 3 days.',
1);
