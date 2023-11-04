'use client'
import { NextPage } from 'next';
import QuizInstruction from './_components/QuizContainer/QuizInstruction';
import { useQuizContext } from './_components/QuizContainer/QuizProvider';
import QuestionBank from './_components/QuestionContainer/QuestionBank';

const QuizzesPage: NextPage = () => {
  const { state } = useQuizContext();
  const { current } = state;

  return (
    <>
      {current === 0 ? <QuizInstruction /> : <QuestionBank />}

    </>
  );
}

export default QuizzesPage;

