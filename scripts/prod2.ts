import { neon } from "@neondatabase/serverless";
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/db/schema";

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database");

    // Delete all existing data for Chapter 2
    // await Promise.all([
    //   db.delete(schema.userProgress),
    //   db.delete(schema.challengeOptions),
    //   db.delete(schema.challenges),
    //   db.delete(schema.lessons),
    //   db.delete(schema.units),
    //   db.delete(schema.courses),
    // ]);

    // Insert courses
    // const courses = await db
    //   .insert(schema.courses)
    //   .values([{ title: "Grammar and Syntax", imageSrc: "/grammar_syntax.svg" }])
    //   .returning();

    // For each course, insert units
    
      const units = await db
        .insert(schema.units)
        .values([
          {
            courseId: 14,
            title: "Chapter 2: Grammar and Syntax",
            description: "Master the rules of grammar and syntax for clear and precise communication.",
            order: 2,
          },
        ])
        .returning();

      // For each unit, insert lessons
      for (const unit of units) {
        const lessons = await db
          .insert(schema.lessons)
          .values([
            { unitId: unit.id, title: "Part 1: Sentence Correction", order: 1, id: 3 },
            { unitId: unit.id, title: "Part 2: Tenses and Verb Forms", order: 2, id: 4 },
          ])
          .returning();

        // Challenges and options for "Part 1: Sentence Correction"
        const sentenceCorrectionChallenges = [
          {
            lessonId: 3,
            id: 11,
            type: 'SELECT' as 'SELECT',
            question: "Identify the grammatically correct sentence:",
            order: 1,
          },
          {
            lessonId: 3,
            id: 12,
            type: 'SELECT' as 'SELECT',
            question: "Choose the sentence with correct subject-verb agreement:",
            order: 2,
          },
          {
            lessonId: 3,
            id: 13,
            type: 'SELECT' as 'SELECT',
            question: "Which sentence is free of grammatical errors?",
            order: 3,
          },
          {
            lessonId: 3,
            id: 14,
            type: 'SELECT' as 'SELECT',
            question: "Choose the sentence that uses correct punctuation:",
            order: 4,
          },
          {
            lessonId: 3,
            id: 15,
            type: 'SELECT' as 'SELECT',
            question: "Identify the correctly punctuated sentence:",
            order: 5,
          }
        ];

        const sentenceCorrectionOptions = [
          {
            challengeId: 11,
            options: [
              { correct: false, text: "a) He don’t know the answer to the question." },
              { correct: false, text: "b) He doesn’t knows the answer to the question." },
              { correct: true, text: "c) He doesn’t know the answer to the question." },
              { correct: false, text: "d) He didn’t knew the answer to the question." },
            ],
          },
          {
            challengeId: 12,
            options: [
              { correct: false, text: "a) Neither the students nor the teacher were present." },
              { correct: true, text: "b) Neither the students nor the teacher was present." },
              { correct: false, text: "c) Neither the students nor the teacher is present." },
              { correct: false, text: "d) Neither the students nor the teacher are present." },
            ],
          },
          {
            challengeId: 13,
            options: [
              { correct: false, text: "a) I enjoys swimming on weekends." },
              { correct: false, text: "b) She and him went to the store." },
              { correct: true, text: "c) They’re planning their vacation." },
              { correct: false, text: "d) Whom are you talking to?" },
            ],
          },
          {
            challengeId: 14,
            options: [
              { correct: false, text: "a) Its going to rain today, don’t forget your umbrella." },
              { correct: true, text: "b) It’s going to rain today; don’t forget your umbrella." },
              { correct: false, text: "c) Its going to rain today; don’t forget your umbrella." },
              { correct: false, text: "d) It’s going to rain today, don’t forget your umbrella." },
            ],
          },
          {
            challengeId: 15,
            options: [
              { correct: false, text: "a) My brother’s car, which is very old is still reliable." },
              { correct: false, text: "b) My brothers car, which is very old, is still reliable." },
              { correct: true, text: "c) My brother’s car, which is very old, is still reliable." },
              { correct: false, text: "d) My brothers car which is very old, is still reliable." },
            ],
          }
        ];

        // Challenges and options for "Part 2: Tenses and Verb Forms"
        const tensesAndVerbFormsChallenges = [
          {
            lessonId: 4,
            id: 16,
            type: 'SELECT' as 'SELECT',
            question: "Which sentence is in the past perfect tense?",
            order: 1,
          },
          {
            lessonId: 4,
            id: 17,
            type: 'SELECT' as 'SELECT',
            question: "Choose the correct form of the verb in this sentence: 'By next year, I __________ in this city for a decade.'",
            order: 2,
          },
          {
            lessonId: 4,
            id: 18,
            type: 'SELECT' as 'SELECT',
            question: "Identify the sentence with the correct verb form:",
            order: 3,
          },
          {
            lessonId: 4,
            id: 19,
            type: 'SELECT' as 'SELECT',
            question: "Which sentence is in the future continuous tense?",
            order: 4,
          },
          {
            lessonId: 4,
            id: 20,
            type: 'SELECT' as 'SELECT',
            question: "Choose the sentence with the correct usage of 'used to':",
            order: 5,
          }
        ];

        const tensesAndVerbFormsOptions = [
          {
            challengeId: 16,
            options: [
              { correct: false, text: "a) She was walking to the store." },
              { correct: false, text: "b) She has walked to the store." },
              { correct: true, text: "c) She had walked to the store." },
              { correct: false, text: "d) She walks to the store." },
            ],
          },
          {
            challengeId: 17,
            options: [
              { correct: false, text: "a) will be living" },
              { correct: false, text: "b) have lived" },
              { correct: true, text: "c) will have lived" },
              { correct: false, text: "d) live" },
            ],
          },
          {
            challengeId: 18,
            options: [
              { correct: false, text: "a) If I was rich, I would travel the world." },
              { correct: true, text: "b) If I were rich, I would travel the world." },
              { correct: false, text: "c) If I were rich, I will travel the world." },
              { correct: false, text: "d) If I was rich, I will travel the world." },
            ],
          },
          {
            challengeId: 19,
            options: [
              { correct: true, text: "a) I will be eating dinner at 7 PM." },
              { correct: false, text: "b) I eat dinner at 7 PM." },
              { correct: false, text: "c) I was eating dinner at 7 PM." },
              { correct: false, text: "d) I have eaten dinner at 7 PM." },
            ],
          },
          {
            challengeId: 20,
            options: [
              { correct: true, text: "a) I used to play the piano when I was younger." },
              { correct: false, text: "b) I am used to play the piano when I was younger." },
              { correct: false, text: "c) I used to played the piano when I was younger." },
              { correct: false, text: "d) I used to plays the piano when I was younger." },
            ],
          }
        ];

        // Insert challenges and options for each lesson
        for (const challenge of sentenceCorrectionChallenges) {
          await db.insert(schema.challenges).values(challenge);
        }
        for (const optionSet of sentenceCorrectionOptions) {
          await db.insert(schema.challengeOptions).values(
            optionSet.options.map(option => ({ ...option, challengeId: optionSet.challengeId }))
          );
        }

        for (const challenge of tensesAndVerbFormsChallenges) {
          await db.insert(schema.challenges).values(challenge);
        }
        for (const optionSet of tensesAndVerbFormsOptions) {
          await db.insert(schema.challengeOptions).values(
            optionSet.options.map(option => ({ ...option, challengeId: optionSet.challengeId }))
          );
        }
      }
    

    console.log("Database seeded successfully");
  } catch (err) {
    console.error("Error seeding database:", err);
  }
};

main();
