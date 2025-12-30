<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Information extends Model
{
    use HasFactory;

    protected $table = 'information';

    protected $fillable = [
        'title',
        'description',
        'pdf_file',
        'release_date',
    ];

    protected $casts = [
        'release_date' => 'datetime',
    ];
}
