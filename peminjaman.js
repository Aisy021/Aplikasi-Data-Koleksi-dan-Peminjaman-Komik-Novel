// Mengambil elemen HTML
const formPeminjaman = document.getElementById("formPeminjaman");
const namaTeman = document.getElementById("namaTeman");
const judulBuku = document.getElementById("judulBuku");
const tanggalPinjam = document.getElementById("tanggalPinjam");
const batasKembali = document.getElementById("batasKembali");

const formPengembalian = document.getElementById("formPengembalian");
const pilihPeminjam = document.getElementById("pilihPeminjam");
const tanggalKembali = document.getElementById("tanggalKembali");

const tabelDaftarPeminjam = document.getElementById("daftarPeminjam");

// Mengambil data dari localStorage
let daftarKoleksi = JSON.parse(
    localStorage.getItem("daftarKoleksi")
) || [];

let daftarTeman = JSON.parse(
    localStorage.getItem("daftarPeminjam")
) || [];

let daftarPeminjaman = JSON.parse(
    localStorage.getItem("daftarPeminjaman")
) || [];


// Menyimpan data ke localStorage
function simpanData() {
    localStorage.setItem(
        "daftarKoleksi",
        JSON.stringify(daftarKoleksi)
    );

    localStorage.setItem(
        "daftarPeminjam",
        JSON.stringify(daftarTeman)
    );

    localStorage.setItem(
        "daftarPeminjaman",
        JSON.stringify(daftarPeminjaman)
    );
}


// Membuat ID berikutnya
function buatId(data) {
    if (data.length === 0) return 1;

    return Math.max(...data.map(function(item) {
        return Number(item.id) || 0;
    })) + 1;
}


// Menampilkan nama teman dan daftar pengembalian
function tampilkanNamaTeman() {

    namaTeman.innerHTML =
        '<option value="">Pilih Nama Teman</option>';

    pilihPeminjam.innerHTML =
        '<option value="">Pilih Peminjam</option>';

    // Mengambil nama dari data halaman Peminjam
    daftarTeman.forEach(function(teman) {

        const option = document.createElement("option");

        option.value = teman.nama;
        option.textContent = teman.nama;

        namaTeman.appendChild(option);

    });

    // Menampilkan transaksi yang masih dipinjam
    daftarPeminjaman
        .filter(function(data) {
            return data.status === "Dipinjam";
        })
        .forEach(function(data) {

            const option = document.createElement("option");

            option.value = data.id;
            option.textContent =
                data.peminjam + " - " + data.judulBuku;

            pilihPeminjam.appendChild(option);

        });

}


// Menampilkan koleksi yang masih tersedia
function tampilkanKoleksi() {

    judulBuku.innerHTML =
        '<option value="">Pilih Koleksi</option>';

    daftarKoleksi
        .filter(function(koleksi) {
            return koleksi.status === "Tersedia";
        })
        .forEach(function(koleksi) {

            const option = document.createElement("option");

            option.value = koleksi.id;
            option.textContent = koleksi.judul;

            judulBuku.appendChild(option);

        });

}


// Memperbarui status koleksi
function ubahStatusKoleksi(idKoleksi, statusBaru) {

    const koleksi = daftarKoleksi.find(function(item) {
        return Number(item.id) === Number(idKoleksi);
    });

    if (koleksi) {
        koleksi.status = statusBaru;
    }

}


// Menampilkan daftar peminjaman
function tampilkanDaftarPeminjam() {

    tabelDaftarPeminjam.innerHTML = "";

    if (daftarPeminjaman.length === 0) {

        tabelDaftarPeminjam.innerHTML = `
            <tr>
                <td colspan="7">Belum ada data peminjaman.</td>
            </tr>
        `;

        return;
    }

    daftarPeminjaman.forEach(function(data, index) {

        const baris = document.createElement("tr");

        const isi = [
            index + 1,
            data.judulBuku,
            data.peminjam,
            data.tanggalPinjam,
            data.batasKembali,
            data.status
        ];

        isi.forEach(function(teks) {

            const kolom = document.createElement("td");

            kolom.textContent = teks || "-";

            baris.appendChild(kolom);

        });

        const kolomAksi = document.createElement("td");

        if (data.status === "Dipinjam") {

            const tombol = document.createElement("button");

            tombol.type = "button";
            tombol.className = "btn btn-success btn-sm";
            tombol.textContent = "Kembalikan";
            tombol.dataset.id = data.id;

            kolomAksi.appendChild(tombol);

        } else {

            kolomAksi.textContent = "Selesai";

        }

        baris.appendChild(kolomAksi);

        tabelDaftarPeminjam.appendChild(baris);

    });

}


