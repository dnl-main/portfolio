<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdminProfile extends Model
{
    use HasFactory;

    protected $table = 'admin_profile';
    public $timestamps = false; // Based on your SQL dump
    protected $primaryKey = 'account_id';
    public $incrementing = false;

    // Relates to the Account (1-1)
    public function account()
    {
        return $this->belongsTo(Account::class, 'account_id');
    }

    // Relates to the assigned Department
    public function department()
    {
        return $this->belongsTo(Department::class, 'department_id');
    }

    // Relates to the assigned Position
    public function position()
    {
        return $this->belongsTo(Position::class, 'position_id');
    }
}