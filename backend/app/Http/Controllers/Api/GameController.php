<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\GameResource;
use App\Models\Game;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GameController extends Controller
{
    public function index(): JsonResponse
    {
        $games = Game::query()
            ->orderBy('title')
            ->get();

        return response()->json(
            GameResource::collection($games)->resolve()
        );
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'min_players' => ['nullable', 'integer', 'min:1', 'max:255'],
            'max_players' => ['nullable', 'integer', 'min:1', 'max:255', 'gte:min_players'],
            'play_time_minutes' => ['nullable', 'integer', 'min:1', 'max:65535'],
        ]);

        $game = Game::create($validated);

        return response()->json(
            (new GameResource($game))->resolve(),
            201
        );
    }
}