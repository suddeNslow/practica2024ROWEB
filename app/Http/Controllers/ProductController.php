<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Http\Requests\CategoryRequest;
use App\Models\ProductImage;
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
        'images' => $product->images, 
    ]);
}

    public function store(ProductRequest $request, ?Product $product = null)
    {
        $product = Product::updateOrCreate(
            ['id' => $product->id ?? null],
            $request->except('images') // Exclude 'images' from mass assignment
        );

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('product_images', 'public');
                ProductImage::create([
                    'product_id' => $product->id,
                    'path' => $path,
                ]);
            }
        }

        return redirect()->route('products.list')->with(['success' => 'Product saved.']);
    }

    public function delete(Product $product)
    {
        $product->delete();

        return redirect()->route('products.list')->with(['success' => 'Product deleted.']);
    }
}
