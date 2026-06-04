<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'app' => "Everyone's Board API",
    ]);
});

Route::get('/games', function () {
    return response()->json([
        [
            'id' => 1,
            'title' => 'Catan',
            'players' => '3-4',
        ],
        [
            'id' => 2,
            'title' => 'Ticket to Ride',
            'players' => '2-5',
        ],
    ]);
});