<?php

namespace App\Http\Resources;

use App\Models\Game;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Game */
class GameResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'players' => $this->formatPlayers(),
            'playTimeMinutes' => $this->play_time_minutes,
        ];
    }

    private function formatPlayers(): ?string
    {
        if ($this->min_players && $this->max_players) {
            return "{$this->min_players}-{$this->max_players}";
        }

        if ($this->min_players) {
            return "{$this->min_players}+";
        }

        return null;
    }
}