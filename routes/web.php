<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::group(['middleware' => ['auth', 'verified']], function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::group([
        'prefix' => 'categories',
    ], function () {
        Route::get('/', [CategoryController::class, 'list'])->name('categories.list');
        Route::get('/create', [CategoryController::class, 'create'])->name('categories.create');
        Route::get('/edit/{category}', [CategoryController::class, 'update'])->name('categories.update');
        Route::post('store/{category?}', [CategoryController::class, 'store'])->name('categories.store');
        Route::delete('delete/{category}', [CategoryController::class, 'delete'])->name('categories.delete');
    });

    Route::prefix('products')->group(function () {
        Route::get('/', [ProductController::class, 'list'])->name('products.list');
        Route::get('/create', [ProductController::class, 'create'])->name('products.create');
        Route::get('/edit/{product}', [ProductController::class, 'edit'])->name('products.edit');
        Route::post('/store/{product?}', [ProductController::class, 'store'])->name('products.store');
        Route::delete('/delete/{product}', [ProductController::class, 'delete'])->name('products.delete');
    });
});

require __DIR__.'/auth.php';
