<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Models\Book;
use App\Models\Publisher;
use App\Models\SchoolClass;
use App\Models\Student;
use App\Models\Transaction;
use App\Models\User;
use Carbon\Carbon;
use GuzzleHttp\Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $books = Book::sum('quantity');

        $deadline_today = Transaction::whereDate('end_time', today('+7')->endOfDay())->count();

        $late = Transaction::whereNull('return_time')
            ->whereDate('end_time', '<', today('+7')->startOfDay())
            ->count();

        $today = Transaction::whereDate('start_time', today('+7')->endOfDay())->count();

        $was_returned = Transaction::whereNotNull('return_time')->count();

        return Inertia::render('Dashboard', [
            'books' => $books,
            'deadlineToday' => $deadline_today,
            'late' => $late,
            'today' => $today,
            'transactions' => Transaction::count(),
            'titles' => Book::count(),
            'authors' => Author::count(),
            'publishers' => Publisher::count(),
            'students' => Student::count(),
            'schoolClasses' => SchoolClass::count(),
            'wasReturned' => $was_returned,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
