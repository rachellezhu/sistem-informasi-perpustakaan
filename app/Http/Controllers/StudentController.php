<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;
use App\Http\Resources\StudentResource;
use App\Models\SchoolClass;
use App\Models\Transaction;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;
use Inertia\Response;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Students/Students', [
            'students' => Student::with('school_class')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $students = Student::withTrashed()->get();
        $schoolClasses = SchoolClass::get();

        return Inertia::render('Students/partials/AddStudent', [
            'students' => $students,
            'schoolClasses' => $schoolClasses,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStudentRequest $request): RedirectResponse
    {
        $schoolClass = SchoolClass::where('name', $request->schoolClass)
            ->first()
            ?? SchoolClass::create(['name' => $request->schoolClass]);

        $student = Student::create([
            'name' => $request->name,
            'card_number' => $request->card_number,
            'school_class_id' => $schoolClass->id,
        ]);

        return Redirect::route('student.create')->with('store', "{$student->name} berhasil ditambahkan");
    }

    /**
     * Display the specified resource.
     */
    public function show(Student $student)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Student $student): Response
    {
        $students = Student::withTrashed()->get();
        $schoolClasses = SchoolClass::get();
        $transactions = Transaction::where('student_id', $student->id)->with('student', 'book')->get();

        return Inertia::render('Students/partials/StudentDetail', [
            'student' => new StudentResource($student),
            'students' => $students,
            'schoolClasses' => $schoolClasses,
            'transactions' => $transactions,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStudentRequest $request, Student $student): RedirectResponse
    {
        $schoolClass = SchoolClass::where('name', $request->schoolClass)
            ->first()
            ?? SchoolClass::create(['name' => $request->schoolClass]);

        $updated_student = [
            'name' => $request->name,
            'card_number' => $request->card_number,
            'school_class_id' => $schoolClass->id,
        ];

        $student->update($updated_student);

        return Redirect::back()->with('update', 'Siswa berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $student): RedirectResponse
    {
        $student->delete();

        return Redirect::route('student')->with('destroy', "{$student->name} berhasil dihapus");
    }
}
