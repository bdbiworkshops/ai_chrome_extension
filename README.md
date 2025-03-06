# ai_chrome_extension
AI Webpage Summarizer as a Chrome Extension

## Presentation
[Link to Presentation](https://www.canva.com/design/DAGg5AgWDQw/f2umo6CYbHoOzAlTwJ7YQQ/view?utm_content=DAGg5AgWDQw&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hb8134b4735)

Covers the following:
- Overview of Chrome Extension Development Workflow
- Chrome Extension Development vs Web Development
- React + Vite Tech Stack
- Manifest.json
- Content + Background Scripts
- Ollama Setup

## Getting Started

### Prerequisites
- Node.js and npm installed
- Google Chrome browser

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/bdbiworkshops/ai_chrome_extension.git
    ```
2. Navigate to the project directory:
    ```bash
    cd ai_chrome_extension
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```

### Building for Production
1. Build the project:
    ```bash
    npm run build
    ```
2. The production-ready files will be in the `dist` folder.

### Running Ollama Server (Llama 3.2)
Ensure you have installed all dependencies including ollama!

```bash
    ollama run llama3.2
```

Check out the list of models on their website ([ollama.com](http://ollama.com)) or GitHub!


### Development
1. Open the Chrome browser and navigate to `chrome://extensions/`.
2. Enable "Developer mode" by toggling the switch in the top right corner.
3. Click on "Load unpacked" and select the `dist` folder from your project directory.
4. If you need to update the extension, rebuild the project files, select "Update"
5. Also, it does not hurt to reload the extension!

### Usage
- Navigate to any webpage and click on the extension icon to summarize the content.

### Debugging Advice
Right click on the extension button and select "Inspect Popup". 
Add console logs into the code to follow along with the execution.
View any errors in the inspection log console. 