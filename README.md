# Zidan Indra Nugraha - Developer Portfolio

Portfolio website modern dengan tema dark mode `#0b0c10`, aksen warm amber/gold (`#e5a93b`), dan sentuhan midnight indigo. Dibangun menggunakan React 19, Vite, Tailwind CSS, and Framer Motion untuk deployment otomatis di GitHub Pages (`https://zidanindra.github.io`).

Dilengkapi dengan **Admin CMS terintegrasi (Direct GitHub REST API)** untuk mengedit konten dan mengunggah asset baru langsung ke repository tanpa memerlukan backend eksternal.

---

## ✨ Fitur Utama

- **Hero Section Dinamis**:
  - Handwritten script greeting (*"Hello, I'm"*).
  - Judul profil, bio, dan tombol akses langsung ke **Portofolio Deck di Figma** (`https://shorturl.at/Wz8De`).
  - Foto cutout avatar dengan geometric wireframe loops gold berputar halus.
  - Floating status badge *"Open for Opportunities"*.
- **Floating Pill Navbar**:
  - Active section indicator saat scrolling.
  - Tombol **Download CV** (langsung mengunduh `CV_Zidan_Indra_Nugraha_Fullstack.pdf`).
  - Responsif dengan drawer menu di tampilan mobile.
- **Interactive Project Cards**:
  - Filter kategori (*All*, *AI / ML*, *Full-Stack*, *Web App*).
  - Efek 3D mouse tilt interaktif dan spotlight border glare saat cursor melintas.
  - Direct action buttons (Live Demo & GitHub repository).
- **Certificates Showcase**:
  - Grid sertifikat dan publikasi ilmiah (Jurnal MISI, Google DevFest, HKI Buku, PKM).
  - Lightbox modal resolusi tinggi saat kartu sertifikat diklik.
- **Skills Matrix**:
  - Pengelompokan Frontend, Backend, Machine Learning & AI, dan Tools/DevOps.
- **Contact & Celebration**:
  - Form kontak dengan trigger efek konfeti dan integrasi `mailto:`.
- **Integrated Admin CMS (`#/admin`)**:
  - PIN-protected gate (PIN default: `123456`).
  - GitHub REST API direct commit engine: simpan perubahan JSON atau unggah asset langsung ke branch `master`.
  - Preview mode lokal (localStorage) sebelum melakukan commit.

---

## 🚀 Menjalankan Secara Lokal

1. **Install dependensi**:
   ```bash
   npm install
   ```

2. **Jalankan development server**:
   ```bash
   npm run dev
   ```
   Buka browser di `http://localhost:5173`.

3. **Menjalankan test suite**:
   ```bash
   npm test
   ```

4. **Build untuk production**:
   ```bash
   npm run build
   ```

---

## 🔐 Menggunakan Admin CMS

1. Buka URL portofolio dan tambahkan `#/admin` di akhir URL (misal: `http://localhost:5173/#/admin` atau link di footer).
2. Masukkan PIN keamanan (Default: `123456`).
3. Masukkan **GitHub Personal Access Token (PAT)** Anda:
   - Buat token di GitHub: *Settings -> Developer Settings -> Personal access tokens (classic)* dengan scope `repo`.
   - Token disimpan secara aman hanya di `localStorage` browser Anda.
4. Anda dapat:
   - Mengedit bio, link figma, email, dan profile.
   - Menambah, mengubah, atau menghapus daftar proyek.
   - Menambah atau mengubah data sertifikat.
   - Mengunggah file baru (PDF CV baru atau screenshot proyek) langsung ke folder `public/assets/`.
5. Klik **"Simpan Preview"** untuk mengecek tampilan terlebih dahulu, atau klik **"Commit ke GitHub"** untuk langsung mempublikasikannya ke branch `master`. GitHub Actions akan otomatis mendeploy versi terbaru ke GitHub Pages!

---

## 🌐 Deployment GitHub Pages

Workflow GitHub Actions sudah dikonfigurasi di `.github/workflows/deploy.yml`. Setiap ada commit/push ke branch `master`, sistem otomatis:
1. Membuild project dengan Vite.
2. Mengunggah folder `dist`.
3. Mempublish ke GitHub Pages (`https://zidanindra.github.io`).

Untuk memastikan GitHub Pages aktif:
- Masuk ke repo GitHub: **Settings -> Pages**.
- Di bagian **Source**, pilih **GitHub Actions**.
