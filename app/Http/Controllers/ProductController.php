<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function list(Request $request)
{
    $categoryId = $request->input('category_id');

    $query = Product::with(['category']);

    if ($categoryId) {
        $query->where('category_id', $categoryId);
    }

    $products = $query->paginate(10)->withQueryString();

    return Inertia::render('Products/List', [
        'products' => $products,
        'categories' => Category::all(),
        'selectedCategory' => $categoryId, 
    ]);
}

    public function create()
    {
        return Inertia::render('Products/AddEdit', [
            'categories' => Category::select(['name', 'id'])->get()
        ]);
    }

    public function update(Product $product)
    {
        $product->load('images');

        return Inertia::render('Products/AddEdit', [
            'categories' => Category::select(['name', 'id'])->get(),
            'product' => $product,
        ]);
    }

    public function store(ProductRequest $request, ?Product $product = null)
    {
        $request->updateOrCreate($product);

        return redirect()->route('products.list')->with(['success' => 'Product saved.']);
    }

    public function delete(Product $product)
    {
        $product->images()->each(function ($productImage) {
            Storage::disk('public')->delete($productImage->path);
            $productImage->delete();
        });
        Storage::disk('public')->deleteDirectory('products/'.$product->id);
        $product->delete();

        return redirect()->route('products.list')->with(['success' => 'Product deleted.']);
    }

    public function show(Product $product)
    {
        // Load related data if necessary
        $product->load('images'); 
        
        return Inertia::render('Products/Detail', [
            'product' => $product
        ]);
    }
}
