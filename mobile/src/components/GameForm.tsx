import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

type GameFormProps = {
  title: string;
  minPlayers: string;
  maxPlayers: string;
  playTimeMinutes: string;
  isSaving: boolean;
  errorMessage: string | null;
  dark: boolean;
  colors: {
    primary: string;
    card: string;
    text: string;
    border: string;
    notification: string;
  };
  onChangeTitle: (value: string) => void;
  onChangeMinPlayers: (value: string) => void;
  onChangeMaxPlayers: (value: string) => void;
  onChangePlayTimeMinutes: (value: string) => void;
  onSubmit: () => void;
};

export default function GameForm({
  title,
  minPlayers,
  maxPlayers,
  playTimeMinutes,
  isSaving,
  errorMessage,
  dark,
  colors,
  onChangeTitle,
  onChangeMinPlayers,
  onChangeMaxPlayers,
  onChangePlayTimeMinutes,
  onSubmit,
}: GameFormProps) {
  const placeholderColor = dark ? '#8f8f8f' : '#777';

  return (
    <View style={styles.form}>
      <TextInput
        value={title}
        onChangeText={onChangeTitle}
        placeholder="Game title"
        placeholderTextColor={placeholderColor}
        style={[
          styles.input,
          {
            borderColor: colors.border,
            backgroundColor: colors.card,
            color: colors.text,
          },
        ]}
      />

      <View style={styles.row}>
        <TextInput
          value={minPlayers}
          onChangeText={onChangeMinPlayers}
          placeholder="Min"
          placeholderTextColor={placeholderColor}
          keyboardType="number-pad"
          style={[
            styles.input,
            styles.smallInput,
            {
              borderColor: colors.border,
              backgroundColor: colors.card,
              color: colors.text,
            },
          ]}
        />

        <TextInput
          value={maxPlayers}
          onChangeText={onChangeMaxPlayers}
          placeholder="Max"
          placeholderTextColor={placeholderColor}
          keyboardType="number-pad"
          style={[
            styles.input,
            styles.smallInput,
            {
              borderColor: colors.border,
              backgroundColor: colors.card,
              color: colors.text,
            },
          ]}
        />

        <TextInput
          value={playTimeMinutes}
          onChangeText={onChangePlayTimeMinutes}
          placeholder="Minutes"
          placeholderTextColor={placeholderColor}
          keyboardType="number-pad"
          style={[
            styles.input,
            styles.smallInput,
            {
              borderColor: colors.border,
              backgroundColor: colors.card,
              color: colors.text,
            },
          ]}
        />
      </View>

      <Pressable
        onPress={onSubmit}
        disabled={isSaving}
        style={[
          styles.button,
          { backgroundColor: colors.primary },
          isSaving && styles.buttonDisabled,
        ]}
      >
        <Text style={styles.buttonText}>{isSaving ? 'Saving...' : 'Add Game'}</Text>
      </Pressable>

      {errorMessage && (
        <Text style={[styles.error, { color: colors.notification }]}>
          {errorMessage}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  smallInput: {
    flex: 1,
  },
  button: {
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
  error: {
    fontWeight: '600',
  },
});