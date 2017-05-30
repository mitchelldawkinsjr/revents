<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    protected $fillable = ['user_id', 'article_id'];
    protected $table = 'attendance';

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
