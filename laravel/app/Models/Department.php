<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use HasFactory;

    protected $table = 'department';
    public $timestamps = false; // Based on your SQL dump

    /**
     * A Department has many Positions. (One-to-Many)
     */
    public function positions()
    {
        return $this->hasMany(Position::class, 'department_id');
    }
}