<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBookRequest;
use App\Http\Requests\UpdateBookRequest;
use App\Http\Resources\BookResource;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Author;
use App\Models\Book;
use App\Models\Category;
use App\Models\Publisher;
use App\Models\Transaction;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Books/Books', [
            'books' => Book::with('author', 'category', 'publisher')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $authors = Author::get();
        $books = Book::withTrashed()->get();
        $categories = Category::get();
        $publishers = Publisher::get();

        return Inertia::render('Books/partials/AddBook', [
            'authors' => $authors,
            'books' => $books,
            'categories' => $categories,
            'publishers' => $publishers,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBookRequest $request): RedirectResponse
    {
        $book = new Book();

        $author = Author::where('name', $request->author)
            ->first()
            ?? Author::create(['name' => $request->author]);

        $category = Category::where('name', $request->category)
            ->first()
            ?? Category::create(['name' => $request->category]);

        $publisher = Publisher::where('name', $request->publisher)
            ->first()
            ?? Publisher::create(['name' => $request->publisher]);

        $book->title = $request->title;
        $book->book_code = $request->book_code;
        $book->author_id = $author->id;
        $book->category_id = $category->id;
        $book->publisher_id = $publisher->id;
        $book->year_published = $request->year_published;
        $book->quantity = $request->quantity;
        $book->information = $request->information;

        $book->save();

        return Redirect::route('book.create')->with('store', "{$book->title} berhasil ditambahkan");
    }

    /**
     * Display the specified resource.
     */
    public function show(Book $book)
    {
        //

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Book $book): Response
    {
        $authors = Author::get();
        $books = Book::withTrashed()->get();
        $categories = Category::get();
        $publishers = Publisher::get();
        $transactions = Transaction::where('book_id', $book->id)
            ->with('student', 'book')
            ->get();

        $isBeingBorrowed = Transaction::where('book_id', $book->id)
            ->whereNull('return_time')
            ->with('student', 'book')
            ->get()
            ->count();

        return Inertia::render('Books/partials/BookDetail', [
            'authors' => $authors,
            'book' => new BookResource($book),
            'books' => $books,
            'categories' => $categories,
            'publishers' => $publishers,
            'transactions' => $transactions,
            'isBeingBorrowed' => $isBeingBorrowed,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBookRequest $request, Book $book): RedirectResponse
    {
        $author = Author::where('name', $request->author)
            ->first()
            ?? Author::create(['name' => $request->author]);

        $category = Category::where('name', $request->category)
            ->first()
            ?? Category::create(['name' => $request->category]);

        $publisher = Publisher::where('name', $request->publisher)
            ->first()
            ?? Publisher::create(['name' => $request->publisher]);

        $updated_book = [
            'title' => $request->title,
            'book_code' => $request->book_code,
            'author_id' => $author->id,
            'category_id' => $category->id,
            'publisher_id' => $publisher->id,
            'year_published' => $request->year_published,
            'quantity' => $request->quantity,
            'information' => $request->information,
        ];

        $book->update($updated_book);

        return Redirect::back()->with('update', 'Buku berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book $book): RedirectResponse
    {
        $book->delete();

        return Redirect::route('book')->with('destroy', "{$book->title} berhasil dihapus");
    }
}
