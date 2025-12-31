<?php

namespace App\Http\Controllers;

use App\Models\RegistrationFlow;
use App\Models\RegistrationRequirement;
use App\Models\RegistrationTimeline;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RegistrationController extends Controller
{
    public function index()
    {
        $flows = RegistrationFlow::orderBy('order')->get();
        $requirements = RegistrationRequirement::orderBy('order')->get();
        $timelines = RegistrationTimeline::orderBy('order')->get();
        
        return Inertia::render('dashboard/registration', [
            'flows' => $flows,
            'requirements' => $requirements,
            'timelines' => $timelines
        ]);
    }

    // ========== FLOW METHODS ==========
    public function storeFlow(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $maxOrder = RegistrationFlow::max('order') ?? 0;
        RegistrationFlow::create(array_merge($validated, ['order' => $maxOrder + 1]));

        return redirect()->route('registration')
            ->with('success', 'Alur pendaftaran berhasil ditambahkan');
    }

    public function updateFlow(Request $request, RegistrationFlow $flow)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $flow->update($validated);

        return redirect()->route('registration')
            ->with('success', 'Alur pendaftaran berhasil diperbarui');
    }

    public function destroyFlow(RegistrationFlow $flow)
    {
        $flow->delete();

        return redirect()->route('registration')
            ->with('success', 'Alur pendaftaran berhasil dihapus');
    }

    public function reorderFlows(Request $request)
    {
        $items = $request->validate([
            'items' => 'required|array',
            'items.*.id' => 'required|exists:registration_flows,id',
            'items.*.order' => 'required|integer',
        ]);

        foreach ($items['items'] as $item) {
            RegistrationFlow::where('id', $item['id'])
                ->update(['order' => $item['order']]);
        }

        return response()->json(['message' => 'Order updated successfully']);
    }

    // ========== REQUIREMENT METHODS ==========
    public function storeRequirement(Request $request)
    {
        $validated = $request->validate([
            'description' => 'required|string',
            'type' => 'required|in:umum,dokumen',
        ]);

        $maxOrder = RegistrationRequirement::where('type', $validated['type'])->max('order') ?? 0;
        RegistrationRequirement::create(array_merge($validated, ['order' => $maxOrder + 1]));

        return redirect()->route('registration')
            ->with('success', 'Syarat pendaftaran berhasil ditambahkan');
    }

    public function updateRequirement(Request $request, RegistrationRequirement $requirement)
    {
        $validated = $request->validate([
            'description' => 'required|string',
            'type' => 'required|in:umum,dokumen',
        ]);

        $requirement->update($validated);

        return redirect()->route('registration')
            ->with('success', 'Syarat pendaftaran berhasil diperbarui');
    }

    public function destroyRequirement(RegistrationRequirement $requirement)
    {
        $requirement->delete();

        return redirect()->route('registration')
            ->with('success', 'Syarat pendaftaran berhasil dihapus');
    }

    public function reorderRequirements(Request $request)
    {
        $items = $request->validate([
            'items' => 'required|array',
            'items.*.id' => 'required|exists:registration_requirements,id',
            'items.*.order' => 'required|integer',
        ]);

        foreach ($items['items'] as $item) {
            RegistrationRequirement::where('id', $item['id'])
                ->update(['order' => $item['order']]);
        }

        return response()->json(['message' => 'Order updated successfully']);
    }

    // ========== TIMELINE METHODS ==========
    public function storeTimeline(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'status' => 'required|in:Segera,Dibuka,Diproses,Ditutup',
            'description' => 'required|string',
        ]);

        $maxOrder = RegistrationTimeline::max('order') ?? 0;
        RegistrationTimeline::create(array_merge($validated, ['order' => $maxOrder + 1]));

        return redirect()->route('registration')
            ->with('success', 'Timeline pendaftaran berhasil ditambahkan');
    }

    public function updateTimeline(Request $request, RegistrationTimeline $timeline)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'status' => 'required|in:Segera,Dibuka,Diproses,Ditutup',
            'description' => 'required|string',
        ]);

        $timeline->update($validated);

        return redirect()->route('registration')
            ->with('success', 'Timeline pendaftaran berhasil diperbarui');
    }

    public function destroyTimeline(RegistrationTimeline $timeline)
    {
        $timeline->delete();

        return redirect()->route('registration')
            ->with('success', 'Timeline pendaftaran berhasil dihapus');
    }

    public function reorderTimelines(Request $request)
    {
        $items = $request->validate([
            'items' => 'required|array',
            'items.*.id' => 'required|exists:registration_timelines,id',
            'items.*.order' => 'required|integer',
        ]);

        foreach ($items['items'] as $item) {
            RegistrationTimeline::where('id', $item['id'])
                ->update(['order' => $item['order']]);
        }

        return response()->json(['message' => 'Order updated successfully']);
    }
}