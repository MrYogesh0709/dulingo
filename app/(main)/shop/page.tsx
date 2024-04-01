import { redirect } from 'next/navigation';

import { getUserProgress } from '@/db/queries';

import { StickyWrapper } from '@/components/StickyWrapper';
import { UserProgress } from '@/components/UserProgress';
import { FeedWrapper } from '@/components/FeedWrapper';
import Image from 'next/image';
import Items from './Items';

const ShopPage = async () => {
  const [userProgress] = await Promise.all([getUserProgress()]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect('/courses');
  }

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse} //todo change
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={false}
        />
      </StickyWrapper>
      <FeedWrapper>
        <div className="flex w-full flex-col items-center">
          <Image width={90} height={90} src="/shop.svg" alt="shop" />
        </div>
        <h1 className="my-6 text-center text-2xl font-bold text-neutral-800">
          Shop
        </h1>
        <p className="mb-6 text-center text-lg text-muted-foreground">
          spend your coins on cool stuff.
        </p>
        <Items
          hasActiveSubscription={false} //todo change
          hearts={userProgress.hearts}
          points={userProgress.points}
        />
      </FeedWrapper>
    </div>
  );
};

export default ShopPage;
