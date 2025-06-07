import { useEffect } from 'react';

interface PyodideProviderProps {
  onLoaded: (questions: any) => void;
  onError: (error: any) => void;
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
              return JSON.parse(
                match[1]
                  .replace(/'/g, '"')
                  .replace(/True/g, 'true')
                  .replace(/False/g, 'false')
              );
            }),
          fetch('/assets/games/QuizTime/medium.py')
            .then(r => r.text())
            .then(text => {
              const match = text.match(/medium_questions\s*=\s*(\[[\s\S]*?\])/);
              if (!match) throw new Error('Could not find questions array');
              return JSON.parse(
                match[1]
                  .replace(/'/g, '"')
                  .replace(/True/g, 'true')
                  .replace(/False/g, 'false')
              );
            }),
          fetch('/assets/games/QuizTime/hard.py')
            .then(r => r.text())
            .then(text => {
              const match = text.match(/hard_questions\s*=\s*(\[[\s\S]*?\])/);
              if (!match) throw new Error('Could not find questions array');
              return JSON.parse(
                match[1]
                  .replace(/'/g, '"')
                  .replace(/True/g, 'true')
                  .replace(/False/g, 'false')
              );
            })
        ]);

        onLoaded({
          easy: easyQuestions,
          medium: mediumQuestions,
          hard: hardQuestions
        });
      } catch (err) {
        onError(err);
      }
    }

    loadQuestions();
  }, [onLoaded, onError]);

  return null;
}
