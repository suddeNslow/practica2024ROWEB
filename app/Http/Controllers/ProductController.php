<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function list()
    {
        return Inertia::render('Products/List', [
            'products' => Product::with('category')->orderBy('name')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Products/AddEdit', [
            'categories' => Category::all(),
        ]);
    }

    public function update(Product $product)
    {
        return Inertia::render('Products/AddEdit', [
            'product' => $product,
            'categories' => Category::all(),
        ]);
    }

    public function store(ProductRequest $request, ?Product $product = null)
    {
        $request->updateOrCreate($product);

        return redirect()->route('products.list')->with(['success' => 'Product saved.']);
    }

    public function delete(Product $product)
    {
        $product->delete();

        return redirect()->route('products.list')->with(['success' => 'Product deleted.']);
    }
}
