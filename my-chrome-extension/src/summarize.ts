import ollama from "ollama/browser";

export async function summarize(text: string): Promise<string> {
  const prompt = `
    Please provide a concise and in-depth summary of the following text:
    
    "${text}"
    
    The summary should capture the main points and be easy to understand.
  `;

  try {
    const response = await ollama.chat({
      model: "llama3.2",
      messages: [{ role: "user", content: prompt }],
    });

    return response.message.content;
  } catch (error) {
    console.error("❌ Ollama API Error:", error);
    throw new Error("Failed to fetch summary.");
  }
}
