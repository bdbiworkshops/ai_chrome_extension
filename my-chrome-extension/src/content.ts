// Declare a global interface to add a custom property to the window object
declare global {
  interface Window {
    hasRun?: boolean;
  }
}

console.log("✅ Content script loaded and waiting for messages!");

// Ensure only one instance of the content script runs
if (!window.hasRun) {
  window.hasRun = true;
  console.log("✅ Content script fully initialized.");

  // Listen for messages from the popup or background script
  // sender has an _ because it is not used
  chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
    console.log("📩 Message received in content script:", request);

    // Check if the message action is "scrapeAndSummarize"
    if (request.action === "scrapeAndSummarize") {
      // Extract the main content from the webpage
      const scrapedText = document.body.innerText.trim();

      // Check if any content was found
      if (!scrapedText) {
        console.warn("⚠️ No content found on this page.");
        sendResponse({ error: "No content found on this page." });
        return;
      }

      console.log("📝 Scraped content:", scrapedText.slice(0, 100) + "...");

      // Send the scraped text to the background script for processing
      // action: "fetchSummary" is the message action for the background script
      chrome.runtime.sendMessage(
        { action: "fetchSummary", text: scrapedText },
        (response) => {
          // Handle any runtime errors
          if (chrome.runtime.lastError) {
            console.error("❌ Runtime error:", chrome.runtime.lastError.message);
            sendResponse({ error: chrome.runtime.lastError.message });
          } else if (response?.error) {
            // Handle any errors from the background script
            console.error("❌ Background script error:", response.error);
            sendResponse({ error: response.error });
          } else {
            // Successfully received the summary from the background script
            console.log("✅ Summary received:", response.summary);
            sendResponse({ summary: response.summary });
          }
        }
      );

      return true; // Keeps sendResponse open for async handling
    }
  });
}
