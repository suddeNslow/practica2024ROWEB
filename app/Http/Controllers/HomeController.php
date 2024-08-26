<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $query = Product::query();

        if (request('search')) {
            $query->where('name', 'like', '%' . request('search') . '%');
        }

        if (request('category')) {
            $query->where('category_id', request('category'));
        }

        $products = $query->with(['category', 'images'])->paginate(3)->withQueryString();
        $categories = Category::all();

        return Inertia::render('Welcome', [
            'products' => $products,
            'categories' => $categories,
        ]);
    }
}