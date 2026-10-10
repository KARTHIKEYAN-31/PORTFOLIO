const canvas3d = document.getElementById('skills-3d');
const ctx3d = canvas3d.getContext('2d');

let width3d, height3d;
const skillsList = [
    "Python 3.13", "GenAI", "Agentic RAG", "LangGraph", "LangChain",
    "Google ADK", "Agent Engine", "Gemini Enterprise", "AWS Bedrock",
    "Vertex AI", "pgvector", "Pinecone", "Neo4j", "Valkey/Redis",
    "FastAPI", "Docker", "PyTorch", "LLMOps", "LoRA Fine-Tuning",
    "SAP HANA", "ServiceNow", "Multi-Agent"
];

let nodes = [];
const globeRadius = 180;
let rotation = { x: 0, y: 0 };
let targetRotation = { x: 0.002, y: 0.002 };
let isDragging = false;
let lastMouse = { x: 0, y: 0 };

function resize3d() {
    width3d = canvas3d.width = canvas3d.parentElement.offsetWidth;
    height3d = canvas3d.height = 400;
}
window.addEventListener('resize', resize3d);
resize3d();

// Initialize Nodes on a Sphere
for (let i = 0; i < skillsList.length; i++) {
    const phi = Math.acos(-1 + (2 * i) / skillsList.length);
    const theta = Math.sqrt(skillsList.length * Math.PI) * phi;

    nodes.push({
        text: skillsList[i],
        x: globeRadius * Math.cos(theta) * Math.sin(phi),
        y: globeRadius * Math.sin(theta) * Math.sin(phi),
        z: globeRadius * Math.cos(phi)
    });
}

// Draw Loop
function animate3d() {
    ctx3d.clearRect(0, 0, width3d, height3d);

    // Auto Rotation or Damping
    if (!isDragging) {
        rotation.x += (targetRotation.x - rotation.x) * 0.1;
        rotation.y += (targetRotation.y - rotation.y) * 0.1;
    }

    // Center of Globe
    const cx = width3d / 2;
    const cy = height3d / 2;

    // Rotate and Draw Nodes
    nodes.forEach(node => {
        // Rotation
        let y = node.y * Math.cos(rotation.x) - node.z * Math.sin(rotation.x);
        let z = node.y * Math.sin(rotation.x) + node.z * Math.cos(rotation.x);
        node.y = y;
        node.z = z;

        let x = node.x * Math.cos(rotation.y) - node.z * Math.sin(rotation.y);
        z = node.x * Math.sin(rotation.y) + node.z * Math.cos(rotation.y);
        node.x = x;
        node.z = z;

        // Projection
        const scale = 400 / (400 - z);
        const alpha = (z + globeRadius) / (2 * globeRadius);

        ctx3d.save();
        ctx3d.translate(cx + x * scale, cy + y * scale);
        ctx3d.scale(scale, scale);

        // Style
        ctx3d.font = `bold 14px 'Orbitron', monospace`;
        ctx3d.fillStyle = `rgba(0, 243, 255, ${Math.max(0.2, alpha)})`;
        ctx3d.shadowBlur = 10 * alpha;
        ctx3d.shadowColor = "#00f3ff";

        if (z > 0) {
            ctx3d.fillText(node.text, 0, 0);
        }

        ctx3d.restore();
    });

    // Draw Connections (Lines between close nodes)
    // Only if z > 0 for performance and visual clarity
    /*
    for(let i=0; i<nodes.length; i++){
        for(let j=i+1; j<nodes.length; j++){
             // Distance calculation logic... (optional for cleaner look)
        }
    }
    */

    requestAnimationFrame(animate3d);
}

// Interaction
canvas3d.addEventListener('mousedown', (e) => {
    isDragging = true;
    lastMouse = { x: e.clientX, y: e.clientY };
});
window.addEventListener('mouseup', () => isDragging = false);
window.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const dx = e.clientX - lastMouse.x;
        const dy = e.clientY - lastMouse.y;
        rotation.y = dx * 0.005;
        rotation.x = dy * 0.005;
        lastMouse = { x: e.clientX, y: e.clientY };
    }
});

animate3d();
