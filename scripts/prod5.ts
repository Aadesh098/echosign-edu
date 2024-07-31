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
            id:4,
            title: "Taxation",
            description: "Understand various aspects of taxation and its implications.",
            order: 4,
          },
        ])
        .returning();

      // For each unit, insert lessons
      for (const unit of units) {
        const lessons = await db
          .insert(schema.lessons)
          .values([
            { unitId: unit.id, title: "Understanding Taxation Basics", order: 1, id:7 },
            { unitId: unit.id, title: "Tax Strategies and Benefits", order: 2, id:8 },
          ])
          .returning();

        // Challenges and options for "Understanding Taxation Basics"
        const understandingTaxationBasicsChallenges = [
                {
                  lessonId: 7,
                  id: 31,
                  type: 'SELECT' as 'SELECT', 
                  question: "Which of the following is a type of tax-deferred investment account?",
                  order: 1,
                },
                {
                  lessonId: 7,
                  id: 32,
                  type: 'SELECT' as 'SELECT', 
                  question: "What is 'capital gains tax'?",
                  order: 2,
                },
                {
                  lessonId: 7,
                  id: 33,
                  type: 'SELECT' as 'SELECT', 
                  question: "What is the difference between a tax deduction and a tax credit?",
                  order: 3,
                },
                {
                  lessonId: 7,
                  id: 34,
                  type: 'SELECT' as 'SELECT', 
                  question: "How does earned income differ from investment income in terms of taxation?",
                  order: 4,
                },
                {
                  lessonId: 7,
                  id: 35,
                  type: 'SELECT' as 'SELECT', 
                  question: "Which of the following is true about Roth IRAs?",
                  order: 5,
                }
              ];

        const understandingTaxationBasicsOptions = [
          {
            challengeId: 31,
            options: [
              { correct: true, text: "A) Traditional IRA" },
              { correct: false, text: "B) Roth IRA" },
              { correct: false, text: "C) Health Savings Account (HSA)" },
              { correct: false, text: "D) 529 Plan" },
            ],
          },
          {
            challengeId: 32,
            options: [
              { correct: true, text: "A) The tax on the value of income earned through investments." },
              { correct: false, text: "B) The tax on interest income earned from savings accounts." },
              { correct: false, text: "C) The tax on rental income from real estate." },
              { correct: false, text: "D) The tax on wages earned from employment." },
            ],
          },
          {
            challengeId: 33,
            options: [
              { correct: true, text: "A) A tax deduction reduces taxable income, while a tax credit directly reduces the amount of tax owed." },
              { correct: false, text: "B) A tax deduction directly reduces the amount of tax owed, while a tax credit reduces taxable income." },
              { correct: false, text: "C) A tax credit is a percentage of the amount spent, while a tax deduction is a fixed amount." },
              { correct: false, text: "D) A tax credit is only available for specific types of income, while a tax deduction is not." },
            ],
          },
          {
            challengeId: 34,
            options: [
              { correct: true, text: "A) Earned income is subject to payroll taxes and income taxes, whereas investment income might only be subject to capital gains tax." },
              { correct: false, text: "B) Earned income is taxed at a lower rate than investment income." },
              { correct: false, text: "C) Investment income is subject to payroll taxes, while earned income is subject to income taxes." },
              { correct: false, text: "D) There is no difference in how earned and investment income are taxed." },
            ],
          },
          {
            challengeId: 35,
            options: [
              { correct: false, text: "A) Contributions to a Roth IRA are tax-deductible, but withdrawals are taxed." },
              { correct: true, text: "B) Contributions are made with after-tax dollars, and withdrawals are tax-free after age 59½." },
              { correct: false, text: "C) Both contributions and withdrawals are tax-free." },
              { correct: false, text: "D) Roth IRAs are only available to high-income earners." },
            ],
          },
        ];

        // Challenges and options for "Tax Strategies and Benefits"
        const taxStrategiesAndBenefitsChallenges = [
          {
            lessonId: 8,
            id: 36,
            type: 'SELECT' as 'SELECT', 
            question: "What is a tax credit?",
            order: 1,
          },
          {
            lessonId: 8,
            id: 37,
            type: 'SELECT' as 'SELECT', 
            question: "What is the standard deduction?",
            order: 2,
          },
          {
            lessonId: 8,
            id: 38,
            type: 'SELECT' as 'SELECT', 
            question: "What is the primary difference between taxable and non-taxable income?",
            order: 3,
          },
          {
            lessonId: 8,
            id: 39,
            type: 'SELECT' as 'SELECT', 
            question: "What is the alternative minimum tax (AMT)?",
            order: 4,
          },
          {
            lessonId: 8,
            id: 40,
            type: 'SELECT' as 'SELECT', 
            question: "What is 'tax loss harvesting'?",
            order: 5,
          }
        ];

        const taxStrategiesAndBenefitsOptions = [
          {
            challengeId: 36,
            options: [
              { correct: true, text: "A) A tax credit directly reduces the amount of tax owed." },
              { correct: false, text: "B) A tax credit reduces taxable income." },
              { correct: false, text: "C) A tax credit is a percentage of the amount spent on certain expenses." },
              { correct: false, text: "D) A tax credit increases the amount of taxable income." },
            ],
          },
          {
            challengeId: 37,
            options: [
              { correct: true, text: "A) A fixed amount that reduces taxable income, available to all taxpayers." },
              { correct: false, text: "B) An itemized deduction for specific expenses." },
              { correct: false, text: "C) A tax credit based on income level." },
              { correct: false, text: "D) A deduction for business expenses." },
            ],
          },
          {
            challengeId: 38,
            options: [
              { correct: true, text: "A) Taxable income includes wages, interest, and investment gains, whereas non-taxable income includes gifts and certain benefits." },
              { correct: false, text: "B) Non-taxable income includes wages, interest, and investment gains, whereas taxable income includes gifts and certain benefits." },
              { correct: false, text: "C) Taxable income is always higher than non-taxable income." },
              { correct: false, text: "D) There is no significant difference between taxable and non-taxable income." },
            ],
          },
          {
            challengeId: 39,
            options: [
              { correct: true, text: "A) A tax designed to ensure that individuals with significant deductions still pay a minimum amount of tax." },
              { correct: false, text: "B) A tax that applies only to high-income earners." },
              { correct: false, text: "C) A tax that replaces the standard income tax for certain individuals." },
              { correct: false, text: "D) A tax credit for alternative energy investments." },
            ],
          },
          {
            challengeId: 40,
            options: [
              { correct: true, text: "A) Selling investments at a loss to offset capital gains taxes." },
              { correct: false, text: "B) Selling investments at a profit to increase taxable income." },
              { correct: false, text: "C) Deferring taxes on investment gains until retirement." },
              { correct: false, text: "D) Investing in tax-free municipal bonds to avoid capital gains taxes." },
            ],
          },
        ];

        for (const challenge of understandingTaxationBasicsChallenges) {
            await db.insert(schema.challenges).values(challenge);
          }
          for (const optionSet of understandingTaxationBasicsOptions) {
            await db.insert(schema.challengeOptions).values(
              optionSet.options.map(option => ({ ...option, challengeId: optionSet.challengeId }))
            );
          }
  
          for (const challenge of taxStrategiesAndBenefitsChallenges) {
            await db.insert(schema.challenges).values(challenge);
          }
          for (const optionSet of taxStrategiesAndBenefitsOptions ) {
            await db.insert(schema.challengeOptions).values(
              optionSet.options.map(option => ({ ...option, challengeId: optionSet.challengeId }))
            );
          }
      }
    

    console.log("Seeding complete");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

main();
