'use client';

import Image from 'next/image';
import { toast } from 'sonner';
import { useTransition } from 'react';

import { POINTS_TO_REFILL } from '@/constants';

import { Button } from '@/components/ui/button';
import { refillHearts } from '@/actions/user-progress';

type Props = {
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
};
const Items = ({ hasActiveSubscription, points, hearts }: Props) => {
  const [pending, startTransition] = useTransition();

  const onRefillHearts = () => {
    if (pending || hearts === 5 || points < POINTS_TO_REFILL) {
      return;
    }

    startTransition(() => {
      refillHearts().catch(() => toast.error('Something went wrong'));
    });
  };

  const onUpgrade = () => {};

  return (
    <ul className="w-full">
      <div className="flex w-full items-center gap-x-4 border-2 p-4">
        <Image src="/heart.svg" height={60} width={60} alt="Hearts" />
        <div className="flex-1">
          <p className="text-base font-bold text-neutral-700 lg:text-xl">
            Refill Hearts
          </p>
        </div>
        <Button
          onClick={onRefillHearts}
          disabled={pending || hearts === 5 || points < POINTS_TO_REFILL}
        >
          {hearts === 5 ? (
            'full'
          ) : (
            <div className="flex items-center">
              <Image alt="points" src="/points.svg" height={20} width={20} />
              <p>{POINTS_TO_REFILL}</p>
            </div>
          )}
        </Button>
      </div>
      <div className="flex w-full items-center gap-x-4 border-t-2 p-4 pt-8">
        <Image src="/unlimited.svg" alt="Unlimited" height={60} width={60} />
        <div className="flex-1">
          <p className="text-base font-bold text-neutral-700 lg:text-xl">
            Unlimited hearts
          </p>
        </div>
        <Button onClick={onUpgrade} disabled={pending}>
          {hasActiveSubscription ? 'settings' : 'upgrade'}
        </Button>
      </div>
    </ul>
  );
};

export default Items;
