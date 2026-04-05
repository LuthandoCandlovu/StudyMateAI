import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, RefreshControl } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { getProgressData, getStreak, getStudySessions } from '../services/firestoreService';
import ProgressChart from '../components/ProgressChart';
import axios from 'axios';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { ProgressItem } from '../types';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  AddSubject: undefined;
  AddStudyHours: undefined;
};

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

export default function HomeScreen({ navigation }: Props) {
  const [data, setData] = useState<ProgressItem[]>([]);
  const [streak, setStreak] = useState<number>(0);
  const [aiAdvice, setAiAdvice] = useState<string>('');
  const [prediction, setPrediction] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const loadData = async () => {
    try {
      const [progress, streakCount, sessions] = await Promise.all([
        getProgressData(),
        getStreak(),
        getStudySessions()
      ]);
      setData(progress);
      setStreak(streakCount);

      const last7Days = Array(7).fill(0);
      const today = new Date();
      sessions.forEach(s => {
        const sessionDate = new Date(s.date);
        const diffDays = Math.floor((today.getTime() - sessionDate.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays >= 0 && diffDays < 7) {
          last7Days[6 - diffDays] += s.hours;
        }
      });
      const totalTarget = progress.reduce((sum, subj) => sum + subj.targetHours, 0);
      const avgTarget = progress.length > 0 ? totalTarget / progress.length : 0;
      const dailyTarget = avgTarget / 7;

      const response = await axios.post('http://localhost:8000/predict', {
        daily_hours: last7Days,
        target_hours: dailyTarget
      });
      setPrediction(response.data.predicted_performance);
      setAiAdvice(response.data.advice);
    } catch (error: any) {
      console.log('AI API error:', error?.message);
      setAiAdvice('AI backend not connected');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadData);
    loadData();
    return unsubscribe;
  }, [navigation]);

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Yes', onPress: async () => { await signOut(auth); navigation.replace('Login'); } }
    ]);
  };

  const totalHours = data.reduce((s, i) => s + i.totalHours, 0);
  const totalTarget = data.reduce((s, i) => s + i.targetHours, 0);
  const progressPercent = totalTarget > 0 ? (totalHours / totalTarget) * 100 : 0;

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading your study data...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#DC2626']} />}
    >
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, Student!</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.streakCard}>
        <Text style={styles.streakEmoji}>🔥</Text>
        <Text style={styles.streakText}>{streak} day streak!</Text>
      </View>

      <View style={styles.aiCard}>
        <Text style={styles.aiTitle}>AI Prediction</Text>
        <Text style={styles.aiPercent}>{Math.round(prediction)}%</Text>
        <Text style={styles.aiAdvice}>{aiAdvice}</Text>
      </View>

      <View style={styles.statsCard}>
        <Text style={styles.statsTitle}>Overall Progress</Text>
        <Text style={styles.statsPercent}>{Math.round(progressPercent)}%</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${Math.min(progressPercent, 100)}%` }]} />
        </View>
        <Text style={styles.statsDetail}>{totalHours} of {totalTarget} hours completed</Text>
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.sectionTitle}>Subject Breakdown</Text>
        <ProgressChart data={data} />
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.cardButton} onPress={() => navigation.navigate('AddSubject')}>
          <Text style={styles.cardButtonText}>📚 Add Subject</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardButton} onPress={() => navigation.navigate('AddStudyHours')}>
          <Text style={styles.cardButtonText}>⏱️ Log Hours</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10 },
  greeting: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  logoutButton: { backgroundColor: '#DC2626', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  logoutText: { color: '#fff', fontWeight: '600' },
  streakCard: { backgroundColor: '#FFE5E5', marginHorizontal: 20, marginTop: 10, padding: 15, borderRadius: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  streakEmoji: { fontSize: 30, marginRight: 10 },
  streakText: { fontSize: 20, fontWeight: 'bold', color: '#DC2626' },
  aiCard: { backgroundColor: '#E5F0FF', marginHorizontal: 20, marginTop: 15, padding: 15, borderRadius: 20, alignItems: 'center' },
  aiTitle: { fontSize: 18, fontWeight: 'bold', color: '#2563EB', marginBottom: 5 },
  aiPercent: { fontSize: 36, fontWeight: 'bold', color: '#1E3A8A', marginVertical: 5 },
  aiAdvice: { fontSize: 16, color: '#333', textAlign: 'center' },
  statsCard: { backgroundColor: '#fff', margin: 20, padding: 20, borderRadius: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  statsTitle: { fontSize: 16, color: '#666', marginBottom: 8 },
  statsPercent: { fontSize: 48, fontWeight: 'bold', color: '#DC2626', marginBottom: 12 },
  progressBar: { height: 10, backgroundColor: '#e0e0e0', borderRadius: 5, overflow: 'hidden', marginBottom: 12 },
  progressFill: { height: '100%', backgroundColor: '#DC2626', borderRadius: 5 },
  statsDetail: { fontSize: 14, color: '#666' },
  chartContainer: { backgroundColor: '#fff', marginHorizontal: 20, marginBottom: 20, padding: 16, borderRadius: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16, color: '#333' },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginBottom: 30 },
  cardButton: { flex: 1, backgroundColor: '#DC2626', padding: 16, borderRadius: 16, alignItems: 'center', marginHorizontal: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  cardButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' }
});
