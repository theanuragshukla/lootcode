import Conf from "conf";

import {
  CSRF_TOKEN,
  DEFAULT_FILE,
  DEFAULT_LANG,
  LEETCODE_SESSION,
  PROJECT_NAME,
} from "./constants.js";

export const config = new Conf({
  projectName: PROJECT_NAME,
  schema: {
    language: {
      type: "string",
      default: DEFAULT_LANG,
    },
    defaultFile: {
      type: "string",
      default: DEFAULT_FILE,
    },
    cookies: {
      type: "object",
      properties: {
        [CSRF_TOKEN]: { type: "string", default: "" },
        [LEETCODE_SESSION]: { type: "string", default: "" },
      },
    },
  },
});

export const getConfig = () => {
  return config.store;
};

export const logout = () => {
  config.clear();
  console.log(chalk.green("You are now logged out"));
};

export async function storeCookies(csrftoken, session) {
  config.set("cookies", {
    [CSRF_TOKEN]: csrftoken,
    [LEETCODE_SESSION]: session,
  });
}

export function getCookies() {
  const cookies = config.get("cookies");
  return cookies;
}

export const setLanguage = (lang) => {
  config.set("language", lang);
};
export const getLanguage = () => {
  return config.get("language");
};

export const setDefaultFile = (file) => {
  config.set("defaultFile", file);
};
export const getDefaultFile = () => {
  return config.get("defaultFile");
};
