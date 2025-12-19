<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class Account extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $table = 'account';

    protected $fillable = [
        'email',
        'password',
        'first_name',
        'last_name',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    // This makes sure 'role' is included whenever the model is converted to JSON
    protected $appends = ['role'];

    /**
     * Virtual Role Logic
     */
    public function getRoleAttribute(): string
    {
        $email = strtolower(trim($this->email));

        if (str_ends_with($email, '@super.com')) return 'superadmin';
        if (str_ends_with($email, '@admin.com')) return 'admin';
        return 'user'; 
    }

    /**
     * Relationship to roles
     */
    public function roles()
    {
        return $this->belongsToMany(Role::class, 'account_role', 'account_id', 'role_id');
    }

    /**
     * Boot method to automatically assign role after creation
     */
    protected static function booted()
    {
        static::created(function ($account) {
            $roleName = $account->getRoleAttribute();

            // Get the role ID from the role table
            $roleId = DB::table('role')->where('role_name', $roleName)->value('id');

            if ($roleId) {
                DB::table('account_role')->insert([
                    'account_id' => $account->id,
                    'role_id' => $roleId,
                ]);
            }
        });
    }

    /**
     * Signup helper
     */
    public static function signUp(array $data): self
    {
        return self::create([
            'email'    => $data['email'],
            'password' => Hash::make($data['password']),
            'first_name' => $data['first_name'] ?? null,
            'last_name'  => $data['last_name'] ?? null,
        ]);
    }
}
