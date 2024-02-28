import { slug2IdQuery, solutionByIdQuery, solutionQuery } from "./schemas.js";
import { DEFAULT_SOLUTION_OPTIONS } from "./constants.js";

const queryLeetcode = async (query, variables) => {
  const res = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Referer: "https://leetcode.com",
    },
    body: JSON.stringify({ query, variables }),
  });
  const data = await res.json();
  try {
    if (data.errors) {
      return data;
    } else {
      return data.data;
    }
  } catch (err) {
    console.log("Error", err);
    return null;
  }
};

export const getAllSolutions = async (args = DEFAULT_SOLUTION_OPTIONS) => {
  const res = await queryLeetcode(solutionQuery, args);
  if (res.errors) {
    console.log(res.errors[0].message);
    return null;
  }
  return res.questionSolutions.solutions;
};

export const questionDetails = async (slug) => {
  const res = await queryLeetcode(slug2IdQuery, { titleSlug: slug });
  console.log(res);
  return res.question;
};

export const getSolutionById = async (id) => {
  const res = await queryLeetcode(solutionByIdQuery, { topicId: id });
  return res.topic;
};
