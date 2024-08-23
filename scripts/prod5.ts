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
    // await Promise.all([
    //   db.delete(schema.userProgress),
    //   db.delete(schema.challengeOptions),
    //   db.delete(schema.challenges),
    //   db.delete(schema.lessons),
    //   db.delete(schema.units),
    //   db.delete(schema.courses),
    // ]);

    // // Insert courses
    // const courses = await db
    //   .insert(schema.courses)
    //   .values([{ title: "Listening and Speaking Skills", imageSrc: "/listening_speaking.svg" }])
      // .returning();

    // For each course, insert units
    
      const units = await db
        .insert(schema.units)
        .values([
          {
            courseId: 14,
            title: "Chapter 5: Listening and Speaking Skills",
            description: "Enhance your ability to comprehend spoken English and express your thoughts clearly.",
            order: 1,
          },
        ])
        .returning();

      // For each unit, insert lessons
      for (const unit of units) {
        const lessons = await db
          .insert(schema.lessons)
          .values([
            { unitId: unit.id, title: "Part 1: Listening Comprehension", order: 1, id: 9 },
            { unitId: unit.id, title: "Part 2: Speaking Practice", order: 2, id: 10 },
          ])
          .returning();

        // Challenges and options for "Part 1: Listening Comprehension"
        const listeningChallenges = [
          {
            lessonId: 9,
            id: 41,
            type: 'SELECT' as 'SELECT',
            question: "What is the main point of the speaker’s message?",
            order: 1,
          },
          {
            lessonId: 9,
            id: 42,
            type: 'SELECT' as 'SELECT',
            question: "What can be inferred about the speaker’s attitude?",
            order: 2,
          },
          {
            lessonId: 9,
            id: 43,
            type: 'SELECT' as 'SELECT',
            question: "What does the speaker imply by saying 'It’s not rocket science'?",
            order: 3,
          },
          {
            lessonId: 9,
            id: 44,
            type: 'SELECT' as 'SELECT',
            question: "Which of the following best describes the speaker’s tone?",
            order: 4,
          },
          {
            lessonId: 9,
            id: 45,
            type: 'SELECT' as 'SELECT',
            question: "How does the speaker suggest handling the situation?",
            order: 5,
          }
        ];

        const listeningOptions = [
          {
            challengeId: 41,
            options: [
              { correct: false, text: "a) To inform the audience about a new policy" },
              { correct: true, text: "b) To persuade the audience to take action" },
              { correct: false, text: "c) To entertain the audience with a story" },
              { correct: false, text: "d) To explain a complicated process" },
            ],
          },
          {
            challengeId: 42,
            options: [
              { correct: true, text: "a) The speaker is enthusiastic about the topic." },
              { correct: false, text: "b) The speaker is indifferent to the audience." },
              { correct: false, text: "c) The speaker is critical of the subject." },
              { correct: false, text: "d) The speaker is unsure of their position." },
            ],
          },
          {
            challengeId: 43,
            options: [
              { correct: false, text: "a) The task is extremely difficult." },
              { correct: false, text: "b) The task requires specialized knowledge." },
              { correct: true, text: "c) The task is simple and straightforward." },
              { correct: false, text: "d) The task is impossible to complete." },
            ],
          },
          {
            challengeId: 44,
            options: [
              { correct: true, text: "a) Authoritative" },
              { correct: false, text: "b) Sarcastic" },
              { correct: false, text: "c) Apologetic" },
              { correct: false, text: "d) Indifferent" },
            ],
          },
          {
            challengeId: 45,
            options: [
              { correct: false, text: "a) By ignoring the problem" },
              { correct: true, text: "b) By addressing it immediately" },
              { correct: false, text: "c) By waiting for further instructions" },
              { correct: false, text: "d) By seeking external help" },
            ],
          }
        ];

        // Challenges and options for "Part 2: Speaking Practice"
        const speakingChallenges = [
          {
            lessonId: 10,
            id: 46,
            type: 'SELECT' as 'SELECT',
            question: "Which of the following is the best way to open a formal presentation?",
            order: 1,
          },
          {
            lessonId: 10,
            id: 47,
            type: 'SELECT' as 'SELECT',
            question: "Identify the most effective way to structure a persuasive speech:",
            order: 2,
          },
          {
            lessonId: 10,
            id: 48,
            type: 'SELECT' as 'SELECT',
            question: "Choose the best way to respond to a challenging question during a Q&A session:",
            order: 3,
          },
          {
            lessonId: 10,
            id: 49,
            type: 'SELECT' as 'SELECT',
            question: "Which strategy is most effective for maintaining audience engagement during a speech?",
            order: 4,
          },
          {
            lessonId: 10,
            id: 50,
            type: 'SELECT' as 'SELECT',
            question: "What is the best way to conclude a persuasive speech?",
            order: 5,
          }
        ];

        const speakingOptions = [
          {
            challengeId: 46,
            options: [
              { correct: false, text: "a) 'Hey everyone, thanks for coming.'" },
              { correct: true, text: "b) 'Hello, thank you all for being here today.'" },
              { correct: false, text: "c) 'What’s up, let’s get started.'" },
              { correct: false, text: "d) 'So, let’s begin, shall we?'" },
            ],
          },
          {
            challengeId: 47,
            options: [
              { correct: true, text: "a) Introduction, argument, conclusion" },
              { correct: false, text: "b) Argument, conclusion, introduction" },
              { correct: false, text: "c) Conclusion, introduction, argument" },
              { correct: false, text: "d) Introduction, conclusion, argument" },
            ],
          },
          {
            challengeId: 48,
            options: [
              { correct: true, text: "a) 'That’s a good question, let me explain…'" },
              { correct: false, text: "b) 'I don’t know, next question.'" },
              { correct: false, text: "c) 'Why would you ask that?'" },
              { correct: false, text: "d) 'I’ll get back to you on that.'" },
            ],
          },
          {
            challengeId: 49,
            options: [
              { correct: false, text: "a) Monotone delivery" },
              { correct: true, text: "b) Interactive questions" },
              { correct: false, text: "c) Rapid pacing" },
              { correct: false, text: "d) Reading directly from notes" },
            ],
          },
          {
            challengeId: 50,
            options: [
              { correct: false, text: "a) Thank the audience and sit down." },
              { correct: false, text: "b) Summarize key points and issue a call to action." },
              { correct: false, text: "c) Introduce new arguments to strengthen your case." },
              { correct: true, text: "d) End abruptly to leave the audience thinking." },
            ],
          }
        ];

        // Insert challenges and options for each lesson
        for (const challenge of listeningChallenges) {
          await db.insert(schema.challenges).values(challenge);
        }
        for (const optionSet of listeningOptions) {
          await db.insert(schema.challengeOptions).values(
            optionSet.options.map(option => ({ ...option, challengeId: optionSet.challengeId }))
          );
        }

        for (const challenge of speakingChallenges) {
          await db.insert(schema.challenges).values(challenge);
        }
        for (const optionSet of speakingOptions) {
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
