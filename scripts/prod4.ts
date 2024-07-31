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

    // Insert courses
    

    // For each course, insert units
    
      const units = await db
        .insert(schema.units)
        .values([
          {
            courseId: 10,
            id:3,
            title: "Credit and Debt Management",
            description: "Learn effective strategies for managing credit and debt.",
            order: 3,
          },
        ])
        .returning();

      // For each unit, insert lessons
      for (const unit of units) {
        const lessons = await db
          .insert(schema.lessons)
          .values([
            { unitId: unit.id, title: "Understanding Credit Scores", order: 1, id:5 },
            { unitId: unit.id, title: "Debt Management Strategies", order: 2, id:6 },
          ])
          .returning();

        // Challenges and options for "Understanding Credit Scores"
        const understandingCreditScoresChallenges = [
                {
                  lessonId: 5,
                  id: 21,
                  type: 'SELECT' as 'SELECT', 
                  question: "Which credit score range is generally considered 'excellent'?",
                  order: 1,
                },
                {
                  lessonId: 5,
                  id: 22,
                  type: 'SELECT' as 'SELECT', 
                  question: "What is the primary factor affecting your credit score?",
                  order: 2,
                },
                {
                  lessonId: 5,
                  id: 23,
                  type: 'SELECT' as 'SELECT', 
                  question: "Which of the following is a recommended strategy for managing credit card debt?",
                  order: 3,
                },
                {
                  lessonId: 5,
                  id: 24,
                  type: 'SELECT' as 'SELECT', 
                  question: "What does the term 'credit utilization ratio' refer to?",
                  order: 4,
                },
                {
                  lessonId: 5,
                  id: 25,
                  type: 'SELECT' as 'SELECT', 
                  question: "Which type of credit account typically has the highest interest rates?",
                  order: 5,
                }
              ];

        const understandingCreditScoresOptions = [
          {
            challengeId: 21,
            options: [
              { correct: false, text: "A) 300-579" },
              { correct: false, text: "B) 580-669" },
              { correct: false, text: "C) 670-739" },
              { correct: true, text: "D) 740-850" },
            ],
          },
          {
            challengeId: 22,
            options: [
              { correct: false, text: "A) Length of credit history" },
              { correct: false, text: "B) Type of credit accounts" },
              { correct: true, text: "C) Payment history" },
              { correct: false, text: "D) Credit inquiries" },
            ],
          },
          {
            challengeId: 23,
            options: [
              { correct: false, text: "A) Making only the minimum payments each month" },
              { correct: true, text: "B) Consolidating debt into a lower-interest loan" },
              { correct: false, text: "C) Using multiple credit cards to maximize rewards" },
              { correct: false, text: "D) Ignoring the balance to avoid stress" },
            ],
          },
          {
            challengeId: 24,
            options: [
              { correct: true, text: "A) The percentage of available credit being used." },
              { correct: false, text: "B) The ratio of credit card balances to income." },
              { correct: false, text: "C) The total number of credit accounts open." },
              { correct: false, text: "D) The average age of credit accounts." },
            ],
          },
          {
            challengeId: 25,
            options: [
              { correct: false, text: "A) Mortgage" },
              { correct: false, text: "B) Auto loan" },
              { correct: false, text: "C) Personal loan" },
              { correct: true, text: "D) Credit card" },
            ],
          },
        ];

        // Challenges and options for "Debt Management Strategies"
        const debtManagementStrategiesChallenges = [
          {
            lessonId: 6,
            id: 26,
            type: 'SELECT' as 'SELECT', 
            question: "What is 'debt consolidat2ion'?",
            order: 1,
          },
          {
            lessonId: 6,
            id: 27,
            type: 'SELECT' as 'SELECT', 
            question: "What is the effect of a 'hard inquiry' on your credit score?",
            order: 2,
          },
          {
            lessonId: 6,
            id: 28,
            type: 'SELECT' as 'SELECT', 
            question: "What does the term 'secured credit card' refer to?",
            order: 3,
          },
          {
            lessonId: 6,
            id: 29,
            type: 'SELECT' as 'SELECT', 
            question: "Which of the following is a good practice to maintain a healthy credit score?",
            order: 4,
          },
          {
            lessonId: 6,
            id: 30,
            type: 'SELECT' as 'SELECT', 
            question: "What is the typical duration of a bankruptcy record on a credit report?",
            order: 5,
          }
        ];

        const debtManagementStrategiesOptions = [
          {
            challengeId: 26,
            options: [
              { correct: true, text: "A) The process of combining multiple debts into a single loan with a lower interest rate." },
              { correct: false, text: "B) The act of paying off debt using a credit card balance transfer." },
              { correct: false, text: "C) The strategy of increasing the amount of credit available to improve credit utilization." },
              { correct: false, text: "D) The creation of a new debt to pay off old debts." },
            ],
          },
          {
            challengeId: 27,
            options: [
              { correct: false, text: "A) It has no impact on your credit score." },
              { correct: true, text: "B) It can temporarily lower your credit score." },
              { correct: false, text: "C) It improves your credit score." },
              { correct: false, text: "D) It permanently lowers your credit score." },
            ],
          },
          {
            challengeId: 28,
            options: [
              { correct: true, text: "A) A credit card backed by a security deposit to limit risk." },
              { correct: false, text: "B) A credit card with a high credit limit and no annual fee." },
              { correct: false, text: "C) A credit card with additional fraud protection features." },
              { correct: false, text: "D) A credit card specifically for online purchases." },
            ],
          },
          {
            challengeId: 29,
            options: [
              { correct: false, text: "A) Frequently closing old credit accounts." },
              { correct: false, text: "B) Missing payments to reduce outstanding balances." },
              { correct: true, text: "C) Keeping credit card balances low relative to credit limits." },
              { correct: false, text: "D) Using only one credit card for all purchases." },
            ],
          },
          {
            challengeId: 30,
            options: [
              { correct: false, text: "A) 3 years" },
              { correct: false, text: "B) 5 years" },
              { correct: false, text: "C) 7 years" },
              { correct: true, text: "D) 10 years" },
            ],
          },
        ];

        // Insert challenges and options for each lesson
        for (const challenge of understandingCreditScoresChallenges) {
          await db.insert(schema.challenges).values(challenge);
        }
        for (const optionSet of understandingCreditScoresOptions) {
          await db.insert(schema.challengeOptions).values(
            optionSet.options.map(option => ({ ...option, challengeId: optionSet.challengeId }))
          );
        }

        for (const challenge of debtManagementStrategiesChallenges) {
          await db.insert(schema.challenges).values(challenge);
        }
        for (const optionSet of debtManagementStrategiesOptions) {
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
