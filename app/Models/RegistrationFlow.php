<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RegistrationFlow extends Model
{
    protected $fillable = [
        'title',
        'description',
        'order',
    ];
}
