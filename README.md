# Project Roadmap: Zero-Cost HighSchool Yearbook Website

# Goals & Objectives

Primary Goals:

Membuat website kenangan angkatan yang dapat diakses selamanya
Mengabadikan momen-momen penting selama 3 tahun sekolah
Menyediakan platform untuk alumni tetap terhubung

Success Metrics:

100% siswa memberikan consent & data
Website accessible dengan Lighthouse score >90
Page load time <2 detik
100% mobile responsive
Zero downtime setelah launch

# Target Audience

Primary:

Siswa angkatan 2025 (100-200 orang)
Alumni untuk nostalgia

Secondary:

Orang tua siswa
Guru & staff sekolah
Angkatan lain (untuk inspirasi)

# Core Features

Must Have (MVP):

Homepage dengan hero section & navigasi
Profil siswa (nama, kelas, foto, quote)
Galeri foto kegiatan
Timeline/memories section
Halaman teachers/staff
About/credits page
Search & filter siswa
Mobile responsive

Nice to Have (Post-MVP):

Digital guestbook
Download certificate
Fun facts/statistics
Video highlights
Dark mode
Multi-language (ID/EN)

# Content Requirements

Data yang Dibutuhkan:

Foto formal setiap siswa (300+ foto)
Foto kegiatan/galeri (200+ foto)
Data siswa (nama, kelas, quote, hobi)
Foto guru & staff
Timeline events (tanggal + deskripsi)
Consent forms (signed)

Content Deadline:

Week 6: 100% data siswa terkumpul
Week 8: 100% foto ter-upload
Week 10: Content review selesai

# Design Direction

Style: Tailwind

Modern & Clean (minimalist)
Nostalgic & Warm (vintage)
Bold & Energetic (colorful)

Color Palette: 

Primary: #f5f0ea 
Secondary: #3557A2, #3B507D
Accent: #2A358F, #251E54

Typography:

Heading: [Nirmala UI]
Body: [Poppins]



# Technical Specifications

Stack:

Framework: Astro 4.x
Styling: Tailwind CSS
Deployment: Vercel
Version Control: GitHub

Performance Targets:

Lighthouse Score: >90
First Contentful Paint: <1.5s
Time to Interactive: <2.5s
Bundle Size: <100kb

Browser Support:

Chrome (latest 2 versions)
Firefox (latest 2 versions)
Safari (latest 2 versions)
Mobile browsers (iOS Safari, Chrome Mobile)

# Privacy & Security

Requirements:

Consent form untuk semua siswa
Privacy policy page
Terms of service page
Data removal request process
Password protection (optional)
HTTPS enabled
Image watermarking

Compliance:

Parental consent (<18 tahun)
Minimal data collection
Right to be forgotten

# Timeline

Week 1: Planning & Design

Project setup
Design mockups
Content structure

Week 2: Development Phase 1

Homepage
Student profile structure
Basic components

Week 3: Development Phase 2

Gallery
Timeline
Search functionality

Week 4: Content Population

Upload all photos
Enter all student data
Teachers section

Week 5: Testing & Polish

Cross-browser testing
Performance optimization
Bug fixes

Week 6: Preview & Feedback

Soft launch (alumni only)
Collect feedback
Final revisions

Week 7: Launch

Public launch
Announcement
Monitor & support

# Risk Management

Potential Risks:
Risk 1: Data collection delayed

Mitigation: Set hard deadline week 6
Contingency: Launch dengan data available, update later

Risk 2: Technical issues

Mitigation: Weekly testing, backup plans
Contingency: Fallback to simpler design

Risk 3: Privacy concerns

Mitigation: Clear consent process, responsive to complaints
Contingency: Remove problematic content immediately

Risk 4: Team member dropout

Mitigation: Cross-training, documentation
Contingency: Redistribute workload

# Budget Breakdown

Completely Free:

Development tools: $0
Hosting (Vercel): $0
SSL certificate: $0
Image CDN (Cloudinary free tier): $0
Version control (GitHub): $0
CI/CD: $0

Optional Costs:

Email service (if needed): $0 (Formspree free tier)

Total Budget: Rp 0

# Success Criteria

Launch Criteria:

All core features working
100% mobile responsive
Lighthouse score >90
Zero critical bugs
Privacy policy published
Consent collected from all students

Post-Launch (1 month):

> 80% alumni visited website
> <5 bug reports
> 90% positive feedback
> Zero privacy complaints

# Tech Stack (All Free!):

- Framework : Astro 4.x
- Styling : Tailwind CSS
- Icons : Lucide React
- Search : Fuse.js
- Image CDN : Cloudinary (free tier)
- Hosting : Vercel
- Version Control : GitHub
- CI/CD : GitHub Actions + Vercel (auto)
- Domain : .vercel.app (gratis) atau .com (Rp 150k/tahun)
- Analytics : Vercel Analytics (gratis)
- Forms : Formspree (gratis)

## 🚀 Project Structure

```text
Homepage (/)
│
├─── About (/about)
│    ├─ Tentang Angkatan
│    ├─ Visi Misi
│    └─ Panitia Yearbook
│
├─── Classes (/classes)
│    ├─ Class Index (grid view)
│    │   ├─ Filter by SMK or SMA
│    │   └─ Search by name
│    │
│    └─ Class Profile (/classes/[slug])
│        ├─ Photo
│        ├─ Name, Class
│        ├─ Quote
│        ├─ Hobbies
│        └─ Social media (optional)
│
├─── Gallery (/gallery)
│    ├─ All Photos (masonry grid)
│    │   ├─ Filter by category
│    │   └─ Lightbox view
│    │
│    └─ Album by Category
│        ├─ Orientation
│        ├─ Study Tour
│        ├─ Sports Day
│        ├─ Cultural Festival
│        ├─ Graduation
│        └─ Daily Activities
│
├─── Memories (/memories)
│    ├─ Timeline (chronological)
│    │   ├─ Year 1 (2022/2023)
│    │   ├─ Year 2 (2023/2024)
│    │   └─ Year 3 (2024/2025)
│    │
│    └─ Event Detail (/memories/[slug])
│        ├─ Title
│        ├─ Date
│        ├─ Description
│        └─ Photos
│
├─── Teachers (/teachers)
│    ├─ Grid of Teachers
│    ├─ Photo
│    ├─ Name
│    ├─ Subject
│    └─ Message/Quote
│
├─── Guestbook (/guestbook) [Optional]
│    ├─ View messages
│    ├─ Write message form
│    └─ Moderation (admin only)
│
├─── Privacy Policy (/privacy-policy)
│
├─── Terms of Service (/terms)
│
├─── Contact (/contact)
│    └─ Contact form
│
└─── Login (/login) [If password protected]
```

# URL Structure

```text
/                          → Homepage
/about                     → About page
/classes                   → All classes
/classes/john-doe          → Individual student
/gallery                   → All photos
/gallery/graduation        → Category album
/memories                  → Timeline
/memories/study-tour-2024  → Event detail
/teachers                  → Teachers page
/guestbook                 → Guestbook
/privacy-policy            → Privacy policy
/terms                     → Terms of service
/contact                   → Contact form
```
