<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Product;

class ProductRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'category_id' => ['required', 'exists:categories,id'], // Foreign key validation
            'name' => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric', 'min:0'], // Ensures price is a positive number
            'description' => ['nullable', 'string'], // Allows description to be null
        ];
    }

    public function updateOrCreate(?Product $product = null): void
    {
        if (!$product) {
            $product = new Product();
        }

        $product->category_id = $this->get('category_id');
        $product->name = $this->get('name');
        $product->price = $this->get('price');
        $product->description = $this->get('description', ''); // Defaults to empty string if not provided
        $product->save();
    }
}
