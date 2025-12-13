<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');



Route::get('/users', [UserController::class, 'index']);

// Route::get('/hello', function () {
//     return response()->json([
//         'message' => 'Hello from Laravel 👋'
//     ]);
// });

// use Illuminate\Support\Facades\DB;

// Route::get('/db-test', function () {
//     try {
//         DB::connection()->getPdo();
//         return response()->json([
//             'status' => 'success',
//             'message' => 'Database connected successfully ✅'
//         ]);
//     } catch (\Exception $e) {
//         return response()->json([
//             'status' => 'error',
//             'message' => $e->getMessage()
//         ], 500);
//     }
// });

// Route::get('/db-check-table', function () {
//     $count = DB::table('migrations')->count();

//     return response()->json([
//         'migrations_count' => $count
//     ]);
// });


