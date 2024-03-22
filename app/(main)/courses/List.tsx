'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

import { courses } from '@/db/schema';
import { Card } from './Card';

type Props = {
  courses: (typeof courses.$inferSelect)[];
  activeCourseId?: number;
};

export const List = ({ courses, activeCourseId }: Props) => {
  const [pending, startTransition] = useTransition();
  const onClick = () => {};

  return (
    <div className="grid grid-cols-2 gap-4 pt-6 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))]">
      {courses.map((course) => (
        <Card
          key={course.id}
          id={course.id}
          title={course.title}
          imageSrc={course.imageSrc}
          onClick={onClick}
          disabled={pending}
          active={course.id === activeCourseId}
        />
      ))}
    </div>
  );
};
