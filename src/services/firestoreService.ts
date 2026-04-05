import { db, auth } from '../config/firebase';
import { collection, addDoc, query, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';
import type { Subject, StudySession, ProgressItem } from '../types';

const getUserId = (): string => {
  const user = auth.currentUser;
  if (!user) throw new Error('Not logged in');
  return user.uid;
};

export const addSubject = async (name: string, targetHours: number): Promise<string> => {
  const userId = getUserId();
  const ref = await addDoc(collection(db, `users/${userId}/subjects`), {
    name,
    targetHours,
    createdAt: new Date().toISOString()
  });
  return ref.id;
};

export const getSubjects = async (): Promise<Subject[]> => {
  const userId = getUserId();
  const q = query(collection(db, `users/${userId}/subjects`));
  const snap = await getDocs(q);
  return snap.docs.map(doc => ({
    id: doc.id,
    name: doc.data().name,
    targetHours: doc.data().targetHours,
    createdAt: new Date(doc.data().createdAt)
  }));
};

export const addStudySession = async (subjectId: string, hours: number): Promise<string> => {
  const userId = getUserId();
  const today = new Date().toISOString().split('T')[0];
  const ref = await addDoc(collection(db, `users/${userId}/studySessions`), {
    subjectId,
    hours,
    date: today
  });
  await updateStreak(userId, today);
  return ref.id;
};

export const getStudySessions = async (): Promise<StudySession[]> => {
  const userId = getUserId();
  const q = query(collection(db, `users/${userId}/studySessions`));
  const snap = await getDocs(q);
  return snap.docs.map(doc => ({
    id: doc.id,
    subjectId: doc.data().subjectId,
    hours: doc.data().hours,
    date: doc.data().date
  }));
};

export const getProgressData = async (): Promise<ProgressItem[]> => {
  const subjects = await getSubjects();
  const sessions = await getStudySessions();
  const map = new Map<string, { name: string; total: number; target: number }>();
  subjects.forEach(s => map.set(s.id, { name: s.name, total: 0, target: s.targetHours }));
  sessions.forEach(s => {
    const entry = map.get(s.subjectId);
    if (entry) entry.total += s.hours;
  });
  return Array.from(map.values()).map(({ name, total, target }) => ({
    subjectName: name,
    totalHours: total,
    targetHours: target
  }));
};

async function updateStreak(userId: string, today: string): Promise<void> {
  const streakRef = doc(db, `users/${userId}/meta/streak`);
  const streakSnap = await getDoc(streakRef);
  let currentStreak = 0;
  let lastDate: string | null = null;
  if (streakSnap.exists()) {
    const data = streakSnap.data();
    currentStreak = data.currentStreak || 0;
    lastDate = data.lastDate;
  }
  let newStreak = 1;
  if (lastDate) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    if (lastDate === yesterdayStr) newStreak = currentStreak + 1;
    else if (lastDate === today) newStreak = currentStreak;
    else newStreak = 1;
  }
  await setDoc(streakRef, { currentStreak: newStreak, lastDate: today }, { merge: true });
}

export const getStreak = async (): Promise<number> => {
  const userId = getUserId();
  const streakRef = doc(db, `users/${userId}/meta/streak`);
  const snap = await getDoc(streakRef);
  return snap.exists() ? snap.data().currentStreak || 0 : 0;
};
