import { neon } from "@neondatabase/serverless";
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/db/schema";

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database");

    // Delete all existing data
    await Promise.all([
      db.delete(schema.userProgress),
      db.delete(schema.challengeOptions),
      db.delete(schema.challenges),
      db.delete(schema.lessons),
      db.delete(schema.units),
      // db.delete(schema.courses),
    ]);

    // Insert courses
    // const courses = await db
    //   .insert(schema.courses)
    //   .values([{ title: "Reading Comprehension", imageSrc: "/reading_comprehension.svg" }])
    //   .returning();

    // For each course, insert units
   
      const units = await db
        .insert(schema.units)
        .values([
          {
            courseId: 14,
            title: "Chapter 3: Reading Comprehension",
            description: "Develop skills to analyze, interpret, and draw conclusions from complex texts.",
            order: 1,
          },
        ])
        .returning();

      // For each unit, insert lessons
      for (const unit of units) {
        const lessons = await db
          .insert(schema.lessons)
          .values([
            { unitId: unit.id, title: "Part 1: Critical Reading", order: 1, id: 5 },
            { unitId: unit.id, title: "Part 2: Inference and Deduction", order: 2, id: 6 },
          ])
          .returning();

        // Challenges and options for "Part 1: Critical Reading"
        const criticalReadingChallenges = [
          {
            lessonId: 5,
            id: 21,
            type: 'SELECT' as 'SELECT',
            question: "What is the main idea of the passage?",
            order: 1,
          },
          {
            lessonId: 5,
            id: 22,
            type: 'SELECT' as 'SELECT',
            question: "In the passage, the author suggests that:",
            order: 2,
          },
          {
            lessonId: 5,
            id: 23,
            type: 'SELECT' as 'SELECT',
            question: "Which of the following best describes the tone of the passage?",
            order: 3,
          },
          {
            lessonId: 5,
            id: 24,
            type: 'SELECT' as 'SELECT',
            question: "What is implied by the author in the passage?",
            order: 4,
          },
          {
            lessonId: 5,
            id: 25,
            type: 'SELECT' as 'SELECT',
            question: "What does the author mean by the phrase 'the last straw'?",
            order: 5,
          }
        ];

        const criticalReadingOptions = [
          {
            challengeId: 21,
            options: [
              { correct: false, text: "a) To explain a scientific concept" },
              { correct: false, text: "b) To describe a historical event" },
              { correct: true, text: "c) To argue a point of view" },
              { correct: false, text: "d) To entertain with a story" },
            ],
          },
          {
            challengeId: 22,
            options: [
              { correct: false, text: "a) Technology will always advance." },
              { correct: false, text: "b) Society is resistant to change." },
              { correct: false, text: "c) Environmental issues are unimportant." },
              { correct: true, text: "d) Education is key to success." },
            ],
          },
          {
            challengeId: 23,
            options: [
              { correct: true, text: "a) Optimistic" },
              { correct: false, text: "b) Pessimistic" },
              { correct: false, text: "c) Neutral" },
              { correct: false, text: "d) Sarcastic" },
            ],
          },
          {
            challengeId: 24,
            options: [
              { correct: false, text: "a) The solution is simple." },
              { correct: true, text: "b) The problem is complex." },
              { correct: false, text: "c) The situation is hopeless." },
              { correct: false, text: "d) The outcome is uncertain." },
            ],
          },
          {
            challengeId: 25,
            options: [
              { correct: true, text: "a) The final problem that makes a situation unbearable" },
              { correct: false, text: "b) A simple solution to a complex issue" },
              { correct: false, text: "c) A temporary fix to a permanent problem" },
              { correct: false, text: "d) The most important element of a situation" },
            ],
          }
        ];

        // Challenges and options for "Part 2: Inference and Deduction"
        const inferenceAndDeductionChallenges = [
          {
            lessonId: 6,
            id: 26,
            type: 'SELECT' as 'SELECT',
            question: "From the passage, it can be inferred that the protagonist is:",
            order: 1,
          },
          {
            lessonId: 6,
            id: 27,
            type: 'SELECT' as 'SELECT',
            question: "What can be deduced about the author's perspective on the issue discussed?",
            order: 2,
          },
          {
            lessonId: 6,
            id: 28,
            type: 'SELECT' as 'SELECT',
            question: "Based on the text, which of the following is most likely to happen next?",
            order: 3,
          },
          {
            lessonId: 6,
            id: 29,
            type: 'SELECT' as 'SELECT',
            question: "What can be inferred about the setting of the passage?",
            order: 4,
          },
          {
            lessonId: 6,
            id: 30,
            type: 'SELECT' as 'SELECT',
            question: "Which of the following best describes the relationship between the two main characters?",
            order: 5,
          }
        ];

        const inferenceAndDeductionOptions = [
          {
            challengeId: 26,
            options: [
              { correct: false, text: "a) Confident" },
              { correct: true, text: "b) Anxious" },
              { correct: false, text: "c) Angry" },
              { correct: false, text: "d) Indifferent" },
            ],
          },
          {
            challengeId: 27,
            options: [
              { correct: false, text: "a) They support the current state." },
              { correct: true, text: "b) They are critical of the issue." },
              { correct: false, text: "c) They are indifferent to the issue." },
              { correct: false, text: "d) They are enthusiastic about the issue." },
            ],
          },
          {
            challengeId: 28,
            options: [
              { correct: false, text: "a) The character will leave the situation." },
              { correct: false, text: "b) The conflict will be resolved peacefully." },
              { correct: true, text: "c) The situation will worsen." },
              { correct: false, text: "d) The story will have a happy ending." },
            ],
          },
          {
            challengeId: 29,
            options: [
              { correct: false, text: "a) It takes place in a rural area." },
              { correct: false, text: "b) It is set in the future." },
              { correct: true, text: "c) It occurs in an urban environment." },
              { correct: false, text: "d) It is based on a historical event." },
            ],
          },
          {
            challengeId: 30,
            options: [
              { correct: false, text: "a) They are allies." },
              { correct: true, text: "b) They are rivals." },
              { correct: false, text: "c) They are strangers." },
              { correct: false, text: "d) They are indifferent to each other." },
            ],
          }
        ];

        // Insert challenges and options for each lesson
        for (const challenge of criticalReadingChallenges) {
          await db.insert(schema.challenges).values(challenge);
        }
        for (const optionSet of criticalReadingOptions) {
          await db.insert(schema.challengeOptions).values(
            optionSet.options.map(option => ({ ...option, challengeId: optionSet.challengeId }))
          );
        }

        for (const challenge of inferenceAndDeductionChallenges) {
          await db.insert(schema.challenges).values(challenge);
        }
        for (const optionSet of inferenceAndDeductionOptions) {
          await db.insert(schema.challengeOptions).values(
            optionSet.options.map(option => ({ ...option, challengeId: optionSet.challengeId }))
          );
        }
      }
    

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

main();
