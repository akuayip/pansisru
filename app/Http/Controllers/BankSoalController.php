<?php

namespace App\Http\Controllers;

use App\Models\BankSoal;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BankSoalController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->get('per_page', 5);
        $search = $request->get('search', '');
        
        $query = BankSoal::query();
        
        if ($search) {
            $query->where('question', 'like', '%' . $search . '%');
        }
        
        $soals = $query->latest()->paginate($perPage)->withQueryString();
        
        return Inertia::render('bank-soal/index', [
            'soals' => $soals,
            'filters' => [
                'search' => $search,
                'per_page' => $perPage,
            ]
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|in:pilihan_ganda,multi_pilihan,benar_salah',
            'question' => 'required|string',
            'question_image' => 'nullable|image|max:1024',
            'options' => 'required|array',
            'option_images' => 'nullable|array',
            'option_images.*' => 'nullable|image|max:1024',
            'correct_answer' => 'required|array',
        ]);

        if ($request->hasFile('question_image')) {
            $validated['question_image'] = $request->file('question_image')->store('bank-soal/questions', 'public');
        }

        if ($request->has('option_images')) {
            $optionImages = [];
            foreach ($request->file('option_images', []) as $index => $file) {
                if ($file) {
                    $optionImages[$index] = $file->store('bank-soal/options', 'public');
                } else {
                    $optionImages[$index] = null;
                }
            }
            $validated['option_images'] = $optionImages;
        }

        BankSoal::create($validated);

        return redirect()->back()->with('success', 'Soal berhasil ditambahkan');
    }

    public function update(Request $request, BankSoal $bankSoal)
    {
        $validated = $request->validate([
            'type' => 'required|in:pilihan_ganda,multi_pilihan,benar_salah',
            'question' => 'required|string',
            'question_image' => 'nullable|image|max:1024',
            'options' => 'required|array',
            'option_images' => 'nullable|array',
            'option_images.*' => 'nullable|image|max:1024',
            'correct_answer' => 'required|array',
        ]);

        if ($request->hasFile('question_image')) {
            // Delete old image if exists
            if ($bankSoal->question_image && \Storage::disk('public')->exists($bankSoal->question_image)) {
                \Storage::disk('public')->delete($bankSoal->question_image);
            }
            $validated['question_image'] = $request->file('question_image')->store('bank-soal/questions', 'public');
        }

        if ($request->has('option_images')) {
            $optionImages = $bankSoal->option_images ?? [];
            foreach ($request->file('option_images', []) as $index => $file) {
                if ($file) {
                    // Delete old image if exists
                    if (isset($optionImages[$index]) && $optionImages[$index] && \Storage::disk('public')->exists($optionImages[$index])) {
                        \Storage::disk('public')->delete($optionImages[$index]);
                    }
                    $optionImages[$index] = $file->store('bank-soal/options', 'public');
                }
            }
            $validated['option_images'] = $optionImages;
        }

        $bankSoal->update($validated);

        return redirect()->back()->with('success', 'Soal berhasil diperbarui');
    }

    public function destroy(BankSoal $bankSoal)
    {
        // Delete associated images
        if ($bankSoal->question_image && \Storage::disk('public')->exists($bankSoal->question_image)) {
            \Storage::disk('public')->delete($bankSoal->question_image);
        }

        if ($bankSoal->option_images) {
            foreach ($bankSoal->option_images as $image) {
                if ($image && \Storage::disk('public')->exists($image)) {
                    \Storage::disk('public')->delete($image);
                }
            }
        }

        $bankSoal->delete();

        return redirect()->back()->with('success', 'Soal berhasil dihapus');
    }
}
