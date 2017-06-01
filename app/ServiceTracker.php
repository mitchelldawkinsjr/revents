<?php

namespace App;

use App\Scopes\userScope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;


class ServiceTracker extends Model
{
    protected $fillable = ['user_id','name','date','description','time'];

    protected $table = 'service_tracker';

    public function user()
    {
        return $this->belongsTo(User::class);
    }


    protected static function boot()
    {
        parent::boot();

        static::addGlobalScope(new userScope());
    }

    /**
     * Scope a query to only include authenticated users.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeUser($query,$user_id)
    {
        return $query->where('user_id', '=', $user_id);
    }

}
