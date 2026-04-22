import { Ollama } from "ollama";

const client = new Ollama({
  host: process.env.OLLAMA_BASE_URL ?? "http://localhost:11434",
});

const OLLAMA_MODEL = process.env.OLLAMA_MODEL ?? "llama3.1:8b";

export async function callOllama(prompt: string): Promise<string> {
  const response = await client.generate({
    model: OLLAMA_MODEL,
    prompt,
    stream: false,
    options: {
      temperature: 0.3,
      num_predict: 2048,
    },
  });
  return response.response;
}