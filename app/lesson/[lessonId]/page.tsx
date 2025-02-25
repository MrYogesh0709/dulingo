import { getLesson, getUserProgress, getUserSubscription } from '@/db/queries';
import { redirect } from 'next/navigation';
import Quiz from '../quiz';

type Props = {
  params: {
    lessonId: number;
  };
};

const LessonIdPage = async ({ params: { lessonId } }: Props) => {
  const [lesson, userProgress, userSubscriptionData] = await Promise.all([
    getLesson(lessonId),
    getUserProgress(),
    getUserSubscription(),
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
      userSubscription={userSubscriptionData}
    />
  );
};

export default LessonIdPage;
