<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'book_code' => $this->book_code,
            'title' => $this->title,
            'year_published' => $this->year_published,
            'quantity' => $this->quantity,
            'information' => $this->information,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'deleted_at' => $this->deleted_at,
            'author' => $this->author()->get(),
            'category' => $this->category()->get(),
            'publisher' => $this->publisher()->get(),
        ];
    }
}
