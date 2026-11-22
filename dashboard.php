<?php
require_once "config/koneksi.php";

// Menghitung total koleksi
$queryTotal = mysqli_query($conn, "SELECT COUNT(*) AS total FROM koleksi");
$dataTotal = mysqli_fetch_assoc($queryTotal);
$totalKoleksi = $dataTotal['total'];

// Menghitung koleksi tersedia
$queryTersedia = mysqli_query($conn, "SELECT COUNT(*) AS total FROM koleksi WHERE status = 'Tersedia'");
$dataTersedia = mysqli_fetch_assoc($queryTersedia);
$totalTersedia = $dataTersedia['total'];

// Menghitung koleksi dipinjam
$queryDipinjam = mysqli_query($conn, "SELECT COUNT(*) AS total FROM koleksi WHERE status = 'Dipinjam'");
$dataDipinjam = mysqli_fetch_assoc($queryDipinjam);
$totalDipinjam = $dataDipinjam['total'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aplikasi Data Koleksi</title>
    <link rel="stylesheet" href="aset/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <style>
        .navbar {
            background: #007bff;
        }
        .sidebar-link {
            transition: 0.2s;
        }
        .sidebar-link:hover {
            background-color: #dbeafe;
            color: #007bff !important;
        }
        .sidebar-link.active {
            background-color: #cfe2ff;
            color: #007bff !important;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg border-bottom py-0">
        <div class="container-fluid">
            <span class="navbar-brand fw-bold text-white">Kelola Komik&Novel</span>
            <form class="d-flex mx-auto w-50" id="formSearch">
                <div class="position-relative w-100">
                    <button type="submit" class="btn position-absolute top-50 start-0 translate-middle-y p-0 ms-2">
                        <i class="bi bi-search"></i>
                    </button>
                    <input class="form-control ps-5" type="search" id="inputSearch" placeholder="Cari Dashboard, Koleksi, Peminjam, Peminjaman, Laporan">
                </div>
            </form>
            <div class="p-2">
                <i class="bi bi-person-fill fs-2"></i>
            </div>
        </div>
    </nav>
    <div class="d-flex align-items-stretch" style="min-height: calc(100vh - 45px);">
        <!-- Sidebar -->
        <aside class="bg-light border-end border-bottom border-dark d-flex flex-column flex-shrink-0" style="width: 220px; align-self: stretch;">
            <nav class="nav flex-column">
                <a href="dashboard.php" class="nav-link sidebar-link text-dark border-bottom border-dark d-flex align-items-center gap-2 py-1 px-2">
                    <i class="bi bi-house-door-fill"></i>
                    <span>DASHBOARD</span>
                </a>
                <a href="koleksi.php" class="nav-link sidebar-link text-dark border-bottom border-dark d-flex align-items-center gap-2 py-1 px-2">
                    <i class="bi bi-bookmark-check"></i>
                    <span>KOLEKSI</span>
                </a>
                <a href="peminjam.php" class="nav-link sidebar-link text-dark border-bottom border-dark d-flex align-items-center gap-2 py-1 px-2">
                    <i class="bi bi-people-fill"></i>
                    <span>PEMINJAM</span>
                </a>
                <a href="peminjaman.html" class="nav-link sidebar-link text-dark border-bottom border-dark d-flex align-items-center gap-2 py-1 px-2">
                    <i class="bi bi-arrow-left-right"></i>
                    <span>PEMINJAMAN</span>
                </a>
                <a href="laporan.html" class="nav-link sidebar-link text-dark border-bottom border-dark d-flex align-items-center gap-2 py-1 px-2">
                    <i class="bi bi-bar-chart-fill"></i>
                    <span>LAPORAN</span>
                </a>
            </nav>
            <a href="login.html" class="nav-link sidebar-link text-dark mt-auto border-top border-dark d-flex align-items-center justify-content-center gap-2 py-1">
                <i class="bi bi-box-arrow-right"></i>
                <span>LOGOUT</span>
            </a>
        </aside>
        <!-- Content -->
        <main class="flex-grow-1 p-4">
            <h1 class="fs-3 fw-bold ps-5 pt-4 mb-5">DASHBOARD</h1>
            <div class="row d-flex justify-content-between gap-3">
                <div class="border border-dark rounded-4 p-3 text-center col-md-6 mx-auto" style="width: 145px; height: 79px;">
                    <p class="mb-1 small">Total Koleksi</p>
                    <h2 id="totalKoleksi" class="fs-5 fw-bold">
                        <?= $totalKoleksi; ?>
                    </h2>
                </div>
                <div class="border border-dark rounded-4 p-3 text-center col-md-6 mx-auto" style="width: 145px; height: 79px;">
                    <p class="mb-1 small">Tersedia</p>
                    <h2 id="totalTersedia" class="fs-5 fw-bold">
                        <?= $totalTersedia; ?>
                    </h2>
                </div>
                <div class="border border-dark rounded-4 p-3 text-center col-md-6 mx-auto" style="width: 145px; height: 79px;">
                    <p class="mb-1 small">Dipinjam</p>
                    <h2 id="totalDipinjam" class="fs-5 fw-bold">
                        <?= $totalDipinjam; ?>
                    </h2>
                </div>
            </div>
        </main>
    </div>
    <script src="aset/js/bootstrap.bundle.min.js"></script>
    <script src="aset/js/search.js"></script>
</body>
</html>