<?php

use Illuminate\Support\Facades\Route;
use App\Models\Account;

Route::get('/', function () {
    return view('welcome');
});