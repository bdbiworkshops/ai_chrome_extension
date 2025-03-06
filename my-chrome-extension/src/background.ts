import ollama from "ollama/browser";

console.log("✅ Background script loaded!");

// Adding a listener for messages sent from other parts of the extension (e.g., content scripts or popup scripts)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Checking if the message action is "fetchSummary"
  if (message.action === "fetchSummary") {
    console.log("🌐 Fetching summary from Ollama API...");

    // Calling the summarize function with the provided text and handling the response asynchronously
    summarize(message.text)
      .then((summary) => {
        console.log("✅ Summary received:", summary);
        sendResponse({ success: true, summary });
      })
      .catch((error) => {
        console.error("❌ Summarization failed:", error);
        sendResponse({ success: false, error: error.message });
      });

    // Returning true to keep the sendResponse function open for asynchronous handling
    return true;
  }
});

// Function to summarize text using the Ollama API
async function summarize(text: string): Promise<string> {
  // Creating a prompt for the Ollama API to generate a summary
  const prompt = `
    Please provide a concise and in-depth summary of the following text:
    
    "${text}"
    
    The summary should capture the main points and be easy to understand.
  `;

  try {
    // Sending a request to the Ollama API with the prompt and specifying the model to use
    const response = await ollama.chat({
      model: "llama3.2",
      messages: [{ role: "user", content: prompt }],
    });

    // Returning the content of the response message as the summary
    return response.message.content;
  } catch (error) {
    console.error("❌ Ollama API Error:", error);
    throw new Error("Failed to fetch summary.");
  }
}
