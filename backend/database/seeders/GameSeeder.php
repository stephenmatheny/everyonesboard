<?php

namespace Database\Seeders;

use App\Models\Game;
use Illuminate\Database\Seeder;

class GameSeeder extends Seeder
{
    public function run(): void
    {
        Game::create([
            'title' => 'Catan',
            'min_players' => 3,
            'max_players' => 4,
            'play_time_minutes' => 60,
        ]);

        Game::create([
            'title' => 'Ticket to Ride',
            'min_players' => 2,
            'max_players' => 5,
            'play_time_minutes' => 45,
        ]);

        Game::create([
            'title' => 'Wingspan',
            'min_players' => 1,
            'max_players' => 5,
            'play_time_minutes' => 70,
        ]);
    }
}