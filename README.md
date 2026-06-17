# Sistem Informasi Perpustakaan Berbasis Web pada SDN Pabelan 2 Kartasura

Proyek ini dibangun sebagai bagian dari persyaratan kelulusan pada tahun 2024.

**Dikembangkan oleh:** Royan Saifur Robbi (L200190196)

## Tech Stack

Proyek ini dibangun menggunakan teknologi berikut:
- [Laravel 10](https://laravel.com/)
- [Laravel Breeze](https://github.com/laravel/breeze)
- [InertiaJS](https://inertiajs.com/)
- [ReactJS](https://react.dev/)
- [Html5-QRCode](https://github.com/mebjas/html5-qrcode) (untuk *barcode scanner*)
- [React-pdf](https://react-pdf.org/) (untuk pembuatan PDF)

## Requirements

Pastikan sistem Anda memenuhi persyaratan minimum berikut:

| Kebutuhan | Versi |
| :--- | :---: |
| PHP | 8.1+ |
| Composer | 2.4+ |
| NodeJS | 18+ |
| NPM | 8+ |
| Database | MySQL / MariaDB |

## Installation

Ikuti langkah-langkah berikut untuk menjalankan proyek ini di mesin lokal Anda:

1. Buka terminal di direktori root proyek.
2. Instal dependensi PHP dan Node.js:
   ```bash
   composer install
   npm install
   ```
3. Salin file konfigurasi environment:
   ```bash
   cp .env.example .env
   ```
4. Sesuaikan konfigurasi database (seperti `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`) di dalam file `.env` yang baru saja dibuat.
5. Generate _application key_ dan bersihkan _cache_ konfigurasi sebelumnya:
   ```bash
   php artisan key:generate
   php artisan optimize:clear
   ```
6. Jalankan migrasi database beserta _dummy data_ (seeder):
   ```bash
   php artisan migrate --seed
   ```

## Development & Build

Untuk mulai menjalankan _server development_, gunakan dua terminal terpisah:

**Terminal 1 (Backend):**
```bash
php artisan serve
```

**Terminal 2 (Frontend):**
```bash
npm run dev
```

Jika Anda ingin melakukan _build frontend_ untuk tahap produksi, gunakan perintah:
```bash
npm run build
```

Terima kasih telah mengunjungi repositori ini. Semoga proyek ini dapat bermanfaat atau menjadi referensi pembelajaran!
