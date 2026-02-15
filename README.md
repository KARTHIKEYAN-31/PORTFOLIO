# AI/ML Portfolio - Karthikeyan P

Welcome to the digital portfolio of **Karthikeyan P**, a Senior AI/ML Computational Science Analyst. This website showcases expertise in **GenAI**, **Agentic RAG**, **Multi-Agent Systems**, and **Cloud Architecture** through a futuristic, dark-themed glassmorphism interface.

## 🚀 Features

-   **Cyberpunk/Sci-Fi Aesthetic**: Neon accents, glass cards, and dynamic hover effects.
-   **Terminal Mode (Hacker Theme)**: Toggle the "Terminal" icon to switch the entire site, including charts, to a Matrix-green, monospace developer aesthetic.
-   **Interactive Visual Analytics**:
    -   **Skills Radar Chart**: Plotly-powered visualization comparing personal proficiency vs. industry average. Syncs with Hacker Mode.
    -   **Academic Gauge Tiles**: Angular gauges displaying academic performance (B.Tech, 12th, 10th). Syncs with Hacker Mode.
-   **AI Digital Twin Chatbot**:
    -   A floating chatbot powered by **Google Gemini**.
    -   **Glassmorphism UI**: Redesigned with a sleek, frosted glass look.
    -   **Voice Interaction**: Supports Speech-to-Text and Text-to-Speech.
    -   **Secure BYOK**: API keys are stored in `localStorage` and never transmitted to a backend.
    -   **Simulation Mode**: Type `dummyapi` to test the UI without a real key.
-   **3D Elements**:
    -   **Skills Universe**: A rotating 3D globe visualization of technical skills using HTML5 Canvas.
    -   **Particle Effects**: Interactive background particles responding to mouse movement.
-   **Responsive Design**: Fully optimized for Desktop, Tablet, and Mobile.

## 🛠️ Tech Stack

-   **Frontend**: HTML5, CSS3 (Variables, Flexbox, Grid), Vanilla JavaScript.
-   **Visualizations**: Plotly.js (CDN).
-   **Icons**: FontAwesome 6 (CDN).
-   **Fonts**: Space Grotesk (Headings), Inter (Body), Orbitron (3D Text), Courier New (Hacker Mode).

## 📂 Project Structure

```
profile/
├── index.html      # Main structure and content
├── style.css       # All styles (Hero, About, Skills, Chatbot, Hacker Mode)
├── script.js       # Logic for Charts, Chatbot, Theme Toggle, and Animations
├── ai-ui.js        # UI Effects (Cursor, Particles, Typing)
├── skills-3d.js    # 3D Globe Visualization logic
├── particles.js    # Background particle animation
├── README.md       # Project documentation
└── utils/          # Assets (Profile photo, etc.)
```

## ⚙️ Setup & Usage

1.  **Clone/Download**: Download the project folder.
2.  **Open**: Double-click `index.html` to open it in any modern browser.
3.  **Chatbot Configuration**:
    -   **Secure Setup**: The project uses a `env.js` file (gitignored) to store the API key securely locally.
    -   **Manual Entry**: You can also type your key directly in the chat window, where it will be saved to your browser's LocalStorage.
    -   To clear any saved keys, type `!clear`.

## 🤖 Chatbot Commands

-   `dummyapi`: Activates simulation mode (mock responses).
-   `!clear`: Removes the saved API key from your browser.
-   `!hack`: Toggles the Hacker Mode (same as clicking the terminal icon).

## 🎨 Customization

-   **Theme**: Edit `:root` variables in `style.css` to change colors (`--accent-cyan`, `--accent-purple`).
-   **Data**: Update `script.js` to modify Chart data or System Prompt details.

---
*Built with ❤️ and ☕ by Karthikeyan P*
