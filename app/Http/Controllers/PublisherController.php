<?php

namespace App\Http\Controllers;

use App\Models\Publisher;
use App\Http\Requests\StorePublisherRequest;
use App\Http\Requests\UpdatePublisherRequest;
use App\Http\Resources\PublisherResource;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class PublisherController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Publishers/Publishers', [
            'publishers' => Publisher::with('books')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Publishers/partials/AddPublisher', [
            'publishers' => Publisher::withTrashed()->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePublisherRequest $request): RedirectResponse
    {
        $publisher = new Publisher();

        $publisher->name = $request->name;

        $publisher->save();

        return Redirect::route('publisher.create')->with('store',  "{$publisher->name} berhasil ditambahkan");
    }

    /**
     * Display the specified resource.
     */
    public function show(Publisher $publisher)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Publisher $publisher): Response
    {
        return Inertia::render('Publishers/partials/PublisherDetail', [
            'publisher' => new PublisherResource($publisher),
            'publishers' => Publisher::withTrashed()->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePublisherRequest $request, Publisher $publisher): RedirectResponse
    {
        $publisher->update($request->validated());

        return Redirect::back()->with('update', 'Penerbit berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Publisher $publisher): RedirectResponse
    {
        $publisher->delete();

        return Redirect::route('publisher')->with('destroy', "{$publisher->name} berhasil dihapus");
    }
}
