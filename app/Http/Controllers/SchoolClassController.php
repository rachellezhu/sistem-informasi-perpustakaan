<?php

namespace App\Http\Controllers;

use App\Models\SchoolClass;
use App\Http\Requests\StoreSchoolClassRequest;
use App\Http\Requests\UpdateSchoolClassRequest;
use App\Http\Resources\SchoolClassResource;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class SchoolClassController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('SchoolClasses/SchoolClasses', [
            'schoolClasses' => SchoolClass::with('students')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('SchoolClasses/partials/AddSchoolClass', [
            'schoolClasses' => SchoolClass::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSchoolClassRequest $request): RedirectResponse
    {
        $schoolClass = new SchoolClass();

        $schoolClass->name = $request->name;

        $schoolClass->save();

        return Redirect::route('schoolClass.create')->with('store', "Kelas {$schoolClass->name} berhasil ditambahkan");
    }

    /**
     * Display the specified resource.
     */
    public function show(SchoolClass $schoolClass)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SchoolClass $schoolClass): Response
    {
        $schoolClasses = SchoolClass::get();

        return Inertia::render('SchoolClasses/partials/SchoolClassDetail', [
            'schoolClass' => new SchoolClassResource($schoolClass),
            'schoolClasses' => $schoolClasses,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSchoolClassRequest $request, SchoolClass $schoolClass): RedirectResponse
    {
        $schoolClass->update($request->validated());

        return Redirect::back()->with('update', 'Kelas berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SchoolClass $schoolClass)
    {
        $schoolClass->delete();

        return Redirect::route('schoolClass')->with('destroy', "Kelas {$schoolClass->name} berhasil dihapus");
    }
}
