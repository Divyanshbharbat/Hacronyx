// genini.js
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyC7JHcK8OuC4uXCugrtncSF_qdW3OiLykE');

async function generateProjectIdeas(concept, userLevel, domain) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
Generate 3 project ideas for the concept: "${concept}"
Audience: ${userLevel}
Domain: ${domain}
Each project should have a title, description, required tools, and steps.
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text().split('\n\n');
}

export default generateProjectIdeas;
