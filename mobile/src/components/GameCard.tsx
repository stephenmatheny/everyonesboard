import { StyleSheet, Text, View } from 'react-native';

import { Game } from '../types/game';

type GameCardProps = {
  game: Game;
  colors: {
    card: string;
    text: string;
    border: string;
  };
  dark: boolean;
};

export default function GameCard({ game, colors, dark }: GameCardProps) {
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
      ]}
    >
      <Text style={[styles.title, { color: colors.text }]}>{game.title}</Text>

      {game.players && (
        <Text style={[styles.meta, { color: dark ? '#b8b8b8' : '#555' }]}>
          {game.players} players
        </Text>
      )}

      {game.playTimeMinutes && (
        <Text style={[styles.meta, { color: dark ? '#b8b8b8' : '#555' }]}>
          {game.playTimeMinutes} minutes
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  meta: {
    marginTop: 4,
  },
});