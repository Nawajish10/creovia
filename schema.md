# Axcrivo — Website Schema

> **Domain:** [axcrivo.in](https://www.axcrivo.in) · **Stack:** Next.js 16, React 19, Supabase, Tailwind CSS v4

---

## 🗺️ Site Routes

| Route | Type | Priority | Description |
|---|---|---|---|
| `/` | Public Page | 1.0 | Homepage — Hero, Features, How it works |
| `/valuation` | Public Page | 0.9 | Free creator asset valuation form |
| `/sell` | Public Page | 0.8 | Seller listing form |
| `/buy` | Public Page | 0.8 | Buyer interest form |
| `/about` | Public Page | 0.6 | About / Team / Mission |
| `/resources` | Public Page | 0.7 | Blog / Resource listing |
| `/resources/[slug]` | Dynamic Page | 0.6 | Individual resource/blog post |
| `/privacy` | Public Page | — | Privacy policy |
| `/admin/login` | Auth Page | — | Admin credential login |
| `/admin` | Protected Page | — | Admin dashboard (leads overview) |
| `/admin/leads` | Protected Page | — | Leads management (Valuation / Sellers / Buyers tabs) |

---

## 🗄️ Database Schema (Supabase)

### Table: `valuation_requests`

Stores free valuation form submissions.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key (auto) |
| `name` | text | Submitter's name |
| `email` | text | Contact email |
| `phone` | text | Phone number (7–20 chars) |
| `platform` | text | Instagram / YouTube / Telegram / etc. |
| `audience_size` | integer | Number of followers/subscribers |
| `engagement_rate` | float | 0–100% |
| `country` | text | Audience geography |
| `monthly_revenue` | float | Current monthly revenue |
| `asking_price` | float | Optional expected price |
| `niche` | text | Optional content niche |
| `asset_url` | text | Optional profile/channel URL |
| `created_at` | timestamptz | Auto-set by Supabase |

---

### Table: `seller_leads`

Stores full seller listing submissions.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key (auto) |
| `name` | text | Seller's name |
| `email` | text | Contact email |
| `phone` | text | Phone number |
| `platform` | text | Asset platform |
| `asset_url` | text | Optional profile URL |
| `niche` | text | Content niche |
| `country` | text | Audience geography |
| `asset_age` | text | How old the asset is |
| `audience_size` | integer | Followers/subscribers |
| `monthly_reach` | text | Monthly reach / traffic |
| `revenue_last_12_months` | float | Total revenue (12 months) |
| `average_monthly_profit` | float | Average monthly profit |
| `monthly_revenue` | float | Derived: `revenue_last_12_months / 12` |
| `asking_price` | float | Seller's expected price |
| `screenshot_url` | text | Legacy fallback for analytics URL |
| `analytics_image_path` | text | Supabase Storage path |
| `analytics_signed_url` | text | 1-year signed access URL |
| `analytics_file_name` | text | Original file name |
| `analytics_file_size` | integer | File size in bytes |
| `analytics_uploaded_at` | timestamptz | Upload timestamp |
| `reason_for_selling` | text | Optional seller motivation |
| `ownership_confirmed` | boolean | Must be `true` to submit |
| `monetization_status` | text | Comma-separated monetization types |
| `created_at` | timestamptz | Auto-set by Supabase |

---

### Table: `buyer_leads`

Stores buyer interest form submissions.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key (auto) |
| `name` | text | Buyer's name |
| `email` | text | Contact email |
| `phone` | text | Optional phone number |
| `budget` | float | Buyer's budget (USD) |
| `platform` | text | Preferred platform |
| `niche` | text | Optional niche preference |
| `country_preference` | text | Optional audience country preference |
| `created_at` | timestamptz | Auto-set by Supabase |

---

### Table: `newsletter_subscribers`

Stores newsletter email sign-ups.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key (auto) |
| `email` | text | Subscriber email |
| `source` | text | Origin of signup (default: `"newsletter"`) |
| `created_at` | timestamptz | Auto-set by Supabase |

---

## 🪣 Storage Buckets (Supabase)

| Bucket | Path Pattern | Purpose |
|---|---|---|
| `analytics-screenshots` | `screenshots/{timestamp}-{random}.{ext}` | Seller analytics/dashboard screenshots |

**Constraints:** Max 5MB · Allowed types: PNG, JPG, JPEG, WEBP · Signed URL expiry: 1 year

---

## 🔌 API Endpoints

| Method | Route | Auth | Description |
|---|---|---|---|
| `POST` | `/api/upload` | None (service role server-side) | Uploads analytics screenshot to Supabase Storage, returns signed URL |

---

## ⚡ Server Actions (`/app/actions/`)

| Action | Table Written | Description |
|---|---|---|
| `submitValuationLead()` | `valuation_requests` | Validates & inserts valuation form |
| `submitSellerLead()` | `seller_leads` | Validates & inserts seller listing |
| `submitBuyerLead()` | `buyer_leads` | Validates & inserts buyer interest |
| `submitNewsletterSubscriber()` | `newsletter_subscribers` | Adds email subscriber |
| `verifyCredentials()` | — | Validates admin username + password (rate-limited, 5 attempts / 15 min lockout) |
| `verifyPasscode()` | — | Validates admin OTP passcode, sets 24h session cookie |
| `logout()` | — | Clears admin session cookies |

---

## 🔐 Authentication System

> Admin-only, **not** Supabase Auth — custom cookie-based system.

```
/admin/login (Step 1)
  → verifyCredentials() — env: ADMIN_USERNAME, ADMIN_PASSWORD
  ↓ success
/admin/login (Step 2)
  → verifyPasscode() — env: ADMIN_PASSCODE
  ↓ success
  → Sets HttpOnly cookies: admin_session + admin_session_valid (24h)
  ↓
/admin/* (Protected via cookie middleware check)
```

**Rate limiting:** In-memory · 5 failed attempts → 15-minute lockout

---

## 📋 Form Validation Schemas (Zod)

### `valuationSchema` → `valuation_requests`
```
name, email, phone, platform, audience_size, engagement_rate,
country, monthly_revenue, asking_price?, niche?, asset_url?
+ honeypot: website (must be empty)
```

### `sellerSchema` → `seller_leads`
```
name, email, phone, platform, niche, country, asset_age,
audience_size, monthly_reach, revenue_last_12_months?,
average_monthly_profit?, asking_price, analytics_image_path,
analytics_signed_url?, analytics_file_name?, analytics_file_size?,
reason_for_selling?, ownership_confirmed (must be true),
monetization_status[] (min 1), asset_url?
+ honeypot: website (must be empty)
```

### `buyerSchema` → `buyer_leads`
```
name, email, phone?, budget, platform, niche?, country_preference?
+ honeypot: website (must be empty)
```

---

## 🧩 Feature Modules (`/src/features/`)

| Module | Description |
|---|---|
| `home` | Homepage sections (Hero, Features, How it Works, CTA) |
| `about` | About page sections (Team, Vision, Mission) |
| `sell` | Seller form flow & multi-step UI |
| `buy` | Buyer interest form |
| `valuation` | Valuation request form |
| `marketplace` | Browse/listing marketplace UI |
| `resources` | Blog/resource listing & detail views |
| `dashboard` | User-facing dashboard components |
| `admin` | Admin panel UI components |
| `authentication` | Login page UI |
| `escrow` | Escrow flow components |
| `transactions` | Transaction history components |
| `verification` | Asset verification UI |

---

## 📊 Data Flow Diagram

```mermaid
flowchart TD
    U([User]) -->|Fills Form| F[Next.js Page\n/valuation · /sell · /buy]
    F -->|Server Action| SA[Server Action\nleads.ts]
    SA -->|Zod Validation| ZV{Valid?}
    ZV -->|No| ERR[Return Error to UI]
    ZV -->|Yes| DB[(Supabase\nDatabase)]
    DB --> T1[valuation_requests]
    DB --> T2[seller_leads]
    DB --> T3[buyer_leads]
    DB --> T4[newsletter_subscribers]

    F2[Sell Form\n/sell] -->|File Upload| API[POST /api/upload]
    API -->|PNG/JPG/WEBP ≤5MB| S3[(Supabase Storage\nanalytics-screenshots)]
    S3 -->|Signed URL 1yr| API
    API -->|signedUrl + filePath| F2

    A([Admin]) -->|Login| AL[/admin/login]
    AL -->|verifyCredentials + verifyPasscode| CK[HttpOnly Cookie\n24h session]
    CK -->|Authorized| AD[/admin/leads]
    AD -->|SELECT *| DB
    AD -->|Re-generate Signed URLs| S3
```

---

## 🌐 Third-Party Integrations

| Service | Purpose | Config Key |
|---|---|---|
| **Supabase** | Database + Storage + Auth | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` |
| **Google Analytics 4** | Page tracking | `G-5YW9B6X9NX` (hardcoded in layout) |
| **Microsoft Clarity** | Heatmaps / session recording | `NEXT_PUBLIC_CLARITY_ID` |
| **Resend** | Email notifications for leads | `RESEND_API_KEY` |
| **Google Fonts** | Material Symbols icon font | CDN loaded in `<head>` |

---

## 📁 Key File Map

| File | Purpose |
|---|---|
| [layout.tsx](file:///c:/Users/Afreen/OneDrive/Desktop/socialXchange/src/app/layout.tsx) | Root layout — GA tag, fonts, Navbar, Footer |
| [supabase.ts](file:///c:/Users/Afreen/OneDrive/Desktop/socialXchange/src/lib/supabase.ts) | Supabase client (anon + service role) |
| [schemas.ts](file:///c:/Users/Afreen/OneDrive/Desktop/socialXchange/src/lib/schemas.ts) | Zod validation schemas for all 3 lead forms |
| [leads.ts](file:///c:/Users/Afreen/OneDrive/Desktop/socialXchange/src/app/actions/leads.ts) | Server actions — DB inserts for all lead types |
| [admin-auth.ts](file:///c:/Users/Afreen/OneDrive/Desktop/socialXchange/src/app/actions/admin-auth.ts) | Admin login/logout with rate limiting |
| [route.ts](file:///c:/Users/Afreen/OneDrive/Desktop/socialXchange/src/app/api/upload/route.ts) | File upload API → Supabase Storage |
| [sitemap.ts](file:///c:/Users/Afreen/OneDrive/Desktop/socialXchange/src/app/sitemap.ts) | Auto-generated XML sitemap |
