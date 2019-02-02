<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProjectLanguage extends Model
{
    public $timestamps = false;
    public function language() {
        return $this->belongsTo('language');
    }
}
