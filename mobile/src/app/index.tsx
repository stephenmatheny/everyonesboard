import { useTheme } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { createGame, getGames } from '../../src/api/games';
import { Game } from '../../src/types/game';

export default function HomeScreen() {
  const { colors, dark } = useTheme();
  const styles = useMemo(() => createStyles(colors, dark), [colors, dark]);

  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [minPlayers, setMinPlayers] = useState('');
  const [maxPlayers, setMaxPlayers] = useState('');
  const [playTimeMinutes, setPlayTimeMinutes] = useState('');

  useEffect(() => {
    async function loadGames() {
      try {
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

    loadGames();
  }, []);

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

      <View style={styles.form}>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Game title"
          placeholderTextColor={styles.placeholder.color}
          style={styles.input}
        />

        <View style={styles.row}>
          <TextInput
            value={minPlayers}
            onChangeText={setMinPlayers}
            placeholder="Min"
            placeholderTextColor={styles.placeholder.color}
            keyboardType="number-pad"
            style={[styles.input, styles.smallInput]}
          />

          <TextInput
            value={maxPlayers}
            onChangeText={setMaxPlayers}
            placeholder="Max"
            placeholderTextColor={styles.placeholder.color}
            keyboardType="number-pad"
            style={[styles.input, styles.smallInput]}
          />

          <TextInput
            value={playTimeMinutes}
            onChangeText={setPlayTimeMinutes}
            placeholder="Minutes"
            placeholderTextColor={styles.placeholder.color}
            keyboardType="number-pad"
            style={[styles.input, styles.smallInput]}
          />
        </View>

        <Pressable
          onPress={handleCreateGame}
          disabled={isSaving}
          style={[styles.button, isSaving && styles.buttonDisabled]}
        >
          <Text style={styles.buttonText}>
            {isSaving ? 'Saving...' : 'Add Game'}
          </Text>
        </Pressable>

        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      </View>

      <FlatList
        data={games}
        keyExtractor={(game) => game.id.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>

            {item.players && (
              <Text style={styles.players}>{item.players} players</Text>
            )}

            {item.playTimeMinutes && (
              <Text style={styles.players}>
                {item.playTimeMinutes} minutes
              </Text>
            )}
          </View>
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

function createStyles(
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
  },
  dark: boolean
) {
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
    form: {
      gap: 12,
      marginBottom: 24,
    },
    row: {
      flexDirection: 'row',
      gap: 8,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
      color: colors.text,
      borderRadius: 10,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 16,
    },
    smallInput: {
      flex: 1,
    },
    placeholder: {
      color: dark ? '#8f8f8f' : '#777',
    },
    button: {
      backgroundColor: colors.primary,
      paddingVertical: 12,
      borderRadius: 10,
      alignItems: 'center',
    },
    buttonDisabled: {
      opacity: 0.6,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '700',
    },
    listContent: {
      paddingBottom: 24,
    },
    card: {
      padding: 16,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      marginBottom: 12,
      backgroundColor: colors.card,
    },
    title: {
      fontSize: 20,
      fontWeight: '600',
      color: colors.text,
    },
    players: {
      marginTop: 4,
      color: dark ? '#b8b8b8' : '#555',
    },
    error: {
      color: colors.notification,
      fontWeight: '600',
    },
  });
}