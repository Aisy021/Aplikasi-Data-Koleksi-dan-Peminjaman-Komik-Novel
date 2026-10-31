// Mengambil elemen HTML
const formFilter = document.getElementById("formFilter");
const filterGenre = document.getElementById("filterGenre");
const filterStatus = document.getElementById("filterStatus");
const tanggalMulai = document.getElementById("tanggalMulai");
const tanggalAkhir = document.getElementById("tanggalAkhir");

const hasilLaporan = document.getElementById("hasilLaporan");
const jumlahData = document.getElementById("jumlahData");
const tombolReset = document.getElementById("tombolReset");

// Mengambil data dari localStorage
const daftarKoleksi = JSON.parse(
    localStorage.getItem("daftarKoleksi")
) || [];

const daftarPeminjaman = JSON.parse(
    localStorage.getItem("daftarPeminjaman")
) || [];

// Membuat data laporan
function buatDataLaporan() {
    return daftarKoleksi.map(function(koleksi) {

        // Mencari riwayat peminjaman terbaru untuk koleksi ini
        const riwayat = daftarPeminjaman
            .filter(function(data) {
                return Number(data.koleksiId) === Number(koleksi.id);
            })
            .sort(function(a, b) {
                return Number(b.id) - Number(a.id);
            });

        const peminjamanTerbaru = riwayat[0];

        let statusLaporan = koleksi.status;
        let tanggalPinjamData = "-";
        let batasKembaliData = "-";
        let tanggalKembaliData = "-";

        if (peminjamanTerbaru) {
            statusLaporan = peminjamanTerbaru.status;
            tanggalPinjamData = peminjamanTerbaru.tanggalPinjam || "-";
            batasKembaliData = peminjamanTerbaru.batasKembali || "-";
            tanggalKembaliData = peminjamanTerbaru.tanggalKembali || "-";
        }

        return {
            id: koleksi.id,
            judul: koleksi.judul,
            genre: koleksi.genre,
            status: statusLaporan,
            tanggalPinjam: tanggalPinjamData,
            batasKembali: batasKembaliData,
            tanggalKembali: tanggalKembaliData
        };
    });
}

// Menampilkan laporan berdasarkan filter
function tampilkanLaporan() {
    const genreDipilih = filterGenre.value;
    const statusDipilih = filterStatus.value;
    const mulai = tanggalMulai.value;
    const akhir = tanggalAkhir.value;

    if (mulai && akhir && mulai > akhir) {
        alert("Tanggal awal tidak boleh melewati tanggal akhir!");
        return;
    }

    let dataLaporan = buatDataLaporan();

    // Filter berdasarkan genre
    if (genreDipilih !== "") {
        dataLaporan = dataLaporan.filter(function(data) {
            return data.genre === genreDipilih;
        });
    }

    // Filter berdasarkan status
    if (statusDipilih !== "") {
        dataLaporan = dataLaporan.filter(function(data) {
            return data.status === statusDipilih;
        });
    }

    // Filter berdasarkan periode tanggal pinjam
    if (mulai || akhir) {
        dataLaporan = dataLaporan.filter(function(data) {
            if (data.tanggalPinjam === "-") {
                return false;
            }

            const sesuaiMulai = !mulai || data.tanggalPinjam >= mulai;
            const sesuaiAkhir = !akhir || data.tanggalPinjam <= akhir;

            return sesuaiMulai && sesuaiAkhir;
        });
    }

    hasilLaporan.innerHTML = "";

    if (dataLaporan.length === 0) {
        hasilLaporan.innerHTML = `
            <tr>
                <td colspan="7">Data laporan tidak ditemukan.</td>
            </tr>
        `;

        jumlahData.textContent = "0";
        return;
    }

    dataLaporan.forEach(function(data, index) {
        const baris = document.createElement("tr");

        const isi = [
            index + 1,
            data.judul,
            data.genre,
            data.status,
            data.tanggalPinjam,
            data.batasKembali,
            data.tanggalKembali
        ];

        isi.forEach(function(teks) {
            const kolom = document.createElement("td");
            kolom.textContent = teks || "-";
            baris.appendChild(kolom);
        });

        hasilLaporan.appendChild(baris);
    });

    jumlahData.textContent = dataLaporan.length;
}

// Tombol tampilkan laporan
formFilter.addEventListener("submit", function(event) {
    event.preventDefault();
    tampilkanLaporan();
});

// Tombol reset filter
tombolReset.addEventListener("click", function() {
    setTimeout(function() {
        tampilkanLaporan();
    }, 0);
});

// Menampilkan seluruh laporan saat halaman dibuka
tampilkanLaporan();
