<?php

namespace App\Http\Controllers;

use App\Models\RegistrationTimeline;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RegistrationTimelineController extends Controller
{
    public function index()
    {
        $timelines = RegistrationTimeline::latest()->get();
        
        return Inertia::render('registration-timeline/index', [
            'timelines' => $timelines
        ]);
    }

    public function create()
    {
        return Inertia::render('registration-timeline/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',            'status' => 'required|in:Segera,Dibuka,Diproses,Ditutup',            'description' => 'required|string',
        ]);

        RegistrationTimeline::create($validated);

        return redirect()->route('registration')
            ->with('success', 'Timeline pendaftaran berhasil ditambahkan');
    }

    public function edit(RegistrationTimeline $registrationTimeline)
    {
        return Inertia::render('registration-timeline/edit', [
            'timeline' => $registrationTimeline
        ]);
    }

    public function update(Request $request, RegistrationTimeline $registrationTimeline)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',            'status' => 'required|in:Segera,Dibuka,Diproses,Ditutup',            'description' => 'required|string',
        ]);

        $registrationTimeline->update($validated);

        return redirect()->route('registration')
            ->with('success', 'Timeline pendaftaran berhasil diperbarui');
    }

    public function destroy(RegistrationTimeline $registrationTimeline)
    {
        $registrationTimeline->delete();

        return redirect()->route('registration')
            ->with('success', 'Timeline pendaftaran berhasil dihapus');
    }
}
