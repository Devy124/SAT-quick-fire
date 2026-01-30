import React, { useState } from 'react';
import { Subject, Difficulty, Mode, StreakData, Stats } from '../types';
import { Flame, Clock, BookOpen, Settings, Play, Sparkles, Brain, PenTool, Database, Snowflake, Trophy, Target } from 'lucide-react';

interface SetupScreenProps {
  onStart: (subject: Subject, difficulty: Difficulty, mode: Mode) => void;
  onDaily: () => void;
  onSettings: () => void;
  onOpenBank: () => void;
  streak: StreakData;
  stats: Stats;
}

const SetupScreen: React.FC<SetupScreenProps> = ({ onStart, onDaily, onSettings, onOpenBank, streak, stats }) => {
  const [subject, setSubject] = useState<Subject>('math');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [mode, setMode] = useState<Mode>('timed');

  const isDailyDone = streak.lastDate === new Date().toDateString();

  // Level Calculation
  const totalScore = stats.totalScore || 0;
  const level = Math.floor(Math.sqrt(totalScore / 100)) + 1;
  const currentLevelScore = Math.pow(level - 1, 2) * 100;
  const nextLevelScore = Math.pow(level, 2) * 100;
  const progressRaw = ((totalScore - currentLevelScore) / (nextLevelScore - currentLevelScore)) * 100;
  const progress = Math.min(100, Math.max(0, isNaN(progressRaw) ? 0 : progressRaw));
  
  const getRankTitle = (lvl: number) => {
      if (lvl >= 50) return "Grandmaster";
      if (lvl >= 30) return "Legend";
      if (lvl >= 20) return "Elite";
      if (lvl >= 10) return "Scholar";
      if (lvl >= 5) return "Apprentice";
      return "Novice";
  };
  const rank = getRankTitle(level);

  // Streak Rewards Logic
  const daysUntilFreeze = 7 - (streak.count % 7);
  const freezeProgress = ((streak.count % 7) / 7) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-6 relative z-10 selection:bg-indigo-500/30">
      
      {/* Top Bar with Leveling & Settings */}
      <div className="fixed top-0 left-0 right-0 p-6 flex justify-between items-start z-50 pointer-events-none">
        
        {/* Level Widget */}
        <div className="pointer-events-auto flex items-center gap-4 bg-black/40 backdrop-blur-md border border-white/10 p-2 pr-6 rounded-full animate-slide-in-right shadow-lg">
            <div className="relative w-12 h-12 flex items-center justify-center bg-indigo-500/20 rounded-full border border-indigo-500/30">
                <Trophy className="w-5 h-5 text-indigo-300" />
                {/* Circular Progress SVG */}
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle cx="24" cy="24" r="23" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                    <circle cx="24" cy="24" r="23" fill="none" stroke="#818cf8" strokeWidth="2" 
                        strokeDasharray={144.5} strokeDashoffset={144.5 - (144.5 * progress) / 100} strokeLinecap="round" />
                </svg>
            </div>
            <div className="flex flex-col">
                <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest">Lvl {level} {rank}</span>
                <span className="text-xs text-white/60 font-medium">{Math.floor(totalScore)} XP</span>
            </div>
        </div>

        <button 
          onClick={onSettings}
          className="pointer-events-auto p-3 bg-black/40 hover:bg-white/10 backdrop-blur-md rounded-full border border-white/10 transition-colors group"
        >
          <Settings className="w-5 h-5 text-white/60 group-hover:text-white group-hover:rotate-90 transition-all" />
        </button>
      </div>

      <div className="w-full max-w-lg space-y-8 animate-slide-up">
        
        {/* Header Title */}
        <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-widest mb-4">
                <Sparkles className="w-3 h-3" /> Elite Prep Suite
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 tracking-tighter drop-shadow-2xl">
                Quick Fire
            </h1>
            <p className="text-lg text-white/40 font-medium tracking-wide">
                Master the SAT, one sprint at a time.
            </p>
        </div>

        {/* Streak & Daily Card */}
        <div className="grid grid-cols-2 gap-4">
            {/* Streak Widget */}
            <div className="glass-card p-4 rounded-2xl flex flex-col justify-between relative overflow-hidden group min-h-[140px]">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                {/* Top Row */}
                <div className="flex justify-between items-start w-full relative z-10">
                    <div className="flex items-center gap-1">
                        <Flame className={`w-5 h-5 ${streak.count > 0 ? 'text-orange-500 fill-orange-500 animate-pulse' : 'text-white/20'}`} />
                        <span className="text-2xl font-black text-white">{streak.count}</span>
                    </div>
                    
                    <div className="flex items-center gap-1 bg-blue-500/20 px-1.5 py-0.5 rounded text-[10px] font-bold text-blue-300 border border-blue-500/20" title="Streak Freezes">
                        <Snowflake className="w-3 h-3" /> {streak.freezes}
                    </div>
                </div>

                <div className="relative z-10">
                    <span className="text-[10px] uppercase font-bold text-white/40 tracking-widest block mb-2">Day Streak</span>
                    
                    {/* Next Reward Progress */}
                    <div className="space-y-1">
                        <div className="flex justify-between text-[9px] text-white/30 font-bold uppercase">
                            <span>Next Freeze</span>
                            <span>{daysUntilFreeze} Days</span>
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-1000"
                                style={{ width: `${freezeProgress}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Daily Button */}
            <button 
                onClick={onDaily}
                disabled={isDailyDone}
                className={`p-4 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden transition-all border min-h-[140px]
                    ${isDailyDone 
                        ? 'bg-emerald-500/10 border-emerald-500/20 cursor-default' 
                        : 'glass-card hover:bg-white/5 hover:border-indigo-500/40 cursor-pointer active:scale-[0.98]'}`}
            >
                {isDailyDone ? (
                    <>
                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center mb-3">
                            <Target className="w-6 h-6 text-emerald-400" />
                        </div>
                        <span className="text-xs font-bold text-emerald-300">Completed</span>
                        <span className="text-[10px] text-white/30 mt-1">Come back tomorrow</span>
                    </>
                ) : (
                    <>
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/5"></div>
                        <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center mb-3 relative z-10">
                            <Target className="w-6 h-6 text-indigo-400" />
                        </div>
                        <span className="text-sm font-bold text-white relative z-10">Daily Challenge</span>
                        <div className="absolute top-3 right-3 w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
                    </>
                )}
            </button>
        </div>

        {/* Configuration Panel */}
        <div className="glass-card p-6 md:p-8 rounded-[2rem] space-y-8 relative shadow-2xl">
            
            {/* Subject Selection */}
            <div className="space-y-3">
                <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Subject</label>
                <div className="grid grid-cols-2 gap-3 p-1 bg-black/20 rounded-xl border border-white/5">
                    <button 
                        onClick={() => setSubject('math')}
                        className={`flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all
                        ${subject === 'math' ? 'bg-indigo-600 text-white shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                    >
                        <Brain className="w-4 h-4" /> Math
                    </button>
                    <button 
                        onClick={() => setSubject('english')}
                        className={`flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all
                        ${subject === 'english' ? 'bg-purple-600 text-white shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                    >
                        <PenTool className="w-4 h-4" /> English
                    </button>
                </div>
            </div>

            {/* Difficulty Selection */}
            <div className="space-y-3">
                <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Difficulty</label>
                <div className="grid grid-cols-3 gap-3">
                    {(['easy', 'medium', 'hard'] as const).map((d) => (
                        <button
                            key={d}
                            onClick={() => setDifficulty(d)}
                            className={`py-3 rounded-xl border text-sm font-bold capitalize transition-all duration-300
                            ${difficulty === d 
                                ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-105' 
                                : 'bg-white/5 border-transparent text-white/40 hover:bg-white/10 hover:text-white'}`}
                        >
                            {d}
                        </button>
                    ))}
                </div>
            </div>

            {/* Mode Toggle */}
            <div className="space-y-3">
                <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Mode</label>
                <div className="flex bg-black/20 p-1 rounded-xl border border-white/5 relative">
                    <button 
                        onClick={() => setMode('timed')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all
                        ${mode === 'timed' ? 'bg-red-500/80 text-white shadow-lg' : 'text-white/30 hover:text-white'}`}
                    >
                        <Clock className="w-3.5 h-3.5" /> Timed
                    </button>
                    <button 
                        onClick={() => setMode('practice')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all
                        ${mode === 'practice' ? 'bg-emerald-500/80 text-white shadow-lg' : 'text-white/30 hover:text-white'}`}
                    >
                        <BookOpen className="w-3.5 h-3.5" /> Practice
                    </button>
                </div>
            </div>

            {/* Start Action */}
            <button 
                onClick={() => onStart(subject, difficulty, mode)}
                className="w-full group relative py-5 bg-white text-black rounded-2xl font-black text-lg tracking-wide hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.2)] overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span className="flex items-center justify-center gap-2 relative z-10">
                    START SESSION <Play className="w-5 h-5 fill-current" />
                </span>
            </button>

            {/* Question Bank Link */}
            <button 
                onClick={onOpenBank}
                className="w-full text-center text-xs font-bold text-white/30 hover:text-indigo-300 transition-colors flex items-center justify-center gap-2"
            >
                <Database className="w-3 h-3" /> BROWSE QUESTION BANK
            </button>
        </div>
      </div>
    </div>
  );
};

export default SetupScreen;