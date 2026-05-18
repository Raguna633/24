# Project Roadmap: Zero-Cost HighSchool Yearbook Website

**Status: Production (Aman)**

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
- [x] Profil siswa (nama, kelas, foto, quote)
- [x] Profil kelas (foto bersama wali kelas, sambutan wali kelas, foto grup siswa, grid list siswa)
- [x] Galeri foto kegiatan
- [x] Galeri seragam/dokumentasi
- [x] Halaman teachers/staff
- [x] About/credits page
- [x] Search & filter siswa
- [x] Mobile responsive
- [x] Global animation on page transition

Nice to Have (Post-MVP):

- [x] Student Image download (password protected with each student have unique password)
- [x] General Image download
- [ ] Fun facts/statistics
- [ ] Video highlights
- [ ] Dark mode
- [ ] Multi-language (ID/EN)

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

Style: Tailwind & GSAP

- **Storytelling & "Reminiscence"**: Menggunakan pendekatan alur cerita emosional untuk memikat user pada *first look* dan memunculkan memori nostalgia yang kuat.
- **Premium Awwwards Animation**: Seluruh animasi berjalan dengan mulus, lambat, dan elegan layaknya website pemenang penghargaan.
- **Modern & Clean** (minimalist)
- **Nostalgic & Warm** (vintage)
- **Bold & Energetic** (colorful)

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

# Tech Stack (All Free!)

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
- Animation : Gsap, Lenis & AOS

## 🚀 Project Structure

```text
src/
├── pages/
│   ├── index.astro                        # Homepage
│   ├── about-altie.astro                  # Sejarah & Tentang Pondok
│   ├── song.astro                         # Mars Sekolah
│   ├── selamat-dan-sukses.astro           # Halaman Kelulusan & Prestasi
│   ├── classes/
│   │   ├── index.astro                    # Jenjang selection (SMK/SMA)
│   │   └── [slug]/
│   │       ├── index.astro                # SMK/SMA classes list
│   │       └── [student].astro            # Individual student profile (in class)
│   ├── students/
│   │   ├── index.astro                    # All students list
│   │   └── [student].astro                # Individual student profile
│   ├── gallery/
│   │   ├── index.astro                    # Photo gallery overview
│   │   └── [slug].astro                   # Dynamic gallery pages (including uniforms)
│   ├── teachers.astro                     # Teachers page
│   └── yearbook-committee.astro           # Yearbook team
├── components/
│   ├── sections/                          # Section components
│   ├── cards/                             # Card components
│   └── layouts/                           # Layout components
├── data/                                  # Astro Data Collections (Zod Schemas)
│   ├── about/                             # About content
│   ├── classes/                           # Classes content
│   ├── congrats/                          # Selamat dan Sukses content
│   ├── galleries/                         # Galleries content
│   ├── song/                              # Mars content
│   ├── students/                          # Student profiles
│   ├── teachers/                          # Teachers data
│   └── uniforms/                          # Uniforms content
├── assets/
│   ├── images/                            # All project image assets
│   └── logos/                             # Logos & branding
```

# URL Structure

```text
[x]     /                                       → Homepage 
[x]     │   ├─ Hero section (Logo angkatan)
[x]     │   ├─ Pengenalan singkat angkatan
[x]     │   ├─ Sambutan Pimpinan
[x]     │   ├─ Sambutan Kepala Kepesantrenan
[x]     │   ├─ Sambutan Kepala Sekolah
[x]     │   ├─ Sambutan Ketua Angkatan
[x]     │   ├─ Sambutan Ketua Panitia Kelulusan
[x]     │   ├─ Navigation menu
[x]     │   └─ CTA buttons
[x]     /about-altie                            → Tentang Pesantren & Sejarah
[x]     /song                                   → Mars Sekolah
[x]     /selamat-dan-sukses                     → Halaman Kelulusan & Prestasi
[x]     /classes                                → Kelas & Siswa
[x]     │   └─ /classes/[slug]                  → Daftar Kelas SMA/SMK
[x]     │       └─ /classes/[slug]/[student]    → Profil Siswa dalam Kelas
[x]     /students                               → Daftar semua siswa dari SMA & SMK 
[x]     │   └─ /students/[student]              → Profil siswa
[x]     /gallery                                → Dokumentasi & Galeri
[x]     │   ├─ /gallery/uniforms                → Koleksi Seragam (di-handle dinamis)
[x]     │   └─ /gallery/[slug]                  → Galeri foto lainnya
[x]     /teachers                               → Guru & Staff
[x]     /yearbook-committee                     → Tim Panitia
```

# Checklist

[x] All core features implemented
[x] Production Ready (Aman)
