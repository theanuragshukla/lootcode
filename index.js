#!/usr/bin/env node
import { program } from "commander";

import { login, submit, solve, getSolution } from "./leetcode/index.js";
import {
  logout,
  getConfig,
  setDefaultFile,
  setLanguage,
  getLanguage,
  getDefaultFile,
} from "./leetcode/config.js";
import { printColor } from "./leetcode/utils.js";

async function main() {
  program.name("lc").description("CLI for LeetCode problems").version("0.0.1");

  /*  program
    .command("read")
    .description("read the problem")
    .argument("<slug>", "problem slug");
*/

  program
    .command("login")
    .description("login to leetcode")
    .action(async () => {
      await login();
    });

  program
    .command("logout")
    .description("logout from leetcode")
    .action(async () => {
      logout();
    });

  program
    .command("config")
    .description("configure the CLI")
    .option("-s, --show", "show the current configuration")
    .option("-l, --language <language>", "default language")
    .option("-f, --file <file>", "default file")
    .action(async ({ show, language, file }) => {
      if (language) {
        printColor("green", `Setting default language to ${language}\n`);
        setLanguage(language);
      }
      if (file) {
        printColor("green", `Setting default file to ${file}\n`);
        setDefaultFile(file);
      }
      if (show) {
        const config = getConfig();
        printColor("green", "Current configuration:");
        printColor("yellow", `Language: ${config.language}`);
        printColor("yellow", `Default file: ${config.defaultFile}`);
      }
    });

  program
    .command("submit")
    .description("submit the problem")
    .argument("<slug>", "problem slug")
    .option("-l, --language <language>", "language to submit", getLanguage())
    .requiredOption("-f, --file <file>", "file to submit", getDefaultFile())
    .action(async (slug, { language, file }) => {
      const res = await submit({ slug, lang: language, file });
      printColor(res.status ? "green" : "red", res.msg);
    });

  program
    .command("solution")
    .description("get the solution")
    .argument("<slug>", "problem slug")
    .option("-l, --language <language>", "language to submit", getLanguage())
    .action(async (slug, { language }) => {
      getSolution({ slug, lang: language });
    });

  program
    .command("please")
    .description("Please solve and submit the problem")
    .argument("<slug>", "problem slug")
    .option("-l, --language <language>", "language to submit", getLanguage())
    .action(async (slug, { language }) => {
      solve({ slug, lang: language });
    });

  program.parse(process.argv);
}

main();
