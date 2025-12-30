<?php

use App\Http\Controllers\FAQController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('registration', function () {
        return Inertia::render('registration');
    })->name('registration');

    Route::get('information', function () {
        return Inertia::render('information');
    })->name('information');

    // Route::get('faq', function () {
    //     return Inertia::render('faq');
    // })->name('faq');

    Route::resource('faq', FAQController::class);
});

require __DIR__.'/settings.php';
