<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RegistrationRequirement extends Model
{
    protected $fillable = [
        'title',
        'description',
        'type',
        'order',
    ];
}
