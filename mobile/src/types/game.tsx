export type Game = {
  id: number;
  title: string;
  players: string | null;
  playTimeMinutes: number | null;
};

export type CreateGameInput = {
  title: string;
  minPlayers: number | null;
  maxPlayers: number | null;
  playTimeMinutes: number | null;
};