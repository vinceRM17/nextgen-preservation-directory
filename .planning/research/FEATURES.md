# Feature Landscape

**Domain:** Professional/Community Directory (Historic Preservation Stakeholders)
**Researched:** 2026-02-12
**Confidence:** MEDIUM

## Table Stakes

Features users expect. Missing = product feels incomplete.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Basic Listing Information** | All directories display name, contact info, category, location | Low | Name, email, phone, address, website, category/role, specialties. NAP (Name, Address, Phone) consistency critical for SEO. |
| **Search & Filter** | Users expect to narrow results by criteria | Medium | Search by keyword, filter by category/role, filter by specialty/skills, location-based filtering. Multi-criteria filtering is standard. |
| **Interactive Map View** | Location-based directories always have maps | Medium | Geolocation pins for each listing, clustering when pins are close together, click pin for listing details, mobile-friendly touch navigation. |
| **Mobile Responsive Design** | 70%+ traffic is mobile in 2026 | Medium | Mobile-first design is non-negotiable. Users expect fast load, touch-friendly UI, readable text without zooming. Must pass Core Web Vitals. |
| **Rich Profiles** | Incomplete profiles get 70% less engagement | Medium | Detailed descriptions (150+ words), high-quality images/logo, business hours (if applicable), services/specialties list. |
| **Contact/Inquiry Forms** | Users need to reach stakeholders directly | Low | Email contact form, optional phone display, spam protection, mobile-friendly form fields. |
| **Admin Approval Workflow** | Quality control for public-facing directories | Medium | Submission form for new listings, admin review/approve/reject, edit requests from listing owners, moderation queue. |
| **Accessibility (WCAG 2.1 AA)** | Legal requirement by April 2026 for many orgs | High | Alt text for images, 4.5:1 contrast ratio, keyboard navigation, captions for video. Testing requires both automated tools (30%) and manual review (70%). |
| **SEO Basics** | Users expect to find directory via search | Medium | Clean URLs, meta descriptions, heading hierarchy, fast page load, LocalBusiness schema markup (JSON-LD format). |
| **Category/Role Organization** | Users browse by stakeholder type | Low | Clear taxonomy: builders, craftspeople, architects, developers, investors, advocates, government, nonprofits, educators. Filterable categories. |

## Differentiators

Features that set product apart. Not expected, but valued.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Project Portfolio Showcase** | Historic preservation = visual proof of work | Medium | Photo galleries per stakeholder, before/after images, project descriptions (sq ft, scope), filterable by project type. Establishes credibility and differentiates from generic directories. |
| **Verified Listings** | Trust signal in specialized industry | Medium | Admin verification process, verified badge display, higher search ranking for verified listings. AI systems recognize verification badges as trust signals. |
| **Specialties/Skills Taxonomy** | Historic preservation has niche skills | Medium | Granular skill tags (e.g., "slate roofing," "historic window restoration," "Victorian millwork"), multi-select filtering, skill-based search. |
| **Neighborhood/Project Map** | Shows local coverage & experience | Medium | Display projects on map, filter listings by "has worked in [neighborhood]," proximity search from address. |
| **AI-Powered Stakeholder Matching** | Emerging in 2026 directories | High | "Find best fit for my project" wizard, automated business matching based on criteria, predictive lead scoring. Consider for v2+. |
| **Claim & Manage Listing** | Empowers stakeholders to maintain accuracy | Medium | Stakeholders can claim existing listings, self-serve profile updates (pending approval), notification of pending edits. |
| **Rich Structured Data** | Future-proofs for AI/voice search | Low | Comprehensive schema markup (LocalBusiness, Organization, Service), optimized for voice assistants (Siri, Alexa, Google), increases visibility in AI answer engines. |
| **Export/Share Features** | Helps users save & share findings | Low | Print-friendly listing view, email listing to friend, bookmark/save for later, generate PDF of filtered results. |
| **Multi-Criteria Advanced Search** | Power users need precision | Medium | Combine filters (category + specialty + location + has portfolio), saved searches, search result sorting options. |

## Anti-Features

