<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RegistrationTimeline extends Model
{
    protected $fillable = [
        'title',
        'start_date',
        'end_date',
        'status',
        'order',
        'description',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
    ];
}
