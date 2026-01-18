import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Data sumber untuk generasi
const namaDepanPutra = [
  'Ahmad', 'Budi', 'Fajar', 'Joko', 'Taufik', 'Oki', 'Rizky', 'Dwi', 'Eko', 'Hendra',
  'Iwan', 'Kurnia', 'Luthfi', 'Muhammad', 'Nanda', 'Prayoga', 'Qori', 'Rahmat', 'Surya', 'Tegar',
  'Umar', 'Vino', 'Wahyu', 'Xavier', 'Yoga', 'Zaki', 'Arif', 'Bima', 'Cahya', 'Dani',
  'Edi', 'Fahri', 'Galih', 'Hadi', 'Indra', 'Joni', 'Krisna', 'Luki', 'Maman', 'Nugroho',
  'Oscar', 'Pandu', 'Qori', 'Rudi', 'Sandi', 'Tomi', 'Ucup', 'Vian', 'Wawan', 'Yudi',
  'Zainal', 'Adi', 'Bagus', 'Candra', 'Dedi', 'Eka', 'Fajar', 'Guntur', 'Herman', 'Irfan',
  'Joko', 'Kiki', 'Lalu', 'Maman', 'Nando', 'Ojan', 'Purnomo', 'Qori', 'Rangga', 'Slamet',
  'Tono', 'Udin', 'Vino', 'Wawan', 'Yanto', 'Zulfi', 'Asep', 'Bambang', 'Catur', 'Dani'
];

const namaBelakangPutra = [
  'Santoso', 'Hartono', 'Nugroho', 'Susilo', 'Hidayat', 'Setiawan', 'Wijaya', 'Putra', 'Saputra', 'Gunawan',
  'Prasetya', 'Suryadi', 'Permana', 'Wibowo', 'Setyawan', 'Purnomo', 'Hadi', 'Saputra', 'Mahendra', 'Adi',
  'Kusuma', 'Jaya', 'Sasongko', 'Prabowo', 'Setyadi', 'Wicaksono', 'Purnama', 'Setyawan', 'Prasetyo', 'Wibisono',
  'Suryanto', 'Prasetya', 'Wijaya', 'Saputra', 'Gunawan', 'Prasetya', 'Wibowo', 'Setyawan', 'Purnomo', 'Hadi',
  'Saputra', 'Mahendra', 'Adi', 'Kusuma', 'Jaya', 'Sasongko', 'Prabowo', 'Setyadi', 'Wicaksono', 'Purnama',
  'Setyawan', 'Prasetyo', 'Wibisono', 'Suryanto', 'Prasetya', 'Wijaya', 'Saputra', 'Gunawan', 'Prasetya', 'Wibowo',
  'Setyawan', 'Purnomo', 'Hadi', 'Saputra', 'Mahendra', 'Adi', 'Kusuma', 'Jaya', 'Sasongko', 'Prabowo',
  'Setyadi', 'Wicaksono', 'Purnama', 'Setyawan', 'Prasetyo', 'Wibisono', 'Suryanto', 'Prasetya', 'Wijaya'
];

const namaDepanPutri = [
  'Ayu', 'Bella', 'Citra', 'Dewi', 'Eka', 'Fira', 'Gita', 'Hana', 'Intan', 'Jasmine',
  'Kartika', 'Lia', 'Maya', 'Nadia', 'Oktavia', 'Putri', 'Qori', 'Rani', 'Sari', 'Tia',
  'Umi', 'Vina', 'Wulan', 'Xena', 'Yani', 'Zahra', 'Aisyah', 'Bunga', 'Cinta', 'Dina',
  'Elisa', 'Farah', 'Gadis', 'Hani', 'Indah', 'Jihan', 'Kiki', 'Lala', 'Mira', 'Nina',
  'Ovi', 'Puspita', 'Qori', 'Rara', 'Salsa', 'Tika', 'Umi', 'Vera', 'Winda', 'Yuni',
  'Zahra', 'Aulia', 'Bella', 'Citra', 'Dewi', 'Eka', 'Fira', 'Gita', 'Hana', 'Intan',
  'Jasmine', 'Kartika', 'Lia', 'Maya', 'Nadia', 'Oktavia', 'Putri', 'Qori', 'Rani', 'Sari',
  'Tia', 'Umi', 'Vina', 'Wulan', 'Xena', 'Yani', 'Zahra', 'Aisyah', 'Bunga', 'Cinta'
];

