import chalk from "chalk";

export const printColor = (color, msg) => {
  console.log(chalk[color](msg));
};

