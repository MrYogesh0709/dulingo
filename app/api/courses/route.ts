import db from '@/db/drizzle';
import { courses } from '@/db/schema';
import { checkRole } from '@/lib/admin';
import { NextResponse } from 'next/server';

export const GET = async () => {
  if (!checkRole('admin')) {
    return new NextResponse('Unauthorized', { status: 401 });
  }
  const data = await db.query.courses.findMany();
  return NextResponse.json(data);
};

export const POST = async (req: Request) => {
  if (!checkRole('admin')) {
    return new NextResponse('Unauthorized', { status: 401 });
  }
  const body = await req.json();
  const data = await db
    .insert(courses)
    .values({
      ...body,
    })
    .returning(); //you need this when you  are using drizzle

  return NextResponse.json(data[0]);
};
