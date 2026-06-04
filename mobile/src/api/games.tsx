import { apiGet, apiPost } from './client';
import { CreateGameInput, Game } from '../types/game';

export function getGames() {
  return apiGet<Game[]>('/api/games');
}

export function createGame(input: CreateGameInput) {
  return apiPost<Game>('/api/games', {
    title: input.title,
    min_players: input.minPlayers,
    max_players: input.maxPlayers,
    play_time_minutes: input.playTimeMinutes,
  });
}