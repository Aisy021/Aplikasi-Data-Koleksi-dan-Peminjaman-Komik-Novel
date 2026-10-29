
const formKoleksi = document.getElementById("formKoleksi");
const inputJudul = document.getElementById("judul");
const inputGenre = document.getElementById("genre");
const inputPenulis = document.getElementById("penulis");
const inputStatus = document.getElementById("status");
const tabelKoleksi = document.getElementById("tabelKoleksi");
const tombolTambah = document.getElementById("tombolTambah");

const cariJudul = document.getElementById("cariJudul");
const filterGenre = document.getElementById("filterGenre");
const tombolCari = document.getElementById("tombolCari");
console.log("JavaScript koleksi berhasil dijalankan!");
alert("JavaScript berhasil dijalankan!");

// Data awal koleksi
let dataAwal = [
    {
        id: 1,
        judul: "One Piece Vol. 1",
        genre: "Komik",
        penulis: "Eiichiro Oda",
        status: "Tersedia"
    },
    {
        id: 2,
        judul: "Dilan 1990",
        genre: "Novel",
        penulis: "Pidi Baiq",
        status: "Dipinjam"
    },
    {
        id: 3,
        judul: "Laut Bercerita",
        genre: "Novel",
        penulis: "Leila S. Chudori",
        status: "Tersedia"
    }
];

let daftarKoleksi = JSON.parse(
    localStorage.getItem("daftarKoleksi")
) || dataAwal;

let idBerikutnya = daftarKoleksi.length > 0
    ? Math.max(...daftarKoleksi.map(function(koleksi) {
        return koleksi.id;
    })) + 1
    : 1;
let idEdit = null;

// Menampilkan data ke tabel
function tampilkanKoleksi() {
    const kataKunci = cariJudul.value.toLowerCase().trim();
    const genreDipilih = filterGenre.value;

    const hasilFilter = daftarKoleksi.filter(function(koleksi) {
        const cocokJudul = koleksi.judul
            .toLowerCase()
            .includes(kataKunci);

        const cocokGenre = genreDipilih === "" ||
            koleksi.genre === genreDipilih;

        return cocokJudul && cocokGenre;
    });

    tabelKoleksi.innerHTML = "";

    if (hasilFilter.length === 0) {
        tabelKoleksi.innerHTML = `
            <tr>
                <td colspan="6">Data koleksi tidak ditemukan.</td>
            </tr>
        `;
        return;
    }

    hasilFilter.forEach(function(koleksi, index) {
        const baris = document.createElement("tr");

        baris.innerHTML = `
            <td>${index + 1}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
                <button type="button"
                    class="btn btn-secondary btn-sm tombol-edit"
                    data-id="${koleksi.id}">
                    Edit
                </button>
                <button type="button"
                    class="btn btn-secondary btn-sm tombol-hapus"
                    data-id="${koleksi.id}">
                    Hapus
                </button>
            </td>
        `;

        // Mengisi teks dengan aman
        baris.cells[1].textContent = koleksi.judul;
        baris.cells[2].textContent = koleksi.genre;
        baris.cells[3].textContent = koleksi.penulis;
        baris.cells[4].textContent = koleksi.status;

        tabelKoleksi.appendChild(baris);
    });
}

// Menambah dan mengedit koleksi
formKoleksi.addEventListener("submit", function(event) {
    event.preventDefault();

    const judul = inputJudul.value.trim();
    const genre = inputGenre.value;
    const penulis = inputPenulis.value.trim();
    const status = inputStatus.value;

    if (!judul || !genre || !penulis || !status) {
        alert("Semua data harus diisi!");
        return;
    }

    if (idEdit === null) {
        daftarKoleksi.push({
            id: idBerikutnya++,
            judul: judul,
            genre: genre,
            penulis: penulis,
            status: status
        });

        alert("Koleksi berhasil ditambahkan!");
    } else {
        const index = daftarKoleksi.findIndex(function(koleksi) {
            return koleksi.id === idEdit;
        });

        if (index !== -1) {
            daftarKoleksi[index].judul = judul;
            daftarKoleksi[index].genre = genre;
            daftarKoleksi[index].penulis = penulis;
            daftarKoleksi[index].status = status;

            alert("Koleksi berhasil diedit!");
        }
    }

    formKoleksi.reset();
    idEdit = null;
    tombolTambah.textContent = "Tambah Koleksi";

    localStorage.setItem(
        "daftarKoleksi",
        JSON.stringify(daftarKoleksi)
    );

    tampilkanKoleksi();
});

// Tombol Edit dan Hapus
tabelKoleksi.addEventListener("click", function(event) {
    const tombol = event.target.closest("button");

    if (!tombol) return;

    const id = Number(tombol.dataset.id);

    if (tombol.classList.contains("tombol-edit")) {
        const koleksi = daftarKoleksi.find(function(item) {
            return item.id === id;
        });

        if (!koleksi) return;

        inputJudul.value = koleksi.judul;
        inputGenre.value = koleksi.genre;
        inputPenulis.value = koleksi.penulis;
        inputStatus.value = koleksi.status;

        idEdit = id;
        tombolTambah.textContent = "Simpan Perubahan";

        formKoleksi.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

    if (tombol.classList.contains("tombol-hapus")) {
        const yakin = confirm(
            "Apakah kamu yakin ingin menghapus koleksi ini?"
        );

        if (yakin) {
            daftarKoleksi = daftarKoleksi.filter(function(item) {
                return item.id !== id;
            });

            localStorage.setItem(
            "daftarKoleksi",
            JSON.stringify(daftarKoleksi)
            );

            if (idEdit === id) {
                formKoleksi.reset();
                idEdit = null;
                tombolTambah.textContent = "Tambah Koleksi";
            }

            tampilkanKoleksi();
            alert("Koleksi berhasil dihapus!");
        }
    }
});

// Pencarian berdasarkan judul
tombolCari.addEventListener("click", tampilkanKoleksi);

cariJudul.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        tampilkanKoleksi();
    }
});

// Filter berdasarkan genre
filterGenre.addEventListener("change", tampilkanKoleksi);

// Tampilkan data awal
tampilkanKoleksi();
