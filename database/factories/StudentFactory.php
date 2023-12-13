<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Student>
 */
class StudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake('id_ID')->firstname() . ' ' . fake('id_ID')->lastname(),
            'card_number' => fake()->unique()->randomNumber(5, true),
            'school_class_id' => rand(1, 12),
        ];
    }
}
