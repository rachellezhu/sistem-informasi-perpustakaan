<?php

use App\Http\Controllers\AuthorController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublisherController;
use App\Http\Controllers\SchoolClassController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\TrashedController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\URL;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

URL::forceScheme('https');

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/', function () {
    return Inertia::render('login');
})->name('login');

Route::middleware('auth')->group(function () {
    Route::get('/', function () {
        return redirect('/dashboard');
    });

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Profile routes
    Route::prefix('profile')->name('profile')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('.edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('.update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('.destroy');
    });

    // Book routes
    Route::prefix('buku')->name('book')->group(function () {
        Route::get('/', [BookController::class, 'index']);
        Route::get('/detail/{book}', [BookController::class, 'edit'])->name('.edit');
        Route::patch('/detail/{book}/update', [BookController::class, 'update'])->name('.update');
        Route::delete('/detail/{book}/delete', [BookController::class, 'destroy'])->name('.destroy');
        Route::get('/tambah', [BookController::class, 'create'])->name('.create');
        Route::post('/tambah', [BookController::class, 'store'])->name('.store');
    });

    // Category routes
    Route::prefix('kategori')->name('category')->group(function () {
        Route::get('/', [CategoryController::class, 'index']);
        Route::get('/detail/{category}', [CategoryController::class, 'edit'])->name('.edit');
        Route::patch('/detail/{category}/update', [CategoryController::class, 'update'])->name('.update');
        Route::delete('/detail/{category}/delete', [CategoryController::class, 'destroy'])->name('.destroy');
        Route::get('/tambah', [CategoryController::class, 'create'])->name('.create');
        Route::post('/tambah', [CategoryController::class, 'store'])->name('.store');
    });

    // Author routes
    Route::prefix('penulis')->name('author')->group(function () {
        Route::get('/', [AuthorController::class, 'index']);
        Route::get('/detail/{author}', [AuthorController::class, 'edit'])->name('.edit');
        Route::patch('/detail/{author}/update', [AuthorController::class, 'update'])->name('.update');
        Route::delete('/detail/{author}/delete', [AuthorController::class, 'destroy'])->name('.destroy');
        Route::get('/tambah', [AuthorController::class, 'create'])->name('.create');
        Route::post('/tambah', [AuthorController::class, 'store'])->name('.store');
    });

    // Publisher routes
    Route::prefix('penerbit')->name('publisher')->group(function () {
        Route::get('/', [PublisherController::class, 'index']);
        Route::get('/detail/{publisher}', [PublisherController::class, 'edit'])->name('.edit');
        Route::patch('/detail/{publisher}/update', [PublisherController::class, 'update'])->name('.update');
        Route::delete('/detail/{publisher}/delete', [PublisherController::class, 'destroy'])->name('.destroy');
        Route::get('/tambah', [PublisherController::class, 'create'])->name('.create');
        Route::post('/tambah', [PublisherController::class, 'store'])->name('.store');
    });

    // Student routes
    Route::prefix('siswa')->name('student')->group(function () {
        Route::get('/', [StudentController::class, 'index']);
        Route::get('/detail/{student}', [StudentController::class, 'edit'])->name('.edit');
        Route::patch('/detail/{student}/update', [StudentController::class, 'update'])->name('.update');
        Route::delete('/detail/{student}/delete', [StudentController::class, 'destroy'])->name('.destroy');
        Route::get('/tambah', [StudentController::class, 'create'])->name('.create');
        Route::post('/tambah', [StudentController::class, 'store'])->name('.store');
    });

    // School class routes
    Route::prefix('kelas')->name('schoolClass')->group(function () {
        Route::get('/', [SchoolClassController::class, 'index']);
        Route::get('/detail/{schoolClass}', [SchoolClassController::class, 'edit'])->name('.edit');
        Route::patch('/detail/{schoolClass}/update', [SchoolClassController::class, 'update'])->name('.update');
        Route::delete('/detail/{schoolClass}/delete', [SchoolClassController::class, 'destroy'])->name('.destroy');
        Route::get('/tambah', [SchoolClassController::class, 'create'])->name('.create');
        Route::post('/tambah', [SchoolClassController::class, 'store'])->name('.store');
    });

    // Transaction routes
    Route::prefix('transaksi')->name('transaction')->group(function () {
        Route::get('/', [TransactionController::class, 'index']);
        Route::get('/detail/{transaction}', [TransactionController::class, 'edit'])->name('.edit');
        Route::patch('/detail/{transaction}/update', [TransactionController::class, 'update'])->name('.update');
        Route::delete('/detail/{transaction}/delete', [TransactionController::class, 'destroy'])->name('.destroy');
        Route::get('/tambah', [TransactionController::class, 'create'])->name('.create');
        Route::post('/tambah', [TransactionController::class, 'store'])->name('.store');
    });

    // Trashed routes
    Route::prefix('sampah')->name('trashed')->group(function () {
        Route::get('/', [TrashedController::class, 'index']);

        Route::prefix('/transaksi')->name('.transaction')->group(function () {
            Route::get('/', [TrashedController::class, 'trashedTransactions']);
            Route::patch('/{transaction}/restore', [TrashedController::class, 'restoreTransaction'])->name('.restore');
            Route::delete('/{transaction}/delete', [TrashedController::class, 'destroyTransaction'])->name('.destroy');
        });

        Route::prefix('/buku')->name('.book')->group(function () {
            Route::get('/', [TrashedController::class, 'trashedBooks']);
            Route::patch('/{book}/restore', [TrashedController::class, 'restoreBook'])->name('.restore');
            Route::delete('/{book}/delete', [TrashedController::class, 'destroyBook'])->name('.destroy');
        });

        Route::prefix('/kategori')->name('.category')->group(function () {
            Route::get('/', [TrashedController::class, 'trashedCategories']);
            Route::patch('/{category}/restore', [TrashedController::class, 'restoreCategory'])->name('.restore');
            Route::delete('/{category}/delete', [TrashedController::class, 'destroyCategory'])->name('.destroy');
        });

        Route::prefix('/penulis')->name('.author')->group(function () {
            Route::get('/', [TrashedController::class, 'trashedAuthors']);
            Route::patch('/{author}/restore', [TrashedController::class, 'restoreAuthor'])->name('.restore');
            Route::delete('/{author}/delete', [TrashedController::class, 'destroyAuthor'])->name('.destroy');
        });

        Route::prefix('/penerbit')->name('.publisher')->group(function () {
            Route::get('/', [TrashedController::class, 'trashedPublishers']);
            Route::patch('/{publisher}/restore', [TrashedController::class, 'restorePublisher'])->name('.restore');
            Route::delete('/{publisher}/delete', [TrashedController::class, 'destroyPublisher'])->name('.destroy');
        });

        Route::prefix('/siswa')->name('.student')->group(function () {
            Route::get('/', [TrashedController::class, 'trashedStudents']);
            Route::patch('/{student}/restore', [TrashedController::class, 'restoreStudent'])->name('.restore');
            Route::delete('/{student}/delete', [TrashedController::class, 'destroyStudent'])->name('.destroy');
        });

        Route::prefix('/kelas')->name('.schoolClass')->group(function () {
            Route::get('/', [TrashedController::class, 'trashedSchoolClasses']);
            Route::patch('/{schoolClass}/restore', [TrashedController::class, 'restoreSchoolClass'])->name('.restore');
            Route::delete('/{schoolClass}/delete', [TrashedController::class, 'destroySchoolClass'])->name('.destroy');
        });

        Route::middleware('admin')->prefix('/pengguna')->name('.user')->group(function () {
            Route::get('/', [TrashedController::class, 'trashedUsers']);
            Route::patch('/{user}/restore', [TrashedController::class, 'restoreUser'])->name('.restore');
            Route::delete('/{user}/delete', [TrashedController::class, 'destroyUser'])->name('.destroy');
        });
    });

    // Admin routes
    Route::middleware('admin')->prefix('admin')->name('admin.')->group(function () {
        // Staff routes
        Route::prefix('/staf')->name('user')->group(function () {
            Route::get('/', [UserController::class, 'index']);
            Route::patch('/{user}/reset', [UserController::class, 'reset'])->name('.reset');
            Route::patch('/{user}/set-admin', [UserController::class, 'setAdmin'])->name('.set-admin');
            Route::delete('/{user}/delete', [UserController::class, 'destroy'])->name('.destroy');
            Route::get('/tambah', [UserController::class, 'create'])->name('.create');
            Route::post('/tambah', [UserController::class, 'store'])->name('.store');
        });

        // Settings routes
        Route::prefix('/pengaturan')->name('setting')->group(function () {
            Route::get('/', [SettingController::class, 'index']);
            Route::patch('/{setting}', [SettingController::class, 'update'])->name('.update');
        });
    });
});

require __DIR__ . '/auth.php';
