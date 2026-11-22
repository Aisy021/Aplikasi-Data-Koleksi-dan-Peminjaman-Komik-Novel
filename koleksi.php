<?php
require_once "config/koneksi.php";

if (isset($_GET['hapus'])) {
    $id = $_GET['hapus'];

    $queryHapus = mysqli_query($conn, "DELETE FROM koleksi WHERE id_koleksi = '$id'");

    header("Location: koleksi.php");
    exit;
}

$editData = null;

if (isset($_GET['edit'])) {
    $id = $_GET['edit'];

    $queryEdit = mysqli_query($conn, "SELECT * FROM koleksi WHERE id_koleksi = '$id'");
    $editData = mysqli_fetch_assoc($queryEdit);
}

if (isset($_POST['update'])) {
    $id = $_POST['id_koleksi'];
    $judul = $_POST['judul'];
    $id_genre = $_POST['id_genre'];
    $penulis = $_POST['penulis'];
    $status = $_POST['status'];

    $queryUpdate = mysqli_query($conn, "UPDATE koleksi SET
        judul = '$judul',
        id_genre = '$id_genre',
        penulis = '$penulis',
        status = '$status'
        WHERE id_koleksi = '$id'");

    header("Location: koleksi.php");
    exit;
}

if (isset($_POST['tambah'])) {
    $judul = $_POST['judul'];
    $id_genre = $_POST['id_genre'];
    $penulis = $_POST['penulis'];
    $status = $_POST['status'];

    $query = "INSERT INTO koleksi (judul, id_genre, penulis, status)
              VALUES ('$judul', '$id_genre', '$penulis', '$status')";

    mysqli_query($conn, $query);

    header("Location: koleksi.php");
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
        .main-content {
            margin-left: 165px;
            width: calc(100% - 165px);
        }
        .content-area {
            padding: 32px 30px;
            width: 100%;
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
        <div class="content-area p-4 m-4">
        <!-- FORM KOLEKSI -->
            <div class="form-koleksi mb-4 border border-dark">
                <div class="form-header fw-bold px-3 py-2 border-bottom border-dark">Form Koleksi
                </div>
                <div class="p-3">
                    <form method="POST" action="">
                        <div class="row g-3 align-items-center mb-2">
                            <div class="col-lg-3 col-md-6">
                                <label class="form-label">Judul Koleksi</label>
                                <input type="text" name="judul" id="judul" class="form-control form-control-sm border-dark" placeholder="Masukkan Judul" value="<?= $editData ? htmlspecialchars($editData['judul']) : ''; ?>" required>
                            </div>
                            <div class="col-lg-3 col-md-6">
                                <label class="form-label">Genre</label>
                                <select name="id_genre" id="genre" class="form-select form-select-sm border-dark" required>
                                    <option value="">Pilih Genre</option>

                                    <?php
                                    $queryGenre = mysqli_query($conn, "SELECT * FROM genre");

                                    while ($genre = mysqli_fetch_assoc($queryGenre)) {
                                        $selected = ($editData && $editData['id_genre'] == $genre['id_genre']) ? 'selected' : '';
                                    ?>
                                        <option value="<?= $genre['id_genre']; ?>">
                                            <?= $genre['nama_genre']; ?>
                                        </option>
                                    <?php } ?>
                                </select>
                            </div>
                            <div class="col-lg-3 col-md-6">
                                <label class="form-label">Penulis</label>
                                <input type="text" name="penulis" id="penulis" class="form-control form-control-sm border-dark" placeholder="Masukkan Penulis" value="<?= $editData ? htmlspecialchars($editData['penulis']) : ''; ?>" required>
                            </div>
                            <div class="col-lg-3 col-md-6">
                                <label class="form-label">Status</label>
                                <select name="status" id="status" class="form-select form-select-sm border-dark" required>
                                    <option value="">Pilih Status</option>
                                    <option value="Tersedia" <?= ($editData && $editData['status'] == 'Tersedia') ? 'selected' : ''; ?>>Tersedia</option>
                                    <option value="Dipinjam" <?= ($editData && $editData['status'] == 'Dipinjam') ? 'selected' : ''; ?>>Dipinjam</option>
                                </select>
                            </div>
                        </div>
                        <div class="text-center mt-2">
                            <?php if ($editData) { ?>
                                <input type="hidden" name="id_koleksi" value="<?= $editData['id_koleksi']; ?>">
                                <button type="submit" name="update" class="btn btn-secondary w-50">Simpan Perubahan</button>
                            <?php } else { ?>
                                <button type="submit" name="tambah" id="tombolTambah" class="btn btn-primary w-50">Tambah Koleksi</button>
                            <?php } ?>
                        </div>
                    </form>
                </div>
            </div>
            <!-- PENCARIAN KOLEKSI -->
            <div class="row g-3 align-items-center mb-2">
                <div class="col-lg-5 col-md-6">
                    <div class="input-group">
                        <span class="input-group-text bg-white border-dark">
                            <i class="bi bi-search"></i>
                        </span>
                        <input type="text" id="cariJudul" class="form-control border-dark" placeholder="Cari judul...">
                    </div>
                </div>
                <div class="col-lg-3 col-md-4">
                    <select id="filterGenre" class="form-select border-dark">
                        <option value="">Semua Genre</option>
                        <option value="Komik">Komik</option>
                        <option value="Novel">Novel</option>
                    </select>
                </div>
                <div class="d-grid col-lg-4 col-md-5">
                    <button type="button" id="tombolCari" class="btn btn-primary btn-md">Cari</button>
                </div>
            </div>
            <!-- TABEL KOLEKSI -->
            <div class="table-responsive mt-2">
                <table class="table table-bordered mb-0 text-center">
                    <thead>
                        <tr>
                            <th style="width: 6%;">No</th>
                            <th style="width: 25%;">Judul</th>
                            <th style="width: 12%;">Genre</th>
                            <th style="width: 20%;">Penulis</th>
                            <th style="width: 12%;">Status</th>
                            <th style="width: 15%;">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        $no = 1;
                        $queryKoleksi = mysqli_query($conn, "
                            SELECT koleksi.*, genre.nama_genre
                            FROM koleksi
                            JOIN genre ON koleksi.id_genre = genre.id_genre
                        ");

                        while ($data = mysqli_fetch_assoc($queryKoleksi)) {
                        ?>
                            <tr>
                                <td><?= $no++; ?></td>
                                <td><?= htmlspecialchars($data['judul']); ?></td>
                                <td><?= htmlspecialchars($data['nama_genre']); ?></td>
                                <td><?= htmlspecialchars($data['penulis']); ?></td>
                                <td><?= htmlspecialchars($data['status']); ?></td>
                                <td>
                                    <a href="koleksi.php?edit=<?= $data['id_koleksi']; ?>"
                                    class="btn btn-secondary btn-sm">
                                    Edit
                                    </a>
                                    <a href="koleksi.php?hapus=<?= $data['id_koleksi']; ?>"
                                    class="btn btn-danger btn-sm"
                                    onclick="return confirm('Yakin ingin menghapus koleksi ini?')">
                                    Hapus
                                    </a>
                                </td>
                            </tr>
                        <?php } ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <script src="aset/js/bootstrap.bundle.min.js"></script>
    <script src="aset/js/koleksi.js"></script>
    <script src="aset/js/search.js"></script>
</body>
</html>