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
      db.delete(schema.courses),
    ]);

    // Insert courses
    const courses = await db
      .insert(schema.courses)
      .values([{ title: "Financial Literacy", imageSrc: "/es.svg" }])
      .returning();
    // For each course, insert units
    for (const course of courses) {
        
        const units = await db
        .insert(schema.units)
        .values([
          {
            courseId: course.id,
            id:1,
            title: "Personal Budgeting",
            description: "Learn how to manage your personal finances and budget effectively.",
            order: 1,
          },
        ])
        .returning();

      // For each unit, insert lessons
      for (const unit of units) {
        const lessons = await db
          .insert(schema.lessons)
          .values([
            { unitId: unit.id, title: "Budgeting Essentials", order: 1, id:1 },
            { unitId: unit.id, title: "Practical Budgeting Tips", order: 2, id:2 },
          ])
          .returning();

        // Challenges and options for "Budgeting Essentials"
        const budgetingEssentialsChallenges = [
                {
                  lessonId: 1,
                  id: 1,
                  type: 'SELECT' as 'SELECT', 
                  question: "Which of the following is considered a 'fixed expense' in a personal budget?",
                  order: 1,
                },
                {
                  lessonId: 1,
                  id: 2,
                  type: 'SELECT' as 'SELECT', 
                  question: "What is the purpose of a 'sinking fund'?",
                  order: 2,
                },
                {
                  lessonId: 1,
                  id: 3,
                  type: 'SELECT' as 'SELECT', 
                  question: "Which budgeting method involves allocating a percentage of income to various expense categories?",
                  order: 3,
                },
                {
                  lessonId: 1,
                  id: 4,
                  type: 'SELECT' as 'SELECT', 
                  question: "What does the '50/30/20' rule recommend for budgeting?",
                  order: 4,
                },
                {
                  lessonId: 1,
                  id: 5,
                  type: 'SELECT' as 'SELECT', 
                  question: "What is the primary advantage of using a zero-based budgeting approach?",
                  order: 5,
                }
              ];

        const budgetingEssentialsOptions = [
          {
            challengeId: 1,
            options: [
              { correct: true, text: "A) Monthly rent" },
              { correct: false, text: "B) Grocery bills" },
              { correct: false, text: "C) Dining out" },
              { correct: false, text: "D) Entertainment" },
            ],
          },
          {
            challengeId: 2,
            options: [
              { correct: false, text: "A) To save for an unexpected emergency." },
              { correct: false, text: "B) To invest in high-risk assets." },
              { correct: true, text: "C) To set aside money for a specific future expense." },
              { correct: false, text: "D) To cover monthly fixed expenses." },
            ],
          },
          {
            challengeId: 3,
            options: [
              { correct: false, text: "A) Zero-based budgeting" },
              { correct: false, text: "B) Envelope system" },
              { correct: true, text: "C) 50/30/20 rule" },
              { correct: false, text: "D) Pay-yourself-first" },
            ],
          },
          {
            challengeId: 4,
            options: [
              { correct: true, text: "A) 50% for necessities, 30% for savings, 20% for discretionary expenses." },
              { correct: false, text: "B) 50% for discretionary expenses, 30% for savings, 20% for necessities." },
              { correct: false, text: "C) 50% for debt repayment, 30% for necessities, 20% for discretionary expenses." },
              { correct: false, text: "D) 50% for savings, 30% for necessities, 20% for discretionary expenses." },
            ],
          },
          {
            challengeId: 5,
            options: [
              { correct: false, text: "A) It simplifies tracking of discretionary spending." },
              { correct: true, text: "B) It ensures that every dollar is allocated to specific expenses or savings." },
              { correct: false, text: "C) It automatically adjusts to changes in income." },
              { correct: false, text: "D) It provides a fixed budget for each month regardless of income changes." },
            ],
          },
        ];

        // Challenges and options for "Practical Budgeting Tips"
        const practicalBudgetingTipsChallenges = [
          {
            lessonId: 2,
            id:6,
            type: 'SELECT' as 'SELECT', 
            question: "What does the term 'discretionary income' refer to?",
            order: 1,
          },
          {
            lessonId: 2,
            id:7,
            type: 'SELECT' as 'SELECT', 
            question: "Which tool is most useful for tracking personal spending and identifying budgetary issues?",
            order: 2,
          },
          {
            lessonId: 2,
            id:8,
            type: 'SELECT' as 'SELECT', 
            question: "What is the benefit of having an 'emergency fund' in a personal budget?",
            order: 3,
          },
          {
            lessonId: 2,
            id:9,
            type: 'SELECT' as 'SELECT', 
            question: "How often should you review and adjust your personal budget?",
            order: 4,
          },
          {
            lessonId: 2,
            id:10,
            type: 'SELECT' as 'SELECT', 
            question: "What is a common pitfall of budgeting that could lead to financial problems?",
            order: 5,
          }
        ];

        const practicalBudgetingTipsOptions = [
          {
            challengeId: 6,
            options: [
              { correct: true, text: "A) Income available after all essential expenses are paid." },
              { correct: false, text: "B) Income earned from investments." },
              { correct: false, text: "C) Income before taxes are deducted." },
              { correct: false, text: "D) Income used to pay off debt." },
            ],
          },
          {
            challengeId: 7,
            options: [
              { correct: true, text: "A) Personal finance software" },
              { correct: false, text: "B) Investment portfolio" },
              { correct: false, text: "C) Credit report" },
              { correct: false, text: "D) Retirement account" },
            ],
          },
          {
            challengeId: 8,
            options: [
              { correct: false, text: "A) To invest in high-growth opportunities." },
              { correct: true, text: "B) To cover unexpected expenses and avoid debt." },
              { correct: false, text: "C) To increase disposable income." },
              { correct: false, text: "D) To save for long-term goals." },
            ],
          },
          {
            challengeId: 9,
            options: [
              { correct: false, text: "A) Annually" },
              { correct: true, text: "B) Monthly" },
              { correct: false, text: "C) Bi-weekly" },
              { correct: false, text: "D) Weekly" },
            ],
          },
          {
            challengeId: 10,
            options: [
              { correct: false, text: "A) Overestimating income" },
              { correct: false, text: "B) Underestimating fixed expenses" },
              { correct: true, text: "C) Setting unrealistic savings goals" },
              { correct: false, text: "D) Overestimating discretionary spending" },
            ],
          },
        ];

        // Insert challenges and options for each lesson
        for (const challenge of budgetingEssentialsChallenges) {
          await db.insert(schema.challenges).values(challenge);
        }
        for (const optionSet of budgetingEssentialsOptions) {
          await db.insert(schema.challengeOptions).values(
            optionSet.options.map(option => ({ ...option, challengeId: optionSet.challengeId }))
          );
        }

        for (const challenge of practicalBudgetingTipsChallenges) {
          await db.insert(schema.challenges).values(challenge);
        }
        for (const optionSet of practicalBudgetingTipsOptions) {
          await db.insert(schema.challengeOptions).values(
            optionSet.options.map(option => ({ ...option, challengeId: optionSet.challengeId }))
          );
        }
      }
    }

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }

};

main();
