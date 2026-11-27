const formPeminjam = document.getElementById("formPeminjam");
const inputNoHP = document.getElementById("noHP");

// Validasi nomor HP
formPeminjam.addEventListener("submit", function(event) {
    const noHP = inputNoHP.value.trim();

    if (!/^[0-9]+$/.test(noHP)) {
        event.preventDefault();
        alert("Nomor HP harus diisi dengan angka!");
        inputNoHP.focus();
        return;
    }
});
