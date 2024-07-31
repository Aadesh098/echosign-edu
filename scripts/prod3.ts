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
            id:2,
            title: "Investing Basics",
            description: "Learn the fundamental concepts of investing and asset management.",
            order: 2,
          },
        ])
        .returning();

      // For each unit, insert lessons
      for (const unit of units) {
        const lessons = await db
          .insert(schema.lessons)
          .values([
            { unitId: unit.id, title: "Investing Essentials", order: 1, id:3 },
            { unitId: unit.id, title: "Advanced Investment Strategies", order: 2, id:4 },
          ])
          .returning();

        // Challenges and options for "Investing Essentials"
        const investingEssentialsChallenges = [
                {
                  lessonId: 3,
                  id: 11,
                  type: 'SELECT' as 'SELECT', 
                  question: "What is the primary difference between a mutual fund and an exchange-traded fund (ETF)?",
                  order: 1,
                },
                {
                  lessonId: 3,
                  id: 12,
                  type: 'SELECT' as 'SELECT', 
                  question: "Which investment type is generally considered the safest?",
                  order: 2,
                },
                {
                  lessonId: 3,
                  id: 13,
                  type: 'SELECT' as 'SELECT', 
                  question: "Which of the following investment strategies involves buying and holding a diversified portfolio for an extended period?",
                  order: 3,
                },
                {
                  lessonId: 3,
                  id: 14,
                  type: 'SELECT' as 'SELECT', 
                  question: "In the context of stock investments, what does the term 'dividend yield' refer to?",
                  order: 4,
                },
                {
                  lessonId: 3,
                  id: 15,
                  type: 'SELECT' as 'SELECT', 
                  question: "What is a 'bear market'?",
                  order: 5,
                }
              ];

        const investingEssentialsOptions = [
          {
            challengeId: 11,
            options: [
              { correct: false, text: "A) Mutual funds trade on an exchange, while ETFs do not." },
              { correct: true, text: "B) ETFs typically have lower fees compared to mutual funds." },
              { correct: false, text: "C) Mutual funds can only be bought or sold at the end of the trading day, while ETFs can be traded throughout the day." },
              { correct: false, text: "D) There is no difference between mutual funds and ETFs." },
            ],
          },
          {
            challengeId: 12,
            options: [
              { correct: false, text: "A) Stocks" },
              { correct: true, text: "B) Bonds" },
              { correct: false, text: "C) Real estate" },
              { correct: false, text: "D) Commodities" },
            ],
          },
          {
            challengeId: 13,
            options: [
              { correct: false, text: "A) Day trading" },
              { correct: false, text: "B) Swing trading" },
              { correct: true, text: "C) Buy and hold" },
              { correct: false, text: "D) Arbitrage" },
            ],
          },
          {
            challengeId: 14,
            options: [
              { correct: true, text: "A) The percentage of a company's profit paid out to shareholders in dividends." },
              { correct: false, text: "B) The total return on investment including capital gains and dividends." },
              { correct: false, text: "C) The rate at which a company’s stock price is expected to grow." },
              { correct: false, text: "D) The amount of dividend paid per share relative to the stock price." },
            ],
          },
          {
            challengeId: 15,
            options: [
              { correct: false, text: "A) A market in which stock prices are rising or expected to rise." },
              { correct: true, text: "B) A market in which stock prices are falling or expected to fall." },
              { correct: false, text: "C) A market characterized by high volatility with no clear direction." },
              { correct: false, text: "D) A market where interest rates are decreasing." },
            ],
          },
        ];

        // Challenges and options for "Advanced Investment Strategies"
        const advancedInvestmentStrategiesChallenges = [
          {
            lessonId: 4,
            id: 16,
            type: 'SELECT' as 'SELECT', 
            question: "Which of the following is NOT a fundamental analysis indicator?",
            order: 1,
          },
          {
            lessonId: 4,
            id: 17,
            type: 'SELECT' as 'SELECT', 
            question: "What does the term 'asset allocation' refer to in investing?",
            order: 2,
          },
          {
            lessonId: 4,
            id: 18,
            type: 'SELECT' as 'SELECT', 
            question: "What is a 'bull market'?",
            order: 3,
          },
          {
            lessonId: 4,
            id: 19,
            type: 'SELECT' as 'SELECT', 
            question: "In terms of risk management, what does the 'efficient frontier' represent?",
            order: 4,
          },
          {
            lessonId: 4,
            id: 20,
            type: 'SELECT' as 'SELECT', 
            question: "Which of the following is a key principle of Modern Portfolio Theory (MPT)?",
            order: 5,
          }
        ];

        const advancedInvestmentStrategiesOptions = [
          {
            challengeId: 16,
            options: [
              { correct: false, text: "A) Price-to-earnings (P/E) ratio" },
              { correct: true, text: "B) Moving average convergence divergence (MACD)" },
              { correct: false, text: "C) Earnings per share (EPS)" },
              { correct: false, text: "D) Return on equity (ROE)" },
            ],
          },
          {
            challengeId: 17,
            options: [
              { correct: true, text: "A) The distribution of a portfolio’s assets among various asset classes." },
              { correct: false, text: "B) The process of selecting individual securities for a portfolio." },
              { correct: false, text: "C) The allocation of assets to different investment funds." },
              { correct: false, text: "D) The rebalancing of assets in a portfolio to maintain a desired risk level." },
            ],
          },
          {
            challengeId: 18,
            options: [
              { correct: true, text: "A) A market where there is a prolonged increase in asset prices." },
              { correct: false, text: "B) A market where asset prices fluctuate rapidly without a clear trend." },
              { correct: false, text: "C) A market characterized by a significant drop in asset prices." },
              { correct: false, text: "D) A market with stable asset prices." },
            ],
          },
          {
            challengeId: 19,
            options: [
              { correct: true, text: "A) The best possible risk-return combination of asset portfolios." },
              { correct: false, text: "B) The point at which investment risk is minimized." },
              { correct: false, text: "C) The historical performance range of an asset." },
              { correct: false, text: "D) The maximum allowable risk for an investment." },
            ],
          },
          {
            challengeId: 20,
            options: [
              { correct: false, text: "A) The goal is to maximize returns with no concern for risk." },
              { correct: true, text: "B) Diversification can help in reducing risk without sacrificing returns." },
              { correct: false, text: "C) The market is always efficient, so no need for diversification." },
              { correct: false, text: "D) Risk and return are not related in the investment world." },
            ],
          },
        ];

        // Insert challenges and options for each lesson
        for (const challenge of investingEssentialsChallenges) {
          await db.insert(schema.challenges).values(challenge);
        }
        for (const optionSet of investingEssentialsOptions) {
          await db.insert(schema.challengeOptions).values(
            optionSet.options.map(option => ({ ...option, challengeId: optionSet.challengeId }))
          );
        }

        for (const challenge of advancedInvestmentStrategiesChallenges) {
          await db.insert(schema.challenges).values(challenge);
        }
        for (const optionSet of advancedInvestmentStrategiesOptions) {
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
