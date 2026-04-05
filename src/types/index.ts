export interface Subject {
  id: string;
  name: string;
  targetHours: number;
  createdAt: Date;
}

export interface StudySession {
  id: string;
  subjectId: string;
  hours: number;
  date: string;
}

export interface ProgressItem {
  subjectName: string;
  totalHours: number;
  targetHours: number;
}
