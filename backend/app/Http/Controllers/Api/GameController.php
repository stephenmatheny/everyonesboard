<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Game;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GameController extends Controller
{
    public function index(): JsonResponse
    {
        $games = Game::query()
            ->orderBy('title')
            ->get()
            ->map(fn (Game $game) => $this->formatGame($game));

        return response()->json($games);
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

        return response()->json($this->formatGame($game), 201);
    }

    private function formatGame(Game $game): array
    {
        return [
            'id' => $game->id,
            'title' => $game->title,
            'players' => $this->formatPlayers($game),
            'playTimeMinutes' => $game->play_time_minutes,
        ];
    }

    private function formatPlayers(Game $game): ?string
    {
        if ($game->min_players && $game->max_players) {
            return "{$game->min_players}-{$game->max_players}";
        }

        if ($game->min_players) {
            return "{$game->min_players}+";
        }

        return null;
    }
}