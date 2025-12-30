<?php

namespace App\Http\Controllers;

use App\Models\Information;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class InformationController extends Controller
{
    public function index()
    {
        $information = Information::orderBy('release_date', 'desc')->get();
        
        return Inertia::render('information/index', [
            'information' => $information
        ]);
    }

    public function create()
    {
        return Inertia::render('information/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'pdf_file' => 'nullable|file|mimes:pdf|max:10240',
        ]);

        if ($request->hasFile('pdf_file')) {
            $validated['pdf_file'] = $request->file('pdf_file')->store('information-pdfs', 'public');
        }

        Information::create($validated);

        return redirect()->route('information.index')
            ->with('success', 'Informasi berhasil ditambahkan');
    }

    public function edit(Information $information)
    {
        return Inertia::render('information/edit', [
            'information' => $information
        ]);
    }

    public function update(Request $request, Information $information)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'pdf_file' => 'nullable|file|mimes:pdf|max:10240',
        ]);

        if ($request->hasFile('pdf_file')) {
            // Hapus file lama jika ada
            if ($information->pdf_file) {
                Storage::disk('public')->delete($information->pdf_file);
            }
            $validated['pdf_file'] = $request->file('pdf_file')->store('information-pdfs', 'public');
        }

        $information->update($validated);

        return redirect()->route('information.index')
            ->with('success', 'Informasi berhasil diperbarui');
    }

    public function destroy(Information $information)
    {
        // Hapus file PDF jika ada
        if ($information->pdf_file) {
            Storage::disk('public')->delete($information->pdf_file);
        }

        $information->delete();

        return redirect()->route('information.index')
            ->with('success', 'Informasi berhasil dihapus');
    }
}
