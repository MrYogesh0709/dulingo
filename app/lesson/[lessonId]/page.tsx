import { getLesson, getUserProgress } from '@/db/queries';
import { redirect } from 'next/navigation';
import Quiz from '../quiz';

type Props = {
  params: {
    lessonId: number;
  };
};

const LessonIdPage = async ({ params: { lessonId } }: Props) => {
  const [lesson, userProgress] = await Promise.all([
    getLesson(lessonId),
    getUserProgress(),
  ]);

  if (!lesson || !userProgress) {
    redirect('/learn');
  }

  const initialPercentage =
    (lesson.challenges.filter((challenge) => challenge.completed).length /
      lesson.challenges.length) *
    100;

  return (
    <Quiz
      initialLessonId={lesson.id}
      initialLessonChallenges={lesson.challenges}
      initialHearts={userProgress.hearts}
      initialPercentage={initialPercentage}
      userSubscription={null} //todo: add it
    />
  );
};

export default LessonIdPage;
