'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { shuffleArray } from '@/lib/utils';

// Font styles for our custom fonts
const fontStyles = `
  @font-face {
    font-family: 'KnightWarrior';
    src: url('/assets/assetsQuiz/KnightWarrior.otf') format('opentype');
    font-weight: normal;
    font-style: normal;
  }
  
  @font-face {
    font-family: 'CaviarDreams';
    src: url('/assets/assetsQuiz/CaviarDreams.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  
  @font-face {
    font-family: 'CaviarDreamsBold';
    src: url('/assets/assetsQuiz/CaviarDreams_Bold.ttf') format('truetype');
    font-weight: bold;
    font-style: normal;
  }
`;

// Define types for quiz data
interface QuizQuestion {
  question: string;
  correct: string;
  wrong: string[];
  options?: string[];
}

interface QuizData {
  questions: QuizQuestion[];
}

// Button component styled like in the original game
function Button({ text, onClick, isActive = true, type = 'primary', className = '' }: { 
  text: string; 
  onClick: () => void;
  isActive?: boolean;
  type?: 'primary' | 'option' | 'lifeline' | 'home';
  className?: string;
}) {
  const baseClasses = "py-4 px-8 shadow-md transition-all duration-300 text-xl font-bold";
  const primaryClasses = isActive 
    ? "bg-[#FFD700] text-black hover:bg-[#FFD700]/80 w-full text-center rounded-full" 
    : "bg-gray-400 text-gray-700 cursor-not-allowed w-full text-center rounded-full";
  
  const optionClasses = isActive
    ? "bg-[#4682B4] text-white hover:bg-[#4682B4]/80 w-full mb-3 rounded-lg"
    : "bg-gray-400 text-gray-700 cursor-not-allowed w-full mb-3 rounded-lg";
    
  const lifelineClasses = isActive
    ? "bg-[#00C800] text-white hover:bg-[#00C800]/80 rounded-lg"
    : "bg-gray-400 text-gray-700 cursor-not-allowed rounded-lg";
    
  const homeClasses = isActive
    ? "bg-white text-black hover:bg-white/80 rounded-lg"
    : "bg-gray-400 text-gray-700 cursor-not-allowed rounded-lg";
    
  const classes = `${baseClasses} ${
    type === 'primary' ? primaryClasses : 
    type === 'option' ? optionClasses : 
    type === 'home' ? homeClasses : lifelineClasses
  } ${className}`;
  
  return (
    <button
      onClick={isActive ? onClick : undefined}
      className={classes}
      style={{ fontFamily: 'CaviarDreamsBold' }}
      disabled={!isActive}
    >
      {text}
    </button>
  );
}

// Function to format prize amounts like "$1,000 - ONE THOUSAND"
function formatPrize(n: number): string {
  const numToWords = (n: number): string => {
    const under20 = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
    const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
    const thousands = ["", "thousand", "million", "billion"];

    const words = (num: number, idx = 0): string[] => {
      if (num === 0) return [];
      if (num < 20) return [under20[num], thousands[idx]].filter(Boolean);
      if (num < 100) return [tens[Math.floor(num / 10)], ...words(num % 10, 0)];
      return [under20[Math.floor(num / 100)], "hundred", ...words(num % 100, 0)];
    };

    let result: string[] = [];
    let idx = 0;
    while (n > 0) {
      const rem = n % 1000;
      if (rem > 0) result = [...words(rem, idx), ...result];
      n = Math.floor(n / 1000);
      idx++;
    }
    return result.join(" ");
  };

  return `$${n.toLocaleString()} – ${numToWords(n).toUpperCase()}`;
}

// Main Menu component
function MainMenu({ onStart, onHighScores, onHelp, onStats }: { 
  onStart: () => void;
  onHighScores: () => void;
  onHelp: () => void;
  onStats: () => void;
}) {
  return (
    <div 
      className="flex flex-col items-center justify-center h-full"
      style={{ fontFamily: 'KnightWarrior' }}
    >
      <h1 className="text-6xl mb-16 text-[#FFD700]">QuizTime</h1>
      <div className="flex flex-col items-center space-y-8 w-80">
        <Button text="New Quiz" onClick={onStart} />
        <Button text="High Scores" onClick={onHighScores} />
        <Button text="Help" onClick={onHelp} />
        <Button text="Stats" onClick={onStats} />
      </div>
    </div>
  );
}

