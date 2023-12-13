<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Http\Requests\StoreAuthorRequest;
use App\Http\Requests\UpdateAuthorRequest;
use App\Http\Resources\AuthorResource;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class AuthorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Authors/Authors', [
            'authors' => Author::with('books')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Authors/partials/AddAuthor', [
            'authors' => Author::withTrashed()->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAuthorRequest $request): RedirectResponse
    {
        $author = new Author();

        $author->name = $request->name;

        $author->save();

        return Redirect::route('author.create')->with('store', "{$author->name} berhasil ditambahkan");
    }

    /**
     * Display the specified resource.
     */
    public function show(Author $author)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Author $author): Response
    {

        return Inertia::render('Authors/partials/AuthorDetail', [
            'author' => new AuthorResource($author),
            'authors' => Author::withTrashed()->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAuthorRequest $request, Author $author): RedirectResponse
    {
        $author->update($request->validated());

        return Redirect::back()->with('update', 'Penulis berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Author $author): RedirectResponse
    {
        $author->delete();

        return Redirect::route('author')->with('destroy', "{$author->name} berhasil dihapus");
    }
}
