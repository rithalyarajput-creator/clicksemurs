# CLICKSEMURS — 360° Digital Marketing Agency Website

> **Grow. Dominate. Lead.**

Full-stack website for **Clicksemurs**, a 360° Digital Marketing Agency.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js + Vite |
| Styling | Tailwind CSS v3 |
| Icons | React Icons |
| Routing | React Router v6 |
| Backend | PHP (Core PHP) |
| Database | MySQL / MariaDB |
| Admin Panel | PHP — fully custom |

---

## Project Structure

```
clicksemurs/
├── src/                    React frontend source
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── PageHero.jsx
│   │   └── WhatsAppButton.jsx
│   ├── data/
│   │   └── services.js     All 10 service definitions
│   └── pages/
│       ├── Home.jsx
│       ├── About.jsx
│       ├── Services.jsx
│       ├── ServiceDetail.jsx   Dynamic — all 10 services
│       ├── Portfolio.jsx
│       ├── Industries.jsx
│       ├── Blog.jsx
│       ├── BlogPost.jsx
│       ├── Pricing.jsx
│       └── Contact.jsx
│
├── backend/
│   ├── api/
│   │   ├── contact.php         POST — saves leads to DB
│   │   ├── blogs.php           GET  — published blog posts
│   │   ├── testimonials.php    GET  — testimonials
│   │   ├── portfolio.php       GET  — case studies
│   │   └── settings.php        GET  — site settings
│   ├── admin/
│   │   ├── login.php
│   │   ├── index.php           Dashboard
│   │   ├── leads.php           Leads + CSV export
│   │   ├── blogs.php           Blog CRUD
│   │   ├── testimonials.php    Testimonials CRUD
│   │   ├── portfolio.php       Case Studies CRUD
│   │   └── settings.php        Site Settings
│   └── db/
│       ├── config.php          PDO DB connection
│       └── schema.sql          Full MySQL schema + seed data
│
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## Website Pages

| Route | Page |
|-------|------|
| `/` | Home — Hero, Stats, Services, Why Us, Testimonials, CTA |
| `/about` | About Us — Story, Vision/Mission, Values, Team |
| `/services` | All 10 Services Grid |
| `/services/:slug` | Individual Service Detail (dynamic) |
| `/portfolio` | Case Studies with industry filters |
| `/industries` | 12 Industries We Serve |
| `/blog` | Blog listing with category filters |
| `/blog/:slug` | Single Blog Post |
| `/pricing` | 3 Pricing Plans (Starter / Growth / Enterprise) |
| `/contact` | Contact Form + WhatsApp + Maps |

---

## Admin Panel

| URL | Module |
|-----|--------|
| `/admin/login.php` | Login |
| `/admin/index.php` | Dashboard — stats overview |
| `/admin/leads.php` | All leads + CSV export + mark read |
| `/admin/blogs.php` | Blog CRUD + publish/draft toggle |
| `/admin/testimonials.php` | Add/Edit/Delete testimonials |
| `/admin/portfolio.php` | Case Studies management |
| `/admin/settings.php` | Contact info + social media links |

**Default credentials:** `admin` / `Admin@123`

---

## Brand Colors

| Name | Hex |
|------|-----|
| Primary Black | `#111111` |
| Dark Background | `#0A0A0A` |
| Card Dark | `#1E1E1E` |
| Border | `#2E2E2E` |
| Light Section | `#F4F4F4` |
| Muted Text | `#777777` |

**Font:** Inter (Google Fonts)

---

## Local Setup

### 1. Database
```bash
# Import schema into MySQL
mysql -u root < backend/db/schema.sql
```

### 2. Backend
- Copy `backend/` to XAMPP htdocs: `C:/xampp/htdocs/clicksemurs/`
- Update DB credentials in `backend/db/config.php`
- Access admin: `http://localhost/clicksemurs/admin/login.php`

### 3. Frontend
```bash
npm install
npm run dev        # Development: http://localhost:5173
npm run build      # Production build → dist/
```

---

## Deployment

### Frontend → Vercel
1. Connect this repo to Vercel
2. Framework: **Vite**
3. Build command: `npm run build`
4. Output dir: `dist`
5. Add env variable: `VITE_API_URL=https://your-backend-url`

### Backend → Railway / any PHP host
1. Upload `backend/` folder
2. Import `backend/db/schema.sql`
3. Update `backend/db/config.php` with production DB credentials

---

## Services Offered

1. Social Media Marketing
2. SEO (Search Engine Optimization)
3. PPC / Paid Ads
4. Website Design & Development
5. Content Marketing
6. Video Marketing & Production
7. Email Marketing & Automation
8. Online Reputation Management (ORM)
9. Influencer Marketing
10. Analytics & Performance Marketing

---

**www.clicksemurs.com · hello@clicksemurs.com · Grow. Dominate. Lead.**
