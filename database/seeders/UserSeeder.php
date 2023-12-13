<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()
            ->count(2)
            ->sequence(
                [
                    'name' => 'Admin',
                    'username' => 'admin',
                    'email' => 'admin@admin.com',
                    'email_verified_at' => now(),
                    'password' => Hash::make('admin123'), // password
                    'is_admin' => true,
                    'remember_token' => Str::random(10),
                ],
                [
                    'name' => 'User',
                    'username' => 'user',
                    'email' => 'user@user.com',
                    'email_verified_at' => now(),
                    'password' => Hash::make('user123'), // password
                    'is_admin' => false,
                    'remember_token' => Str::random(10),
                ]
            )
            ->create();
    }
}
