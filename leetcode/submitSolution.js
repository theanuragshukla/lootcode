import axios from "axios";
import { CSRF_TOKEN, LEETCODE_SESSION } from "./constants.js";
import { getCookies } from "./config.js";

export const submitToLeetcode = async (slug, data) => {
  const cookies = getCookies();
  if (!cookies) return { status: false, msg: "You are not logged in" };

  const { [CSRF_TOKEN]: csrftoken, [LEETCODE_SESSION]: session } = cookies;

  if (!csrftoken || !session)
    return { status: false, msg: "You are not logged in" };

  const headers = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/112.0",
    Accept: "*/*",
    "Accept-Language": "en-US,en;q=0.5",
    "Accept-Encoding": "gzip, deflate, br",
    Referer: `https://leetcode.com/problems/${slug}/description/`,
    "content-type": "application/json",
    "x-csrftoken": csrftoken,
    Origin: "https://leetcode.com",
    DNT: "1",
    Connection: "keep-alive",
    Cookie: `csrftoken=${csrftoken}; LEETCODE_SESSION=${session}`,
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    Pragma: "no-cache",
    "Cache-Control": "no-cache",
    TE: "trailers",
  };

  try {
    const response = await axios.post(
      `https://leetcode.com/problems/${slug}/submit/`,
      data,
      { headers }
    );
    return { status: true, msg: "solution submitted!", data: response.data };
  } catch (error) {
    return { status: false, msg: error.message };
  }
};
