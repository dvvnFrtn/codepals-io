<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'max_user',
        'description',
        'owner'
    ];

    public function members() {
        return $this->belongsToMany(User::class, "group_user");
    }

    public function requests()
    {
        return $this->hasMany(GroupRequest::class);
    }

    public function chats()
    {
        return $this->hasMany(Chat::class);
    }
}
