export type Subject = 'math' | 'english';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type Mode = 'timed' | 'practice';

export interface Question {
  q: string;
  a: string[];
  correct: number;
  topic?: string;
}

export interface QuestionData {
  math: {
    easy: Question[];
    medium: Question[];
    hard: Question[];
  };
  english: {
    easy: Question[];
    medium: Question[];
    hard: Question[];
  };
}

export interface Stats {
  totalQuizzes: number;
  totalCorrect: number;
  totalIncorrect: number;
  totalScore: number;
  subjects: {
    math: { correct: number; incorrect: number };
    english: { correct: number; incorrect: number };
  };
}

export interface StreakData {
  lastDate: string | null;
  count: number;
  freezes: number;
}

export interface AnswerHistory {
  questionIndex: number;
  correctIndex: number;
  chosenIndex: number;
}