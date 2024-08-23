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
    //   .values([{ title: "Writing and Composition", imageSrc: "/writing_composition.svg" }])
      // .returning();

    // For each course, insert units
    
      const units = await db
        .insert(schema.units)
        .values([
          {
            courseId: 14,
            title: "Chapter 4: Writing and Composition",
            description: "Improve your writing skills by mastering different types of compositions and structures.",
            order: 1,
          },
        ])
        .returning();

      // For each unit, insert lessons
      for (const unit of units) {
        const lessons = await db
          .insert(schema.lessons)
          .values([
            { unitId: unit.id, title: "Part 1: Essay Writing", order: 1, id: 7 },
            { unitId: unit.id, title: "Part 2: Sentence Structure and Style", order: 2, id: 8 },
          ])
          .returning();

        // Challenges and options for "Part 1: Essay Writing"
        const essayWritingChallenges = [
          {
            lessonId: 7,
            id: 31,
            type: 'SELECT' as 'SELECT',
            question: "Which is the best thesis statement for an argumentative essay on climate change?",
            order: 1,
          },
          {
            lessonId: 7,
            id: 32,
            type: 'SELECT' as 'SELECT',
            question: "What is the purpose of a topic sentence in a paragraph?",
            order: 2,
          },
          {
            lessonId: 7,
            id: 33,
            type: 'SELECT' as 'SELECT',
            question: "Which of the following best describes a persuasive essay?",
            order: 3,
          },
          {
            lessonId: 7,
            id: 34,
            type: 'SELECT' as 'SELECT',
            question: "What is the most effective way to conclude an argumentative essay?",
            order: 4,
          },
          {
            lessonId: 7,
            id: 35,
            type: 'SELECT' as 'SELECT',
            question: "Choose the most coherent sentence order for the following paragraph:",
            order: 5,
          }
        ];

        const essayWritingOptions = [
          {
            challengeId: 31,
            options: [
              { correct: false, text: "a) Climate change is a serious issue, but it can be solved." },
              { correct: false, text: "b) The effects of climate change are over-exaggerated." },
              { correct: true, text: "c) Climate change is real and needs to be addressed immediately." },
              { correct: false, text: "d) Climate change is a myth and should not concern us." },
            ],
          },
          {
            challengeId: 32,
            options: [
              { correct: true, text: "a) To introduce the main idea of the paragraph" },
              { correct: false, text: "b) To provide supporting details" },
              { correct: false, text: "c) To conclude the paragraph" },
              { correct: false, text: "d) To transition between ideas" },
            ],
          },
          {
            challengeId: 33,
            options: [
              { correct: false, text: "a) It aims to inform the reader about a topic." },
              { correct: true, text: "b) It aims to persuade the reader to adopt a certain viewpoint." },
              { correct: false, text: "c) It tells a story in a creative manner." },
              { correct: false, text: "d) It explains a process step-by-step." },
            ],
          },
          {
            challengeId: 34,
            options: [
              { correct: true, text: "a) Restate your thesis and summarize your main points." },
              { correct: false, text: "b) Introduce new arguments to strengthen your position." },
              { correct: false, text: "c) Apologize for any potential disagreements." },
              { correct: false, text: "d) End with an unrelated quote to leave a lasting impression." },
            ],
          },
          {
            challengeId: 35,
            options: [
              { correct: false, text: "a) ii, iv, i, iii" },
              { correct: false, text: "b) ii, i, iv, iii" },
              { correct: false, text: "c) i, ii, iii, iv" },
              { correct: true, text: "d) iv, ii, iii, i" },
            ],
          }
        ];

        // Challenges and options for "Part 2: Sentence Structure and Style"
        const sentenceStructureChallenges = [
          {
            lessonId: 8,
            id: 36,
            type: 'SELECT' as 'SELECT',
            question: "Which of the following sentences is the most concise and clear?",
            order: 1,
          },
          {
            lessonId: 8,
            id: 37,
            type: 'SELECT' as 'SELECT',
            question: "Which sentence best maintains a formal tone?",
            order: 2,
          },
          {
            lessonId: 8,
            id: 38,
            type: 'SELECT' as 'SELECT',
            question: "Identify the sentence that avoids redundancy:",
            order: 3,
          },
          {
            lessonId: 8,
            id: 39,
            type: 'SELECT' as 'SELECT',
            question: "Choose the most parallel sentence structure:",
            order: 4,
          },
          {
            lessonId: 8,
            id: 40,
            type: 'SELECT' as 'SELECT',
            question: "Which sentence uses the correct word order?",
            order: 5,
          }
        ];

        const sentenceStructureOptions = [
          {
            challengeId: 36,
            options: [
              { correct: false, text: "a) Due to the fact that he was late, he missed the meeting." },
              { correct: true, text: "b) Because he was late, he missed the meeting." },
              { correct: false, text: "c) On account of his tardiness, he missed the meeting." },
              { correct: false, text: "d) As a result of being late, he missed the meeting." },
            ],
          },
          {
            challengeId: 37,
            options: [
              { correct: false, text: "a) You can’t just skip the meeting without telling anyone." },
              { correct: false, text: "b) It’s cool if you want to reschedule the meeting." },
              { correct: true, text: "c) You are advised to inform the team if you are unable to attend the meeting." },
              { correct: false, text: "d) No worries if you miss the meeting; just let us know." },
            ],
          },
          {
            challengeId: 38,
            options: [
              { correct: false, text: "a) The committee will meet at 10 AM in the morning." },
              { correct: false, text: "b) The committee will meet at 10 AM in the morning hours." },
              { correct: true, text: "c) The committee will meet at 10 AM." },
              { correct: false, text: "d) The committee will meet at 10 AM in the morning time." },
            ],
          },
          {
            challengeId: 39,
            options: [
              { correct: false, text: "a) She enjoys reading, jogging, and to swim." },
              { correct: true, text: "b) She enjoys reading, jogging, and swimming." },
              { correct: false, text: "c) She enjoys reading, jogging, and to swimming." },
              { correct: false, text: "d) She enjoys reading, to jog, and swimming." },
            ],
          },
          {
            challengeId: 40,
            options: [
              { correct: false, text: "a) The cat, who is usually very quiet, is outside barking loudly." },
              { correct: true, text: "b) The cat, who is usually very quiet, is barking loudly outside." },
              { correct: false, text: "c) The cat, who is barking loudly, is usually very quiet outside." },
              { correct: false, text: "d) The cat, who is outside barking loudly, is usually very quiet." },
            ],
          }
        ];

        // Insert challenges and options for each lesson
        for (const challenge of essayWritingChallenges) {
          await db.insert(schema.challenges).values(challenge);
        }
        for (const optionSet of essayWritingOptions) {
          await db.insert(schema.challengeOptions).values(
            optionSet.options.map(option => ({ ...option, challengeId: optionSet.challengeId }))
          );
        }

        for (const challenge of sentenceStructureChallenges) {
          await db.insert(schema.challenges).values(challenge);
        }
        for (const optionSet of sentenceStructureOptions) {
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
