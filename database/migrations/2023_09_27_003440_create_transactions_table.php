<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->timestamp('start_time')->default(now('+7'));
            $table->timestamp('end_time')->default(now('+7')->addDays(3));
            $table->timestamp('return_time')->nullable();
            $table->foreignId('student_id')->constrained();
            $table->foreignId('user_id')->constrained();
            $table->foreignId('book_id')->constrained();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
