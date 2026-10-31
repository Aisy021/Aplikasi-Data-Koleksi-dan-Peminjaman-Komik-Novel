// Username dan password login
const usernameBenar = "admin";
const passwordBenar = "12345";

// Mengambil form login
const formLogin = document.getElementById("formLogin");

formLogin.addEventListener("submit", function(event) {

    event.preventDefault();

    // Mengambil nilai username dan password
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value;

    let pesan = document.getElementById("pesanLogin");

    // Memeriksa kolom kosong
    if (username === "" || password === "") {
        pesan.textContent = "Username dan password wajib diisi!";
        return;
    }

    // Memeriksa kecocokan akun
    if (username === usernameBenar && password === passwordBenar) {

        // Menyimpan status login
        sessionStorage.setItem("sudahLogin", "true");

        // Masuk ke Dashboard
        window.location.href = "dashboard.html";

    } else {
        pesan.textContent = "Username atau password salah!";
    }

});
