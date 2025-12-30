<?php

use App\Http\Controllers\FAQController;
use App\Http\Controllers\InformationController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\RegistrationFlowController;
use App\Http\Controllers\RegistrationRequirementController;
use App\Http\Controllers\RegistrationTimelineController;
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

    Route::get('registration', [RegistrationController::class, 'index'])->name('registration');
    Route::post('registration/flows/reorder', [RegistrationController::class, 'reorderFlows'])->name('registration.flows.reorder');
    Route::post('registration/requirements/reorder', [RegistrationController::class, 'reorderRequirements'])->name('registration.requirements.reorder');
    Route::post('registration/timelines/reorder', [RegistrationController::class, 'reorderTimelines'])->name('registration.timelines.reorder');
    Route::resource('registration-flow', RegistrationFlowController::class);
    Route::resource('registration-requirement', RegistrationRequirementController::class);
    Route::resource('registration-timeline', RegistrationTimelineController::class);

    Route::resource('information', InformationController::class);

    Route::resource('faq', FAQController::class);


});

require __DIR__.'/settings.php';
