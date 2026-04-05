import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import { addSubject } from '../services/firestoreService';
import { auth } from '../config/firebase';
import type { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  AddSubject: undefined;
  AddStudyHours: undefined;
};

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'AddSubject'>;
};

export default function AddSubjectScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [target, setTarget] = useState('');

  const handleAdd = async () => {
    if (!auth.currentUser) {
      Alert.alert('Error', 'Not logged in');
      navigation.replace('Login');
      return;
    }
    if (!name.trim()) {
      Alert.alert('Error', 'Subject name required');
      return;
    }
    const hours = parseFloat(target);
    if (isNaN(hours) || hours <= 0) {
      Alert.alert('Error', 'Target hours must be positive');
      return;
    }
    try {
      await addSubject(name, hours);
      Alert.alert('Success', 'Subject added');
      navigation.goBack();
    } catch (err: any) {
      Alert.alert('Error', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Subject Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="e.g., Mathematics"
      />
      <Text style={styles.label}>Target Hours</Text>
      <TextInput
        style={styles.input}
        value={target}
        onChangeText={setTarget}
        placeholder="e.g., 40"
        keyboardType="numeric"
      />
      <Button title="Add Subject" onPress={handleAdd} color="#DC2626" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 20, marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8, fontSize: 16, backgroundColor: '#f9f9f9' }
});