function GameWindow({ 
  question, 
  options, 
  onAnswer,
  lifelines,
  handleLifeline,
  prize,
  questionNumber,
  timer,
  timerPaused,
  answerLocked,
  lifeLinesRemaining,
  selectedAnswer,
  answerStatus
}: { 
  question: string; 
  options: string[]; 
  onAnswer: (index: number) => void;
  lifelines: {
    fiftyFifty: boolean;
    skip: boolean;
    doubleChance: boolean;
    pauseTimer: boolean;
    changeQuestion: boolean;
  };
  handleLifeline: (type: keyof typeof lifelines) => void;
  prize: number;
  questionNumber: number;
  timer: number;
  timerPaused: boolean;
  answerLocked: boolean;
  lifeLinesRemaining: number;
  selectedAnswer: number | null;
  answerStatus: 'waiting' | 'correct' | 'incorrect';
}) {
  // Function to determine button background color based on selection and answer status
  const getOptionButtonClass = (index: number) => {
    if (!answerLocked || selectedAnswer !== index) return "option";
    
    if (answerStatus === 'waiting') return "option-locked";
    if (answerStatus === 'correct') return "option-correct";
    return "option-incorrect";
  };

  return (
    <div 
      className="flex flex-col h-full relative"
      style={{ fontFamily: 'CaviarDreams' }}
    >
      <div className="mb-4 text-center flex justify-between items-center">
        <p className="text-2xl text-[#FFD700]" style={{ fontFamily: 'KnightWarrior' }}>Question {questionNumber}</p>
        <div className={`text-xl ${timer <= 10 ? 'text-red-500' : 'text-white'} ${timerPaused ? 'animate-pulse' : ''}`}>
          Time: {timer}s {timerPaused && '(Paused)'}
        </div>
        <p className="text-xl text-[#FFD700]">{formatPrize(prize)}</p>
      </div>
      
      <div className="bg-[#000000]/70 p-6 rounded-lg mb-6 flex-grow">
        <p className="text-2xl font-bold mb-8 text-white">{question}</p>
        
        <div className="grid grid-cols-1 gap-3">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => !answerLocked && onAnswer(index)}
              disabled={answerLocked}
              className={`py-4 px-8 shadow-md transition-all duration-300 text-xl font-bold w-full mb-3 rounded-lg ${
                getOptionButtonClass(index) === "option" 
                  ? "bg-[#4682B4] text-white hover:bg-[#4682B4]/80" 
                  : getOptionButtonClass(index) === "option-locked"
                    ? "bg-[#FFD700] text-black" 
                    : getOptionButtonClass(index) === "option-correct"
                      ? "bg-[#00C800] text-white" 
                      : "bg-[#FF0000] text-white"
              }`}
              style={{ fontFamily: 'CaviarDreamsBold' }}
            >
              {`${String.fromCharCode(65 + index)}. ${option}`}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between p-4 bg-[#000000]/50 rounded-lg">
        <Button 
          text="50-50" 
          onClick={() => handleLifeline('fiftyFifty')} 
          isActive={lifelines.fiftyFifty && lifeLinesRemaining > 0 && !answerLocked} 
          type="lifeline" 
        />
        <Button 
          text="Skip" 
          onClick={() => handleLifeline('skip')} 
          isActive={lifelines.skip && lifeLinesRemaining > 0 && !answerLocked} 
          type="lifeline" 
        />
        <Button 
          text="Double" 
          onClick={() => handleLifeline('doubleChance')} 
          isActive={lifelines.doubleChance && lifeLinesRemaining > 0 && !answerLocked} 
          type="lifeline" 
        />
        <Button 
          text="Timer" 
          onClick={() => handleLifeline('pauseTimer')} 
          isActive={lifelines.pauseTimer && lifeLinesRemaining > 0 && !answerLocked} 
          type="lifeline" 
        />
        <Button 
          text="Change" 
          onClick={() => handleLifeline('changeQuestion')} 
          isActive={lifelines.changeQuestion && lifeLinesRemaining > 0 && !answerLocked} 
          type="lifeline" 
        />
      </div>
      <div className="mt-2 text-center text-white">
        <span className={lifeLinesRemaining === 0 ? 'text-red-500' : 'text-green-500'}>
          Lifelines remaining: {lifeLinesRemaining}/2
        </span>
      </div>
    </div>
  );
}

