import { GoogleGenerativeAI } from "@google/generative-ai";

const gemeniKey = import.meta.env.VITE_API_KEY;
const genAI = new GoogleGenerativeAI(gemeniKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function run(job, language) {
  const questionPrompt = `Generate a random technical interview question. The question should be relevant to ${job} and ${language} and can be a coding challenge or conceptual. Format the question appropriately using HTML tags.`;

  const answerPrompt = (question) =>
    `Based on the following question, provide a correct and detailed answer. Format the answer appropriately using HTML tags: ${question}`;

  const altAnswerPrompt = (question, answer) =>
    `Based on the following question and answer, generate a simpler alternative answer for better understanding. Format the answer appropriately using HTML tags: 
    Question: ${question}
    Answer: ${answer}`;

  const sideQuestionsPrompt = (question) =>
    `Based on the following question, list related side questions that can help gauge the candidate's depth of knowledge. Format the side questions appropriately using HTML tags: ${question}`;

  const answersSideQuestionsPrompt = (sideQuestions) =>
    `Based on the following side questions, provide detailed answers to each. Format the answers appropriately using HTML tags: ${sideQuestions}`;

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
