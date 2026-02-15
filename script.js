document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor Glow Effect
    const cursorGlow = document.getElementById('cursor-glow');

    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;

        cursorGlow.style.transform = `translate(${x}px, ${y}px)`;
        cursorGlow.style.transform = `translate(${x}px, ${y}px)`;
    });

    // Scroll Progress Bar
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollTop / scrollHeight) * 100;
        document.getElementById('scroll-progress').style.width = scrolled + '%';
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '80px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(10, 10, 15, 0.95)';
                navLinks.style.padding = '2rem';
                navLinks.style.textAlign = 'center';
            }
        });
    }

    // Scroll Down Arrow Click
    const scrollDown = document.querySelector('.scroll-down');
    if (scrollDown) {
        scrollDown.addEventListener('click', () => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // --- 3D Tilt Effect ---
    const tiltElements = document.querySelectorAll('.project-card, .edu-card');

    if (tiltElements.length > 0) {
        tiltElements.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -10; // Max rotation deg
                const rotateY = ((x - centerX) / centerX) * 10;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });
        });
    }

    // Scroll Animation Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.1
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    // Plotly Charts

    // Skills Radar Chart
    const skillsData = [
        {
            type: 'scatterpolar',
            r: [98, 95, 90, 85, 92, 80, 98],
            theta: ['GenAI & Agents', 'Python & Backend', 'RAG Systems', 'Cloud (AWS/Azure)', 'Vector DBs', 'System Design', 'GenAI & Agents'],
            fill: 'toself',
            name: 'Me',
            marker: { color: '#00f3ff' },
            line: { color: '#00f3ff' },
            fillcolor: 'rgba(0, 243, 255, 0.2)'
        },
        {
            type: 'scatterpolar',
            r: [60, 70, 50, 65, 55, 60, 60],
            theta: ['GenAI & Agents', 'Python & Backend', 'RAG Systems', 'Cloud (AWS/Azure)', 'Vector DBs', 'System Design', 'GenAI & Agents'],
            fill: 'toself',
            name: 'Avg. Dev',
            marker: { color: '#ffffff' },
            line: { color: '#ffffff', dash: 'dot' },
            fillcolor: 'rgba(255, 255, 255, 0.05)',
            opacity: 0.6
        }
    ];

    const skillsLayout = {
        polar: {
            bgcolor: 'rgba(0,0,0,0)',
            radialaxis: {
                visible: true,
                range: [0, 100],
                showticklabels: false,
                linecolor: 'rgba(255, 255, 255, 0.1)',
                gridcolor: 'rgba(255, 255, 255, 0.1)'
            },
            angularaxis: {
                tickfont: {
                    size: 12,
                    color: '#ffffff',
                    family: 'Space Grotesk'
                },
                gridcolor: 'rgba(255, 255, 255, 0.1)',
                linecolor: 'rgba(255, 255, 255, 0.1)'
            }
        },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        font: {
            family: 'Inter, sans-serif',
            color: '#a0a0b0'
        },
        showlegend: true,
        legend: {
            font: { family: 'Inter, sans-serif', color: '#fff' },
            orientation: 'h',
            y: -0.1
        },
        margin: { t: 40, b: 40, l: 40, r: 40 }
    };

    // Check if element exists before plotting
    if (document.getElementById('skillsChart')) {
        Plotly.newPlot('skillsChart', skillsData, skillsLayout, { displayModeBar: false, responsive: true });
    }

    // Education Indicator Charts (Numeric Tiles)
    const eduData = [
        {
            type: "indicator",
            mode: "number+gauge",
            value: 8.5,
            title: { text: "B.Tech (CGPA)", font: { size: 18, color: "#00f3ff", family: "Space Grotesk" } },
            number: { suffix: "/10", font: { size: 40, color: "white" } },
            gauge: {
                shape: "angular",
                bar: { color: "#bc13fe" },
                bgcolor: "rgba(255,255,255,0.05)",
                bordercolor: "rgba(255,255,255,0.1)",
                axis: { range: [0, 10], visible: false }
            },
            domain: { x: [0, 0.30], y: [0, 1] }
        },
        {
            type: "indicator",
            mode: "number+gauge",
            value: 74,
            title: { text: "12th Grade", font: { size: 18, color: "#00f3ff", family: "Space Grotesk" } },
            number: { suffix: "%", font: { size: 40, color: "white" } },
            gauge: {
                shape: "angular",
                bar: { color: "#00f3ff" },
                bgcolor: "rgba(255,255,255,0.05)",
                bordercolor: "rgba(255,255,255,0.1)",
                axis: { range: [0, 100], visible: false }
            },
            domain: { x: [0.35, 0.65], y: [0, 1] }
        },
        {
            type: "indicator",
            mode: "number+gauge",
            value: 98,
            title: { text: "10th Grade", font: { size: 18, color: "#00f3ff", family: "Space Grotesk" } },
            number: { suffix: "%", font: { size: 40, color: "white" } },
            gauge: {
                shape: "angular",
                bar: { color: "#bc13fe" },
                bgcolor: "rgba(255,255,255,0.05)",
                bordercolor: "rgba(255,255,255,0.1)",
                axis: { range: [0, 100], visible: false }
            },
            domain: { x: [0.70, 1], y: [0, 1] }
        }
    ];

    const eduLayout = {
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        font: { family: 'Inter, sans-serif', color: '#ffffff' },
        margin: { t: 30, b: 30, l: 30, r: 30 },
        grid: { rows: 1, columns: 3, pattern: "independent" }
    };

    if (document.getElementById('eduChart')) {
        Plotly.newPlot('eduChart', eduData, eduLayout, { displayModeBar: false, responsive: true });
    }

    // --- Chatbot Logic ---
    const chatToggle = document.getElementById('chat-toggle');
    const chatWindow = document.getElementById('chat-window');
    const closeChat = document.getElementById('close-chat');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const chatMessages = document.getElementById('chat-messages');

    // Load API Key from env.js (CONFIG) or LocalStorage
    let GEMINI_API_KEY = "";

    if (typeof CONFIG !== 'undefined' && CONFIG.GEMINI_API_KEY) {
        GEMINI_API_KEY = CONFIG.GEMINI_API_KEY;
    } else {
        GEMINI_API_KEY = localStorage.getItem('GEMINI_API_KEY') || "";
    }

    // System Prompt - The Persona
    const SYSTEM_PROMPT = `
    You are the AI Digital Twin of Karthikeyan P, a Senior AI/ML Computational Science Analyst at Accenture. 
    Act as him: professional, knowledgeable, yet approachable.
    
    Key Profile Details:
    - **Current Role**: Sr. Analyst at Accenture (GenAI, LLM).
    - **Experience**: 4+ years in AI/ML, Agentic RAG, Multi-Agent Systems.
    - **Tech Stack**: LangGraph, AWS Bedrock, Vertex AI, Google ADK, Agent Space, GCP, Python, PostgreSQL (pgvector), Redis, Plotly.
    - **Projects**: Enterprise Agentic RAG Platform, AI Research Analyst, Coding Co-Pilot.
    - **Education**: B.Tech in CS (8.5/10) from Anna University. 12th Grade: 74%.
    - **Style**: Answer concisely. Use technical terms correctly. Be enthusiastic about AI agents.
    
    If asked about contact info, provide: pnkgkarthikeyanlol@gmail.com, LinkedIn, or GitHub.
    If asked a generic question, steer it back to AI or Karthikeyan's expertise.
    `;

    // Toggle Chat
    if (chatToggle) {
        chatToggle.addEventListener('click', () => {
            chatWindow.classList.toggle('hidden');
            if (!chatWindow.classList.contains('hidden')) {
                if (!GEMINI_API_KEY) {
                    appendMessage('bot', "Hello! To enable my AI brain, please enter your Google Gemini API Key. (It will be saved securely in your browser's local storage).");
                    appendMessage('bot', "If you just want to test, type 'dummyapi' to enter simulation mode.");
                } else if (GEMINI_API_KEY === 'dummyapi') {
                    appendMessage('bot', "Simulation Mode Active. I'm ready to chat (Mock Response).");
                }
            }
            userInput.focus();
        });
    }

    if (closeChat) {
        closeChat.addEventListener('click', () => {
            chatWindow.classList.add('hidden');
        });
    }

    // Send Message Handling
    function handleSend() {
        const message = userInput.value.trim();
        if (!message) return;

        // Command: Clear Key
        if (message.toLowerCase() === '!clear') {
            localStorage.removeItem('GEMINI_API_KEY');
            GEMINI_API_KEY = "";
            appendMessage('user', message);
            appendMessage('bot', "API Key cleared from secure storage.");
            userInput.value = '';
            return;
        }

        // Check for API Key input first
        if (!GEMINI_API_KEY) {
            if (message.startsWith('AI') || message === 'dummyapi') {
                GEMINI_API_KEY = message;
                localStorage.setItem('GEMINI_API_KEY', message);
                appendMessage('user', '********');
                appendMessage('bot', "Key saved securely! I'm ready. How can I help you?");
                userInput.value = '';
                return;
            } else {
                appendMessage('user', message);
                appendMessage('bot', "Please enter a valid Gemini API Key (starts with 'AI...') or type 'dummyapi'.");
                userInput.value = '';
                return;
            }
        }

        appendMessage('user', message);
        userInput.value = '';

        // Call Gemini API (Handles UI updates internally now)
        callGemini(message);
    }

    if (sendBtn) {
        sendBtn.addEventListener('click', handleSend);
    }
    if (userInput) {
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSend();
        });
    }

    function appendMessage(sender, text) {
        const div = document.createElement('div');
        div.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');
        div.textContent = text;
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function showTyping() {
        const id = 'typing-' + Date.now();
        const div = document.createElement('div');
        div.id = id;
        div.classList.add('message', 'bot-message', 'typing-indicator');
        div.innerHTML = '<span></span><span></span><span></span>';
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return id;
    }

    function removeTyping(id) {
        const el = document.getElementById(id);
        if (el) el.remove();
    }

    // --- Hacker Mode Toggle ---
    const themeBtn = document.getElementById('theme-hack');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('hacker-mode');
            const isHacker = document.body.classList.contains('hacker-mode');

            // 1. Neural Canvas Filter
            const canvas = document.getElementById('neural-canvas');
            if (canvas) {
                canvas.style.filter = isHacker ? 'hue-rotate(120deg) brightness(1.5)' : 'none';
            }

            // 2. Skills Chart Update
            const skillsChart = document.getElementById('skillsChart');
            if (skillsChart) {
                const updateLayout = {
                    'polar.angularaxis.tickfont.family': isHacker ? 'Courier New, monospace' : 'Space Grotesk',
                    'polar.angularaxis.tickfont.color': isHacker ? '#00ff00' : '#ffffff',
                    'polar.radialaxis.linecolor': isHacker ? '#00ff00' : 'rgba(255, 255, 255, 0.1)',
                    'polar.radialaxis.gridcolor': isHacker ? 'rgba(0, 255, 0, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                    'polar.angularaxis.gridcolor': isHacker ? 'rgba(0, 255, 0, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                    'legend.font.family': isHacker ? 'Courier New, monospace' : 'Inter, sans-serif',
                    'legend.font.color': isHacker ? '#00ff00' : '#fff'
                };
                Plotly.relayout(skillsChart, updateLayout);

                const updateData = {
                    'marker.color': isHacker ? ['#00ff00', '#003300'] : ['#00f3ff', '#ffffff'],
                    'line.color': isHacker ? ['#00ff00', '#003300'] : ['#00f3ff', '#ffffff'],
                    'fillcolor': isHacker ? ['rgba(0, 255, 0, 0.2)', 'rgba(0, 50, 0, 0.2)'] : ['rgba(0, 243, 255, 0.2)', 'rgba(255, 255, 255, 0.05)']
                };
                Plotly.restyle(skillsChart, updateData);
            }

            // 3. Edu Chart Update
            const eduChart = document.getElementById('eduChart');
            if (eduChart) {
                const updateLayout = {
                    'font.family': isHacker ? 'Courier New, monospace' : 'Inter, sans-serif',
                    'font.color': isHacker ? '#00ff00' : '#ffffff'
                };
                Plotly.relayout(eduChart, updateLayout);

                if (isHacker) {
                    Plotly.restyle(eduChart, {
                        'title.font.family': 'Courier New, monospace',
                        'title.font.color': '#00ff00',
                        'number.font.color': '#00ff00',
                        'gauge.bar.color': '#00ff00',
                        'gauge.bordercolor': '#00ff00'
                    });
                } else {
                    // Restore Fonts & Colors
                    Plotly.restyle(eduChart, {
                        'title.font.family': 'Space Grotesk',
                        'title.font.color': '#00f3ff',
                        'number.font.color': 'white',
                        'gauge.bordercolor': 'rgba(255,255,255,0.1)'
                    });
                    // Restore specific bar colors
                    Plotly.restyle(eduChart, { 'gauge.bar.color': '#bc13fe' }, [0, 2]);
                    Plotly.restyle(eduChart, { 'gauge.bar.color': '#00f3ff' }, [1]);
                }
            }
        });
    }

    // --- Voice Interaction (STT & TTS) ---
    const micBtn = document.getElementById('mic-btn');
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition;

    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.lang = 'en-US';
        recognition.interimResults = false;

        recognition.onstart = () => {
            micBtn.classList.add('listening');
        };

        recognition.onend = () => {
            micBtn.classList.remove('listening');
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            userInput.value = transcript;
            handleSend();
        };

        if (micBtn) {
            micBtn.addEventListener('click', () => {
                recognition.start();
            });
        }
    } else {
        if (micBtn) micBtn.style.display = 'none'; // Hide if not supported
    }

    // --- Sentiment Analysis ---
    userInput.addEventListener('input', (e) => {
        const text = e.target.value.toLowerCase();
        const positive = ['good', 'great', 'awesome', 'thanks', 'cool', 'love', 'perfect'];
        const negative = ['bad', 'wrong', 'error', 'bug', 'fail', 'hate', 'stupid'];

        if (positive.some(w => text.includes(w))) {
            userInput.style.borderColor = '#00ff00';
            userInput.style.boxShadow = '0 0 15px rgba(0, 255, 0, 0.3)';
        } else if (negative.some(w => text.includes(w))) {
            userInput.style.borderColor = '#ff0000';
            userInput.style.boxShadow = '0 0 15px rgba(255, 0, 0, 0.3)';
        } else {
            userInput.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            userInput.style.boxShadow = 'none';
        }
    });

    // --- Smart Message Formatting (Markdown -> HTML) ---
    function formatMessage(text) {
        // Bold
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        // Code Blocks
        text = text.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>');
        // Inline Code
        text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
        // Newlines to Br
        text = text.replace(/\n/g, '<br>');
        return text;
    }

    function showThinking() {
        const id = 'thinking-' + Date.now();
        const div = document.createElement('div');
        div.id = id;
        div.classList.add('message', 'bot-message', 'thinking-indicator');
        div.innerHTML = '<i class="fas fa-brain fa-pulse"></i> <span id="think-text">Initializing...</span>';
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return id;
    }

    function updateThinking(id, text) {
        const el = document.getElementById(id);
        if (el) {
            const span = el.querySelector('#think-text');
            if (span) span.textContent = text;
        }
    }

    function removeThinking(id) {
        const el = document.getElementById(id);
        if (el) el.remove();
    }

    function speak(text) {
        if (!window.speechSynthesis) return;

        // Cancel current speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.pitch = 1;
        utterance.rate = 1;

        // Choose a futuristic voice if available
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(voice => voice.name.includes('Google US English') || voice.name.includes('Microsoft David'));
        if (preferredVoice) utterance.voice = preferredVoice;

        window.speechSynthesis.speak(utterance);
    }

    async function callGemini(prompt) {
        // Show Thinking Indicator
        const thinkingId = showThinking();
        const thoughts = ["Analyzing Intent...", "Retrieving Context...", "Generating Response..."];

        // Simulate CoT
        for (let i = 0; i < thoughts.length; i++) {
            updateThinking(thinkingId, thoughts[i]);
            await new Promise(r => setTimeout(r, 600));
        }

        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
        const payload = {
            contents: [{
                parts: [
                    { text: SYSTEM_PROMPT },
                    { text: "User: " + prompt },
                    { text: "Model:" }
                ]
            }]
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            if (data.error) throw new Error(data.error.message);
            const botResponse = data.candidates[0].content.parts[0].text;

            removeThinking(thinkingId);
            appendMessage('bot', botResponse);
            speak(botResponse);

            return botResponse;
        } catch (error) {
            console.error(error);
            removeThinking(thinkingId);
            appendMessage('bot', "Error: " + error.message);
            return "Error";
        }
    }

    function appendMessage(sender, text) {
        const div = document.createElement('div');
        div.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');

        // Format if bot
        if (sender === 'bot') {
            div.innerHTML = formatMessage(text);
        } else {
            div.textContent = text;
        }

        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});
