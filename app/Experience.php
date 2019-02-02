<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    public $timestamps = false;


    public $fillable = [
        "from",
        "name",
        "to",
    ];

    public function responsibilites() {
        return $this->hasMany('ExperienceResponsibility');
    }
}
