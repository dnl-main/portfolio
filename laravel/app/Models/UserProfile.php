<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserProfile extends Model
{
    use HasFactory;

    protected $table = 'user_profile';
    // Disable timestamps as this is a profile table that relies on the parent Account's timestamps
    public $timestamps = false; 
    
    // Primary key is 'account_id', not 'id'
    protected $primaryKey = 'account_id'; 
    public $incrementing = false;
    
    /**
     * The UserProfile belongs to one Account. (One-to-One inverse)
     */
    public function account()
    {
        return $this->belongsTo(Account::class, 'account_id');
    }
}