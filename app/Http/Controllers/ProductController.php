<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\Category;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function list()
    {
        $products = Product::with(['category', 'images'])->orderBy('name')->get();
        return Inertia::render('Products/List', ['products' => $products]);
    }

    public function create()
    {
        $categories = Category::all();
        return Inertia::render('Products/AddEdit', compact('categories'));
    }

    public function edit(Product $product)
    {
        $categories = Category::all();
        $images = $product->images;
        return Inertia::render('Products/AddEdit', compact('product', 'categories', 'images'));
    }

    public function store(ProductRequest $request, Product $product = null)
    {
        $product = Product::updateOrCreate(
            ['id' => $product->id ?? null],
            $request->validated()
        );

        if ($request->hasFile('images')) {
            $this->saveImages($request->file('images'), $product->id);
        }

        return redirect()->route('products.list')->with('success', 'Product saved.');
    }

    public function delete(Product $product)
    {
        foreach ($product->images as $image) {
            Storage::disk('public')->delete($image->path);
            $image->delete();
        }
        // Then delete the product
        $product->delete();

        return redirect()->route('products.list')->with('success', 'Product deleted.');
    }

    private function saveImages(array $images, int $productId)
    {
        foreach ($images as $image) {
            $path = $image->store('product_images', 'public');
            ProductImage::create([
                'product_id' => $productId,
                'path' => $path,
            ]);
        }
    }
}