import { redirect } from 'next/navigation';

import { Header } from './header';

import { StickyWrapper } from '@/components/StickyWrapper';
import { FeedWrapper } from '@/components/FeedWrapper';
import { UserProgress } from '@/components/UserProgress';
import {
  getCourseProgress,
  getLessonPercentage,
  getUnits,
  getUserProgress,
  getUserSubscription,
} from '@/db/queries';

import Unit from './unit';

const LearnPage = async () => {
  const [
    userProgress,
    units,
    courseProgress,
    lessonPercentage,
    userSubscription,
  ] = await Promise.all([
    getUserProgress(),
    getUnits(),
    getCourseProgress(),
    getLessonPercentage(),
    getUserSubscription(),
  ]);

  if (!userProgress || !userProgress.activeCourse || !courseProgress) {
    redirect('/courses');
  }

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={!!userSubscription?.isActive}
        />
      </StickyWrapper>
      <FeedWrapper>
        <Header title={userProgress.activeCourse.title} />
        {units.map(({ id, order, title, lessons, description }) => (
          <div key={id} className="mb-10">
            <Unit
              id={id}
              order={order}
              title={title}
              lessons={lessons}
              description={description}
              activeLesson={courseProgress.activeLesson}
              activeLessonPercentage={lessonPercentage}
            />
          </div>
        ))}
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
