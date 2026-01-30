import React, { useState, useEffect } from 'react';
import { Subject, Difficulty, Mode, Question, Stats, StreakData, AnswerHistory } from './types';
import { QUESTIONS, DIFFICULTY_SETTINGS } from './constants';
import Background from './components/Background';
import SetupScreen from './components/SetupScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import SettingsModal from './components/SettingsModal';
import StudyResourcesModal from './components/StudyResourcesModal';
import AdminPanel from './components/AdminPanel';
import QuestionBankScreen from './components/QuestionBankScreen';
import StreakRecoveryModal from './components/StreakRecoveryModal';
import { GoogleGenAI, Type } from "@google/genai";
import { Loader2, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  // --- View State ---
  const [view, setView] = useState<'setup' | 'quiz' | 'result' | 'bank'>('setup');
  const [isLoading, setIsLoading] = useState(false);
  const [isDaily, setIsDaily] = useState(false);
  const [isRecovery, setIsRecovery] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  // --- Quiz Config State ---
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [isTimed, setIsTimed] = useState(true);
  const [timePerQ, setTimePerQ] = useState(60);
  const [currentSubject, setCurrentSubject] = useState<Subject>('math');
  const [currentDifficulty, setCurrentDifficulty] = useState<Difficulty>('easy');
  
  // --- Results State ---
  const [lastScore, setLastScore] = useState(0);
  const [lastHistory, setLastHistory] = useState<AnswerHistory[]>([]);

  // --- Persistent State (Stats & Streak) ---
  const [stats, setStats] = useState<Stats>(() => {
    const saved = localStorage.getItem('quizStats');
    return saved ? JSON.parse(saved) : {
      totalQuizzes: 0, totalCorrect: 0, totalIncorrect: 0, totalScore: 0,
      subjects: { math: { correct: 0, incorrect: 0 }, english: { correct: 0, incorrect: 0 } }
    };
  });

  const [streak, setStreak] = useState<StreakData>(() => {
    const saved = localStorage.getItem('dailyStreak');
    return saved ? { freezes: 2, ...JSON.parse(saved) } : { lastDate: null, count: 0, freezes: 2 };
  });

  // --- Modals ---
  const [showSettings, setShowSettings] = useState(false);
  const [showResources, setShowResources] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  
  // Recovery Modal State
  const [showRecovery, setShowRecovery] = useState(false);
  const [lostStreakCount, setLostStreakCount] = useState(0);

  // --- Effects ---
  useEffect(() => {
    localStorage.setItem('quizStats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem('dailyStreak', JSON.stringify(streak));
  }, [streak]);

  // Streak Validation Logic (Runs once on mount)
  useEffect(() => {
    if (!streak.lastDate) return;

    const checkStreak = () => {
      const today = new Date();
      today.setHours(0,0,0,0);
      
      const last = new Date(streak.lastDate!);
      last.setHours(0,0,0,0);
      
      const diffTime = Math.abs(today.getTime() - last.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

      if (diffDays > 1) {
        if (streak.freezes > 0) {
          const newFreezes = streak.freezes - 1;
          setStreak(prev => ({
            ...prev,
            freezes: newFreezes,
            lastDate: new Date(today.getTime() - (86400000)).toDateString()
          }));
          setToastMessage("❄️ Streak Freeze Activated! Your streak was saved.");
          setTimeout(() => setToastMessage(null), 5000);
        } else {
          // Trigger Recovery Mode instead of immediate reset
          setLostStreakCount(streak.count);
          setStreak(prev => ({ ...prev, count: 0 })); // Temporarily show 0
          setShowRecovery(true);
        }
      }
    };

    checkStreak();
  }, []); 

  // Admin Key Listener (Ctrl + L + R)
  useEffect(() => {
    const pressed = new Set<string>();

    const handleKeyDown = (e: KeyboardEvent) => {
      pressed.add(e.key.toLowerCase());
      const hasCtrl = e.ctrlKey || e.metaKey; 
      if (hasCtrl && pressed.has('l') && pressed.has('r')) {
        setShowAdmin(prev => !prev);
        pressed.clear(); 
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      pressed.delete(e.key.toLowerCase());
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // --- AI Generation ---
  const fetchAIQuestions = async (subject: Subject, difficulty: Difficulty, count: number): Promise<Question[] | null> => {
    if (!process.env.API_KEY) return null;

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      let specificInstructions = "";
      if (subject === 'math') {
        if (difficulty === 'easy') specificInstructions = `Subject: SAT MATH (Heart of Algebra). Difficulty: EASY. Style: Simple integers.`;
        else if (difficulty === 'medium') specificInstructions = `Subject: SAT MATH (Data Analysis). Difficulty: MEDIUM. Style: Word problems.`;
        else specificInstructions = `Subject: SAT MATH (Advanced Math). Difficulty: HARD. Style: Abstract, quadratics.`;
      } else {
        if (difficulty === 'easy') specificInstructions = `Subject: SAT ENGLISH (Conventions). Difficulty: EASY.`;
        else if (difficulty === 'medium') specificInstructions = `Subject: SAT ENGLISH (Craft & Structure). Difficulty: MEDIUM.`;
        else specificInstructions = `Subject: SAT ENGLISH (Inference). Difficulty: HARD.`;
      }

      const prompt = `Generate ${count} unique SAT practice questions. 
      ${specificInstructions}
      Return JSON array. Field "correct" is integer index.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                q: { type: Type.STRING },
                a: { type: Type.ARRAY, items: { type: Type.STRING } },
                correct: { type: Type.INTEGER },
                topic: { type: Type.STRING }
              },
              required: ["q", "a", "correct", "topic"]
            }
          }
        }
      });

      if (response.text) {
        const data = JSON.parse(response.text);
        if (Array.isArray(data) && data.length > 0) return data;
      }
      return null;
    } catch (error) {
      console.error("AI Generation failed", error);
      return null;
    }
  };

  // --- Handlers ---
  const shuffleArray = (array: Question[]) => [...array].sort(() => Math.random() - 0.5);

  const handleStart = async (subject: Subject, difficulty: Difficulty, mode: Mode) => {
    setIsLoading(true);
    const config = DIFFICULTY_SETTINGS[difficulty];
    let selectedQs = await fetchAIQuestions(subject, difficulty, config.numQuestions);

    if (!selectedQs) {
      const pool = QUESTIONS[subject][difficulty];
      selectedQs = shuffleArray(pool).slice(0, config.numQuestions);
    }
    
    setCurrentQuestions(selectedQs);
    setCurrentSubject(subject);
    setCurrentDifficulty(difficulty);
    setIsTimed(mode === 'timed');
    setTimePerQ(config.timePerQ);
    setIsDaily(false);
    setIsRecovery(false);
    setIsLoading(false);
    setView('quiz');
  };

  const handleDaily = async () => {
    setIsLoading(true);
    // Daily is a random hard question from either subject for maximum engagement
    const subjects: Subject[] = ['math', 'english'];
    const s = subjects[Math.floor(Math.random() * subjects.length)];
    const d = 'medium'; // Daily is usually medium to be accessible but challenging
    
    let selectedQs = await fetchAIQuestions(s, d, 1);
    if (!selectedQs) selectedQs = [QUESTIONS[s][d][Math.floor(Math.random() * QUESTIONS[s][d].length)]];

    setCurrentQuestions(selectedQs);
    setCurrentSubject(s);
    setCurrentDifficulty(d);
    setIsTimed(true);
    setTimePerQ(60); 
    setIsDaily(true);
    setIsRecovery(false);
    setIsLoading(false);
    setView('quiz');
  };

  const handleRecoverStreak = async () => {
    setShowRecovery(false);
    setIsLoading(true);
    // Recovery is ALWAYS a hard math question
    const s = 'math';
    const d = 'hard';
    
    let selectedQs = await fetchAIQuestions(s, d, 1);
    if (!selectedQs) selectedQs = [QUESTIONS[s][d][Math.floor(Math.random() * QUESTIONS[s][d].length)]];

    setCurrentQuestions(selectedQs);
    setCurrentSubject(s);
    setCurrentDifficulty(d);
    setIsTimed(true);
    setTimePerQ(90); // Give a bit more time for recovery
    setIsDaily(false);
    setIsRecovery(true);
    setIsLoading(false);
    setView('quiz');
  };

  const handleComplete = (score: number, history: AnswerHistory[]) => {
    setLastScore(score);
    setLastHistory(history);

    setStats(prev => {
        const totalQs = history.length;
        const newScore = Math.round((score / totalQs) * 800);
        return {
            totalQuizzes: prev.totalQuizzes + 1,
            totalCorrect: prev.totalCorrect + score,
            totalIncorrect: prev.totalIncorrect + (totalQs - score),
            totalScore: prev.totalScore + newScore,
            subjects: {
                ...prev.subjects,
                [currentSubject]: {
                    correct: prev.subjects[currentSubject].correct + score,
                    incorrect: prev.subjects[currentSubject].incorrect + (totalQs - score)
                }
            }
        };
    });

    const today = new Date().toDateString();

    if (isRecovery) {
        // Recovery Logic
        if (score === 1) { // They passed
            setStreak(prev => ({
                count: lostStreakCount + 1,
                lastDate: today,
                freezes: prev.freezes
            }));
            setToastMessage("🔥 STREAK RESTORED! You are a legend.");
        } else {
            setStreak(prev => ({
                count: 1, // Start over at 1
                lastDate: today,
                freezes: prev.freezes
            }));
            setToastMessage("Recovery failed. Streak reset to 1.");
        }
        setIsRecovery(false);
    } else if (isDaily) {
      // Standard Daily Logic
      const lastDate = streak.lastDate;
      if (lastDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayString = yesterday.toDateString();

        let newCount = 1;
        if (lastDate === yesterdayString) {
          newCount = streak.count + 1;
        }

        // Award Freezes on Milestones (Every 7 days)
        let newFreezes = streak.freezes;
        if (newCount > 0 && newCount % 7 === 0) {
            newFreezes = Math.min(newFreezes + 1, 5); 
            setToastMessage("🎉 7-Day Streak! +1 Freeze earned!");
        }

        setStreak({ lastDate: today, count: newCount, freezes: newFreezes });
      }
    }

    setView('result');
  };

  const handleResetStats = () => {
    setStats({
      totalQuizzes: 0, totalCorrect: 0, totalIncorrect: 0, totalScore: 0,
      subjects: { math: { correct: 0, incorrect: 0 }, english: { correct: 0, incorrect: 0 } }
    });
    setStreak({ lastDate: null, count: 0, freezes: 2 });
    setShowSettings(false);
  };

  return (
    <div className="font-sans text-gray-100 min-h-screen relative overflow-hidden">
      <Background />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[200] animate-slide-up pointer-events-none">
           <div className="glass-card px-6 py-3 rounded-full border border-indigo-500/30 flex items-center gap-2 shadow-[0_0_30px_rgba(99,102,241,0.3)] bg-black/50 backdrop-blur-xl">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span className="font-bold text-sm text-white">{toastMessage}</span>
           </div>
        </div>
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md animate-fade-in">
          <div className="relative">
             <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-20 animate-pulse rounded-full"></div>
             <Loader2 className="w-16 h-16 text-indigo-400 animate-spin relative z-10" />
          </div>
          <div className="mt-6 flex items-center gap-2 text-xl font-medium text-white/90">
             <Sparkles className="w-5 h-5 text-indigo-300 animate-pulse" />
             <span className="animate-pulse">Generating Fresh Questions...</span>
          </div>
        </div>
      )}

      {view === 'setup' && (
        <SetupScreen 
            onStart={handleStart} 
            onDaily={handleDaily} 
            onSettings={() => setShowSettings(true)}
            onOpenBank={() => setView('bank')}
            streak={streak}
            stats={stats}
        />
      )}

      {view === 'quiz' && (
        <QuizScreen 
            questions={currentQuestions}
            isTimed={isTimed}
            timePerQuestion={timePerQ}
            onComplete={handleComplete}
            onExit={() => setView('setup')}
            subject={currentSubject}
        />
      )}

      {view === 'result' && (
        <ResultScreen 
            score={lastScore}
            total={currentQuestions.length}
            history={lastHistory}
            questions={currentQuestions}
            onRetry={() => handleStart(currentSubject, currentDifficulty, isTimed ? 'timed' : 'practice')}
            onHome={() => setView('setup')}
        />
      )}

      {view === 'bank' && (
        <QuestionBankScreen onBack={() => setView('setup')} />
      )}

      <SettingsModal 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)}
        stats={stats}
        onResetStats={handleResetStats}
        onOpenResources={() => setShowResources(true)}
      />

      <StudyResourcesModal 
        isOpen={showResources}
        onClose={() => setShowResources(false)}
      />

      <StreakRecoveryModal 
        isOpen={showRecovery}
        lostStreak={lostStreakCount}
        onRecover={handleRecoverStreak}
        onAcceptLoss={() => setShowRecovery(false)}
      />

      <AdminPanel 
        isOpen={showAdmin} 
        onClose={() => setShowAdmin(false)}
        stats={stats}
        setStats={setStats}
        streak={streak}
        setStreak={setStreak}
        view={view}
        setView={setView}
      />

    </div>
  );
};

export default App;