import { useState } from 'react';
import { BrainCircuit, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { quizQuestions } from '../data/quiz';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { cn } from '../utils/cn';
import { useSEO } from '../hooks/useSEO';

export function Quiz() {
  useSEO({
    title: 'HTTP Status Code Quiz — Test Your Knowledge',
    description: 'Test your knowledge of HTTP status codes, API responses, and errors with this interactive quiz.',
    canonical: '/quiz',
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const question = quizQuestions[currentQuestionIndex];

  const handleOptionClick = (code: number) => {
    if (isAnswered) return;
    setSelectedOption(code);
    setIsAnswered(true);
    if (code === question.correctCode) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(i => i + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    const percentage = Math.round((score / quizQuestions.length) * 100);
    let message = '';
    if (percentage === 100) message = 'Perfect score! You are an HTTP master.';
    else if (percentage >= 80) message = 'Great job! You really know your status codes.';
    else if (percentage >= 50) message = 'Not bad, but there is room for improvement.';
    else message = 'Keep studying! Read through the reference and try again.';

    return (
      <div className="max-w-2xl mx-auto py-12 flex flex-col items-center text-center space-y-6">
        <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <BrainCircuit className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Quiz Complete!</h1>
        <div className="text-6xl font-bold text-primary my-8">
          {score} <span className="text-3xl text-muted-foreground">/ {quizQuestions.length}</span>
        </div>
        <p className="text-xl text-muted-foreground mb-8">{message}</p>
        <Button size="lg" onClick={handleRestart} className="gap-2">
          <RotateCcw className="h-5 w-5" /> Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 space-y-8">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <BrainCircuit className="h-6 w-6 text-primary" />
          Test Your Knowledge
        </h1>
        <div className="text-sm font-medium text-muted-foreground">
          Question {currentQuestionIndex + 1} of {quizQuestions.length}
        </div>
      </div>

      <div className="w-full bg-muted rounded-full h-2">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentQuestionIndex) / quizQuestions.length) * 100}%` }}
        />
      </div>

      <Card className="p-2">
        <CardContent className="pt-6 space-y-8">
          <h2 className="text-xl md:text-2xl font-medium leading-relaxed">
            {question.question}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {question.options.map(option => {
              const isSelected = selectedOption === option;
              const isCorrect = option === question.correctCode;
              
              let buttonStateClass = "bg-muted hover:bg-muted/80 text-foreground border-transparent";
              
              if (isAnswered) {
                if (isCorrect) {
                  buttonStateClass = "bg-success-500/20 text-success-500 border-success-500 ring-1 ring-success-500";
                } else if (isSelected && !isCorrect) {
                  buttonStateClass = "bg-error-500/20 text-error-500 border-error-500 ring-1 ring-error-500";
                } else {
                   buttonStateClass = "bg-muted text-muted-foreground/50 opacity-50 border-transparent";
                }
              } else if (isSelected) {
                buttonStateClass = "bg-primary text-primary-foreground border-primary";
              }

              return (
                <button
                  key={option}
                  disabled={isAnswered}
                  onClick={() => handleOptionClick(option)}
                  className={cn(
                    "relative flex items-center justify-center p-4 rounded-xl border-2 text-xl font-bold transition-all duration-200 focus:outline-none",
                    buttonStateClass
                  )}
                >
                  {option}
                  {isAnswered && isCorrect && <CheckCircle2 className="absolute right-4 h-5 w-5 text-success-500" />}
                  {isAnswered && isSelected && !isCorrect && <XCircle className="absolute right-4 h-5 w-5 text-error-500" />}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div className={cn(
              "p-4 rounded-lg border flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4",
              selectedOption === question.correctCode ? "bg-success-500/10 border-success-500/30" : "bg-error-500/10 border-error-500/30"
            )}>
              <div className="flex items-start gap-3">
                {selectedOption === question.correctCode 
                  ? <CheckCircle2 className="h-6 w-6 text-success-500 shrink-0 mt-0.5" /> 
                  : <XCircle className="h-6 w-6 text-error-500 shrink-0 mt-0.5" />
                }
                <div>
                  <h3 className={cn("font-bold text-lg mb-1", selectedOption === question.correctCode ? "text-success-500" : "text-error-500")}>
                    {selectedOption === question.correctCode ? "Correct!" : "Incorrect"}
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    {question.explanation}
                  </p>
                </div>
              </div>
              <div className="flex justify-end mt-2">
                <Button onClick={handleNext}>
                  {currentQuestionIndex < quizQuestions.length - 1 ? 'Next Question' : 'View Results'}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
