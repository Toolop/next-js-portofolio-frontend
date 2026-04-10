# Issue: Implementasi Sistem Login (CMS Security Layer)

## Deskripsi Tugas
Tugas ini fokus untuk membangun halaman otentikasi (login) khusus bernama "SYSTEM_ACCESS_PORTAL" yang digunakan sebagai gerbang keamanan (Security Layer) menuju sistem CMS. Antarmuka harus mengusung tema *high-tech / cyberpunk* gelap seperti yang telah kita gunakan di halaman utama, dengan animasi interaktif yang elegan.

---

## Spesifikasi Desain (Berdasarkan Rekapan Gambar Referensi)
**1. Tampilan Latar & Layout (Background)**
- **Warna Dasar**: Gelap pekat (`#020201` atau `#000000`).
- **Ornamen Layout**: Tambahkan bingkai/sudut penanda (*corner markers*) berbentuk garis siku tipis di keempat sudut layar (mengambang absolut).
- **Efek Pendaran**: Terdapat efek cahaya (*glow*) berwarna *cyan/teal* yang membias sangat halus di belakang form login.

**2. Tipografi (Typography)**
- **Judul**: `SYSTEM_ACCESS_PORTAL` (Warna cyan, tebal).
- **Sub-judul**: `KINETIC GRID CMS SECURITY LAYER` (Warna teks lebih redup, huruf kecil ter-*uppercase*, spasi lebar / *tracking-widest*).
- Font yang digunakan mengikuti sistem global (`Space Grotesk`).

**3. Form Login Layout (Card)**
- **Form Card**: Latar sangat gelap (misalnya `#0a0a0a`), tanpa border terang kecuali sedikit iluminasi lembut saat di-*hover*.
- **Input 1 (ACCESS_KEY)**: 
  - Teks Label: `ACCESS_KEY`
  - Input field berwarna nyaris hitam, dengan *icon* *fingerprint* / user di sebelah kiri.
  - Placeholder: `Enter primary identity string`
- **Input 2 (ENCRYPTION_PHRASE)**: 
  - Teks Label: `ENCRYPTION_PHRASE`
  - Input field (bertipe `password`) berlatar sangat gelap, dengan *icon* kunci (key) di sebelah kiri.
  - Placeholder: `••••••••••••`
- **Tombol Submit (VERIFY IDENTITY)**:
  - Tombol blok *full-width*. Latar cyan solid pekat (`#81ECFF` atau `#00e5ff`), warna teks hitam/pekat.
  - Terdapat ikon panah ke kanan (→) di samping label tombol.
- **Micro-footer Form**:
  - Kolom kiri: Link teks abu-abu redup berisi "REQUEST RESET".
  - Kolom kanan: Indikator status berisi ikon titik (dot) *cyan* kecil dan teks "SECURE_NODE: ACTIVE".

**4. Interaksi & Animasi (Framer Motion Wajib)**
- Gunakan `framer-motion` untuk menganimasikan kemunculan elemen.
- Form card *Fade-in* & *Slide-up* perlahan dari bawah ke tengah layar saat *render* pertama.
- Ketika *input field* di-klik (focus), berikan pendaran halus (`box-shadow glow`) berwarna *cyan* di border-nya.
- Efek *hover* pada tombol (sedikit membesar atau *brightness* meningkat).

---

## Tahapan Implementasi

Untuk kamu yang akan mengimplementasikan ini (Developer/AI), silakan ikuti langkah berurutan di bawah ini:

### Fase 1: Setup Routing
1. Buat folder baru `login` di dalam folder `src/app/`.
2. Di dalam folder `login`, buat file `page.tsx` (`src/app/login/page.tsx`).
3. Set file ini sebagai Client Component dengan menambahkan `"use client";` di baris pertama.

### Fase 2: Implementasi Layout Dasar
1. Pastikan layout utama halaman login membentang sepenuh layar (`min-h-screen`, `flex`, `items-center`, `justify-center`, warna *background* gelap pekat).
2. Buat ornamen 4 sudut (*corner markers*) menggunakan div absolut dengan perbatasan (border) *cyan*/putih transparan di ujung kiri-atas, kanan-atas, kiri-bawah, dan kanan-bawah.
3. Sisipkan gradasi radial halus (radial-gradient) tepat di tengah layar di bawah posisi form nanti.

### Fase 3: Struktur Form Card dan Styling
1. Strukturkan form di dalam sebuah *container* (misalnya `max-w-md w-full`).
2. Masukkan Judul & Sub-judul.
3. Buat kerangka Input (Label -> Kontainer Input -> Icon & Teks Field). Anda bisa menggunakan *inline-svg* atau `lucide-react`. (Saran ikon: `<Fingerprint />` atau `<User />` untuk input pertama, `<Key />` untuk input kedua).
4. Pastikan form input membuang styling *default browser* (seperti efek *ring* bawaan) dan gunakan sistem gaya *focus-within:border-[#81ECFF]* milik Tailwind.

### Fase 4: Tombol & Micro-Footer
1. Buat elemen tombol dengan gaya menyala. Gunakan *Lucide icon* `<ArrowRight />` berukuran proporsional.
2. Tambahkan tata letak Footer bawah card menggunakan `flex justify-between`. Beri elemen lingkaran kecil (dot) berkedip. Anda bisa menganimasikan dot ini dengan varian berulang `opacity: [1, 0.5, 1]` via framer-motion.

### Fase 5: Pembungkusan Animasi
1. Bungkus *card form* menggunakan komponen `<motion.div>`.
2. Tentukan properti `initial={{ opacity: 0, y: 20 }}` dan `animate={{ opacity: 1, y: 0 }}`.
3. Berikan *stagger* transisi apabila ingin komponen form (input, tombol) muncul perlahan secara bertahap satu persatu.

---
Silakan lakukan pengerjaan dengan cermat dan rapi, mengacu pada struktur CSS Global Tailwind yang sudah terbangun. Catat bahwa ini murni implementasi *frontend/UI* terlebih dahulu (tanpa mempedulikan fungsionalitas HTTP POST).
