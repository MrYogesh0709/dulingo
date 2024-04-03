import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

import * as schema from '@/db/schema';

const sql = neon(process.env.NEON_DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log('Seeding database');

    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);
    await db.delete(schema.userSubscription);

    await db.insert(schema.courses).values([
      {
        id: 1,
        title: 'Spanish',
        imageSrc: '/es.svg',
      },
      {
        id: 2,
        title: 'Italian',
        imageSrc: '/it.svg',
      },
      {
        id: 3,
        title: 'French',
        imageSrc: '/fr.svg',
      },
      {
        id: 4,
        title: 'Croatian',
        imageSrc: '/hr.svg',
      },
    ]);

    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 1, // Spanish
        title: 'Unit 1',
        description: 'Learn the basics of Spanish',
        order: 1,
      },
      {
        id: 2,
        courseId: 1, // Spanish
        title: 'Unit 2',
        description: 'Intermediate Spanish',
        order: 2,
      },
    ]);

    await db.insert(schema.lessons).values([
      {
        id: 1,
        unitId: 1, // Unit 1 (Learn the basics...)
        order: 1,
        title: 'Nouns',
      },
      {
        id: 2,
        unitId: 1, // Unit 1 (Learn the basics...)
        order: 2,
        title: 'Verbs',
      },
      {
        id: 3,
        unitId: 1, // Unit 1 (Learn the basics...)
        order: 3,
        title: 'Adjectives',
      },
      {
        id: 4,
        unitId: 1, // Unit 1 (Learn the basics...)
        order: 4,
        title: 'Adverbs',
      },
      {
        id: 5,
        unitId: 1, // Unit 1 (Learn the basics...)
        order: 5,
        title: 'Pronouns',
      },
      {
        id: 6,
        unitId: 2, // Unit 2
        order: 1,
        title: 'Advanced Nouns',
      },
      {
        id: 7,
        unitId: 2, // Unit 2
        order: 2,
        title: 'Complex Verbs',
      },
      {
        id: 8,
        unitId: 2, // Unit 2
        order: 3,
        title: 'Comparative Adjectives',
      },
      {
        id: 9,
        unitId: 2, // Unit 2
        order: 4,
        title: 'Temporal Adverbs',
      },
      {
        id: 10,
        unitId: 2, // Unit 2
        order: 5,
        title: 'Personal Pronouns',
      },
    ]);

    await db.insert(schema.challenges).values([
      // Challenges for Lesson 1 (Nouns)
      {
        id: 1,
        lessonId: 1, // Nouns
        type: 'SELECT',
        order: 1,
        question: 'Which one of these is "the man"?',
      },
      {
        id: 2,
        lessonId: 1, // Nouns
        type: 'ASSIST',
        order: 2,
        question: '"the man"',
      },
      {
        id: 3,
        lessonId: 1, // Nouns
        type: 'SELECT',
        order: 3,
        question: 'Which one of these is "the robot"?',
      },
      // Challenges for Lesson 2 (Verbs)
      {
        id: 4,
        lessonId: 2, // Verbs
        type: 'SELECT',
        order: 1,
        question: 'Which one of these is "to run"?',
      },
      {
        id: 5,
        lessonId: 2, // Verbs
        type: 'ASSIST',
        order: 2,
        question: '"to run"',
      },
      {
        id: 6,
        lessonId: 2, // Verbs
        type: 'SELECT',
        order: 3,
        question: 'Which one of these is "to swim"?',
      },
      // Challenges for Lesson 3 (Adjectives)
      {
        id: 7,
        lessonId: 3, // Adjectives
        type: 'SELECT',
        order: 1,
        question: 'Which one of these is "big"?',
      },
      {
        id: 8,
        lessonId: 3, // Adjectives
        type: 'ASSIST',
        order: 2,
        question: '"big"',
      },
      {
        id: 9,
        lessonId: 3, // Adjectives
        type: 'SELECT',
        order: 3,
        question: 'Which one of these is "small"?',
      },
      // Challenges for Lesson 4 (Adverbs)
      {
        id: 10,
        lessonId: 4, // Adverbs
        type: 'SELECT',
        order: 1,
        question: 'Which one of these is "quickly"?',
      },
      {
        id: 11,
        lessonId: 4, // Adverbs
        type: 'ASSIST',
        order: 2,
        question: '"quickly"',
      },
      {
        id: 12,
        lessonId: 4, // Adverbs
        type: 'SELECT',
        order: 3,
        question: 'Which one of these is "slowly"?',
      },
      // Challenges for Lesson 5 (Pronouns)
      {
        id: 13,
        lessonId: 5, // Pronouns
        type: 'SELECT',
        order: 1,
        question: 'Which one of these is "he"?',
      },
      {
        id: 14,
        lessonId: 5, // Pronouns
        type: 'ASSIST',
        order: 2,
        question: '"he"',
      },
      {
        id: 15,
        lessonId: 5, // Pronouns
        type: 'SELECT',
        order: 3,
        question: 'Which one of these is "she"?',
      },
      // Challenges for Lesson 6 (Advanced Nouns)
      {
        id: 16,
        lessonId: 6,
        type: 'SELECT',
        order: 1,
        question: 'Which one of these is "the city"?',
      },
      {
        id: 17,
        lessonId: 6,
        type: 'ASSIST',
        order: 2,
        question: '"the city"',
      },
      {
        id: 18,
        lessonId: 6,
        type: 'SELECT',
        order: 3,
        question: 'Which one of these is "the country"?',
      },
      // Challenges for Lesson 7 (Complex Verbs)
      {
        id: 19,
        lessonId: 7,
        type: 'SELECT',
        order: 1,
        question: 'Which one of these is "to sing"?',
      },
      {
        id: 20,
        lessonId: 7,
        type: 'ASSIST',
        order: 2,
        question: '"to sing"',
      },
      {
        id: 21,
        lessonId: 7,
        type: 'SELECT',
        order: 3,
        question: 'Which one of these is "to dance"?',
      },
      // Challenges for Lesson 8 (Comparative Adjectives)
      {
        id: 22,
        lessonId: 8,
        type: 'SELECT',
        order: 1,
        question: 'Which one of these is "bigger"?',
      },
      {
        id: 23,
        lessonId: 8,
        type: 'ASSIST',
        order: 2,
        question: '"bigger"',
      },
      {
        id: 24,
        lessonId: 8,
        type: 'SELECT',
        order: 3,
        question: 'Which one of these is "smaller"?',
      },
      // Challenges for Lesson 9 (Temporal Adverbs)
      {
        id: 25,
        lessonId: 9,
        type: 'SELECT',
        order: 1,
        question: 'Which one of these is "yesterday"?',
      },
      {
        id: 26,
        lessonId: 9,
        type: 'ASSIST',
        order: 2,
        question: '"yesterday"',
      },
      {
        id: 27,
        lessonId: 9,
        type: 'SELECT',
        order: 3,
        question: 'Which one of these is "tomorrow"?',
      },
      // Challenges for Lesson 10 (Personal Pronouns)
      {
        id: 28,
        lessonId: 10,
        type: 'SELECT',
        order: 1,
        question: 'Which one of these is "I"?',
      },
      {
        id: 29,
        lessonId: 10,
        type: 'ASSIST',
        order: 2,
        question: '"I"',
      },
      {
        id: 30,
        lessonId: 10,
        type: 'SELECT',
        order: 3,
        question: 'Which one of these is "you"?',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      // Options for Challenge 1 (Which one of these is "the man"?)
      {
        challengeId: 1, // Which one of these is "the man"?
        imageSrc: '/man.svg',
        correct: true,
        text: 'el hombre',
        audioSrc: '/es_man.mp3',
      },
      {
        challengeId: 1,
        imageSrc: '/woman.svg',
        correct: false,
        text: 'la mujer',
        audioSrc: '/es_woman.mp3',
      },
      {
        challengeId: 1,
        imageSrc: '/robot.svg',
        correct: false,
        text: 'el robot',
        audioSrc: '/es_robot.mp3',
      },
      // Options for Challenge 2 (Which one of these is "to run"?)
      {
        challengeId: 2, // "the man"?
        correct: true,
        text: 'el hombre',
        audioSrc: '/es_man.mp3',
      },
      {
        challengeId: 2,
        correct: false,
        text: 'la mujer',
        audioSrc: '/es_woman.mp3',
      },
      {
        challengeId: 2,
        correct: false,
        text: 'el robot',
        audioSrc: '/es_robot.mp3',
      },
      // Options for Challenge 3 (Which one of these is "to swim"?)
      {
        challengeId: 3, // Which one of these is the "the robot"?
        imageSrc: '/man.svg',
        correct: false,
        text: 'el hombre',
        audioSrc: '/es_man.mp3',
      },
      {
        challengeId: 3,
        imageSrc: '/woman.svg',
        correct: false,
        text: 'la mujer',
        audioSrc: '/es_woman.mp3',
      },
      {
        challengeId: 3,
        imageSrc: '/robot.svg',
        correct: true,
        text: 'el robot',
        audioSrc: '/es_robot.mp3',
      },
      // Options for Challenge 4 (Which one of these is "big"?)
      {
        challengeId: 4,
        correct: true,
        text: 'grande',
      },
      {
        challengeId: 4,
        correct: false,
        text: 'pequeño',
      },
      // Options for Challenge 5 (Which one of these is "quickly"?)
      {
        challengeId: 5,
        correct: true,
        text: 'rápidamente',
      },
      {
        challengeId: 5,
        correct: false,
        text: 'lentamente',
      },
      // Options for Challenge 6 (Which one of these is "he"?)
      {
        challengeId: 6,
        correct: true,
        text: 'él',
      },
      {
        challengeId: 6,
        correct: false,
        text: 'ella',
      },
      // Options for Challenge 7 (Which one of these is "to walk"?)
      {
        challengeId: 7,
        correct: true,
        text: 'caminar',
      },
      {
        challengeId: 7,
        correct: false,
        text: 'correr',
      },
      // Options for Challenge 8 (Which one of these is "she"?)
      {
        challengeId: 8,
        correct: true,
        text: 'ella',
      },
      {
        challengeId: 8,
        correct: false,
        text: 'él',
      },
      // Options for Challenge 9 (Which one of these is "to eat"?)
      {
        challengeId: 9,
        correct: true,
        text: 'comer',
      },
      {
        challengeId: 9,
        correct: false,
        text: 'beber',
      },
      // Options for Challenge 10 (Which one of these is "they"?)
      {
        challengeId: 10,
        correct: true,
        text: 'ellos',
      },
      {
        challengeId: 10,
        correct: false,
        text: 'ellas',
      },
      // Options for Challenge 11 (Which one of these is "to read"?)
      {
        challengeId: 11,
        correct: true,
        text: 'leer',
      },
      {
        challengeId: 11,
        correct: false,
        text: 'escribir',
      },
      // Options for Challenge 12 (Which one of these is "I"?)
      {
        challengeId: 12,
        correct: true,
        text: 'yo',
      },
      {
        challengeId: 12,
        correct: false,
        text: 'tú',
      },
      // Options for Challenge 13 (Which one of these is "you"?)
      {
        challengeId: 13,
        correct: true,
        text: 'tú',
      },
      {
        challengeId: 13,
        correct: false,
        text: 'yo',
      },
      // Options for Challenge 14 (Which one of these is "to speak"?)
      {
        challengeId: 14,
        correct: true,
        text: 'hablar',
      },
      {
        challengeId: 14,
        correct: false,
        text: 'escuchar',
      },
      // Options for Challenge 15 (Which one of these is "we"?)
      {
        challengeId: 15,
        correct: true,
        text: 'nosotros',
      },
      {
        challengeId: 15,
        correct: false,
        text: 'ellos',
      },
      // Options for Challenge 16 (Which one of these is "the city"?)
      {
        challengeId: 16,
        correct: true,
        text: 'la ciudad',
      },
      {
        challengeId: 16,
        correct: false,
        text: 'el país',
      },
      // Options for Challenge 17 (Which one of these is "to sing"?)
      {
        challengeId: 17,
        correct: true,
        text: 'cantar',
      },
      {
        challengeId: 17,
        correct: false,
        text: 'bailar',
      },
      // Options for Challenge 18 (Which one of these is "bigger"?)
      {
        challengeId: 18,
        correct: true,
        text: 'más grande',
      },
      {
        challengeId: 18,
        correct: false,
        text: 'menos grande',
      },
      // Options for Challenge 19 (Which one of these is "yesterday"?)
      {
        challengeId: 19,
        correct: true,
        text: 'ayer',
      },
      {
        challengeId: 19,
        correct: false,
        text: 'mañana',
      },
      // Options for Challenge 20 (Which one of these is "I"?)
      {
        challengeId: 20,
        correct: true,
        text: 'yo',
      },
      {
        challengeId: 20,
        correct: false,
        text: 'tú',
      },
      // Options for Challenge 21 (Which one of these is "to run"?)
      {
        challengeId: 21,
        correct: true,
        text: 'correr',
      },
      {
        challengeId: 21,
        correct: false,
        text: 'nadar',
      },
      // Options for Challenge 22 (Which one of these is "to walk"?)
      {
        challengeId: 22,
        correct: true,
        text: 'caminar',
      },
      {
        challengeId: 22,
        correct: false,
        text: 'correr',
      },
      // Options for Challenge 23 (Which one of these is "to swim"?)
      {
        challengeId: 23,
        correct: true,
        text: 'nadar',
      },
      {
        challengeId: 23,
        correct: false,
        text: 'correr',
      },
      // Options for Challenge 24 (Which one of these is "big"?)
      {
        challengeId: 24,
        correct: true,
        text: 'grande',
      },
      {
        challengeId: 24,
        correct: false,
        text: 'pequeño',
      },
      // Options for Challenge 25 (Which one of these is "to eat"?)
      {
        challengeId: 25,
        correct: true,
        text: 'comer',
      },
      {
        challengeId: 25,
        correct: false,
        text: 'beber',
      },
      // Options for Challenge 26 (Which one of these is "they"?)
      {
        challengeId: 26,
        correct: true,
        text: 'ellos',
      },
      {
        challengeId: 26,
        correct: false,
        text: 'ellas',
      },
      // Options for Challenge 27 (Which one of these is "to read"?)
      {
        challengeId: 27,
        correct: true,
        text: 'leer',
      },
      {
        challengeId: 27,
        correct: false,
        text: 'escribir',
      },
      // Options for Challenge 28 (Which one of these is "I"?)
      {
        challengeId: 28,
        correct: true,
        text: 'yo',
      },
      {
        challengeId: 28,
        correct: false,
        text: 'tú',
      },
      // Options for Challenge 29 (Which one of these is "you"?)
      {
        challengeId: 29,
        correct: true,
        text: 'tú',
      },
      {
        challengeId: 29,
        correct: false,
        text: 'yo',
      },
      // Options for Challenge 30 (Which one of these is "to speak"?)
      {
        challengeId: 30,
        correct: true,
        text: 'hablar',
      },
      {
        challengeId: 30,
        correct: false,
        text: 'escuchar',
      },
    ]);

    console.log('Seeding finished');
  } catch (error) {
    console.error(error);
    throw new Error('Failed to seed the database');
  }
};

main();
