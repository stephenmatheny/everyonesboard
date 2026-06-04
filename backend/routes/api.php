<?php

use App\Http\Controllers\Api\GameController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'app' => "Everyone's Board API",
    ]);
});

Route::get('/games', [GameController::class, 'index']);
Route::post('/games', [GameController::class, 'store']);