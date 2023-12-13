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
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Transactions/Transactions', [
            'transactions' => Transaction::with('book', 'student')->get(),
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
        $transaction->start_time = now('+7');
        $transaction->end_time = now('+7')->addDays(Setting::first()->day);

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
        $transaction->update(['return_time' => now('+7')]);

        return Redirect::route('transaction.edit', $transaction->id)
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
