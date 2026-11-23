// Mengambil elemen form dan input search
const formSearch = document.getElementById("formSearch");
const inputSearch = document.getElementById("inputSearch");

// Daftar halaman
const halaman = [
    {
        nama: "dashboard",
        url: "dashboard.html"
    },
    {
        nama: "koleksi",
        url: "koleksi.html"
    },
    {
        nama: "peminjam",
        url: "peminjam.html"
    },
    {
        nama: "peminjaman",
        url: "peminjaman.html"
    },
    {
        nama: "laporan",
        url: "laporan.html"
    }
];

// Proses pencarian
formSearch.addEventListener("submit", function(event) {
    event.preventDefault();

    // Mengambil kata yang diketik
    const pencarian = inputSearch.value.toLowerCase().trim();

    // Mencari halaman berdasarkan nama
    const hasil = halaman.find(function(item) {
        return item.nama === pencarian;
    });

    // Jika halaman ditemukan
    if (hasil) {
        window.location.href = hasil.url;
    } else {
        alert("Halaman tidak ditemukan!");
    }
});
