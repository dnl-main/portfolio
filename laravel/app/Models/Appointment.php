<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;

    protected $table = 'appointment';

    /**
     * An Appointment has many Accounts participating. (Many-to-Many)
     */
    public function participants()
    {
        // Pivot table is 'appointment_participant'
        return $this->belongsToMany(Account::class, 'appointment_participant', 'appointment_id', 'account_id')
                    // Also includes the role_id from the pivot table for context
                    ->withPivot('role_id');
    }
}