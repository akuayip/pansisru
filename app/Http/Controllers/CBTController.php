<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CBTController extends Controller
{
    /**
     * Display the CBT landing page
     */
    public function index()
    {
        return Inertia::render('cbt-landing');
    }

    /**
     * Display the test page
     */
    public function test()
    {
        // TODO: Fetch questions from BankSoal model
        // $questions = BankSoal::inRandomOrder()->limit(35)->get();
        
        return Inertia::render('cbt', [
            // 'questions' => $questions,
            'duration' => 120, // minutes
        ]);
    }

    /**
     * Submit the test answers
     */
    public function submit(Request $request)
    {
        $validated = $request->validate([
            'answers' => 'required|array',
        ]);

        // TODO: Process and save answers
        // Calculate score
        // Save to database
        
        return redirect()->route('cbt.result');
    }

    /**
     * Display test result
     */
    public function result()
    {
        // TODO: Fetch and display test results
        
        return Inertia::render('cbt-result', [
            'score' => 85,
            'totalQuestions' => 35,
            'correctAnswers' => 30,
        ]);
    }
}
