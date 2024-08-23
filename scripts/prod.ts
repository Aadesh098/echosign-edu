import { neon } from "@neondatabase/serverless";
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/db/schema";

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database");

    // // Delete all existing data
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
    //   .values([{ title: "Vocabulary Building", imageSrc: "/vocab.svg" }])
    //   .returning();

    // For each course, insert units
    // for (const course of courses) {
      const units = await db
        .insert(schema.units)
        .values([
          {
            courseId: 14,
            title: "Chapter 1: Vocabulary Building",
            description: "Expand and refine your vocabulary to enhance your understanding and communication skills.",
            order: 1,
          },
        ])
        .returning();

      // For each unit, insert lessons
      for (const unit of units) {
        const lessons = await db
          .insert(schema.lessons)
          .values([
            { unitId: unit.id, title: "Part 1: Advanced Word Usage", order: 1, id: 1 },
            { unitId: unit.id, title: "Part 2: Idioms and Phrases", order: 2, id: 2 },
          ])
          .returning();

        // Challenges and options for "Part 1: Advanced Word Usage"
        const advancedWordUsageChallenges = [
          {
            lessonId: 1,
            id: 1,
            type: 'SELECT' as 'SELECT', 
            question: "Which word best completes the sentence? 'Her __________ demeanor made her a favorite among the team.'",
            order: 1,
          },
          {
            lessonId: 1,
            id: 2,
            type: 'SELECT' as 'SELECT', 
            question: "Choose the synonym for the word 'ephemeral.'",
            order: 2,
          },
          {
            lessonId: 1,
            id: 3,
            type: 'SELECT' as 'SELECT', 
            question: "Which word is the antonym of 'gregarious'?",
            order: 3,
          },
          {
            lessonId: 1,
            id: 4,
            type: 'SELECT' as 'SELECT', 
            question: "Identify the word that best matches this definition: 'To criticize severely.'",
            order: 4,
          },
          {
            lessonId: 1,
            id: 5,
            type: 'SELECT' as 'SELECT', 
            question: "Choose the most appropriate word to fill in the blank: 'The scientist’s theory was __________ and quickly gained widespread acceptance.'",
            order: 5,
          },
        ];

        const advancedWordUsageOptions = [
          {
            challengeId: 1,
            options: [
              { correct: false, text: "a) apathetic" },
              { correct: true, text: "b) affable" },
              { correct: false, text: "c) arrogant" },
              { correct: false, text: "d) aloof" },
            ],
          },
          {
            challengeId: 2,
            options: [
              { correct: false, text: "a) everlasting" },
              { correct: true, text: "b) transient" },
              { correct: false, text: "c) tedious" },
              { correct: false, text: "d) meticulous" },
            ],
          },
          {
            challengeId: 3,
            options: [
              { correct: false, text: "a) sociable" },
              { correct: false, text: "b) loquacious" },
              { correct: true, text: "c) reclusive" },
              { correct: false, text: "d) jubilant" },
            ],
          },
          {
            challengeId: 4,
            options: [
              { correct: false, text: "a) admonish" },
              { correct: false, text: "b) extol" },
              { correct: false, text: "c) exalt" },
              { correct: true, text: "d) berate" },
            ],
          },
          {
            challengeId: 5,
            options: [
              { correct: false, text: "a) esoteric" },
              { correct: false, text: "b) controversial" },
              { correct: true, text: "c) cogent" },
              { correct: false, text: "d) redundant" },
            ],
          },
        ];

        // Challenges and options for "Part 2: Idioms and Phrases"
        const idiomsAndPhrasesChallenges = [
          {
            lessonId: 2,
            id: 6,
            type: 'SELECT' as 'SELECT', 
            question: "What does the idiom 'barking up the wrong tree' mean?",
            order: 1,
          },
          {
            lessonId: 2,
            id: 7,
            type: 'SELECT' as 'SELECT', 
            question: "Choose the correct meaning of 'a blessing in disguise.'",
            order: 2,
          },
          {
            lessonId: 2,
            id: 8,
            type: 'SELECT' as 'SELECT', 
            question: "'Burning the midnight oil' refers to:",
            order: 3,
          },
          {
            lessonId: 2,
            id: 9,
            type: 'SELECT' as 'SELECT', 
            question: "What does the phrase 'hit the nail on the head' mean?",
            order: 4,
          },
          {
            lessonId: 2,
            id: 10,
            type: 'SELECT' as 'SELECT', 
            question: "The phrase 'once in a blue moon' means:",
            order: 5,
          },
        ];

        const idiomsAndPhrasesOptions = [
          {
            challengeId: 6,
            options: [
              { correct: false, text: "a) To complain loudly" },
              { correct: true, text: "b) To pursue the wrong solution" },
              { correct: false, text: "c) To avoid responsibility" },
              { correct: false, text: "d) To engage in unnecessary conflict" },
            ],
          },
          {
            challengeId: 7,
            options: [
              { correct: true, text: "a) Something bad that turns out to be good" },
              { correct: false, text: "b) An unexpected good fortune" },
              { correct: false, text: "c) A hidden talent" },
              { correct: false, text: "d) An unwelcome surprise" },
            ],
          },
          {
            challengeId: 8,
            options: [
              { correct: true, text: "a) Working late into the night" },
              { correct: false, text: "b) Wasting energy" },
              { correct: false, text: "c) Taking unnecessary risks" },
              { correct: false, text: "d) Celebrating excessively" },
            ],
          },
          {
            challengeId: 9,
            options: [
              { correct: false, text: "a) To be extremely lucky" },
              { correct: true, text: "b) To say exactly the right thing" },
              { correct: false, text: "c) To fail completely" },
              { correct: false, text: "d) To miss an opportunity" },
            ],
          },
          {
            challengeId: 10,
            options: [
              { correct: true, text: "a) Happening very rarely" },
              { correct: false, text: "b) Occurring frequently" },
              { correct: false, text: "c) Lasting a long time" },
              { correct: false, text: "d) Being common and ordinary" },
            ],
          },
        ];

        // Insert challenges and options for each lesson
        for (const challenge of advancedWordUsageChallenges) {
          await db.insert(schema.challenges).values(challenge);
        }
        for (const optionSet of advancedWordUsageOptions) {
          await db.insert(schema.challengeOptions).values(
            optionSet.options.map(option => ({ ...option, challengeId: optionSet.challengeId }))
          );
        }

        for (const challenge of idiomsAndPhrasesChallenges) {
          await db.insert(schema.challenges).values(challenge);
        }
        for (const optionSet of idiomsAndPhrasesOptions) {
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