const namaBelakangPutri = [
  'Sari', 'Wati', 'Lestari', 'Permata', 'Putri', 'Wulandari', 'Kusuma', 'Dewi', 'Sari', 'Wati',
  'Lestari', 'Permata', 'Putri', 'Wulandari', 'Kusuma', 'Dewi', 'Sari', 'Wati', 'Lestari', 'Permata',
  'Putri', 'Wulandari', 'Kusuma', 'Dewi', 'Sari', 'Wati', 'Lestari', 'Permata', 'Putri', 'Wulandari',
  'Kusuma', 'Dewi', 'Sari', 'Wati', 'Lestari', 'Permata', 'Putri', 'Wulandari', 'Kusuma', 'Dewi',
  'Sari', 'Wati', 'Lestari', 'Permata', 'Putri', 'Wulandari', 'Kusuma', 'Dewi', 'Sari', 'Wati',
  'Lestari', 'Permata', 'Putri', 'Wulandari', 'Kusuma', 'Dewi', 'Sari', 'Wati', 'Lestari', 'Permata',
  'Putri', 'Wulandari', 'Kusuma', 'Dewi', 'Sari', 'Wati', 'Lestari', 'Permata', 'Putri', 'Wulandari',
  'Kusuma', 'Dewi', 'Sari', 'Wati', 'Lestari', 'Permata', 'Putri', 'Wulandari', 'Kusuma', 'Dewi'
];

const kelasSMK = [
  'SMK - Teknik Komputer dan Jaringan',
  'SMK - Rekayasa Perangkat Lunak',
  'SMK - Akuntansi dan Keuangan',
  'SMK - Pemasaran',
  'SMK - Teknik Kendaraan Ringan',
  'SMK - Teknik Mesin',
  'SMK - Teknik Listrik',
  'SMK - Desain Komunikasi Visual',
  'SMK - Tata Boga',
  'SMK - Perhotelan'
];

const kelasSMA = [
  'SMA - IPA 1',
  'SMA - IPA 2',
  'SMA - IPA 3',
  'SMA - IPS 1',
  'SMA - IPS 2',
  'SMA - IPS 3',
  'SMA - Bahasa 1',
  'SMA - Bahasa 2'
];

const quotes = [
  'Belajar adalah investasi terbaik untuk masa depan.',
  'Setiap kesulitan adalah kesempatan untuk belajar.',
  'Mimpi besar dimulai dengan langkah kecil.',
  'Kegagalan adalah guru terbaik dalam hidup.',
  'Kerja keras mengalahkan bakat tanpa usaha.',
  'Jangan takut gagal, takutlah tidak mencoba.',
  'Pendidikan adalah senjata paling ampuh untuk mengubah dunia.',
  'Setiap hari adalah kesempatan baru untuk belajar.',
  'Kesuksesan adalah hasil dari ketekunan dan kerja keras.',
  'Jadilah pembelajar seumur hidup.',
  'Tantangan membuat kita lebih kuat dan lebih bijaksana.',
  'Impian tanpa tindakan hanyalah khayalan.',
  'Berani bermimpi, berani bertindak, berani sukses.',
  'Kesabaran dan ketekunan mengalahkan segalanya.',
  'Jangan pernah berhenti belajar karena hidup tidak pernah berhenti mengajar.',
  'Setiap orang memiliki potensi untuk menjadi luar biasa.',
  'Kunci sukses adalah konsistensi dan disiplin.',
  'Jadilah versi terbaik dari dirimu sendiri.',
  'Pendidikan membuka pintu menuju masa depan yang lebih baik.',
  'Setiap langkah kecil membawa kita lebih dekat ke tujuan.'
];

const hobbies = [
  'Membaca', 'Menulis', 'Menggambar', 'Fotografi', 'Bermain musik',
  'Olahraga', 'Memasak', 'Berkebun', 'Traveling', 'Bermain game',
  'Menonton film', 'Mendengarkan musik', 'Desain grafis', 'Programming',
  'Bulutangkis', 'Sepakbola', 'Renang', 'Basket', 'Voli',
  'Melukis', 'Menari', 'Bernyanyi', 'Bermain alat musik', 'Membuat kerajinan',
  'Bersepeda', 'Mendaki gunung', 'Yoga', 'Meditation', 'Menulis puisi'
];

