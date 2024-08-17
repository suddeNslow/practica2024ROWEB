<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function list()
    {
        $products = Product::with('category')->orderBy('name')->get();

        return Inertia::render('Products/List', [
            'products' => $products
        ]);
    }

    public function create()
    {
        return Inertia::render('Products/AddEdit');
    }

    public function update(Product $product)
    {
        return Inertia::render('Products/AddEdit', [
            'product' => $product,
        ]);
    }

    public function store(ProductRequest $request, ?Product $product = null)
    {
        
    }

    public function delete(Product $product)
    {
        
    }
}
