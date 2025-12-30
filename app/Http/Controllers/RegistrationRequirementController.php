<?php

namespace App\Http\Controllers;

use App\Models\RegistrationRequirement;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RegistrationRequirementController extends Controller
{
    public function index()
    {
        $requirements = RegistrationRequirement::latest()->get();
        
        return Inertia::render('registration-requirement/index', [
            'requirements' => $requirements
        ]);
    }

    public function create()
    {
        return Inertia::render('registration-requirement/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'type' => 'required|in:umum,dokumen',
        ]);

        RegistrationRequirement::create($validated);

        return redirect()->route('registration')
            ->with('success', 'Syarat pendaftaran berhasil ditambahkan');
    }

    public function edit(RegistrationRequirement $registrationRequirement)
    {
        return Inertia::render('registration-requirement/edit', [
            'requirement' => $registrationRequirement
        ]);
    }

    public function update(Request $request, RegistrationRequirement $registrationRequirement)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'type' => 'required|in:umum,dokumen',
        ]);

        $registrationRequirement->update($validated);

        return redirect()->route('registration')
            ->with('success', 'Syarat pendaftaran berhasil diperbarui');
    }

    public function destroy(RegistrationRequirement $registrationRequirement)
    {
        $registrationRequirement->delete();

        return redirect()->route('registration')
            ->with('success', 'Syarat pendaftaran berhasil dihapus');
    }
}