const kota = [
  'Jakarta', 'Bandung', 'Surabaya', 'Yogyakarta', 'Semarang',
  'Medan', 'Makassar', 'Denpasar', 'Palembang', 'Bekasi',
  'Depok', 'Tangerang', 'Bogor', 'Malang', 'Solo',
  'Padang', 'Bali', 'Lombok', 'Aceh', 'Pontianak',
  'Samarinda', 'Manado', 'Ambon', 'Jayapura', 'Banjarmasin'
];

const uniformPhotos = [
  '../assets/uniform/pplg_1_putra.webp',
  '../assets/uniform/pplg_2_putra.webp',
  '../assets/uniform/pplg_3_putra.webp',
  '../assets/uniform/apl_1_putra.webp',
  '../assets/uniform/apl_2_putra.webp',
  '../assets/uniform/apl_3_putra.webp',
  '../assets/uniform/batik_1_putra.webp',
  '../assets/uniform/batik_2_putra.webp',
  '../assets/uniform/batik_3_putra.webp',
  '../assets/uniform/abu_putih_1_putra.webp',
  '../assets/uniform/abu_putih_2_putra.webp',
  '../assets/uniform/abu_putih_3_putra.webp',
  '../assets/uniform/olahraga_1_putra.webp',
  '../assets/uniform/olahraga_2_putra.webp',
  '../assets/uniform/olahraga_3_putra.webp',
  '../assets/uniform/pramuka_1_putra.webp',
  '../assets/uniform/pramuka_2_putra.webp',
  '../assets/uniform/pramuka_3_putra.webp',
  '../assets/uniform/pmr_1_putra.webp',
  '../assets/uniform/pmr_2_putra.webp',
  '../assets/uniform/pmr_3_putra.webp',
  '../assets/uniform/paskibra_1_putra.webp',
  '../assets/uniform/paskibra_2_putra.webp',
  '../assets/uniform/paskibra_3_putra.webp',
  '../assets/uniform/mahad_1_putra.webp',
  '../assets/uniform/mahad_2_putra.webp',
  '../assets/uniform/mahad_3_putra.webp'
];

const uniformPhotosPutri = [
  '../assets/uniform/pplg_1_putri.webp',
  '../assets/uniform/pplg_2_putri.webp',
  '../assets/uniform/pplg_3_putri.webp',
  '../assets/uniform/apl_1_putri.webp',
  '../assets/uniform/apl_2_putri.webp',
  '../assets/uniform/apl_3_putri.webp',
  '../assets/uniform/batik_1_putri.webp',
  '../assets/uniform/batik_2_putri.webp',
  '../assets/uniform/batik_3_putri.webp',
  '../assets/uniform/abu_putih_1_putri.webp',
  '../assets/uniform/abu_putih_2_putri.webp',
  '../assets/uniform/abu_putih_3_putri.webp',
  '../assets/uniform/olahraga_1_putri.webp',
  '../assets/uniform/olahraga_2_putri.webp',
  '../assets/uniform/olahraga_3_putri.webp',
  '../assets/uniform/pramuka_1_putri.webp',
  '../assets/uniform/pramuka_2_putri.webp',
  '../assets/uniform/pramuka_3_putri.webp',
  '../assets/uniform/pmr_1_putri.webp',
  '../assets/uniform/pmr_2_putri.webp',
  '../assets/uniform/pmr_3_putri.webp',
  '../assets/uniform/paskibra_1_putri.webp',
  '../assets/uniform/paskibra_2_putri.webp',
  '../assets/uniform/paskibra_3_putri.webp',
  '../assets/uniform/mahad_1_putri.webp',
  '../assets/uniform/mahad_2_putri.webp',
  '../assets/uniform/mahad_3_putri.webp',
  '../assets/uniform/mplb_1_putri.webp',
  '../assets/uniform/mplb_2_putri.webp',
  '../assets/uniform/mplb_3_putri.webp'
];

