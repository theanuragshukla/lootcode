import fs from "fs";
import readline from "readline";
import chalk from "chalk";

import {
  questionDetails,
  getAllSolutions,
  getSolutionById,
} from "./web-utils.js";
import { submitToLeetcode } from "./submitSolution.js";
import { printColor } from "./utils.js";
import {
  DEFAULT_SOLUTION_OPTIONS,
  DEFAULT_SUBMIT_OPTIONS,
} from "./constants.js";

const prompt = async (question) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
};

const getNthSolution = async (solutions, n) => {
  const topicId = solutions[n].id;
  const res = await getSolutionById(topicId);
  return res.post;
};

function parseSolution(inputString) {
  const regex = /```(\w+)\s*\[\](.*?)```/gs;

  const matches = [...inputString.matchAll(regex)];
  const result = {};
  for (const match of matches) {
    const language = match[1];
    const code = match[2].trim();
    result[language.toLowerCase()] = code;
  }

  return result;
}

const extractCode = async (solutions, idx = 0, lang) => {
  if (idx >= solutions.length) return null;
  const solution = await getNthSolution(solutions, idx);
  const parsedSolution = parseSolution(solution.content);
  if (parsedSolution[lang]) return parsedSolution[lang];
  return extractCode(solutions, idx + 1, lang);
};

export async function login() {
  const csrf = await prompt(chalk.yellowBright("CSRF_TOKEN: "));
  const session = await prompt(chalk.yellowBright("LEETCODE_SESSION: "));
  await storeCookies(csrf, session);
  console.log(chalk.green("Cookies stored successfully"));
  console.log(chalk.green("You are now logged in"));
}

async function submitSolution(details, code, lang) {
  code = code.replace(/\\n/g, "\r\n");
  try {
    const data = JSON.stringify({
      lang,
      question_id: details.questionId,
      typed_code: code,
    });
    const res = await submitToLeetcode(details.titleSlug, data);
    if (res.status) {
      return res.data.submission_id;
    } else {
      throw new Error("Error submitting solution");
    }
  } catch (error) {
    console.log("(error) SUBMIT:", error.message);
    return null;
  }
}

export async function submit(options = DEFAULT_SUBMIT_OPTIONS) {
  const { slug, lang, file } = options;
  const details = await questionDetails(slug);
  const code = await fs.promises.readFile(file, "utf-8");
  const submissionId = await submitSolution(details, code, lang);
  return {
    status: !!submissionId,
    msg: submissionId
      ? `Submitted solution for ${slug}`
      : `Failed to submit solution for ${slug}`,
    data: {
      submissionId,
    },
  };
}

export async function solve({ slug, lang }) {
  const options = {
    ...DEFAULT_SOLUTION_OPTIONS,
    questionSlug: slug,
    languageTags: [lang],
  };

  const details = await questionDetails(slug);
  const solutions = await getAllSolutions(options);
  const code = await extractCode(solutions, 0, options.languageTags[0]);
  if (!code)
    return { status: false, msg: `Failed to extract code for ${slug}` };
  const submissionId = await submitSolution(details, code, lang);
  if (!submissionId) return false;
  printColor("green", `Submitted solution for ${slug}`);
  return !!submissionId;
}

export async function getSolution({ slug, lang }) {
  const options = {
    ...DEFAULT_SOLUTION_OPTIONS,
    questionSlug: slug,
    languageTags: [lang],
  };

  const solutions = await getAllSolutions(options);
  const code = await extractCode(solutions, 0, options.languageTags[0]);
  if (!code) {
    printColor("red", `Failed to extract code for ${slug}`);
    return false;
  }
  code.split("\\n").forEach((line) => printColor("yellow", line));
  return true;
}
