document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Data Stream Cursor ---
    const body = document.body;
    let lastPos = { x: 0, y: 0 };

    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.7) { // Don't trigger on every frame
            const binary = Math.random() > 0.5 ? '1' : '0';
            const span = document.createElement('span');
            span.textContent = binary;
            span.className = 'cursor-trail';
            span.style.left = e.pageX + 'px';
            span.style.top = e.pageY + 'px';
            span.style.color = Math.random() > 0.5 ? '#00f3ff' : '#bc13fe';
            body.appendChild(span);

            setTimeout(() => {
                span.remove();
            }, 1000);
        }

        // --- 5. System Monitor (CPU = Mouse Speed) ---
        const dx = e.clientX - lastPos.x;
        const dy = e.clientY - lastPos.y;
        const speed = Math.sqrt(dx * dx + dy * dy);
        updateSystemMonitor(speed);
        lastPos = { x: e.clientX, y: e.clientY };
    });

    // --- 2. Text Decoding Effect (DISABLED) ---
    // const decryptElements = document.querySelectorAll('.section-title, .hero-text h1, .subtitle');

    // const decryptOptions = {
    //     threshold: 0.5
    // };

    // const decryptObserver = new IntersectionObserver((entries, observer) => {
    //     entries.forEach(entry => {
    //         if (entry.isIntersecting) {
    //             scrambleText(entry.target);
    //             // observer.unobserve(entry.target); 
    //         }
    //     });
    // }, decryptOptions);

    // decryptElements.forEach(el => {
    //     if (!el.dataset.original) {
    //         el.dataset.original = el.innerText;
    //     }
    //     decryptObserver.observe(el);
    // });

    // function scrambleText(element) {
    //     const originalText = element.dataset.original || element.innerText;
    //     const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%^&*";
    //     let iterations = 0;

    //     const interval = setInterval(() => {
    //         element.innerText = originalText
    //             .split("")
    //             .map((letter, index) => {
    //                 if (index < iterations) {
    //                     return originalText[index];
    //                 }
    //                 return chars[Math.floor(Math.random() * chars.length)];
    //             })
    //             .join("");

    //         if (iterations >= originalText.length) {
    //             clearInterval(interval);
    //         }
    //         iterations += 1 / 3;
    //     }, 30);
    // }

    // --- 4. Floating Syntax Background ---
    const syntaxContainer = document.createElement('div');
    syntaxContainer.className = 'syntax-bg';
    document.body.prepend(syntaxContainer);

    const codeSymbols = ['{', '}', ';', '</>', '[]', 'func', 'var', 'if', '=>'];

    for (let i = 0; i < 30; i++) {
        const symbol = document.createElement('div');
        symbol.textContent = codeSymbols[Math.floor(Math.random() * codeSymbols.length)];
        symbol.className = 'floating-symbol';
        symbol.style.left = Math.random() * 100 + 'vw';
        symbol.style.top = Math.random() * 100 + 'vh';
        symbol.style.animationDuration = (Math.random() * 10 + 10) + 's';
        symbol.style.animationDelay = (Math.random() * 5) + 's';
        syntaxContainer.appendChild(symbol);
    }

    // --- 5. System Monitor (REMOVED) ---
    // const monitor = document.createElement('div'); ... (Deleted)
    // function updateSystemMonitor(mouseSpeed) { ... } (Deleted)
    // window.addEventListener('scroll', () => { ... }); (Deleted)

    // --- 6. Neural Synapse Cursor ---
    const canvas = document.createElement('canvas');
    canvas.id = 'synapse-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9998'; // Below cursor trail
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let width, height;

    function resizeSynapse() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeSynapse);
    resizeSynapse();

    // Track clickable elements
    let clickables = [];
    function updateClickables() {
        const elements = document.querySelectorAll('button, a, input, .project-card, .skill-category');
        clickables = Array.from(elements).map(el => {
            const rect = el.getBoundingClientRect();
            return {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2,
                radius: Math.max(rect.width, rect.height) / 2
            };
        });
    }
    window.addEventListener('scroll', updateClickables); // Update on scroll
    setTimeout(updateClickables, 1000); // Initial delay

    let mouse = { x: -100, y: -100 };
    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    function animateSynapse() {
        ctx.clearRect(0, 0, width, height);

        ctx.strokeStyle = 'rgba(0, 243, 255, 0.3)';
        ctx.lineWidth = 1;
        ctx.beginPath();

        clickables.forEach(point => {
            const dist = Math.hypot(point.x - mouse.x, point.y - mouse.y);
            if (dist < 150) {
                ctx.moveTo(mouse.x, mouse.y);
                ctx.lineTo(point.x, point.y);
            }
        });

        ctx.stroke();
        requestAnimationFrame(animateSynapse);
    }
    animateSynapse();

    // --- 7. Predictive Ghost Text ---
    const chatInput = document.getElementById('user-input');
    const ghostText = document.createElement('div');
    ghostText.id = 'ghost-text';
    if (chatInput) {
        chatInput.parentElement.appendChild(ghostText);

        const predictions = [
            "What is your tech stack?", "Show me your projects.", "Contact info?",
            "Tell me a joke.", "How does this AI work?", "Download Resume"
        ];

        chatInput.addEventListener('input', (e) => {
            const val = e.target.value.toLowerCase();
            if (!val) {
                ghostText.textContent = "";
                return;
            }
            const match = predictions.find(p => p.toLowerCase().startsWith(val));
            if (match) {
                const remaining = match.slice(val.length);
                // Create a "ghost" visual overlaid 
                // Simple version: just show in console or specific UI, 
                // but for overlay we need complex CSS. 
                // Let's use a subtle placeholder update instead for simplicity & robustness
                chatInput.setAttribute('placeholder', match);
            } else {
                chatInput.setAttribute('placeholder', 'Ask a question...');
            }
        });
    }

});
