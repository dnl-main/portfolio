<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    protected $table = 'role';

    /**
     * A Role belongs to many Accounts. (Many-to-Many)
     */
    public function accounts()
    {
        return $this->belongsToMany(Account::class, 'account_role', 'role_id', 'account_id');
    }
}