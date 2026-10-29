
const formPeminjam = document.getElementById("formPeminjam");
const inputNama = document.getElementById("nama");
const inputNoHP = document.getElementById("noHP");
const tabelPeminjam = document.getElementById("tabelPeminjam");
const tombolSimpan = document.getElementById("tombolSimpan");
const tombolBatal = document.getElementById("tombolBatal");

// Data awal peminjam
let daftarPeminjam = [
    {
        id: 1,
        nama: "Bunga Citra",
        noHP: "088216745960"
    },
];

let idBerikutnya = 4;
let idEdit = null;

// Menampilkan data peminjam ke tabel
function tampilkanPeminjam() {
    tabelPeminjam.innerHTML = "";

    daftarPeminjam.forEach(function(peminjam, index) {
        const baris = document.createElement("tr");

        baris.innerHTML = `
            <td>${index + 1}</td>
            <td></td>
            <td></td>
            <td>
                <button type="button"
                    class="btn btn-secondary btn-sm tombol-edit"
                    data-id="${peminjam.id}">
                    Edit
                </button>
                <button type="button"
                    class="btn btn-danger btn-sm tombol-hapus"
                    data-id="${peminjam.id}">
                    Hapus
                </button>
            </td>
        `;

        baris.cells[1].textContent = peminjam.nama;
        baris.cells[2].textContent = peminjam.noHP;

        tabelPeminjam.appendChild(baris);
    });
}

// Menambahkan dan mengedit data peminjam
formPeminjam.addEventListener("submit", function(event) {
    event.preventDefault();

    const nama = inputNama.value.trim();
    const noHP = inputNoHP.value.trim();

    if (nama === "" || noHP === "") {
        alert("Nama dan nomor HP harus diisi!");
        return;
    }

    if (!/^[0-9+\-\s]+$/.test(noHP)) {
        alert("Nomor HP hanya boleh berisi angka, tanda +, atau tanda -!");
        return;
    }

    if (idEdit === null) {
        daftarPeminjam.push({
            id: idBerikutnya++,
            nama: nama,
            noHP: noHP
        });

        alert("Data peminjam berhasil ditambahkan!");
    } else {
        const index = daftarPeminjam.findIndex(function(peminjam) {
            return peminjam.id === idEdit;
        });

        if (index !== -1) {
            daftarPeminjam[index].nama = nama;
            daftarPeminjam[index].noHP = noHP;

            alert("Data peminjam berhasil diedit!");
        }
    }

    formPeminjam.reset();
    idEdit = null;
    tombolSimpan.textContent = "Simpan";

    tampilkanPeminjam();
});

// Tombol Edit dan Hapus
tabelPeminjam.addEventListener("click", function(event) {
    const tombol = event.target.closest("button");

    if (!tombol) return;

    const id = Number(tombol.dataset.id);

    if (tombol.classList.contains("tombol-edit")) {
        const peminjam = daftarPeminjam.find(function(item) {
            return item.id === id;
        });

        if (!peminjam) return;

        inputNama.value = peminjam.nama;
        inputNoHP.value = peminjam.noHP;

        idEdit = id;
        tombolSimpan.textContent = "Simpan Perubahan";

        formPeminjam.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

    if (tombol.classList.contains("tombol-hapus")) {
        const yakin = confirm(
            "Apakah kamu yakin ingin menghapus data peminjam ini?"
        );

        if (yakin) {
            daftarPeminjam = daftarPeminjam.filter(function(item) {
                return item.id !== id;
            });

            if (idEdit === id) {
                formPeminjam.reset();
                idEdit = null;
                tombolSimpan.textContent = "Simpan";
            }

            tampilkanPeminjam();
            alert("Data peminjam berhasil dihapus!");
        }
    }
});

// Tombol Batal
tombolBatal.addEventListener("click", function() {
    idEdit = null;
    tombolSimpan.textContent = "Simpan";
});

// Menampilkan data awal
tampilkanPeminjam();
