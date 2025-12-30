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
        
        return Inertia::render('registration/index', [
            'flows' => $flows,
            'requirements' => $requirements,
            'timelines' => $timelines
        ]);
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
