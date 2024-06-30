import { GoogleGenerativeAI } from "@google/generative-ai";

const gemeniKey = import.meta.env.VITE_API_KEY;

const genAI = new GoogleGenerativeAI(gemeniKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function run(job, language) {
  const questionPrompt = `Generate a random technical interview question. The question should be relevant to ${job} and ${language} and can be a coding challenge or concpetual. Do not provide answers. And format it appropraitely in HTML tags as this is be inserted somewhere in my web application code and dont include "html" and the three quotes at the beginneing  because they are being rendered as well.`;

  const answerPrompt = (question) =>
    `Based on ${question}, provide the answer to the question. Ensure the answer is correct and detailed. And format it appropraitely in HTML tags as this is be inserted somewhere in my web application code and dont include "html" and the three quotes at the beginneing  because they are being rendered as well.`;

  const altAnswerPrompt = (question, answer) =>
    `Based on ${question} and ${answer}, generate an easier alternative answer. Provide a simplified version of the answer for better understanding.  And format it appropraitely in HTML tags as this is be inserted somewhere in my web application code and dont include "html" and the three quotes at the beginneing  because they are being rendered as well.`;

  const sideQuestionsPrompt = (question) =>
    `Based on ${question}, list side questions that can be asked by the interviewer. Include related questions that can help gauge the candidate's depth of knowledge.  And format it appropraitely in HTML tags as this is be inserted somewhere in my web application code and dont include "html" and the three quotes at the beginneing  because they are being rendered as well.`;

  const answersSideQuestionsPrompt = (sideQuestions) =>
    `Based on ${sideQuestions}, provide answers to each question. And format it appropraitely in HTML tags as this is be inserted somewhere in my web application code and dont include "html" and the three quotes at the beginneing  because they are being rendered as well.`;

  const question = await (
    await model.generateContent(questionPrompt)
  ).response.text();
  const answer = await (
    await model.generateContent(answerPrompt(question))
  ).response.text();
  const altAnswer = await (
    await model.generateContent(altAnswerPrompt(question, answer))
  ).response.text();
  const sideQuestions = await (
    await model.generateContent(sideQuestionsPrompt(question))
  ).response.text();
  const sideQuestionsAnswers = await (
    await model.generateContent(answersSideQuestionsPrompt(sideQuestions))
  ).response.text();

  return {
    question,
    answer,
    altAnswer,
    sideQuestions,
    sideQuestionsAnswers,
  };
}

export { run };
