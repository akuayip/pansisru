<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BankSoal extends Model
{
    protected $fillable = [
        'type',
        'question',
        'question_image',
        'options',
        'option_images',
        'correct_answer',
    ];

    protected $casts = [
        'options' => 'array',
        'option_images' => 'array',
        'correct_answer' => 'array',
    ];
}
