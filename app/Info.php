<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Info extends Model
{
    public $timestamps = false;

    public $fillable = [
        'first_name',
        'last_name',
        'facebook',
        'twitter',
        'github',
        'linkedin',
        'title',
        'description',
        'email',
        'phone',
        'profile_path',
    ];
    public function full_name() {
        return $this->first_name . " " . $this->last_name;
    }
}
