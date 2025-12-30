<?php

namespace App\Http\Controllers;

use App\Models\RegistrationFlow;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RegistrationFlowController extends Controller
{
    public function index()
    {
        $flows = RegistrationFlow::latest()->get();
        
        return Inertia::render('registration-flow/index', [
            'flows' => $flows
        ]);
    }

    public function create()
    {
        return Inertia::render('registration-flow/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        RegistrationFlow::create($validated);

        return redirect()->route('registration')
            ->with('success', 'Alur pendaftaran berhasil ditambahkan');
    }

    public function edit(RegistrationFlow $registrationFlow)
    {
        return Inertia::render('registration-flow/edit', [
            'flow' => $registrationFlow
        ]);
    }

    public function update(Request $request, RegistrationFlow $registrationFlow)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $registrationFlow->update($validated);

        return redirect()->route('registration')
            ->with('success', 'Alur pendaftaran berhasil diperbarui');
    }

    public function destroy(RegistrationFlow $registrationFlow)
    {
        $registrationFlow->delete();

        return redirect()->route('registration')
            ->with('success', 'Alur pendaftaran berhasil dihapus');
    }
}
