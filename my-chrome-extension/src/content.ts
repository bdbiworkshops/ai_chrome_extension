declare global {
  interface Window {
    hasRun?: boolean;
  }
}

console.log("✅ Content script loaded and waiting for messages!");

// Ensure only one instance runs
if (!window.hasRun) {
  window.hasRun = true;
  console.log("✅ Content script fully initialized.");

  chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
    console.log("📩 Message received in content script:", request);

    if (request.action === "scrapeAndSummarize") {
      const scrapedText = document.body.innerText.trim();

      if (!scrapedText) {
        console.warn("⚠️ No content found on this page.");
        sendResponse({ error: "No content found on this page." });
        return;
      }

      console.log("📝 Scraped content:", scrapedText.slice(0, 100) + "...");

      // Send text to background script for processing
      chrome.runtime.sendMessage(
        { action: "fetchSummary", text: scrapedText },
        (response) => {
          if (chrome.runtime.lastError) {
            console.error("❌ Runtime error:", chrome.runtime.lastError.message);
            sendResponse({ error: chrome.runtime.lastError.message });
          } else if (response?.error) {
            console.error("❌ Background script error:", response.error);
            sendResponse({ error: response.error });
          } else {
            console.log("✅ Summary received:", response.summary);
            sendResponse({ summary: response.summary });
          }
        }
      );

      return true; // Keeps sendResponse open for async handling
    }
  });
}
