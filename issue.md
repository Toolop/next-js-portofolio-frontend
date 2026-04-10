# Issue: Implementasi Call to Action (CTA) dan Footer Dinamis

## Deskripsi Tugas
Tugas ini fokus untuk membangun bagian penutup (ending) dari *landing page*:
1. **Call to Action Section ("Ready to Connect?")**: Menampilkan pesan besar dengan gaya mengetik (typing effect) dan tombol aksi interaktif.
2. **Dynamic Footer**: Menampilkan informasi *copyright* dan link sosial media yang sumber datanya ditarik dari *Mock API*.

Secara keseluruhan, gaya visual harus selaras dengan tema "Cyberpunk/High-tech" yang didominasi warna gelap (#000000 / #020201) dengan grid pattern background.

---

## Design Specifications (Berdasar Referensi)

### 1. CTA Section
- **Background**: Menggunakan corak *grid* halus abu-abu untuk memperkuat kesan teknis.
- **Teks Pendek**: "READY TO CONNECT?" (warna aksen cyan `#81ECFF`, text kecil, spasi renggang).
- **Teks Judul Besar**: Terdiri dari dua baris. Baris pertama "LET'S BUILD THE" (putih), baris kedua "NEXT PROTOCOL" (warna *purple/lavender* `#A855F7` atau gradien ungu).
- **Tombol Aksi**:
  - Tombol 1 ("HIRE ME"): Warna solid cyan `#81ECFF` dengan outline/ikon panah panah.
  - Tombol 2 ("SCHEDULE CALL"): Warna *transparent/outline* dengan icon kalender.
- **Animasi (Wajib)**:
  - Efek mengetik (Typewriter) untuk teks "NEXT PROTOCOL".
  - Transisi pudar ke atas (*Fade Up*) saat section ini terlihat.

### 2. Footer Section
- **Layout**: Bar mendatar di dasar layar. Latar warna biru super gelap / navy (`bg-slate-900` atau `#0c1424`).
- **Konten Kiri**: Nama lengkap pemilik portofolio.
- **Konten Tengah**: Barisan icon sosial media (Instagram, YouTube, Facebook, LinkedIn).
- **Konten Kanan**: Teks hak cipta ("© 2026 ...").
- **Sumber Data**: Data icon & link sosial media serta nama pengguna harus diambil dari representasi user dalam Mock API (misal data bawaan `HeroData.socials` dan `HeroData.name`).

---

## Tahapan Implementasi

Catatan untuk Implementator (Junior Programmer / AI): Kerjakan langkah-langkah ini secara konsekutif.

### Fase 1: Perluasan Mock API untuk Footer (opsional)
1. Periksa `src/data/mockApi.ts`. Jika data pengguna dan socials sudah ada dalam `HeroData`, Anda bisa membuat endpoint terpisah atau cukup gunakan ulang endpoint `fetchHeroData()`. Disarankan untuk menambahkan pemanggilan `fetchHeroData` di komponen Footer.

### Fase 2: Pembuatan Komponen Call to Action (`CtaSection.tsx`)
1. Buat fle `CtaSection.tsx` di `src/components/shared/`.
2. Gunakan pattern grid (sama dengan yang digunakan di section sebelumnya) sebagai background *pseudo-element*.
3. Implementasikan efek mengetik:
   - Anda bisa menggunakan `framer-motion` dengan varian stagger untuk menampilkan per huruf, **ATAU** membuat custom hook `useTypewriter` sederhana di React.
4. Buat styling untuk tombol menggunakan *Lucide React* icon (misal `<Send />` dan `<Calendar />`).

### Fase 3: Rekonstruksi Komponen `Footer.tsx`
1. Buka file `src/components/shared/Footer.tsx`.
2. Ubah ini menjadi komponen klien (`"use client"`) jika Anda berniat fetch data di sisi klien.
3. Fetch data `socials` dan `name` dari service API tiruan.
4. Buat layout *flexbox* horizontal. Di perangkat *mobile*, biarkan susunannya menjadi kolom bersusun.

### Fase 4: Integrasi
1. Gabungkan komponen `CtaSection` dan `Footer` terbaru ke dalam hirarki `app/layout.tsx` atau `app/page.tsx` sesuai struktur proyek yang ada (disarankan `CtaSection` berada di akhir `page.tsx`, dan `Footer` diperbarui di dalam `layout.tsx`).
2. Pastikan responsivitasnya mulus agar tombol tidak bertabrakan di layar hape.
