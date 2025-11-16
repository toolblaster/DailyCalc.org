# DailyCalc.org

DailyCalc.org is an evergreen, SEO-first platform designed to host daily-use calculators across every major life category. The initial release focuses on establishing a trustworthy .org brand presence, a clean expandable homepage, and a high-performance foundation that can grow one calculator at a time.

## 🎯 Project Goals
- Communicate trust, clarity, and professionalism from the first visit
- Deliver a lightweight, fast-loading homepage optimised for Google and users alike
- Provide a scalable navigation and content model for future calculators and subcategories
- Reserve unobtrusive, AdSense-ready placements without compromising UX

## ✅ Current Features
- **Brand-forward hero section** with tagline, calls to action, and key brand pillars
- **Primary category grid** covering nine life segments with expandable subcategory previews
- **Featured calculators panel** highlighting roadmap priorities and user suggestions
- **Vision & roadmap sections** that communicate the platform’s mission and phased rollout
- **AdSense-ready placeholder** with messaging on non-intrusive advertising strategy
- **FAQ and newsletter signup** to support SEO, email capture, and community feedback loops
- **Responsive, centered layout** capped at 1050px width for consistent readability
- **Tailwind + vanilla JS enhancements** (subcategory toggle, dynamic year, inline feedback)
- **Schema.org Organization markup** to support search visibility and rich results

## 🌐 Entry Points
| Path | Description |
| --- | --- |
| `/` | Homepage showcasing DailyCalc.org vision, categories, roadmap, and newsletter signup |

## 🧱 Architecture & Technology
- **HTML5 + semantic structure** for accessibility and SEO strength
- **Tailwind CSS (CDN)** with custom fonts (Inter, Poppins) and brand colour tokens
- **Vanilla JavaScript (`js/main.js`)** for lightweight interactivity
- **Font Awesome (CDN)** for consistent, recognisable category icons

## 📊 Data Models & Storage
No persistent data models are in use yet. The current build is static and does not connect to external APIs or tables. Future calculators can leverage the provided RESTful Table API when interactive data storage is required.

## 🚧 Features Not Yet Implemented
- Individual calculator landing pages and computation logic
- Calculator detail templates (SEO-rich with FAQs, breadcrumbs, structured data)
- Blog/insights content to support category SEO
- Multi-language/localisation support
- User analytics, feedback forms, or integrations beyond the static newsletter UI

## 🔜 Recommended Next Steps
1. **Ship the first calculator** (e.g., Mortgage Affordability) with a dedicated page template
2. **Stand-up calculator schema** via the RESTful Table API for storing roadmap requests or contacts
3. **Integrate privacy-friendly analytics** to track usage and prioritise future tools
4. **Refine newsletter flow** (connect to email service, add confirmation handling)
5. **Develop content guidelines** for calculator copy, metadata, and accessibility checks
6. **Test AdSense placements** once traffic is validated to ensure minimal UX impact

## 📣 Brand & Content Guidelines
- Voice: Neutral, helpful, global, trustworthy
- Colours: Black (#050505) and red accent (#F1203D) with high-contrast neutrals
- Typography: Inter for body text, Poppins for headings
- Layout: Max width 1050px, centered, generous whitespace, minimal clutter
- Imagery: Clean iconography, no distracting backgrounds or heavy media

## 🚀 Deployment
To deploy your website and make it live, please go to the **Publish** tab where you can publish your project with one click. The Publish tab will handle all deployment processes automatically and provide you with the live website URL.

## 📬 Contact
For requests, partnerships, or feedback, reach out via `hello@dailycalc.org` as featured in the footer.