// Fungsi untuk generate nama file slug
function generateSlug(name) {
  return name.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

// Fungsi untuk generate username Instagram
function generateInstagramUsername(name) {
  return name.toLowerCase()
    .replace(/[^a-z0-9]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
}

// Fungsi untuk generate alamat
function generateAddress() {
  const jalan = ['Merdeka', 'Pahlawan', 'Sudirman', 'Gatot Subroto', 'Thamrin',
                 'Diponegoro', 'HOS Cokroaminoto', 'A Yani', 'Imam Bonjol', 'Jend Sudirman'];
  const kotaIndex = Math.floor(Math.random() * kota.length);
  const jalanIndex = Math.floor(Math.random() * jalan.length);
  const nomor = Math.floor(Math.random() * 100) + 1;

  return `Jl. ${jalan[jalanIndex]} No. ${nomor}, ${kota[kotaIndex]}`;
}

// Fungsi untuk generate data siswa
function generateStudent(id, gender) {
  let namaDepan, namaBelakang, kelas, photo, instagram;

  if (gender === 'Putra') {
    namaDepan = namaDepanPutra[Math.floor(Math.random() * namaDepanPutra.length)];
    namaBelakang = namaBelakangPutra[Math.floor(Math.random() * namaBelakangPutra.length)];
    photo = uniformPhotos[Math.floor(Math.random() * uniformPhotos.length)];
  } else {
    namaDepan = namaDepanPutri[Math.floor(Math.random() * namaDepanPutri.length)];
    namaBelakang = namaBelakangPutri[Math.floor(Math.random() * namaBelakangPutri.length)];
    photo = uniformPhotosPutri[Math.floor(Math.random() * uniformPhotosPutri.length)];
  }

  const fullName = `${namaDepan} ${namaBelakang}`;
  const slug = generateSlug(fullName);
  instagram = generateInstagramUsername(fullName);

  // Tentukan jenjang (50% SMK, 50% SMA)
  const jenjang = Math.random() < 0.5 ? 'SMK' : 'SMA';
  if (jenjang === 'SMK') {
    kelas = kelasSMK[Math.floor(Math.random() * kelasSMK.length)];
  } else {
    kelas = kelasSMA[Math.floor(Math.random() * kelasSMA.length)];
  }

  // Generate hobbies (2-4 hobi)
  const numHobbies = Math.floor(Math.random() * 3) + 2;
  const studentHobbies = [];
  for (let i = 0; i < numHobbies; i++) {
    const hobby = hobbies[Math.floor(Math.random() * hobbies.length)];
    if (!studentHobbies.includes(hobby)) {
      studentHobbies.push(hobby);
    }
  }

  return {
    name: fullName,
    class: kelas,
    photo: photo,
    quote: quotes[Math.floor(Math.random() * quotes.length)],
    hobbies: studentHobbies,
    instagram: instagram,
    address: generateAddress(),
    privacyLevel: 'public',
    consent: {
      displayName: true,
      displayPhoto: true,
      displayQuote: true,
      displayHobbies: true,
      displaySocialMedia: true,
      searchEngineIndex: true,
      consentDate: '2025-06-15',
      parentConsent: true
    }
  };
}

// Fungsi untuk generate semua siswa
function generateAllStudents() {
  const students = [];
  const existingStudents = new Set();

  // Generate 100 siswa putra
  for (let i = 0; i < 100; i++) {
    let student;
    do {
      student = generateStudent(i, 'Putra');
    } while (existingStudents.has(student.name));

    existingStudents.add(student.name);
    students.push(student);
  }

  // Generate 100 siswa putri
  for (let i = 0; i < 100; i++) {
    let student;
    do {
      student = generateStudent(i + 100, 'Putri');
    } while (existingStudents.has(student.name));

    existingStudents.add(student.name);
    students.push(student);
  }

  return students;
}

// Fungsi untuk menyimpan data siswa
function saveStudents(students) {
  const studentsDir = path.join(__dirname, '../content/students');

  // Pastikan direktori ada
  if (!fs.existsSync(studentsDir)) {
    fs.mkdirSync(studentsDir, { recursive: true });
  }

  // Hapus file lama (kecuali yang sudah ada)
  const existingFiles = fs.readdirSync(studentsDir);
  for (const file of existingFiles) {
    if (file.endsWith('.json')) {
      fs.unlinkSync(path.join(studentsDir, file));
    }
  }

  // Simpan setiap siswa
  students.forEach(student => {
    const slug = generateSlug(student.name);
    const filePath = path.join(studentsDir, `${slug}.json`);
    const data = JSON.stringify(student, null, 2);

    fs.writeFileSync(filePath, data);
    console.log(`Created: ${filePath}`);
  });

  console.log(`\n✅ Successfully created ${students.length} student data files!`);
}

// Generate dan simpan semua siswa
const allStudents = generateAllStudents();
saveStudents(allStudents);