// Menambahkan peminjaman
formPeminjaman.addEventListener("submit", function(event) {

    event.preventDefault();

    const nama = namaTeman.value;
    const idKoleksi = Number(judulBuku.value);
    const pinjam = tanggalPinjam.value;
    const batas = batasKembali.value;

    if (!nama || !idKoleksi || !pinjam || !batas) {

        alert("Semua data peminjaman harus diisi!");

        return;
    }

    if (batas < pinjam) {

        alert("Batas pengembalian tidak boleh sebelum tanggal pinjam!");

        return;
    }

    // Memastikan nama sudah terdaftar
    const teman = daftarTeman.find(function(item) {
        return item.nama === nama;
    });

    if (!teman) {

        alert("Nama teman belum terdaftar. Silakan tambahkan melalui halaman Peminjam.");

        tampilkanSemua();

        return;
    }

    // Memeriksa ketersediaan koleksi
    const koleksi = daftarKoleksi.find(function(item) {
        return Number(item.id) === idKoleksi;
    });

    if (!koleksi || koleksi.status !== "Tersedia") {

        alert("Koleksi tidak tersedia. Silakan pilih koleksi lain.");

        tampilkanKoleksi();

        return;
    }

    // Menyimpan data peminjaman
    daftarPeminjaman.push({

        id: buatId(daftarPeminjaman),

        koleksiId: idKoleksi,

        judulBuku: koleksi.judul,

        genre: koleksi.genre,

        peminjam: teman.nama,

        tanggalPinjam: pinjam,

        batasKembali: batas,

        tanggalKembali: "-",

        status: "Dipinjam"

    });

    // Mengubah status koleksi menjadi Dipinjam
    ubahStatusKoleksi(idKoleksi, "Dipinjam");

    simpanData();

    formPeminjaman.reset();

    tampilkanSemua();

    alert("Peminjaman berhasil disimpan!");

});


// Menyimpan pengembalian
formPengembalian.addEventListener("submit", function(event) {

    event.preventDefault();

    const id = Number(pilihPeminjam.value);
    const tanggal = tanggalKembali.value;

    if (!id || !tanggal) {

        alert("Pilih peminjam dan isi tanggal pengembalian!");

        return;
    }

    const data = daftarPeminjaman.find(function(item) {
        return Number(item.id) === id;
    });

    if (!data || data.status !== "Dipinjam") {

        alert("Data peminjaman tidak ditemukan atau sudah dikembalikan.");

        return;
    }

    if (tanggal < data.tanggalPinjam) {

        alert("Tanggal pengembalian tidak boleh sebelum tanggal pinjam!");

        return;
    }

    // Mengubah data pengembalian
    data.tanggalKembali = tanggal;

    data.status = "Dikembalikan";

    // Mengubah status koleksi menjadi Tersedia
    ubahStatusKoleksi(data.koleksiId, "Tersedia");

    simpanData();

    formPengembalian.reset();

    tampilkanSemua();

    alert("Pengembalian berhasil disimpan!");

});


// Tombol Kembalikan pada tabel
tabelDaftarPeminjam.addEventListener("click", function(event) {

    const tombol = event.target.closest("button");

    if (!tombol) return;

    const id = Number(tombol.dataset.id);

    const data = daftarPeminjaman.find(function(item) {
        return Number(item.id) === id;
    });

    if (!data || data.status !== "Dipinjam") return;

    // Mengisi pilihan peminjam
    pilihPeminjam.value = data.id;

    // Mengisi tanggal hari ini
    const hariIni = new Date();

    const tahun = hariIni.getFullYear();

    const bulan = String(hariIni.getMonth() + 1).padStart(2, "0");

    const hari = String(hariIni.getDate()).padStart(2, "0");

    tanggalKembali.value = `${tahun}-${bulan}-${hari}`;

    // Mengarahkan tampilan ke form pengembalian
    formPengembalian.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

});


// Menampilkan semua data
function tampilkanSemua() {

    tampilkanNamaTeman();

    tampilkanKoleksi();

    tampilkanDaftarPeminjam();

}


// Menampilkan data saat halaman dibuka
tampilkanSemua();
