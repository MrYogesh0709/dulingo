import { redirect } from 'next/navigation';

import { Header } from './header';

import { StickyWrapper } from '@/components/StickyWrapper';
import { FeedWrapper } from '@/components/FeedWrapper';
import { UserProgress } from '@/components/UserProgress';
import { getUnits, getUserProgress } from '@/db/queries';

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
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
