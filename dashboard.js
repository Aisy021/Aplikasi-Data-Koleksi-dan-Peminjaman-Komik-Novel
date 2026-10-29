
const totalKoleksi = document.getElementById("totalKoleksi");
const totalTersedia = document.getElementById("totalTersedia");
const totalDipinjam = document.getElementById("totalDipinjam");

// Mengambil data koleksi dari localStorage
function tampilkanDashboard() {
    const daftarKoleksi = JSON.parse(
        localStorage.getItem("daftarKoleksi")
    ) || [];

    const jumlahKoleksi = daftarKoleksi.length;

    const jumlahTersedia = daftarKoleksi.filter(function(koleksi) {
        return koleksi.status === "Tersedia";
    }).length;

    const jumlahDipinjam = daftarKoleksi.filter(function(koleksi) {
        return koleksi.status === "Dipinjam";
    }).length;

    totalKoleksi.textContent = jumlahKoleksi;
    totalTersedia.textContent = jumlahTersedia;
    totalDipinjam.textContent = jumlahDipinjam;
}

// Menampilkan jumlah koleksi
tampilkanDashboard();
