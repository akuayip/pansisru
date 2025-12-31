<?php

namespace App\Http\Controllers;

use App\Models\FAQ;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FAQController extends Controller
{
    public function index()
    {
        $faqs = FAQ::get();
        
        return Inertia::render('dashboard/faq', [
            'faqs' => $faqs
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'question' => 'required|string',
            'answer' => 'required|string',
        ]);

        FAQ::create($validated);

        return redirect()->route('faq.index')
            ->with('success', 'FAQ berhasil ditambahkan');
    }

    public function update(Request $request, FAQ $faq)
    {
        $validated = $request->validate([
            'question' => 'required|string',
            'answer' => 'required|string',
        ]);

        $faq->update($validated);

        return redirect()->route('faq.index')
            ->with('success', 'FAQ berhasil diperbarui');
    }

    public function destroy(FAQ $faq)
    {
        $faq->delete();

        return redirect()->route('faq.index')
            ->with('success', 'FAQ berhasil dihapus');
    }
}
