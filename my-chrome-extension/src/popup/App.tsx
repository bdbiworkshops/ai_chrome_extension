import React, { useState, CSSProperties } from "react";
import ReactMarkdown from "react-markdown";

const App: React.FC = () => {
  const [summary, setSummary] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleScrapeAndSummarize = () => {
    setLoading(true);
    setError(null);
    setSummary(null);

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs[0]?.id) {
        setError("No active tab found.");
        setLoading(false);
        return;
      }

      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          files: ["content.js"],
        },
        () => {
          console.log("✅ Content script injected!");

          chrome.tabs.sendMessage(
            tabs[0].id!,
            { action: "scrapeAndSummarize" },
            (response) => {
              setLoading(false);

              if (chrome.runtime.lastError) {
                console.error("❌ Chrome runtime error:", chrome.runtime.lastError.message);
                setError(chrome.runtime.lastError.message || "An unknown error occurred.");
              } else if (response?.error) {
                console.error("❌ Content script error:", response.error);
                setError(response.error);
              } else {
                console.log("✅ Summary received:", response.summary);
                setSummary(response.summary);
              }
            }
          );
        }
      );
    });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Web Scraper Summarizer</h1>
      <button onClick={handleScrapeAndSummarize} style={styles.button} disabled={loading}>
        {loading ? "Summarizing..." : "Scrape and Summarize"}
      </button>

      {loading && <p style={styles.loading}>⏳ Summarizing, please wait...</p>}

      {error && <p style={styles.error}>❌ {error}</p>}

      {summary && (
        <div style={styles.summaryBox}>
          <h2 style={styles.summaryHeader}>📄 Summary</h2>
          <div style={styles.markdown}>
            <ReactMarkdown>{summary}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};



const styles: { [key: string]: CSSProperties } = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    maxWidth: "400px",
  },
  header: {
    fontSize: "20px",
    marginBottom: "10px",
    textAlign: "center",
  },
  button: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
  },
  loading: {
    textAlign: "center",
    color: "#007bff",
    fontWeight: "bold",
  },
  error: {
    textAlign: "center",
    color: "red",
    fontWeight: "bold",
  },
  summaryBox: {
    marginTop: "15px",
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "#f8f9fa",
    border: "1px solid #ccc",
  },
  summaryHeader: {
    fontSize: "18px",
    marginBottom: "10px",
  },
  markdown: {
    lineHeight: "1.6",
  },
};

export default App;
