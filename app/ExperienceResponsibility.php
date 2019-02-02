<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ExperienceResponsibility extends Model
{
    
    public $timestamps = false;

    

    public function experience() {
        return $this->belongsTo('Experience');
    }
}
