import { useEffect } from 'react';

interface Question {
  question: string;
  options: string[];
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface QuestionSet {
  easy: Question[];
  medium: Question[];
  hard: Question[];
}

interface PyodideProviderProps {
  onLoaded: (questions: QuestionSet) => void;
  onError: (error: Error) => void;
}

export function PyodideProvider({ onLoaded, onError }: PyodideProviderProps) {
  useEffect(() => {
    async function loadQuestions() {
      try {
        // Load all difficulty level questions
        const [easyQuestions, mediumQuestions, hardQuestions] = await Promise.all([
          fetch('/assets/games/QuizTime/easy.py')
            .then(r => r.text())
            .then(text => {
              // Parse Python array into JavaScript array
              const match = text.match(/easy_questions\s*=\s*(\[[\s\S]*?\])/);
              if (!match) throw new Error('Could not find questions array');
              return JSON.parse(match[1]) as Question[];
            }),
          fetch('/assets/games/QuizTime/medium.py')
            .then(r => r.text())
            .then(text => {
              const match = text.match(/medium_questions\s*=\s*(\[[\s\S]*?\])/);
              if (!match) throw new Error('Could not find questions array');
              return JSON.parse(match[1]) as Question[];
            }),
          fetch('/assets/games/QuizTime/hard.py')
            .then(r => r.text())
            .then(text => {
              const match = text.match(/hard_questions\s*=\s*(\[[\s\S]*?\])/);
              if (!match) throw new Error('Could not find questions array');
              return JSON.parse(match[1]) as Question[];
            })
        ]);

        onLoaded({
          easy: easyQuestions,
          medium: mediumQuestions,
          hard: hardQuestions
        });
      } catch (err) {
        onError(err instanceof Error ? err : new Error(String(err)));
      }
    }

    loadQuestions();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}
