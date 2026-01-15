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

- [x] Homepage dengan hero section, sambutan & navigasi
- [] Profil siswa (nama, kelas, foto, quote)
- [] Profil kelas (foto bersama wali kelas, sambutan wali kelas, foto grup siswa, grid list siswa)
- [] Galeri foto kegiatan
- [] Timeline/memories section
- [] Halaman teachers/staff
- [] About/credits page
- [] Search & filter siswa
- [] Mobile responsive
- [] Global animation on page transition (book flip alike)

Nice to Have (Post-MVP):

- [] Student Image download (password protected with each student have unique password)
- [] General Image download
- [] Fun facts/statistics
- [] Video highlights
- [] Dark mode
- [] Multi-language (ID/EN)

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
- Domain : .vercel.app (gratis)
- Analytics : Vercel Analytics (gratis)
- Forms : Formspree (gratis)
- Animation : Gsap & AOS

## 🚀 Project Structure

```text
src/
├── pages/
│   ├── index.astro                        # Homepage
│   ├── about/
│   │   ├── index.astro                    # About overview
│   │   ├── sejarah.astro                  # Sejarah
│   │   ├── mars.astro                     # Mars
│   │   └── fasilitas.astro                # Fasilitas
│   ├── classes/
│   │   ├── index.astro                    # Jenjang selection (SMK/SMA)
│   │   └── [jenjang]/
│   │       ├── index.astro                # SMK/SMA classes list
│   │       └── [kelas].astro               # SMK/SMA class detail
│   ├── students/
│   │   └── [slug].astro                   # Individual student profile
│   ├── memories/
│   │   ├── gallery.astro                  # Photo gallery
│   │   ├── uniforms.astro                 # Uniforms collection
│   │   └── school-corners.astro           # School corners
│   ├── teachers.astro                     # Teachers page
│   └── yearbook-team.astro                # Yearbook team
├── components/
│   ├── sections/
│   │   ├── HeroSection.astro              # Homepage hero
│   │   ├── AboutSection.astro             # About content
│   │   ├── ClassesSection.astro           # Classes overview
│   │   ├── StudentsSection.astro          # Students grid
│   │   ├── UniformsSection.astro          # Uniforms gallery
│   │   ├── MemoriesSection.astro          # Memories gallery
│   │   ├── TeachersSection.astro          # Teachers grid
│   │   └── TeamSection.astro              # Yearbook team
│   ├── cards/
│   │   ├── StudentCard.astro              # Student profile card
│   │   ├── TeacherCard.astro              # Teacher profile card
│   │   ├── UniformCard.astro              # Uniform photo card
│   │   └── MemoryCard.astro               # Memory photo card
│   └── layouts/
│       └── MainLayout.astro               # Main layout
├── content/
│   ├── leadership/
│   │   ├── pimpinan.md                    # Pimpinan content
│   │   ├── kepala-kepesantrenan.md        # Kepala Kepesantrenan
│   │   ├── kepala-sekolah.md              # Kepala Sekolah
│   │   ├── ketua-angkatan.md              # Ketua Angkatan
│   │   └── ketua-panitia.md               # Ketua Panitia
│   ├── about/
│   │   ├── sejarah.md                     # Sejarah content
│   │   ├── mars.md                        # Mars content
│   │   └── fasilitas.md                   # Fasilitas content
│   ├── classes/
│   │   ├── smk/
│   │   │   └── [class].md                 # SMK class content
│   │   └── sma/
│   │       └── [class].md                 # SMA class content
│   ├── students/
│   │   └── [student].md                   # Student profiles
│   ├── uniforms/
│   │   ├── putra.md                       # Putra uniforms
│   │   ├── putri.md                       # Putri uniforms
│   │   └── khusus.md                      # Khusus uniforms
│   ├── memories/
│   │   ├── gallery.md                     # Gallery content
│   │   └── school-corners.md              # School corners
│   ├── teachers/
│   │   ├── smk.md                         # SMK teachers
│   │   └── sma.md                         # SMA teachers
│   └── yearbook-team.md                   # Team content
├── assets/
│   ├── images/
│   │   ├── leadership/                    # Leadership photos
│   │   ├── about/                         # About photos
│   │   ├── classes/                       # Class photos
│   │   ├── students/                      # Student photos
│   │   ├── uniforms/                      # Uniform photos
│   │   ├── memories/                      # Memory photos
│   │   ├── teachers/                      # Teacher photos
│   │   └── team/                          # Team photos
│   └── logos/                            # Logos & branding
│
├─── Privacy Policy (/privacy-policy)
│
├─── Terms of Service (/terms)
│
└─── Contact (/contact)
     └─ Contact form
```

# URL Structure

```text
/                                       → Homepage
│   ├─ Hero section (Logo angkatan)
│   ├─ Pengenalan singkat angkatan
│   ├─ Sambutan Pimpinan
│   ├─ Sambutan Kepala Kepesantrenan
│   ├─ Sambutan Kepala Sekolah
│   ├─ Sambutan Ketua Angkatan
│   ├─ Sambutan Ketua Panitia Kelulusan
│   ├─ Navigation menu
│   └─ CTA buttons
/about                                  → Tentang Pesantren
│   ├─ /about/sejarah                   → Sejarah sekolah
│   ├─ /about/mars                     → Mars sekolah
│   └─ /about/fasilitas                → Fasilitas
/classes                                → Kelas & Siswa
│   ├─ /classes/smk                    → Daftar Kelas SMK
│   │   └─ /classes/smk/[slug]         → Profil Kelas SMK
│   │       └─ /classes/smk/[slug]/[student] → Profil Siswa
│   └─ /classes/sma                    → Daftar Kelas SMA
│       └─ /classes/sma/[slug]         → Profil Kelas SMA
/students                                → Daftar semua siswa dari SMA & SMK 
│   └─ /students/[slug]                  → Profil siswa
/uniforms                               → Koleksi Seragam
│   ├─ Seragam Putra
│   ├─ Seragam Putri
│   └─ Seragam Khusus
/memories                               → Dokumentasi
│   ├─ /memories/gallery               → galeri foto dokumentasi
│   └─ /memories/school-corners        → Foto Gedung
/teachers                               → Guru & Staff
│   ├─ Guru SMK
│   └─ Guru SMA
/yearbook-team                          → Tim Panitia
/privacy-policy                         → Privacy policy
/terms                                  → Terms of service
/contact                                → Contact form
```