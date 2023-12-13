<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Book>
 */
class BookFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    public function title($nbWords = 5): string
    {
        $sentence = fake()->sentence($nbWords);

        return substr($sentence, 0, strlen($sentence) - 1);
    }

    public function definition(): array
    {
        return [
            'book_code' => fake()->isbn13(),
            'title' => fake()->sentence(rand(1, 12)),
            'author_id' => rand(1, 12),
            'category_id' => rand(1, 6),
            'publisher_id' => rand(1, 12),
            'year_published' => rand(1990, 2023),
            'quantity' => rand(1, 12),
            'information' => fake()->sentences(rand(1, 3), 'true')
        ];
    }
}
