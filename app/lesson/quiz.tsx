'use client';

import { toast } from 'sonner';
import { useState, useTransition } from 'react';
import { challengeOptions, challenges } from '@/db/schema';

import Header from './header';
import QuestionBubble from './QuestionBubble';
import Challenge from './challenge';
import Footer from './footer';

import { upsertChallengeProgress } from '@/actions/challenge-progress';
import { reduceHearts } from '@/actions/user-progress';

type Props = {
  initialPercentage: number;
  initialHearts: number;
  initialLessonId: number;
  initialLessonChallenges: (typeof challenges.$inferSelect & {
    completed: boolean;
    challengeOptions: (typeof challengeOptions.$inferSelect)[];
  })[];
  userSubscription: any;
};

const Quiz = ({
  initialPercentage,
  initialHearts,
  initialLessonChallenges,
  initialLessonId,
  userSubscription,
}: Props) => {
  const [pending, startTransition] = useTransition();
  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setPercentage] = useState(() => {
    return initialPercentage === 100 ? 0 : initialPercentage;
  });
  const [challenges] = useState(initialLessonChallenges);
  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges.findIndex(
      (challenge) => !challenge.completed
    );
    return uncompletedIndex == -1 ? 0 : uncompletedIndex;
  });
  const [selectedOption, setSelectedOption] = useState<number>();
  const [status, setStatus] = useState<'correct' | 'wrong' | 'none'>('none');

  const challenge = challenges[activeIndex];
  const options = challenge.challengeOptions ?? [];
  const title =
    challenge.type === 'ASSIST'
      ? 'Select the correct meaning'
      : challenge.question;

  const onSelect = (id: number) => {
    if (status !== 'none') return;
    setSelectedOption(id);
  };

  const onNext = () => {
    setActiveIndex((current) => current + 1);
  };

  const onContinue = () => {
    if (!selectedOption) return;
    if (status === 'wrong') {
      setStatus('none');
      setSelectedOption(undefined);
      return;
    }
    if (status === 'correct') {
      onNext();
      setStatus('none');
      setSelectedOption(undefined);
      return;
    }

    const correctOption = options.find((option) => option.correct);

    if (!correctOption) {
      return;
    }

    if (correctOption.id === selectedOption) {
      startTransition(() => {
        upsertChallengeProgress(challenge.id)
          .then((res) => {
            if (res?.error === 'hearts') {
              console.error('Missing Hearts');
              return;
            }
            setStatus('correct');
            setPercentage((prev) => prev + 100 / challenges.length);

            //this is practice
            if (initialPercentage === 100) {
              setHearts((prev) => Math.min(prev + 1, 5));
            }
          })
          .catch(() => toast.error('Something went wrong please try again'));
      });
    } else {
      startTransition(() => {
        reduceHearts(challenge.id)
          .then((res) => {
            if (res?.error === 'hearts') {
              console.error('Missing Hearts');
              return;
            }
            setStatus('wrong');
            if (!res?.error) {
              setHearts((prev) => Math.max(prev - 1, 0));
            }
          })
          .catch(() => toast.error('Something went wrong. Please try again.'));
      });
    }
  };

  return (
    <>
      <Header
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={!!userSubscription?.isActive}
      />
      <div className="flex-1">
        <div className="flex h-full items-center justify-center">
          <div className="flex w-full flex-col gap-y-12 px-6 lg:min-h-[350px] lg:w-[600px] lg:px-0">
            <h1 className="text-center text-lg font-bold text-neutral-700 lg:text-start lg:text-3xl">
              {title}
            </h1>
            <div>
              {challenge.type === 'ASSIST' && (
                <QuestionBubble question={challenge.question} />
              )}
              <Challenge
                options={options}
                onSelect={onSelect}
                status={status}
                selectedOption={selectedOption}
                disabled={pending}
                type={challenge.type}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer
        disabled={pending || !selectedOption}
        status={status}
        onCheck={onContinue}
      />
    </>
  );
};

export default Quiz;
