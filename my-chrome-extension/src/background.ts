import ollama from "ollama/browser";

console.log("✅ Background script loaded!");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "fetchSummary") {
    console.log("🌐 Fetching summary from Ollama API...");

    summarize(message.text)
      .then((summary) => {
        console.log("✅ Summary received:", summary);
        sendResponse({ success: true, summary });
      })
      .catch((error) => {
        console.error("❌ Summarization failed:", error);
        sendResponse({ success: false, error: error.message });
      });

    return true; // Keeps sendResponse open for async handling
  }
});

// Function to summarize text using Ollama
async function summarize(text: string): Promise<string> {
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
