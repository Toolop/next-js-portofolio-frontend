# Issue: Pembuatan Halaman /register dan Integrasi API Authentication (Login & Register)

## Deskripsi Tugas
Tugas ini memiliki dua tujuan utama:
1. **Membuat halaman `/register`** dari awal dan mengintegrasikannya dengan API API registrasi.
2. **Mengintegrasikan halaman `/login`** yang sudah ada (atau membuat jika belum siap) dengan API API login.

Pastikan dalam pengerjaannya memperhatikan standar keamanan (*security best practices*). Termasuk dalam tugas ini adalah menyiapkan kerangka pengujian terotomatisasi (*Unit Test* dan *UI Test*) berdasarkan skenario yang telah ditentukan.

## Rincian API
Integrasikan form di kedua halaman tersebut dengan endpoint API berikut. Pastikan selalu menggunakan protokol HTTPS (tambahkan "https://" pada base URL).

### 1. API Registrasi
Digunakan pada halaman `/register` untuk mendaftarkan akun pengguna baru.
**Endpoint:**
```http
POST https://api-portofolio.declarationdigital.tech/users/register
Content-Type: application/json
```
**Payload Request:**
```json
{
    "name": "John Doe",
    "username": "johndoe",
    "email": "johndoe@example.com",
    "password": "password"
}
```

### 2. API Login
Digunakan pada halaman `/login` untuk proses otentikasi.
**Endpoint:**
```http
POST https://api-portofolio.declarationdigital.tech/users/login
Content-Type: application/json
```
**Payload Request:**
```json
{
  "email": "johndoe@example.com",
  "password": "password"
}
```

## Syarat Keamanan (Security Requirements)
Untuk menjamin keamanan aplikasi, pastikan implementasi Anda mencakup aspek berikut:
1. **Validasi Input Klien:** Pastikan data tervalidasi menggunakan skema validasi (misalnya Zod) sebelum data dikirimkan. Cek format email dan pastikan password memenuhi kriteria minimal dan tidak kosong.
2. **Pesan Kesalahan Generik (Error Handling):** Jika request gagal akibat kredensial/data yang salah, jangan tampilkan stack trace atau detail error mentah dari server. Gunakan pesan yang ramah pengguna seperti "Email atau password yang Anda masukkan salah" atau "Email sudah terdaftar, mohon gunakan layanan Login" jika error 400 dilontarkan.
3. **Pengelolaan State & Proteksi Double Submit:** Kunci (disable) tombol "Submit" selama request ke backend sedang berjalan untuk mencegah serangan *brute force* di sisi klien dan redundansi pemanggilan API.
4. **Keamanan Penyimpanan Token (Jika Menggunakan Token):** Apabila API mengembalikan token (seperti JWT auth), sangat direkomendasikan menyimpannya di lapisan Cookie berbasis `httpOnly` dan `Secure`. Sebisa mungkin hindari penyimpanan parameter sesi atau kredensial langsung pada `localStorage` demi memitigasi serangan pencurian sesi melalui *Cross-Site Scripting (XSS)*.
5. **Hindari XSS pada UI:** Selalu hindari merender HTML secara langsung tanpa pengamanan (*escaping*) dari data balasan server (misal saat merender teks error respons UI dari API).

## Skenario Pengujian (Testing Scenarios)
Tulis *Unit Test* dan *UI/E2E Test* untuk integrasi di halaman `/login` dan `/register`. Jangan merencanakan interaksi testing-nya terlalu mendetail baris-demi-baris, namun pastikan pengujian meliputi seluruh skenario krusial berikut:

### 1. Skenario Unit Test (Logical API / Service Layer)
*   **Skenario Keberhasilan API:** Memastikan logic service API dapat dengan sukses merangkai payload request POST dengan format JSON yang sesuai kontrak dan mengembalikan balasan *response* secara sukses (kode `200` atau `201`).
*   **Skenario Penolakan (*Rejection/Invalid*):** Memastikan konektor service melontarkan (*throws*) ralat/custom error secara presisi ketika server menangani respons kegagalan (kode `400` Validasi maupun error `401` Unauthorized).
*   **Skenario Kegagalan Jaringan/Server:** Memastikan alur tertangani secara tidak fatal ketika terjadi *timeout*, API merespons `500 Internal Server Error`, atu putus sambungan *offline*.

### 2. Skenario UI Test (Interaksi Komponen Login)
*   **Render Integritas Form:** Memastikan seluruh field input yang dibutuhkan (nama, username, email, password untuk `/register`, serta email, password untuk `/login`), label, dan tombol Submit dirender semestinya.
*   **Aksi Submit dengan Isian Tidak Valid:** Menyimulasikan penekanan tombol Submit tatkala user belum mengisi apa-apa atau emailnya berupa isian *typo*. Uji bahwa akan bermunculan alert validasi form dan hal form tidak *trigger* POST API apa pun.
*   **Aksi Submit dalam Proses:** Menyimulasikan *flow loading* yakni ada penanda visual *loader* pada tombol/form disaat menunggu jawaban API, dengan kondisi disabled agar tak terklik berkali-kali.
*   **Aksi Ketika Gagal Autentikasi / Registrasi:** Menyimulasikan jawaban negatif berupa `Mock` data error dari API. Pastikan notifikasi / *toast* error termuncul di user interface secara elegan.
*   **Aksi Sukses Terotentikasi (*Redirect*):** Menyetel rekayasa keberhasilan dan verfikasi *hook* navigasi untuk mengarahkan pengguna secara otomatis sesaat setelah registrasi atau login berhasil di-POST. (misalnya diteruskan ke halaman Dasbor beranda atau rujukan login).

## Kriteria Penerimaan (Acceptance Criteria)
- [ ] Tersedianya komponen komponen halaman muka (UI view) di alur `/register` yang bersih.
- [ ] Implementasi integrasi API form POST pada `/users/register` dirangkaikan aman.
- [ ] Implementasi integrasi API form POST pada `/users/login` dirangkaikan aman.
- [ ] Pengelolaan *load UI status* (disable btn loader) serta penanganan notifikasi kesalahan taktisnya bekerja konsisten dan ramah kustomer.
- [ ] Script unit test dirancang khusus untuk memvalidasi lapisan komunikasi fungsional HTTP respons sukses dan tak ter-otorisasi.
- [ ] Cakupan *UI test scenarios* meliputi penyisiran isian tidak komplet, error handling mock network, serta penyelesaian rute sukses ke laman pasca-login.
