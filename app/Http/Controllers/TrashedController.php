<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateBookRequest;
use App\Models\Author;
use App\Models\Book;
use App\Models\Category;
use App\Models\Publisher;
use App\Models\SchoolClass;
use App\Models\Student;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class TrashedController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Trashed/Trashed', [
            'authors' => Author::onlyTrashed()->count(),
            'books' => Book::onlyTrashed()->count(),
            'categories' => Category::onlyTrashed()->count(),
            'publishers' => Publisher::onlyTrashed()->count(),
            'schoolClasses' => SchoolClass::onlyTrashed()->count(),
            'students' => Student::onlyTrashed()->count(),
            'transactions' => Transaction::onlyTrashed()->count(),
            'users' => User::onlyTrashed()->count(),
        ]);
    }
    /**
     * Display a listing of the transaction.
     */
    public function trashedTransactions(): Response
    {
        return Inertia::render('Trashed/partials/TrashedTransactions', [
            'transactions' => Transaction::onlyTrashed()
                ->with('book', 'student')->get(),
        ]);
    }

    /**
     * Restore a trashed transaction.
     */
    public function restoreTransaction(string $id): RedirectResponse
    {
        $transaction = Transaction::onlyTrashed()->where('id', $id)->first();

        $transaction->restore();

        return Redirect::route('trashed.transaction')
            ->with(['restore' => "Transaksi {$transaction->id} berhasil dikembalikan"]);
    }

    /**
     * Force delete a trashed transaction.
     */
    public function destroyTransaction(string $id): RedirectResponse
    {
        $transaction = Transaction::onlyTrashed()->where('id', $id)->first();

        $transaction->forceDelete();

        return Redirect::route('trashed.transaction')
            ->with('destroy', "Transaksi {$transaction->id} telah dihapus dari database");
    }

    /**
     * Display a listing of the category.
     */
    public function trashedCategories(): Response
    {
        return Inertia::render('Trashed/partials/TrashedCategories', [
            'categories' => Category::onlyTrashed()->get(),
        ]);
    }

    /**
     * Restore a trashed category.
     */
    public function restoreCategory(string $id): RedirectResponse
    {
        $category = Category::onlyTrashed()->where('id', $id)->first();

        $category->restore();

        return Redirect::route('trashed.category')
            ->with('restore', "Kategori {$category->name} berhasil dipulihkan");
    }

    /**
     * Force delete a trashed category.
     */
    public function destroyCategory(string $id): RedirectResponse
    {
        $category = Category::onlyTrashed()->where('id', $id)->first();

        $category->forceDelete();

        return Redirect::route('trashed.category')
            ->with('destroy', "Kategori {$category->name} telah dihapus dari database");
    }

    /**
     * Display a listing of the author.
     */
    public function trashedAuthors(): Response
    {
        return Inertia::render('Trashed/partials/TrashedAuthors', [
            'authors' => Author::onlyTrashed()->get(),
        ]);
    }

    /**
     * Restore a trashed author.
     */
    public function restoreAuthor(string $id): RedirectResponse
    {
        $author = Author::onlyTrashed()->where('id', $id)->first();

        $author->restore();

        return Redirect::route('trashed.author')
            ->with('restore', "Penulis {$author->name} berhasil dipulihkan");
    }

    /**
     * Force delete a trashed author.
     */
    public function destroyAuthor(string $id): RedirectResponse
    {
        $author = Author::onlyTrashed()->where('id', $id)->first();

        $author->forceDelete();

        return Redirect::route('trashed.author')
            ->with('destroy', "Penulis {$author->name} telah dihapus dari database");
    }

    /**
     * Display a listing of the publisher.
     */
    public function trashedPublishers(): Response
    {
        return Inertia::render('Trashed/partials/TrashedPublishers', [
            'publishers' => Publisher::onlyTrashed()->get(),
        ]);
    }

    /**
     * Restore a trashed publisher.
     */
    public function restorePublisher(string $id): RedirectResponse
    {
        $publisher = Publisher::onlyTrashed()->where('id', $id)->first();

        $publisher->restore();

        return Redirect::route('trashed.publisher')
            ->with('restore', "Penerbit {$publisher->name} berhasil dipulihkan");
    }

    /**
     * Force delete a trashed publisher.
     */
    public function destroyPublisher(string $id): RedirectResponse
    {
        $publisher = Publisher::onlyTrashed()->where('id', $id)->first();

        $publisher->forceDelete();

        return Redirect::route('trashed.publisher')
            ->with('destroy', "Penerbit {$publisher->name} telah dihapus dari database");
    }

    /**
     * Display a listing of the student.
     */
    public function trashedStudents(): Response
    {
        return Inertia::render('Trashed/partials/TrashedStudents', [
            'students' => Student::onlyTrashed()->get(),
        ]);
    }

    /**
     * Restore a trashed student.
     */
    public function restoreStudent(string $id): RedirectResponse
    {
        $student = Student::onlyTrashed()->where('id', $id)->first();

        $student->restore();

        return Redirect::route('trashed.student')
            ->with('restore', "Siswa {$student->name} berhasil dipulihkan");
    }

    /**
     * Force delete a trashed student.
     */
    public function destroyStudent(string $id): RedirectResponse
    {
        $student = Student::onlyTrashed()->where('id', $id)->first();

        $student->forceDelete();

        return Redirect::route('trashed.student')
            ->with('destroy', "Siswa {$student->name} telah dihapus dari database");
    }

    /**
     * Display a listing of the school class.
     */
    public function trashedSchoolClasses(): Response
    {
        return Inertia::render('Trashed/partials/TrashedSchoolClasses', [
            'schoolClasses' => SchoolClass::onlyTrashed()->get(),
        ]);
    }

    /**
     * Restore a trashed school class.
     */
    public function restoreSchoolClass(string $id): RedirectResponse
    {
        $schoolClass = SchoolClass::onlyTrashed()->where('id', $id)->first();

        $schoolClass->restore();

        return Redirect::route('trashed.schoolClass')
            ->with('restore', "Kelas {$schoolClass->name} berhasil dipulihkan");
    }

    /**
     * Force delete a trashed school class.
     */
    public function destroySchoolClass(string $id): RedirectResponse
    {
        $schoolClass = SchoolClass::onlyTrashed()->where('id', $id)->first();

        $schoolClass->forceDelete();

        return Redirect::route('trashed.school$schoolClass')
            ->with('destroy', "Kelas {$schoolClass->name} telah dihapus dari database");
    }

    /**
     * Display a listing of the book.
     */
    public function trashedBooks(): Response
    {
        return Inertia::render('Trashed/partials/TrashedBooks', [
            'books' => Book::onlyTrashed()->get(),
        ]);
    }

    /**
     * Restore a trashed book.
     */
    public function restoreBook(string $id): RedirectResponse
    {
        $book = Book::onlyTrashed()->where('id', $id)->first();

        $book->restore();

        return Redirect::route('trashed.book')->with('restore', "Buku {$book->title} berhasil dipulihkan");
    }

    /**
     * Force delete a trashed book.
     */
    public function destroyBook(string $id): RedirectResponse
    {
        $book = Book::onlyTrashed()->where('id', $id)->first();

        $book->forceDelete();

        return Redirect::route('trashed.book')->with('destroy', "Buku {$book->title} telah dihapus dari database");
    }

    /**
     * Display a listing of the user.
     */
    public function trashedUsers(): Response
    {
        return Inertia::render('Trashed/partials/TrashedUsers', [
            'users' => User::onlyTrashed()->get(),
        ]);
    }

    /**
     * Restore a trashed user.
     */
    public function restoreUser(string $id): RedirectResponse
    {
        $user = User::onlyTrashed()->where('id', $id)->first();

        $user->restore();

        return Redirect::route('trashed.user')->with('restore', "Akun {$user->name} berhasil dipulihkan");
    }

    /**
     * Force delete a trashed user.
     */
    public function destroyUser(string $id): RedirectResponse
    {
        $user = User::onlyTrashed()->where('id', $id)->first();

        $user->forceDelete();

        return Redirect::route('trashed.user')->with('destroy', "Akun {$user->name} telah dihapus dari database");
    }
}
