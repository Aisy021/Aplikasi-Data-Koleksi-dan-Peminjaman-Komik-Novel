<?php
require_once "config/koneksi.php";

if (isset($_GET['hapus'])) {
    $id = $_GET['hapus'];

    $queryHapus = mysqli_query($conn, "DELETE FROM peminjam WHERE id_peminjam = '$id'");

    header("Location: peminjam.php");
    exit;
}

$editData = null;

if (isset($_GET['edit'])) {
    $id = $_GET['edit'];

    $queryEdit = mysqli_query($conn, "SELECT * FROM peminjam WHERE id_peminjam = '$id'");

    $editData = mysqli_fetch_assoc($queryEdit);
}

if (isset($_POST['update'])) {
    $id = $_POST['id_peminjam'];
    $nama = $_POST['nama'];
    $no_hp = $_POST['no_hp'];

    $queryUpdate = mysqli_query($conn, "UPDATE peminjam SET
        nama = '$nama',
        no_hp = '$no_hp'
        WHERE id_peminjam = '$id'");

    header("Location: peminjam.php");
    exit;
}

if (isset($_POST['tambah'])) {
    $nama = $_POST['nama'];
    $no_hp = $_POST['no_hp'];

    $query = "INSERT INTO peminjam (nama, no_hp)
              VALUES ('$nama', '$no_hp')";

    mysqli_query($conn, $query);

    header("Location: peminjam.php");
    exit;
}
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
        .form-header {
            background: #f3f3f3;
        }
        .form-koleksi {
            width: 100%;
            margin-left: 0;
        }
        .table-responsive {
            width: 100%;
        }
        .table {
            width: 100%;
            table-layout: fixed;
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
                    <input class="form-control ps-5" type="search" id="inputSearch" placeholder="Cari Dashboard, Koleksi, Teman, Peminjaman, Laporan">
                </div>
            </form>
            <div class="p-2">
                <i class="bi bi-person-fill fs-2 text-white"></i>
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
        <div class="content-area p-4 m-4 flex-grow-1">
        <!-- FORM PEMINJAM -->
            <div class="form-koleksi mb-4 border border-dark">
                <div class="form-header fw-bold px-3 py-2 border-bottom border-dark">Form Peminjam
                </div>
                <div class="p-3">
                    <form method="POST" id="formPeminjam" action="">
                        <div class="row mb-2 align-items-center">
                            <label class="col-md-2 col-form-label fw-semibold">Nama</label>
                            <label class="col-md-1 col-form-label text-center">:</label>
                            <div class="col-md-9">
                                <input type="text" name="nama" id="nama" class="form-control form-control-sm" placeholder="Masukkan Nama" value="<?= $editData ? htmlspecialchars($editData['nama']) : ''; ?>" required>
                            </div>
                        </div>
                        <div class="row mb-3 align-items-center">
                            <label class="col-md-2 col-form-label fw-semibold">NO. HP</label>
                            <label class="col-md-1 col-form-label text-center">:</label>
                            <div class="col-md-9">
                               <input type="text" name="no_hp" id="noHP" class="form-control form-control-sm" placeholder="Masukkan Nomor" value="<?= $editData ? htmlspecialchars($editData['no_hp']) : ''; ?>" required>
                                <div class="invalid-feedback">
                                    Harus diisi dengan angka.
                                </div>
                            </div>
                        </div>
                        <?php if ($editData) { ?>
                            <input type="hidden" name="id_peminjam" value="<?= $editData['id_peminjam']; ?>">
                            <button type="submit" name="update" class="btn btn-primary btn-sm px-4 me-2">Simpan Perubahan</button>
                        <?php } else { ?>
                            <button type="submit" name="tambah" id="tombolSimpan" class="btn btn-primary btn-sm px-4 me-2">Simpan</button>
                        <?php } ?>
                            <button type="reset" id="tombolBatal" class="btn btn-light border border-secondary btn-sm px-4">Batal</button>
                    </form>
                </div>
            </div>
            <!-- TABEL KOLEKSI -->
            <div class="table-responsive mt-2">
                <table class="table table-bordered mb-0 text-center">
                    <thead>
                        <tr>
                            <th style="width: 3%;">No</th>
                            <th style="width: 15%;">Nama</th>
                            <th style="width: 10%;">NO. HP</th>
                            <th style="width: 8%;">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        $no = 1;
                        $queryPeminjam = mysqli_query($conn, "SELECT * FROM peminjam");

                        while ($data = mysqli_fetch_assoc($queryPeminjam)) {
                        ?>
                            <tr>
                                <td><?= $no++; ?></td>
                                <td><?= htmlspecialchars($data['nama']); ?></td>
                                <td><?= htmlspecialchars($data['no_hp']); ?></td>
                                <td>
                                    <a href="peminjam.php?edit=<?= $data['id_peminjam']; ?>" class="btn btn-secondary btn-sm">Edit</a>
                                    <a href="peminjam.php?hapus=<?= $data['id_peminjam']; ?>" class="btn btn-danger btn-sm">Hapus</a>
                                </td>
                            </tr>
                        <?php } ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <script src="aset/js/bootstrap.bundle.min.js"></script>
    <script src="aset/js/peminjam.js"></script>
    <script src="aset/js/search.js"></script>
</body>
</html>
