import { useTheme } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';

import { createGame, getGames } from '../api/games';
import GameCard from '../components/GameCard';
import GameForm from '../components/GameForm';
import { Game } from '../types/game';

export default function CollectionScreen() {
  const { colors, dark } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [minPlayers, setMinPlayers] = useState('');
  const [maxPlayers, setMaxPlayers] = useState('');
  const [playTimeMinutes, setPlayTimeMinutes] = useState('');

  useEffect(() => {
    loadGames();
  }, []);

  async function loadGames() {
    try {
      setErrorMessage(null);
      const data = await getGames();
      setGames(data);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Something went wrong.'
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCreateGame() {
    if (!title.trim()) {
      setErrorMessage('Please enter a game title.');
      return;
    }

    try {
      setIsSaving(true);
      setErrorMessage(null);

      const newGame = await createGame({
        title: title.trim(),
        minPlayers: toNullableNumber(minPlayers),
        maxPlayers: toNullableNumber(maxPlayers),
        playTimeMinutes: toNullableNumber(playTimeMinutes),
      });

      setGames((currentGames) =>
        [...currentGames, newGame].sort((a, b) => a.title.localeCompare(b.title))
      );

      setTitle('');
      setMinPlayers('');
      setMaxPlayers('');
      setPlayTimeMinutes('');
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Could not save game.'
      );
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator color={colors.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Everyone&apos;s Board</Text>

      <GameForm
        title={title}
        minPlayers={minPlayers}
        maxPlayers={maxPlayers}
        playTimeMinutes={playTimeMinutes}
        isSaving={isSaving}
        errorMessage={errorMessage}
        colors={colors}
        dark={dark}
        onChangeTitle={setTitle}
        onChangeMinPlayers={setMinPlayers}
        onChangeMaxPlayers={setMaxPlayers}
        onChangePlayTimeMinutes={setPlayTimeMinutes}
        onSubmit={handleCreateGame}
      />

      <FlatList
        data={games}
        keyExtractor={(game) => game.id.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <GameCard game={item} colors={colors} dark={dark} />
        )}
      />
    </SafeAreaView>
  );
}

function toNullableNumber(value: string): number | null {
  const trimmed = value.trim();

  if (!trimmed) {
    return null;
  }

  return Number(trimmed);
}

function createStyles(colors: {
  background: string;
  text: string;
}) {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: colors.background,
    },
    heading: {
      fontSize: 28,
      fontWeight: '700',
      marginBottom: 24,
      color: colors.text,
    },
    listContent: {
      paddingBottom: 24,
    },
  });
}