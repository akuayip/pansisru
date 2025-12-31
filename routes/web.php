<?php

use App\Http\Controllers\BankSoalController;
use App\Http\Controllers\FAQController;
use App\Http\Controllers\InformationController;
use App\Http\Controllers\RegistrationController;
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
        return Inertia::render('dashboard/dashboard');
    })->name('dashboard');

    // Registration Routes - All in one controller
    Route::get('registration', [RegistrationController::class, 'index'])->name('registration');
    
    // Flow Routes
    Route::post('registration/flow', [RegistrationController::class, 'storeFlow'])->name('registration.flow.store');
    Route::put('registration/flow/{flow}', [RegistrationController::class, 'updateFlow'])->name('registration.flow.update');
    Route::delete('registration/flow/{flow}', [RegistrationController::class, 'destroyFlow'])->name('registration.flow.destroy');
    Route::post('registration/flows/reorder', [RegistrationController::class, 'reorderFlows'])->name('registration.flows.reorder');
    
    // Requirement Routes
    Route::post('registration/requirement', [RegistrationController::class, 'storeRequirement'])->name('registration.requirement.store');
    Route::put('registration/requirement/{requirement}', [RegistrationController::class, 'updateRequirement'])->name('registration.requirement.update');
    Route::delete('registration/requirement/{requirement}', [RegistrationController::class, 'destroyRequirement'])->name('registration.requirement.destroy');
    Route::post('registration/requirements/reorder', [RegistrationController::class, 'reorderRequirements'])->name('registration.requirements.reorder');
    
    // Timeline Routes
    Route::post('registration/timeline', [RegistrationController::class, 'storeTimeline'])->name('registration.timeline.store');
    Route::put('registration/timeline/{timeline}', [RegistrationController::class, 'updateTimeline'])->name('registration.timeline.update');
    Route::delete('registration/timeline/{timeline}', [RegistrationController::class, 'destroyTimeline'])->name('registration.timeline.destroy');
    Route::post('registration/timelines/reorder', [RegistrationController::class, 'reorderTimelines'])->name('registration.timelines.reorder');

    Route::resource('information', InformationController::class);
    Route::resource('bank-soal', BankSoalController::class);
    Route::resource('faq', FAQController::class);
});



require __DIR__.'/settings.php';
