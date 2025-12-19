<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AccountController;
use App\Http\Controllers\Api\AuthController;



/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

// Auth Routes
Route::post('/signup', [AccountController::class, 'store']);
Route::post('/login', [AuthController::class, 'login']);

// Explicitly handle GET on signup if needed
Route::get('/signup', function () {
    return response()->json(['message' => 'Method not allowed'], 405);
});

/*
|--------------------------------------------------------------------------
| Protected Routes (Requires Authentication)
|--------------------------------------------------------------------------
| These routes are wrapped in the 'auth:sanctum' middleware.
| Sanctum will check for a valid session cookie from your Next.js app.
*/

Route::middleware('auth:sanctum')->group(function () {
    
    // 1. Get current authenticated user (Vital for your RoleGuard)
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // 2. Logout
    Route::post('/logout', [AuthController::class, 'logout']);

    // 3. Protected Resource Routes
    Route::get('/users', [AccountController::class, 'index']);
    // Route::apiResource('accounts', AccountController::class);
    
});