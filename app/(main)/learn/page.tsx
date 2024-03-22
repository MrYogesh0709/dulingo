import { redirect } from 'next/navigation';

import { Header } from './header';

import { StickyWrapper } from '@/components/StickyWrapper';
import { FeedWrapper } from '@/components/FeedWrapper';
import { UserProgress } from '@/components/UserProgress';
import { getUserProgress } from '@/db/queries';

const LearnPage = async () => {
  const [userProgress] = await Promise.all([getUserProgress()]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect('/courses');
  }

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={5}
          points={100}
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