// High Scores component
function HighScores({ onBack }: { onBack: () => void }) {
  const [highScores, setHighScores] = useState<{name: string; score: number; questionsAnswered?: number; gameCompletedAt?: string}[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchHighScores();
  }, []);

  const fetchHighScores = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/highscores');
      const data = await response.json();
      
      if (data.success) {
        // Transform backend data to match component expectations
        const transformedScores = data.data.map((item: {
          username: string;
          score: number;
          questionsAnswered: number;
          gameCompletedAt: string;
        }) => ({
          name: item.username,
          score: item.score,
          questionsAnswered: item.questionsAnswered,
          gameCompletedAt: item.gameCompletedAt
        }));
        setHighScores(transformedScores);
      } else {
        throw new Error(data.error || 'Failed to fetch scores');
      }
    } catch (error) {
      console.error('Error fetching high scores:', error);
      setError('Failed to load online scores');
      
      // Fallback to localStorage
      const savedScores = localStorage.getItem('quizTimeHighScores');
      if (savedScores) {
        const localScores = JSON.parse(savedScores);
        setHighScores(localScores);
      } else {
        // Default scores if nothing is available
        setHighScores([
          { name: "Player 1", score: 10000000 },
          { name: "Player 2", score: 5000000 },
          { name: "Player 3", score: 1000000 },
        ]);
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div 
      className="flex flex-col items-center justify-center h-full"
      style={{ fontFamily: 'KnightWarrior' }}
    >
      <h1 className="text-4xl mb-8 text-[#FFD700]">High Scores</h1>
      <div className="bg-[#000000]/70 p-6 rounded-lg mb-6 w-full max-w-md">
        {loading ? (
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
            <p>Loading scores...</p>
          </div>
        ) : error ? (
          <div className="text-center">
            <p className="text-orange-400 mb-2">⚠️ {error}</p>
            <p className="text-white text-sm">Showing local scores</p>
          </div>
        ) : null}
        
        {!loading && highScores.length > 0 ? (
          <div className="space-y-3">
            {highScores.map((score, index) => (
              <div key={index} className="flex justify-between items-center text-white">
                <div className="flex items-center gap-2">
                  <span className="text-[#FFD700] font-bold w-6">#{index + 1}</span>
                  <span className="text-sm sm:text-base">{score.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-[#FFD700] text-sm sm:text-base">{formatPrize(score.score)}</div>
                  {score.questionsAnswered && (
                    <div className="text-xs text-gray-400">{score.questionsAnswered} questions</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : !loading ? (
          <p className="text-white text-center">No high scores yet!</p>
        ) : null}
      </div>
      <Button text="Back" onClick={onBack} />
    </div>
  );
}

// Help component
function Help({ onBack }: { onBack: () => void }) {
  return (
    <div 
      className="flex flex-col items-center justify-center h-full"
      style={{ fontFamily: 'KnightWarrior' }}
    >
      <h1 className="text-4xl mb-8 text-[#FFD700]">Help</h1>
      <div 
        className="bg-[#000000]/70 p-6 rounded-lg mb-6 w-full max-w-md text-white"
        style={{ fontFamily: 'CaviarDreams' }}
      >
        <h2 className="text-2xl mb-4">How to Play</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Answer questions correctly to win prizes</li>
          <li>Use lifelines when you need help:</li>
          <ul className="list-disc pl-5 space-y-1">
            <li>50-50: Removes two incorrect answers</li>
            <li>Skip: Skip the current question</li>
            <li>Double: Get a second chance if wrong</li>
            <li>Timer: Pause the timer</li>
            <li>Change: Get a different question</li>
          </ul>
        </ul>
      </div>
      <Button text="Back" onClick={onBack} />
    </div>
  );
}

// Stats component
interface GameStats {
  gamesPlayed: number;
  correctAnswers: number;
  wrongAnswers: number;
  lifelinesUsed: number;
  highestPrize: number;
}

function Stats({ onBack, stats }: { onBack: () => void; stats: GameStats }) {
  return (
    <div 
      className="flex flex-col items-center justify-center h-full"
      style={{ fontFamily: 'KnightWarrior' }}
    >
      <h1 className="text-4xl mb-8 text-[#FFD700]">Stats</h1>
      <div 
        className="bg-[#000000]/70 p-6 rounded-lg mb-6 w-full max-w-md text-white"
        style={{ fontFamily: 'CaviarDreams' }}
      >
        <div className="flex justify-between mb-4">
          <span>Games Played:</span>
          <span>{stats.gamesPlayed}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span>Correct Answers:</span>
          <span>{stats.correctAnswers}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span>Wrong Answers:</span>
          <span>{stats.wrongAnswers}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span>Lifelines Used:</span>
          <span>{stats.lifelinesUsed}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span>Highest Prize:</span>
          <span className="text-[#FFD700]">{formatPrize(stats.highestPrize)}</span>
        </div>
      </div>
      <Button text="Back" onClick={onBack} />
    </div>
  );
}

// End Screen component
function EndScreen({ score, onRestart, onMainMenu, username, gameSessionId }: { 
  score: number; 
  onRestart: () => void;
  onMainMenu: () => void;
  username: string;
  gameSessionId: string;
}) {
  const [scoreSubmitted, setScoreSubmitted] = useState(false);
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [submissionError, setSubmissionError] = useState('');
  const [playerRank, setPlayerRank] = useState<number | null>(null);

  const submitScoreToBackend = useCallback(async () => {
    setSubmissionLoading(true);
    setSubmissionError('');

    try {
      // Calculate questions answered based on score
      const prizeLevels = [
        1000, 2000, 3000, 5000, 10000, 
        20000, 40000, 80000, 160000, 320000, 
        640000, 1250000, 2500000, 5000000, 10000000
      ];
      
      const questionsAnswered = prizeLevels.findIndex(level => level === score) + 1;
      
      const response = await fetch('/api/highscores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.trim(),
          score,
          questionsAnswered: questionsAnswered > 0 ? questionsAnswered : 0,
          gameCompletedAt: new Date().toISOString(),
          gameSessionId // Include session ID in the submission
        }),
      });

      const data = await response.json();

      if (data.success) {
        setPlayerRank(data.data.rank);
        setScoreSubmitted(true);
        
        // Mark this session as submitted
        const submittedSessions = JSON.parse(localStorage.getItem('quizTimeSubmittedSessions') || '[]');
        submittedSessions.push(gameSessionId);
        localStorage.setItem('quizTimeSubmittedSessions', JSON.stringify(submittedSessions));
        
        // Also save to localStorage for offline functionality
        const savedScores = localStorage.getItem('quizTimeHighScores');
        let highScores = savedScores ? JSON.parse(savedScores) : [];
        highScores.push({ name: username, score });
        highScores.sort((a: {score: number}, b: {score: number}) => b.score - a.score);
        highScores = highScores.slice(0, 10);
        localStorage.setItem('quizTimeHighScores', JSON.stringify(highScores));
      } else {
        setSubmissionError(data.error || 'Failed to save score');
        
        // Fallback to localStorage only
        const savedScores = localStorage.getItem('quizTimeHighScores');
        let highScores = savedScores ? JSON.parse(savedScores) : [];
        highScores.push({ name: username, score });
        highScores.sort((a: {score: number}, b: {score: number}) => b.score - a.score);
        highScores = highScores.slice(0, 10);
        localStorage.setItem('quizTimeHighScores', JSON.stringify(highScores));
        setScoreSubmitted(true);
        
        // Mark session as submitted even in fallback case
        const submittedSessions = JSON.parse(localStorage.getItem('quizTimeSubmittedSessions') || '[]');
        submittedSessions.push(gameSessionId);
        localStorage.setItem('quizTimeSubmittedSessions', JSON.stringify(submittedSessions));
      }
    } catch (error) {
      console.error('Error submitting score:', error);
      setSubmissionError('Network error - score saved locally only');
      
      // Fallback to localStorage
      const savedScores = localStorage.getItem('quizTimeHighScores');
      let highScores = savedScores ? JSON.parse(savedScores) : [];
      highScores.push({ name: username, score });
      highScores.sort((a: {score: number}, b: {score: number}) => b.score - a.score);
      highScores = highScores.slice(0, 10);
      localStorage.setItem('quizTimeHighScores', JSON.stringify(highScores));
      setScoreSubmitted(true);
      
      // Mark session as submitted even in error case
      const submittedSessions = JSON.parse(localStorage.getItem('quizTimeSubmittedSessions') || '[]');
      submittedSessions.push(gameSessionId);
      localStorage.setItem('quizTimeSubmittedSessions', JSON.stringify(submittedSessions));
    } finally {
      setSubmissionLoading(false);
    }
  }, [score, username, gameSessionId]);

  // Automatically save score on component mount
  useEffect(() => {
    if (score > 0 && username && !scoreSubmitted && gameSessionId) {
      // Check if this session has already been submitted
      const submittedSessions = JSON.parse(localStorage.getItem('quizTimeSubmittedSessions') || '[]');
      if (!submittedSessions.includes(gameSessionId)) {
        submitScoreToBackend();
      } else {
        console.log('Score already submitted for this session:', gameSessionId);
        setScoreSubmitted(true);
      }
    }
  }, [gameSessionId]); // Only depend on gameSessionId to prevent re-runs

  return (
    <div 
      className="flex flex-col items-center justify-center h-full"
      style={{ fontFamily: 'KnightWarrior' }}
    >
      <h1 className="text-4xl mb-8 text-[#FFD700]">Game Over</h1>
      <div className="bg-[#000000]/70 p-6 rounded-lg mb-6 w-full max-w-md text-center">
        <p className="text-white mb-4">Player: <span className="text-[#FFD700]">{username || 'Anonymous'}</span></p>
        <p className="text-2xl text-white mb-4">Your Prize:</p>
        <p className="text-3xl text-[#FFD700] mb-8">{formatPrize(score)}</p>
        
        {submissionLoading && (
          <p className="text-blue-400 mb-6">💾 Saving score...</p>
        )}
        
        {scoreSubmitted && score > 0 && !submissionLoading && (
          <div className="mb-6">
            <p className="text-green-400 mb-2">✅ Score saved successfully!</p>
            {playerRank && (
              <p className="text-yellow-400 text-sm">🏆 Your Rank: #{playerRank}</p>
            )}
          </div>
        )}
        
        {submissionError && (
          <p className="text-orange-400 mb-6 text-sm">⚠️ {submissionError}</p>
        )}
        
        <div className="flex justify-center space-x-4">
          <Button text="Play Again" onClick={onRestart} />
          <Button text="Main Menu" onClick={onMainMenu} />
        </div>
      </div>
    </div>
  );
}

// Coming Soon component
function ComingSoon({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-6xl mb-12 text-[#FFD700]" style={{ fontFamily: 'KnightWarrior' }}>
        Coming Soon
      </h1>
      <p className="text-2xl mb-8 text-white" style={{ fontFamily: 'CaviarDreams' }}>
        The QuizTime web version is under development.
      </p>
      <Button text="Back" onClick={onBack} />
    </div>
  );
}

// New entry screen for username
function UsernameEntry({ onSubmit }: { onSubmit: (username: string) => void }) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }
    onSubmit(username.trim());
  };

  return (
    <div 
      className="flex flex-col items-center justify-center h-full"
      style={{ fontFamily: 'KnightWarrior' }}
    >
      <h1 className="text-6xl mb-12 text-[#FFD700]">QuizTime</h1>
      <div className="bg-[#000000]/70 p-8 rounded-lg mb-6 w-full max-w-md">
        <h2 className="text-2xl text-[#FFD700] mb-6 text-center">Enter Your Name</h2>
        <div className="mb-6">
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError('');
            }}
            className="bg-black/50 border border-[#FFD700] text-white px-4 py-3 rounded-full w-full text-center text-xl"
            placeholder="Your Name"
            maxLength={20}
          />
          {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
        </div>
        <div className="flex justify-center">
          <Button text="Start Quiz" onClick={handleSubmit} />
        </div>
        <p className="text-white mt-4 text-sm text-center">
          Your username will be used to track which questions you've already seen.
        </p>
      </div>
    </div>
  );
}

// Define the question type
interface QuizQuestion {
  question: string;
  correct: string;
  wrong: string[];
  options?: string[];
}

export default function QuizTimePage() {
  const [screen, setScreen] = useState<'menu' | 'quiz' | 'highscores' | 'help' | 'stats' | 'end' | 'username'>('username');
  const [username, setUsername] = useState<string>('');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameSessionId, setGameSessionId] = useState<string>(''); // Track unique game sessions
  const [backgroundMusic, setBackgroundMusic] = useState<HTMLAudioElement | null>(null);
  const [lifelines, setLifelines] = useState({
    fiftyFifty: true,
    skip: true,
    doubleChance: true,
    pauseTimer: true,
    changeQuestion: true,
  });
  const [lifeLinesRemaining, setLifeLinesRemaining] = useState(2); // Limit to 2 lifelines per game
  const [answerLocked, setAnswerLocked] = useState(false); // Answer lock system
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null); // Track selected answer
  const [answerStatus, setAnswerStatus] = useState<'waiting' | 'correct' | 'incorrect'>('waiting'); // Answer status
  
  // Prize levels for each question
  const prizeLevels = [
    1000, 2000, 3000, 5000, 10000, 
    20000, 40000, 80000, 160000, 320000, 
    640000, 1250000, 2500000, 5000000, 10000000
  ];
  
  // Sound effects
  const correctSoundRef = useRef<HTMLAudioElement | null>(null);
  const wrongSoundRef = useRef<HTMLAudioElement | null>(null);
  
  // State for double chance lifeline
  const [doubleChanceActive, setDoubleChanceActive] = useState(false);
  const [timerPaused, setTimerPaused] = useState(false);
  const [timer, setTimer] = useState(30); // 30 seconds per question
  const [gameStats, setGameStats] = useState({
    gamesPlayed: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    lifelinesUsed: 0,
    highestPrize: 0
  });
  
  useEffect(() => {
    // Load questions from separate JSON files
    const loadQuestions = async () => {
      try {
        // Load all JSON files
        const [easyResponse, mediumResponse, hardResponse] = await Promise.all([
          fetch('/assets/assetsQuiz/easy.json').then(async res => {
            if (!res.ok) throw new Error('Failed to load easy questions');
            const data = await res.json();
            return data as QuizData;
          }),
          fetch('/assets/assetsQuiz/medium.json').then(async res => {
            if (!res.ok) throw new Error('Failed to load medium questions');
            const data = await res.json();
            return data as QuizData;
          }),
          fetch('/assets/assetsQuiz/hard.json').then(async res => {
            if (!res.ok) throw new Error('Failed to load hard questions');
            const data = await res.json();
            return data as QuizData;
          })
        ]);

        const savedAskedData = localStorage.getItem('quizTimeAskedQuestions');
        const askedData = savedAskedData ? JSON.parse(savedAskedData) : { users: {} };
        const userAskedQuestions = username && askedData.users[username] 
          ? askedData.users[username] 
          : [];

        // Filter and prepare questions
        let availableEasyQuestions = easyResponse.questions.filter(
          (q: QuizQuestion) => !userAskedQuestions.includes(q.question)
        );
        let availableMediumQuestions = mediumResponse.questions.filter(
          (q: QuizQuestion) => !userAskedQuestions.includes(q.question)
        );
        let availableHardQuestions = hardResponse.questions.filter(
          (q: QuizQuestion) => !userAskedQuestions.includes(q.question)
        );

        // If running low on questions, reset for this user
        if (availableEasyQuestions.length < 3 || 
            availableMediumQuestions.length < 5 || 
            availableHardQuestions.length < 7) {
          console.log("Resetting question history for user:", username);
          availableEasyQuestions = easyResponse.questions;
          availableMediumQuestions = mediumResponse.questions;
          availableHardQuestions = hardResponse.questions;
          if (username) {
            askedData.users[username] = [];
            localStorage.setItem('quizTimeAskedQuestions', JSON.stringify(askedData));
          }
        }

        // Select and combine questions
        const selectedEasyQuestions = shuffleArray(availableEasyQuestions).slice(0, 3);
        const selectedMediumQuestions = shuffleArray(availableMediumQuestions).slice(0, 5);
        const selectedHardQuestions = shuffleArray(availableHardQuestions).slice(0, 7);

        const allQuestions: QuizQuestion[] = [
          ...selectedEasyQuestions,
          ...selectedMediumQuestions,
          ...selectedHardQuestions
        ];

        // Process and shuffle options for each question
        const questionsWithOptions: QuizQuestion[] = allQuestions.map((q) => {
          const wrongOptions = q.wrong.length > 3 
            ? shuffleArray([...q.wrong]).slice(0, 3) 
            : [...q.wrong];
          const options = shuffleArray([...wrongOptions, q.correct]);
          return { ...q, options };
        });

        // Mark questions as asked
        if (username) {
          const questionTexts = allQuestions.map(q => q.question);
          askedData.users[username] = [
            ...userAskedQuestions,
            ...questionTexts.filter(q => !userAskedQuestions.includes(q))
          ];
          localStorage.setItem('quizTimeAskedQuestions', JSON.stringify(askedData));
        }

        setQuestions(questionsWithOptions);
        setTimer(30); // Reset timer
        setTimerPaused(false);
        console.log("Questions loaded successfully:", questionsWithOptions.length);
      } catch (error) {
        console.error("Error loading questions:", error);
      }
    };

    if (username && screen === 'quiz') {
      loadQuestions();
    }
  }, [username, screen]);

  useEffect(() => {
    // Initialize audio only once when component mounts
    const music = new Audio('/assets/assetsQuiz/music.wav');
    music.loop = true;
    music.volume = 0.5;
    music.preload = 'auto';
    setBackgroundMusic(music);

    correctSoundRef.current = new Audio('/assets/assetsQuiz/correct.wav');
    wrongSoundRef.current = new Audio('/assets/assetsQuiz/wrong.mp3');

    return () => {
      music.pause();
      music.currentTime = 0;
    };
  }, []); // Empty dependency array to run only once

  // Effect for background music
  useEffect(() => {
    const playMusic = async () => {
      if (screen === 'quiz' && backgroundMusic) {
        try {
          // Create and play music only when entering quiz screen
          await backgroundMusic.play();
        } catch (e) {
          console.log('Audio play failed:', e);
        }
      } else if (backgroundMusic) {
        backgroundMusic.pause();
        if (screen === 'end') {
          backgroundMusic.currentTime = 0;
        }
      }
    };

    playMusic();
  }, [screen, backgroundMusic]); // Add backgroundMusic as dependency

  // Load game stats from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedStats = localStorage.getItem('quizTimeStats');
      if (savedStats) {
        setGameStats(JSON.parse(savedStats));
      }
    }
  }, []);
  
  // Save game stats to localStorage when they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('quizTimeStats', JSON.stringify(gameStats));
    }
  }, [gameStats]);
  
  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (screen === 'quiz' && !timerPaused && timer > 0 && !answerLocked && questions.length > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => {
          const newTime = prevTimer - 1;
          if (newTime <= 0) {
            if (wrongSoundRef.current) {
              wrongSoundRef.current.play().catch(e => console.log('Audio play failed:', e));
            }
            setScreen('end');
            if (backgroundMusic) {
              backgroundMusic.pause();
              backgroundMusic.currentTime = 0;
            }
            return 0;
          }
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [screen, timerPaused, answerLocked, backgroundMusic, wrongSoundRef, setScreen, questions.length, timer]);
  
  // Reset timer when moving to a new question or starting quiz
  useEffect(() => {
    if (screen === 'quiz' && questions.length > 0) {
      setTimer(30);
      setTimerPaused(false);
    }
  }, [currentQuestionIndex, screen, questions.length]);
  
  const startQuiz = () => {
    // Generate unique session ID for this game
    const sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setGameSessionId(sessionId);
    
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimerPaused(false);
    setDoubleChanceActive(false);
    setAnswerLocked(false);
    setSelectedAnswer(null);
    setAnswerStatus('waiting');
    setTimer(30);
    setScreen('quiz'); // Set screen last to ensure all states are ready
    setLifeLinesRemaining(2); // Reset to 2 lifelines per game
    setLifelines({
      fiftyFifty: true,
      skip: true,
      doubleChance: true,
      pauseTimer: true,
      changeQuestion: true,
    });
    
    // Update game stats
    setGameStats(prev => ({
      ...prev,
      gamesPlayed: prev.gamesPlayed + 1
    }));
  };
  
  const handleAnswer = (optionIndex: number) => {
    // If answer is already locked, do nothing
    if (answerLocked) return;
    
    // Lock the answer and store the selected answer index
    setAnswerLocked(true);
    setSelectedAnswer(optionIndex);
    
    // Immediately show the answer status (no delay)
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = currentQuestion.options![optionIndex] === currentQuestion.correct;
    setAnswerStatus(isCorrect ? 'correct' : 'incorrect');
    
    // Save this question as asked
    saveAskedQuestions();
    
    // Short delay before proceeding to next question or end screen
    setTimeout(() => {
      if (isCorrect) {
        // Play correct sound
        if (correctSoundRef.current) {
          correctSoundRef.current.play().catch(e => console.log('Audio play failed:', e));
        }
        
        // Update score
        setScore(prizeLevels[currentQuestionIndex]);
        
        // Update stats
        setGameStats(prev => ({
          ...prev,
          correctAnswers: prev.correctAnswers + 1,
          highestPrize: Math.max(prev.highestPrize, prizeLevels[currentQuestionIndex])
        }));
        
        // Move to next question or end screen
        if (currentQuestionIndex + 1 < questions.length) {
          setCurrentQuestionIndex(prev => prev + 1);
          setAnswerLocked(false); // Unlock for the next question
          setSelectedAnswer(null); // Reset selected answer
          setAnswerStatus('waiting'); // Reset answer status
        } else {
          // End game and stop music
          setScreen('end');
          if (backgroundMusic) {
            backgroundMusic.pause();
            backgroundMusic.currentTime = 0;
          }
        }
      } else {
        // If double chance is active, use it and continue
        if (doubleChanceActive) {
          setDoubleChanceActive(false);
          setAnswerLocked(false); // Unlock to allow another try
          setSelectedAnswer(null); // Reset selected answer
          setAnswerStatus('waiting'); // Reset answer status
          return; // Give the player another try
        }
        
        // Play wrong sound
        if (wrongSoundRef.current) {
          wrongSoundRef.current.play().catch(e => console.log('Audio play failed:', e));
        }
        
        // Update stats
        setGameStats(prev => ({
          ...prev,
          wrongAnswers: prev.wrongAnswers + 1
        }));
        
        // End game and stop music
        setScreen('end');
        if (backgroundMusic) {
          backgroundMusic.pause();
          backgroundMusic.currentTime = 0;
        }
      }
    }, 1000); // Shorter delay (1 second) before proceeding
  };
  
  const handleLifeline = useCallback((type: keyof typeof lifelines) => {
    // Check if lifeline is available and if we have lifelines remaining
    if (!lifelines[type] || lifeLinesRemaining <= 0) return;
    
    // Decrement lifelines remaining
    setLifeLinesRemaining(prev => prev - 1);
    
    // Update stats
    setGameStats(prev => ({
      ...prev,
      lifelinesUsed: prev.lifelinesUsed + 1
    }));
    
    switch (type) {
      case 'fiftyFifty':
        // Remove two incorrect options - implement the 50-50 lifeline like in the original game
        const currentQuestion = questions[currentQuestionIndex];
        const correctOption = currentQuestion.correct;
        const incorrectOptions = currentQuestion.options!.filter(opt => opt !== correctOption);
        // Select two random incorrect options to remove
        const optionsToRemove = incorrectOptions.sort(() => 0.5 - Math.random()).slice(0, 2);
        
        // Update the options for the current question
        setQuestions(prevQuestions => {
          const updatedQuestions = [...prevQuestions];
          const updatedOptions = updatedQuestions[currentQuestionIndex].options!.filter(
            opt => opt === correctOption || !optionsToRemove.includes(opt)
          );
          updatedQuestions[currentQuestionIndex].options = updatedOptions;
          return updatedQuestions;
        });
        break;
        
      case 'skip':
        // Skip to the next question without losing or answering
        if (currentQuestionIndex + 1 < questions.length) {
          setCurrentQuestionIndex(prev => prev + 1);
          setAnswerLocked(false); // Reset answer lock for the new question
          setSelectedAnswer(null); // Reset selected answer
          setAnswerStatus('waiting'); // Reset answer status
        }
        break;
        
      case 'doubleChance':
        // Enable double chance for the current question
        setDoubleChanceActive(true);
        break;
        
      case 'pauseTimer':
        // Pause the timer for 15 seconds
        setTimerPaused(true);
        const pauseTimeout = setTimeout(() => {
          setTimerPaused(false);
        }, 15000);
        // Clean up timeout if component unmounts or screen changes
        return () => clearTimeout(pauseTimeout);
        break;
        
      case 'changeQuestion':
        // Determine the difficulty level based on current question index
        let difficultyLevel;
        if (currentQuestionIndex < 3) {
          difficultyLevel = 'easy';
        } else if (currentQuestionIndex < 8) {
          difficultyLevel = 'medium';
        } else {
          difficultyLevel = 'hard';
        }
        
        // Load a replacement question of the same difficulty
        fetch(`/assets/assetsQuiz/${difficultyLevel}.json`)
          .then(response => response.json())
          .then(data => {
            // Get all questions for this difficulty
            const replacementQuestions = data.questions;
            
            // Get asked questions from localStorage
            const savedAskedData = localStorage.getItem('quizTimeAskedQuestions');
            const askedData = savedAskedData ? JSON.parse(savedAskedData) : { users: {} };
            const userAskedQuestions = username && askedData.users[username] 
              ? askedData.users[username] 
              : [];
              
            console.log(`Looking for a new ${difficultyLevel} question to replace current question`);
            console.log(`Total available ${difficultyLevel} questions:`, replacementQuestions.length);
            console.log(`Total questions already asked for ${username}:`, userAskedQuestions.length);
            
            // Create a set of all questions to exclude (current game questions + previously asked)
            const questionsToExclude = new Set([
              ...questions.map(q => q.question), // All questions in the current game
              ...userAskedQuestions // All previously asked questions for this user
            ]);
            
            // Find questions not currently in the game and not previously asked
            const unusedQuestions = replacementQuestions.filter(
              (q: { question: string }) => !questionsToExclude.has(q.question)
            );
            
            console.log(`Found ${unusedQuestions.length} unused ${difficultyLevel} questions`);
            
            // If we have unused questions, use them
            if (unusedQuestions.length > 0) {
              // Pick a random unused question
              const randomIndex = Math.floor(Math.random() * unusedQuestions.length);
              const newQuestion = unusedQuestions[randomIndex];
              
              // Process the new question
              const wrongOptions = newQuestion.wrong.length > 3 
                ? [...newQuestion.wrong].sort(() => 0.5 - Math.random()).slice(0, 3) 
                : [...newQuestion.wrong];
                
              const options = [...wrongOptions, newQuestion.correct];
              const shuffledOptions = [...options].sort(() => 0.5 - Math.random());
              
              // Replace the current question
              setQuestions(prevQuestions => {
                const updatedQuestions = [...prevQuestions];
                updatedQuestions[currentQuestionIndex] = { 
                  ...newQuestion, 
                  options: shuffledOptions 
                };
                return updatedQuestions;
              });
              
              // Mark this question as asked immediately
              if (username) {
                userAskedQuestions.push(newQuestion.question);
                askedData.users[username] = userAskedQuestions;
                localStorage.setItem('quizTimeAskedQuestions', JSON.stringify(askedData));
                console.log(`Marked new question as asked for ${username}`);
              }
            } else {
              // If we've used all questions, reset the user's question history for this difficulty
              console.log(`No unused ${difficultyLevel} questions available, resetting history for this difficulty`);
              
              // Filter out only questions of this difficulty level from the asked questions
              if (username) {
                // Keep track of questions from other difficulty levels
                const otherDifficultyQuestions = userAskedQuestions.filter((q: string) => {
                  // Check if this question exists in the current difficulty
                  return !replacementQuestions.some((diffQ: { question: string }) => diffQ.question === q);
                });
                
                // Reset this difficulty's questions but keep others
                askedData.users[username] = otherDifficultyQuestions;
                localStorage.setItem('quizTimeAskedQuestions', JSON.stringify(askedData));
                
                // Now pick any question from this difficulty that's not in the current game
                const availableQuestions = replacementQuestions.filter(
                  (q: { question: string }) => !questions.map(gq => gq.question).includes(q.question)
                );
                
                if (availableQuestions.length > 0) {
                  // Pick a random question
                  const randomIndex = Math.floor(Math.random() * availableQuestions.length);
                  const newQuestion = availableQuestions[randomIndex];
                  
                  // Process the new question
                  const wrongOptions = newQuestion.wrong.length > 3 
                    ? [...newQuestion.wrong].sort(() => 0.5 - Math.random()).slice(0, 3) 
                    : [...newQuestion.wrong];
                    
                  const options = [...wrongOptions, newQuestion.correct];
                  const shuffledOptions = [...options].sort(() => 0.5 - Math.random());
                  
                  // Replace the current question
                  setQuestions(prevQuestions => {
                    const updatedQuestions = [...prevQuestions];
                    updatedQuestions[currentQuestionIndex] = { 
                      ...newQuestion, 
                      options: shuffledOptions 
                    };
                    return updatedQuestions;
                  });
                  
                  // Mark this question as asked immediately
                  userAskedQuestions.push(newQuestion.question);
                  askedData.users[username] = userAskedQuestions;
                  localStorage.setItem('quizTimeAskedQuestions', JSON.stringify(askedData));
                  console.log(`Marked new question as asked for ${username}`);
                }
              }
            }
          })
          .catch(error => console.error("Error fetching replacement questions:", error));
        break;
    }
    
    // Mark the lifeline as used
    setLifelines(prev => ({ ...prev, [type]: false }));
  }, [lifelines, lifeLinesRemaining, username, questions, currentQuestionIndex, setTimerPaused, setQuestions]);
  
  const handleUsernameSubmit = useCallback(async (username: string) => {
    setUsername(username);
    setScreen('menu');
  }, []);

  const saveAskedQuestions = useCallback(() => {
    if (!username || !questions.length || currentQuestionIndex >= questions.length) return;
    
    try {
      const currentQuestion = questions[currentQuestionIndex];
      const savedAskedData = localStorage.getItem('quizTimeAskedQuestions');
      const askedData = savedAskedData ? JSON.parse(savedAskedData) : { users: {} };
      
      if (!askedData.users[username]) {
        askedData.users[username] = [];
      }
      
      // Add current question to asked questions if not already present
      if (!askedData.users[username].includes(currentQuestion.question)) {
        askedData.users[username].push(currentQuestion.question);
        localStorage.setItem('quizTimeAskedQuestions', JSON.stringify(askedData));
        console.log(`Marked question "${currentQuestion.question}" as asked for ${username}`);
      }
      
      console.log(`User ${username} has answered ${askedData.users[username].length} unique questions so far`);
    } catch (error) {
      console.error("Error saving asked questions:", error);
    }
  }, [username, questions, currentQuestionIndex]);

  const handleFiftyFifty = useCallback(() => {
    if (lifelines.fiftyFifty && lifeLinesRemaining > 0 && !answerLocked) {
      handleLifeline('fiftyFifty');
    }
  }, [lifelines.fiftyFifty, lifeLinesRemaining, answerLocked, handleLifeline]);

  const handleSkip = useCallback(() => {
    if (lifelines.skip && lifeLinesRemaining > 0 && !answerLocked) {
      handleLifeline('skip');
    }
  }, [lifelines.skip, lifeLinesRemaining, answerLocked, handleLifeline]);

  const handleDoubleChance = useCallback(() => {
    if (lifelines.doubleChance && lifeLinesRemaining > 0 && !answerLocked) {
      handleLifeline('doubleChance');
    }
  }, [lifelines.doubleChance, lifeLinesRemaining, answerLocked, handleLifeline]);

  const handlePauseTimer = useCallback(() => {
    if (lifelines.pauseTimer && lifeLinesRemaining > 0 && !answerLocked) {
      handleLifeline('pauseTimer');
    }
  }, [lifelines.pauseTimer, lifeLinesRemaining, answerLocked, handleLifeline]);

  const handleChangeQuestion = useCallback(() => {
    if (lifelines.changeQuestion && lifeLinesRemaining > 0 && !answerLocked) {
      handleLifeline('changeQuestion');
    }
  }, [lifelines.changeQuestion, lifeLinesRemaining, answerLocked, handleLifeline]);
  
  return (
    <>
      <style jsx global>{fontStyles}</style>
      
      <div 
        className="min-h-screen bg-cover bg-center p-8 flex flex-col"
        style={{ 
          backgroundImage: `url(${
            screen === 'menu'
              ? '/assets/assetsQuiz/startbg.jpg' 
              : screen === 'end' 
                ? '/assets/assetsQuiz/winner.jpg' 
                : '/assets/assetsQuiz/background.jpg'
          })`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}
      >
        <div className="max-w-4xl mx-auto w-full flex-grow flex flex-col">
          {screen === 'menu' && (
            <div className="mb-6">
              <Button 
                text="← Back to Home" 
                onClick={() => window.location.href = '/'} 
                type="home" 
              />
            </div>
          )}
          
          <div className="flex-grow bg-black/30 rounded-lg p-6">
            {screen === 'menu' && (
              <MainMenu 
                onStart={startQuiz} 
                onHighScores={() => setScreen('highscores')}
                onHelp={() => setScreen('help')}
                onStats={() => setScreen('stats')}
              />
            )}
            
            {screen === 'quiz' && questions.length > 0 && (
              <div className="h-full flex flex-col">
                <div className="mb-4">
                  <Button 
                    text="← Back" 
                    onClick={() => setScreen('menu')} 
                    type="home"
                    className="py-2 px-4 text-sm absolute top-4 left-4"
                  />
                </div>
                <GameWindow
                  question={questions[currentQuestionIndex].question}
                  options={questions[currentQuestionIndex].options || []}
                  onAnswer={handleAnswer}
                  lifelines={lifelines}
                  handleLifeline={handleLifeline}
                  prize={prizeLevels[currentQuestionIndex]}
                  questionNumber={currentQuestionIndex + 1}
                  timer={timer}
                  timerPaused={timerPaused}
                  answerLocked={answerLocked}
                  lifeLinesRemaining={lifeLinesRemaining}
                  selectedAnswer={selectedAnswer}
                  answerStatus={answerStatus}
                />
              </div>
            )}
            
            {screen === 'highscores' && <HighScores onBack={() => setScreen('menu')} />}
            
            {screen === 'help' && <Help onBack={() => setScreen('menu')} />}
            
            {screen === 'stats' && <Stats onBack={() => setScreen('menu')} stats={gameStats} />}
            
            {screen === 'end' && (
              <EndScreen 
                score={score}
                onRestart={startQuiz}
                onMainMenu={() => setScreen('menu')}
                username={username}
                gameSessionId={gameSessionId}
              />
            )}
            
            {screen === 'username' && (
              <UsernameEntry onSubmit={handleUsernameSubmit} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
