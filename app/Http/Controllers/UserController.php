<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Users/Users', [
            'users' => User::where('is_admin', 0)->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Users/partials/AddUser', [
            'users' => User::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
        ]);

        $user = User::create([
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make('user123'),
        ]);

        return Redirect::route('admin.user.create')->with([
            'store' => "Staf {$user->username} berhasil ditambahkan",
            'message' => '',
            'update' => '',
            'destroy' => '',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function setAdmin(User $user)
    {
        $user->update(['is_admin' => 1]);

        return Redirect::route('admin.user')->with([
            'message' => "Staf {$user->username} berhasil dijadikan admin",
            'update' => '',
            'store' => '',
            'destroy' => '',
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function reset(User $user)
    {
        $user->update(['password' => Hash::make('user123')]);

        return Redirect::route('admin.user')->with([
            'update' => 'Password pengguna berhasil disetel ulang',
            'message' => '',
            'store' => '',
            'destroy' => '',
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return Redirect::route('admin.user')->with([
            'destroy' => 'Staf berhasil dihapus',
            'message' => '',
            'update' => '',
            'store' => '',
        ]);
    }
}