Features to explicitly NOT build.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| **User Reviews/Ratings** | Opens liability, moderation burden, gaming risk, conflicts in tight-knit community | Focus on verified portfolios and admin-vetted descriptions. Let past work speak for itself. |
| **Real-Time Chat/Messaging** | High complexity, low ROI, increases spam/abuse | Use simple inquiry forms that route to stakeholder email. Let communication happen off-platform. |
| **Paid Listings/Premium Tiers** | Creates pay-to-play perception, undermines mission of equitable access | Keep all listings equal. Fund through sponsorships or grants, not stakeholder fees. |
| **Social Features (comments, likes, follows)** | Scope creep, moderation burden, dilutes focus | This is a directory, not a social network. Direct users to stakeholders' own social channels. |
| **Detailed Project Management Tools** | Mission drift, overlaps with existing tools | Directory connects people; project management happens elsewhere (emails, contracts, project mgmt software). |
| **Automated/Unmoderated Submissions** | Spam risk, quality concerns, trust erosion | Admin approval is table stakes for curated directories. Automation reduces quality. |
| **Keyword Stuffing in Categories** | SEO penalty, poor UX, reduces trust | Enforce single primary category, max 3-5 specialties. Quality over quantity. |
| **Duplicate Listings** | Splits SEO authority, confuses users, looks unprofessional | De-duplication during admin review, merge process for claimed duplicates. |

## Feature Dependencies

```
Basic Listing Information
    ├──requires──> Category/Role Organization
    └──requires──> Contact/Inquiry Forms

Search & Filter
    ├──requires──> Category/Role Organization
    └──requires──> Specialties/Skills Taxonomy

Interactive Map View
    ├──requires──> Basic Listing Information (address)
    └──enhances──> Neighborhood/Project Map

Project Portfolio Showcase
    ├──requires──> Basic Listing Information
    └──enhances──> Interactive Map View (project locations)

Verified Listings
    ├──requires──> Admin Approval Workflow
    └──enhances──> SEO (trust signals)

Claim & Manage Listing
    ├──requires──> Admin Approval Workflow
    └──requires──> Verified Listings (ownership validation)

AI-Powered Stakeholder Matching
    ├──requires──> Specialties/Skills Taxonomy
    ├──requires──> Project Portfolio Showcase
    └──requires──> Rich Structured Data

Rich Structured Data
    └──enhances──> SEO Basics

Export/Share Features
    └──requires──> Search & Filter (to export results)
```

### Dependency Notes

- **Basic Listing Information requires Category/Role Organization:** Cannot create meaningful listings without defining stakeholder types first.
- **Project Portfolio Showcase enhances Interactive Map View:** Portfolios with project locations create richer map experience.
- **Claim & Manage Listing requires Verified Listings:** Must verify ownership before allowing self-serve edits.
- **AI-Powered Stakeholder Matching requires multiple features:** Needs data quality (taxonomy, portfolios, structured data) before ML can be effective.

## MVP Recommendation

### Launch With (v1.0)

Minimum viable product for Louisville historic preservation directory:

- [x] **Basic Listing Information** — Core value: connect users to stakeholders
- [x] **Category/Role Organization** — Essential navigation structure
- [x] **Search & Filter** — Users must be able to narrow results
- [x] **Interactive Map View** — Location is central to local directory
- [x] **Mobile Responsive Design** — Non-negotiable in 2026
- [x] **Contact/Inquiry Forms** — Enable users to reach stakeholders
- [x] **Admin Approval Workflow** — Quality control for credibility
- [x] **SEO Basics** — Directory must be discoverable

**Rationale:** These 8 features constitute a functional, professional directory that solves the core problem: "How do I find qualified historic preservation professionals in Louisville?" Anything less feels broken.

### Add After Validation (v1.1 - v1.5)

Features to add once core is working and being used:

- [ ] **Project Portfolio Showcase** — Add when 10+ stakeholders confirmed; validates directory value
- [ ] **Specialties/Skills Taxonomy** — Add when categories feel too broad; driven by user feedback
- [ ] **Verified Listings** — Add when spam/quality concerns emerge; may be immediate need
- [ ] **Accessibility (WCAG 2.1 AA)** — Add by April 2026 deadline; plan 3-6 months for proper audit
- [ ] **Rich Structured Data** — Add when SEO/discoverability becomes priority
- [ ] **Claim & Manage Listing** — Add when stakeholders request update ability; reduces admin burden

**Rationale:** These features enhance the core experience but aren't required for launch. Add based on usage data and stakeholder feedback.

### Future Consideration (v2.0+)

Features to defer until product-market fit is established:

- [ ] **Neighborhood/Project Map** — Requires critical mass of portfolios; complex data model
- [ ] **AI-Powered Stakeholder Matching** — Emerging tech; requires quality data foundation first
- [ ] **Multi-Criteria Advanced Search** — Add when basic search proves insufficient
- [ ] **Export/Share Features** — Nice-to-have; low user demand until directory is established

