<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Http\Requests\StoreTransactionRequest;
use App\Http\Requests\UpdateTransactionRequest;
use App\Http\Resources\TransactionResource;
use App\Models\Book;
use App\Models\SchoolClass;
use App\Models\Setting;
use App\Models\Student;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;
use Inertia\Response;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $year = today()->year;
        $from = Carbon::createFromDate($year, 6, 16)->startOfDay();
        $to = Carbon::createFromDate($year, 6, 15)->endOfDay();

        if (today() < $from) {
            $from = Carbon::createFromDate($year - 1, 6, 16);
        } elseif (today() < $to) {
            $to = Carbon::createFromDate($year + 1, 6, 15);
        }

        $academicYear = $from->year . '-' . $to->year;

        $students = Student::with(
            ['transactions' => function ($query) {
                $query->where([
                    ['return_time', '=', null],
                    ['end_time', '<', now()],
                ])->with('book');
            }, 'school_class'],
        )->orderBy('name')->get();

        $popularBook = Transaction::join('books', 'book_id', '=', 'books.id')
            ->select(DB::raw('books.title'), DB::raw('COUNT(books.title) AS count'))
            ->groupBy('books.title')
            ->orderBy('count', 'DESC')
            ->first();

        // dd($books);

        $late = Transaction::where([
            ['end_time', '<', now()],
            ['return_time', '=', null],
        ])->with('book', 'student')->orderBy('start_time')->get();

        $last30days = Transaction::where([
            ['start_time', '>', today()->subDays(30)],
        ])->with('book', 'student', 'user')->get();

        $nextDayReturns = Transaction::where([
            ['end_time', '<', today()->addDay()->endOfDay()],
            ['end_time', '>', today()->endOfDay()],
            ['return_time', '=', null],
        ])->with('book', 'student')->get();

        $currentAcademicYearTransactions = Transaction::where([
            ['start_time', '>=', $from],
            ['start_time', '<=', $to],
        ])->with('book', 'student')->get();

        $transactions = Transaction::with('book', 'student')->get();

        if (Request::only('filter') && Request::only('filter')['filter'] === 'terlambat') {
            $transactions = $late;
        }
        if (Request::only('filter') && Request::only('filter')['filter'] === '30HariTerakhir') {
            $transactions = $last30days;
        }
        if (Request::only('filter') && Request::only('filter')['filter'] === 'dikembalikanBesok') {
            $transactions = $nextDayReturns;
        }
        if (Request::only('filter') && Request::only('filter')['filter'] === $academicYear) {
            $transactions = $currentAcademicYearTransactions;
        }

        return Inertia::render('Transactions/Transactions', [
            'currentAcademicYearTransactions' => $currentAcademicYearTransactions,
            'currYear' => $currentAcademicYearTransactions->count(),
            'lastMonth' => $last30days->count(),
            'late' => $late->count(),
            'popularBook' => $popularBook,
            'lateStudents' => $students,
            'transactions' => $transactions,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $books = Book::all();
        $settings = Setting::first();
        $students = Student::with('school_class')->get();
        $transactions = Transaction::get();

        return Inertia::render('Transactions/partials/AddTransaction', [
            'books' => $books,
            'settings' => $settings,
            'students' => $students,
            'transactions' => $transactions,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTransactionRequest $request): RedirectResponse
    {
        $transaction = new Transaction();
        $book = Book::where('book_code', $request->book_code)->first();
        $student = Student::where('card_number', $request->card_number)->first();

        $transaction->student_id = $student->id;
        $transaction->book_id = $book->id;
        $transaction->user_id = Auth::id();
        $transaction->start_time = now();
        $transaction->end_time = now()->addDays(Setting::first()->day);

        $transaction->save();

        return Redirect::route('transaction.create')
            ->with('store', 'Transaksi berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(Transaction $transaction)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Transaction $transaction): Response
    {
        $schoolClass = SchoolClass::where('id', $transaction->student->school_class_id)->first();
        $fine = Setting::first()->fine;

        return Inertia::render(
            'Transactions/partials/TransactionDetail',
            [
                'fine' => $fine,
                'transaction' => new TransactionResource($transaction),
                'schoolClass' => $schoolClass,
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Transaction $transaction): RedirectResponse
    {
        $transaction->update(['return_time' => now()]);

        return to_route('transaction.edit', $transaction->id)
            ->with('update', 'Transaksi peminjaman berhasil diselesaikan');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Transaction $transaction)
    {
        $transaction->delete();

        return Redirect::route('transaction')->with('destroy', 'Transaksi berhasil dihapus');
    }
}
