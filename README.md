# Tampilan
## index.html
<img width="1911" height="1031" alt="image" src="https://github.com/user-attachments/assets/aee352af-7111-48cb-ab8b-540f4cb5d5bd" />

## form.html
<img width="1908" height="1034" alt="image" src="https://github.com/user-attachments/assets/0a8e89e9-8218-4ab8-a4dd-c80b332ec432" />


## Fitur

### 1. Katalog Produk (`index.html`)

- Mengambil data produk dari [DummyJSON Products API](https://dummyjson.com/products?limit=0) menggunakan Fetch API.
- Menampilkan nama, harga, kategori, dan gambar produk.
- Menampilkan katalog smartphone, laptop, fashion pria, perlengkapan olahraga, serta tas dan aksesori.
- Menampilkan status loading dan pesan error dengan tombol **Coba lagi** jika permintaan gagal.
- Mencari produk berdasarkan nama atau kategori secara langsung.
- Menampilkan jumlah produk yang cocok dengan pencarian.

### 2. Pendaftaran Member (`form.html`)

- Formulir berisi nama lengkap, email, password, konfirmasi password, kategori favorit, dan persetujuan syarat.
- Validasi nama, format email, password, konfirmasi password, dan persetujuan.
- Validasi langsung saat pengguna mengetik atau meninggalkan kolom.
- Indikator kekuatan password dan tombol untuk menampilkan atau menyembunyikan password.
- Menampilkan pesan hasil dan ringkasan pendaftaran secara dinamis.

> Pendaftaran hanya disimulasikan di browser. Data tidak dikirim ke server atau disimpan ke database.

### 3. Tampilan

- Navigasi antara halaman katalog dan member.
- Mode terang dan gelap; pilihan tema disimpan di `localStorage` browser.
- Layout responsif untuk perangkat seluler dan desktop.

## Teknologi

- HTML5
- CSS3
- JavaScript native
- Fetch API
- [DummyJSON](https://dummyjson.com/) sebagai sumber data produk
- Google Fonts (Inter)

## Struktur Proyek

```text
Tugas Week6/
├── index.html
├── form.html
├── favicon.svg
├── README.md
├── css/
│   ├── style.css
│   └── form.css
└── js/
    ├── products.js
    ├── form.js
    └── theme.js
```

## Cara Menjalankan

1. Pastikan perangkat terhubung ke internet agar katalog produk dan font dapat dimuat.
2. Buka `index.html` di browser.
3. Gunakan menu **Produk** dan **Member** untuk berpindah halaman.

Jika browser membatasi permintaan API saat halaman dibuka langsung, jalankan proyek menggunakan ekstensi server lokal seperti **Live Server** di Visual Studio Code, lalu buka alamat lokal yang disediakan.