**Rationale:** These are "nice to have" features that add complexity without addressing core value. Defer until directory proves its utility and attracts consistent users.

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Basic Listing Information | HIGH | LOW | P1 |
| Category/Role Organization | HIGH | LOW | P1 |
| Search & Filter | HIGH | MEDIUM | P1 |
| Interactive Map View | HIGH | MEDIUM | P1 |
| Mobile Responsive Design | HIGH | MEDIUM | P1 |
| Contact/Inquiry Forms | HIGH | LOW | P1 |
| Admin Approval Workflow | HIGH | MEDIUM | P1 |
| SEO Basics | HIGH | MEDIUM | P1 |
| Project Portfolio Showcase | MEDIUM | MEDIUM | P2 |
| Specialties/Skills Taxonomy | MEDIUM | MEDIUM | P2 |
| Verified Listings | MEDIUM | MEDIUM | P2 |
| Accessibility (WCAG 2.1 AA) | HIGH | HIGH | P2 |
| Rich Structured Data | MEDIUM | LOW | P2 |
| Claim & Manage Listing | MEDIUM | MEDIUM | P2 |
| Neighborhood/Project Map | LOW | HIGH | P3 |
| AI-Powered Stakeholder Matching | LOW | HIGH | P3 |
| Multi-Criteria Advanced Search | LOW | MEDIUM | P3 |
| Export/Share Features | LOW | LOW | P3 |

**Priority key:**
- **P1:** Must have for launch — Core table stakes
- **P2:** Should have, add when possible — Enhances value, manageable complexity
- **P3:** Nice to have, future consideration — Defer until PMF established

## Competitor Feature Analysis

Based on research of existing historic preservation directories:

| Feature | Historic Seattle | Preservation Mass | DC Preservation League | Our Approach |
|---------|------------------|-------------------|------------------------|--------------|
| **Basic Listings** | Name, contact, category | Name, contact, category | Name, contact, category, credentials | Match standard: Name, contact, category, specialties |
| **Categorization** | 15+ service categories | Service type categories | Discipline-based | Role-based + specialty tags for flexibility |
| **Search/Filter** | Browse by category | Browse by category | Browse by discipline | Category + specialty + location filters |
| **Map View** | Not present | Not present | Not present | **Differentiator:** Interactive map with pins |
| **Portfolio Display** | Links to external sites | Links to external sites | Not present | **Differentiator:** Built-in project galleries |
| **Submission Process** | Application + annual fee | Application + annual fee | Application | Admin-approved, no fee (equity focus) |
| **Verification** | Application review | Application review | Credential validation | Admin review + optional verification badge |
| **Mobile Experience** | Responsive but basic | Responsive but basic | Responsive but basic | **Differentiator:** Mobile-first design |

**Competitive Gap Identified:** Most preservation directories are basic category lists with external links. Our map view + portfolio showcase + mobile-first design will differentiate significantly.

## Research Confidence Assessment

| Area | Confidence | Source Quality |
|------|------------|----------------|
| **Table Stakes Features** | HIGH | Multiple directory platforms (Brilliant Directories, Directorist), professional directory best practices, real-world preservation directory examples |
| **Differentiators** | MEDIUM | Contractor portfolio tools (CompanyCam), directory SEO practices, verified directory listings standards. Preservation-specific differentiators based on competitor gap analysis. |
| **Anti-Features** | MEDIUM | Directory common mistakes articles, moderation burden documented, community dynamics inferred from similar ecosystems |
| **Technical Implementation** | MEDIUM | Web search verified by multiple sources (map APIs, responsive design standards, accessibility compliance deadlines) |
| **MVP Prioritization** | LOW | Based on general directory patterns; should validate with Louisville preservation community stakeholders |

## Sources

