<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SchoolClassSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $groups = ['A', 'B'];

        for ($i = 1; $i <= 6; $i++) {
            for ($j = 0; $j <= 1; $j++) {
                DB::table('school_classes')->insert([
                    'name' => strval($i) . $groups[$j],
                ]);
            }
        }
    }
}
