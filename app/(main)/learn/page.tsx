import { redirect } from 'next/navigation';

import { Header } from './header';

import { StickyWrapper } from '@/components/StickyWrapper';
import { FeedWrapper } from '@/components/FeedWrapper';
import { UserProgress } from '@/components/UserProgress';
import { getUnits, getUserProgress } from '@/db/queries';

import Unit from './unit';

const LearnPage = async () => {
  const [userProgress, unitsData] = await Promise.all([
    getUserProgress(),
    getUnits(),
  ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect('/courses');
  }

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={false}
        />
      </StickyWrapper>
      <FeedWrapper>
        <Header title={userProgress.activeCourse.title} />
        {unitsData.map(({ id, order, title, lessons, description }) => (
          <div key={id} className="mb-10">
            <Unit
              id={id}
              order={order}
              title={title}
              lessons={lessons}
              description={description}
              activeLesson={undefined}
              activeLessonPercentage={0}
            />
          </div>
        ))}
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
