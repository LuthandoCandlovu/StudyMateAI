import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { addStudySession, getSubjects } from '../services/firestoreService';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { Subject } from '../types';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  AddSubject: undefined;
  AddStudyHours: undefined;
};

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'AddStudyHours'>;
};

export default function AddStudyHoursScreen({ navigation }: Props) {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedId, setSelectedId] = useState<string>('');
  const [hours, setHours] = useState<string>('');

  useEffect(() => {
    const loadSubjects = async () => {
      try {
        const subs = await getSubjects();
        setSubjects(subs);
        if (subs.length > 0) setSelectedId(subs[0].id);
      } catch (err: any) {
        Alert.alert('Error', err.message);
      }
    };
    loadSubjects();
  }, []);

  const handleLog = async () => {
    if (!selectedId) {
      Alert.alert('Error', 'No subject selected');
      return;
    }
    const h = parseFloat(hours);
    if (isNaN(h) || h <= 0) {
      Alert.alert('Error', 'Please enter a positive number of hours');
      return;
    }
    try {
      await addStudySession(selectedId, h);
      Alert.alert('Success', 'Study hours logged!');
      navigation.goBack();
    } catch (err: any) {
      Alert.alert('Error', err.message);
    }
  };

  if (subjects.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>No subjects yet. Please add a subject first.</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddSubject')}>
          <Text style={styles.buttonText}>Add Subject</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Subject</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedId}
          onValueChange={(itemValue) => setSelectedId(itemValue)}
          dropdownIconColor="#DC2626"
        >
          {subjects.map((subj) => (
            <Picker.Item key={subj.id} label={subj.name} value={subj.id} />
          ))}
        </Picker>
      </View>
      <Text style={styles.label}>Hours Studied</Text>
      <TextInput
        style={styles.input}
        value={hours}
        onChangeText={setHours}
        keyboardType="numeric"
        placeholder="e.g., 2.5"
        placeholderTextColor="#999"
      />
      <TouchableOpacity style={styles.button} onPress={handleLog}>
        <Text style={styles.buttonText}>Log Hours</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa' },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 20, marginBottom: 8, color: '#333' },
  pickerContainer: { backgroundColor: '#fff', borderRadius: 12, borderWidth: 1, borderColor: '#ddd', marginBottom: 16 },
  input: { backgroundColor: '#fff', borderRadius: 12, padding: 16, fontSize: 16, borderWidth: 1, borderColor: '#ddd' },
  button: { backgroundColor: '#DC2626', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 30 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  message: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#666' }
});
