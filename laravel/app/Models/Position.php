<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Position extends Model
{
    use HasFactory;

    protected $table = 'position';
    public $timestamps = false; // Based on your SQL dump

    /**
     * A Position belongs to one Department. (One-to-Many inverse)
     */
    public function department()
    {
        return $this->belongsTo(Department::class, 'department_id');
    }
}