### Directory Feature Standards
- [15 Free Business Directories That Still Matter in 2026](https://www.jasminedirectory.com/blog/15-free-business-directories-that-still-matter-in-2026/)
- [Your Directory Strategy for 2026](https://www.jasminedirectory.com/blog/your-directory-strategy-for-2026/)
- [40+ Top Business Directories For Local Businesses in 2026](https://www.ontoplist.com/blog/top-business-directories/)
- [The ultimate guide to business directory listings for SEO in 2026](https://birdeye.com/blog/business-directory-listings/)

### Submission Workflow & Moderation
- [Moderators | IdeaScale](https://help.ideascale.com/moderator)
- [Member Directory Community Add-on for WordPress](https://www.cminds.com/wordpress-plugins-library/expert-directory-community-submissions-plugin-for-wordpress-by-creativeminds/)
- [Common Directory Listing Mistakes to Avoid](https://www.jasminedirectory.com/blog/common-directory-listing-mistakes-to-avoid/)
- [5 Local Directory Mistakes That Damage Your Rankings](https://firstsiteguide.com/local-directory-mistakes/)

### Portfolio & Project Showcase
- [Contractor Portfolio & Website Gallery Tool | CompanyCam](https://companycam.com/advanced-features/portfolio)
- [How to Build a Contractor Portfolio in 3 Easy Steps](https://companycam.com/resources/blog/how-to-build-contractor-portfolio-3-easy-steps)
- [Construction Company Website Portfolio Types](https://mayecreate.com/blog/construction-portfolio-examples-what-type-should-your-construction-company-use/)

### Search, Filter & Map Features
- [Best Directory Software 2026 | Capterra](https://www.capterra.com/directory-software/)
- [Features | Spotlight Directory](https://www.accredible.com/features/spotlight-directory)
- [5 Best WordPress Map Plugins in 2026](https://theplusaddons.com/blog/wordpress-map-plugins/)
- [Google Maps API Benefits: 7 Powerful Features (2026 Guide)](https://www.theneo.io/blog/exploring-the-benefits-of-the-google-maps-api)
- [Cluster Maps: What Are They And How Do They Work?](https://www.maptive.com/cluster-maps/)

### Mobile & Responsive Design
- [Responsive Web Design in 2026: Why Mobile-First UX Drives SEO & Conversions](https://www.alfdesigngroup.com/post/responsive-web-design-why-mobile-first-ux)
- [Responsive Web Design in 2026 Performance Across All Devices](https://uversedigital.com/blog/responsive-web-design-2026/)
- [Mobile-First UX Design: Best Practices for 2026](https://www.trinergydigital.com/news/mobile-first-ux-design-best-practices-in-2026)

### Accessibility Compliance
- [2026 WCAG & ADA Website Compliance Requirements & Standards](https://www.accessibility.works/blog/wcag-ada-website-compliance-standards-requirements/)
- [New Federal Requirement: Digital Accessibility Compliance by 2026](https://accessibility.isr.umich.edu/new-federal-requirement-digital-accessibility-compliance-by-2026/)
- [ADA Title II Web Accessibility Requirements](https://www.accessibility.works/blog/ada-title-ii-2-compliance-standards-requirements-states-cities-towns/)

### SEO & Structured Data
- [Structured Data & Schema Markup for SEO in 2026](https://doesinfotech.com/the-role-of-structured-data-schema-markup-in-seo/)
- [Local SEO 2026: What It Is and How To Do It with Business Directories](https://www.jasminedirectory.com/blog/local-seo-2026-what-it-is-and-how-to-do-it-with-business-directories/)
- [Schema Markup in 2026: Why It's Now Critical for SERP Visibility](https://almcorp.com/blog/schema-markup-detailed-guide-2026-serp-visibility/)
- [The Role of Schema Markup in Local SEO](https://12amagency.com/blog/role-of-schema-markup-in-local-seo/)

### Verification & Trust
- [Your Directory Listing as an AI Trust Signal](https://www.jasminedirectory.com/blog/your-directory-listing-as-an-ai-trust-signal/)
- [Badge Verification: Ensuring Trust And Authenticity](https://sertifier.com/blog/badge-verification-ensuring-trust-and-authenticity-in-online-credentials/)
- [Claim Your Listing: Why It Matters and How to Do It Right](https://www.edirectory.com/updates/claim-your-listing-why-it-matters-and-how-to-do-it-right/)

### Contact Forms & Lead Generation
- [18 Lead Generation Forms: Examples & Best Practices](https://vwo.com/blog/lead-generation-forms/)
- [15 Best Contact Form Examples to Improve Your Lead Generation](https://visme.co/blog/contact-form-examples/)
- [What are Lead Generation forms and Why they work](https://www.mightyforms.com/blog/what-are-lead-generation-forms-and-why-they-work-with-templates)

### Directory Platform Comparisons
- [Brilliant Directories Pricing, Features, Reviews & Alternatives 2026](https://www.capterra.com/p/133173/Brilliant-Directories/)
- [Directorist Review (2026): Is It Still The Best Directory Plugin?](https://blogvault.net/directorist-review)
- [20 Best Member Directory Software Reviewed in 2026](https://theleadpastor.com/tools/best-member-directory-software/)

### Historic Preservation Directory Examples
- [Preservation Professionals Directory - Historic Seattle](https://historicseattle.org/preservation-professionals/)
- [Historic Preservation Contractors | History Colorado](https://www.historycolorado.org/historic-preservation-contractors)
- [Contractor Database - DC Preservation League](https://dcpreservation.org/contractor-database/)
- [Preservation Professionals Directory | Preservation Mass](https://www.preservationmass.org/preservation-directory)
- [Preservation Trades & Consultants Directory | Washington Trust](https://preservewa.org/resources/preservation-trades-consultants-directory/)

---
*Feature research for: NextGen Preservation Collab Directory*
*Researched: 2026-02-12*
*Confidence: MEDIUM (directory patterns well-documented; preservation-specific needs inferred from competitor analysis)*
