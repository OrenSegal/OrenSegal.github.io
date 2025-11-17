// ==================== Initialization ====================
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initParticles();
    initTerminal();
    initScrollAnimations();
    initNavigation();
    initSkillBars();
    initRadarChart();
    initVisualizations();
    initCounters();
    initProjectDemos();
    initContactForm();
});

// ==================== Theme Toggle ====================
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'light';

    document.documentElement.setAttribute('data-theme', currentTheme);

    themeToggle.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme');
        const newTheme = theme === 'light' ? 'dark' : 'light';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// ==================== 3D Particle Background ====================
function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    camera.position.z = 5;

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Material
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.005,
        color: 0x667eea,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // Animation
    function animate() {
        requestAnimationFrame(animate);

        particlesMesh.rotation.x += 0.0005;
        particlesMesh.rotation.y += 0.0005;

        // Mouse interaction
        particlesMesh.rotation.x += mouseY * 0.00005;
        particlesMesh.rotation.y += mouseX * 0.00005;

        renderer.render(scene, camera);
    }

    animate();

    // Resize handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// ==================== Animated Terminal ====================
function initTerminal() {
    const terminalBody = document.getElementById('terminalBody');
    const codeLines = [
        { type: 'comment', text: '# Data Analysis Pipeline' },
        { type: 'code', text: 'import pandas as pd' },
        { type: 'code', text: 'import numpy as np' },
        { type: 'code', text: 'from sklearn.ensemble import RandomForestClassifier' },
        { type: 'blank', text: '' },
        { type: 'comment', text: '# Load and process data' },
        { type: 'code', text: 'df = pd.read_csv("data.csv")' },
        { type: 'code', text: 'X_train, y_train = preprocess(df)' },
        { type: 'blank', text: '' },
        { type: 'comment', text: '# Train model' },
        { type: 'code', text: 'model = RandomForestClassifier(n_estimators=100)' },
        { type: 'code', text: 'model.fit(X_train, y_train)' },
        { type: 'blank', text: '' },
        { type: 'code', text: 'print(f"Accuracy: {model.score(X_test, y_test):.2%}")' },
        { type: 'output', text: 'Accuracy: 94.67%' }
    ];

    let currentLine = 0;

    function typeLine() {
        if (currentLine < codeLines.length) {
            const line = codeLines[currentLine];
            const lineElement = document.createElement('div');
            lineElement.className = 'terminal-line';
            lineElement.style.animationDelay = `${currentLine * 0.1}s`;

            if (line.type === 'comment') {
                lineElement.innerHTML = `<span class="terminal-comment">${line.text}</span>`;
            } else if (line.type === 'output') {
                lineElement.innerHTML = `<span class="terminal-string">${line.text}</span>`;
            } else if (line.type === 'blank') {
                lineElement.innerHTML = '&nbsp;';
            } else {
                lineElement.innerHTML = highlightCode(line.text);
            }

            terminalBody.appendChild(lineElement);
            currentLine++;
            setTimeout(typeLine, 200);
        }
    }

    function highlightCode(text) {
        return text
            .replace(/(import|from|def|class|return|if|else|for|in|print|f")/g, '<span class="terminal-keyword">$1</span>')
            .replace(/(".*?")/g, '<span class="terminal-string">$1</span>')
            .replace(/(\d+)/g, '<span class="terminal-number">$1</span>');
    }

    setTimeout(typeLine, 500);
}

// ==================== Navigation ====================
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const mobileToggle = document.getElementById('mobileMenuToggle');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ==================== Scroll Animations ====================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
}

// ==================== Animated Counters ====================
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetValue = parseInt(target.getAttribute('data-target'));
                animateCounter(target, targetValue);
                observer.unobserve(target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, 16);
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M+';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'k+';
    }
    return num + '+';
}

// ==================== Skill Bars Animation ====================
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const progress = bar.getAttribute('data-progress');
                bar.style.width = progress + '%';
                observer.unobserve(bar);
            }
        });
    }, observerOptions);

    skillBars.forEach(bar => observer.observe(bar));
}

// ==================== Radar Chart ====================
function initRadarChart() {
    const ctx = document.getElementById('radarChart');
    if (!ctx) return;

    const theme = document.documentElement.getAttribute('data-theme');
    const textColor = theme === 'dark' ? '#e4e7eb' : '#1a1a1a';
    const gridColor = theme === 'dark' ? '#2d3748' : '#e2e8f0';

    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['D3.js', 'Tableau', 'Power BI', 'Matplotlib', 'Plotly', 'Seaborn'],
            datasets: [{
                label: 'Proficiency',
                data: [95, 88, 85, 92, 90, 87],
                backgroundColor: 'rgba(102, 126, 234, 0.2)',
                borderColor: 'rgba(102, 126, 234, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(102, 126, 234, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(102, 126, 234, 1)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                r: {
                    angleLines: {
                        color: gridColor
                    },
                    grid: {
                        color: gridColor
                    },
                    pointLabels: {
                        color: textColor,
                        font: {
                            size: 12
                        }
                    },
                    ticks: {
                        color: textColor,
                        backdropColor: 'transparent'
                    },
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// ==================== Data Visualizations ====================
let activeChart = null;
let currentViz = 'sales';

function initVisualizations() {
    const tabs = document.querySelectorAll('.viz-tab');
    const panels = document.querySelectorAll('.viz-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const vizType = tab.getAttribute('data-viz');

            // Update tabs
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update panels
            panels.forEach(p => p.classList.remove('active'));
            document.getElementById(`viz-${vizType}`).classList.add('active');

            // Update current viz
            currentViz = vizType;

            // Render visualization
            renderVisualization(vizType);
        });
    });

    // Initial render
    renderVisualization('sales');

    // Control buttons
    document.getElementById('randomizeData').addEventListener('click', () => {
        renderVisualization(currentViz);
    });

    document.getElementById('exportViz').addEventListener('click', () => {
        if (activeChart) {
            const link = document.createElement('a');
            link.download = `${currentViz}-chart.png`;
            link.href = activeChart.toBase64Image();
            link.click();
        }
    });
}

function renderVisualization(type) {
    if (activeChart) {
        activeChart.destroy();
    }

    switch (type) {
        case 'sales':
            renderSalesChart();
            break;
        case 'network':
            renderNetworkGraph();
            break;
        case 'geo':
            renderGeoChart();
            break;
        case 'timeseries':
            renderTimeSeriesChart();
            break;
    }
}

function renderSalesChart() {
    const ctx = document.getElementById('salesChart');
    const theme = document.documentElement.getAttribute('data-theme');
    const textColor = theme === 'dark' ? '#e4e7eb' : '#1a1a1a';
    const gridColor = theme === 'dark' ? '#2d3748' : '#e2e8f0';

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data1 = generateRandomData(12, 30, 100);
    const data2 = generateRandomData(12, 20, 80);

    activeChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'Product A',
                data: data1,
                borderColor: 'rgba(102, 126, 234, 1)',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 4,
                pointHoverRadius: 6
            }, {
                label: 'Product B',
                data: data2,
                borderColor: 'rgba(139, 92, 246, 1)',
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                        font: {
                            size: 14
                        }
                    }
                },
                tooltip: {
                    backgroundColor: theme === 'dark' ? '#1a1f2e' : '#ffffff',
                    titleColor: textColor,
                    bodyColor: textColor,
                    borderColor: gridColor,
                    borderWidth: 1
                }
            },
            scales: {
                x: {
                    grid: {
                        color: gridColor
                    },
                    ticks: {
                        color: textColor
                    }
                },
                y: {
                    grid: {
                        color: gridColor
                    },
                    ticks: {
                        color: textColor
                    }
                }
            }
        }
    });
}

function renderNetworkGraph() {
    const canvas = document.getElementById('networkCanvas');
    const ctx = canvas.getContext('2d');
    const theme = document.documentElement.getAttribute('data-theme');

    // Set canvas size
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 400;

    // Generate nodes
    const nodes = [];
    const nodeCount = 50;

    for (let i = 0; i < nodeCount; i++) {
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            radius: Math.random() * 3 + 2
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw nodes
        nodes.forEach((node, i) => {
            // Update position
            node.x += node.vx;
            node.y += node.vy;

            // Bounce off edges
            if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

            // Draw connections
            nodes.forEach((otherNode, j) => {
                if (i < j) {
                    const dx = otherNode.x - node.x;
                    const dy = otherNode.y - node.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        const opacity = 1 - (distance / 150);
                        ctx.strokeStyle = theme === 'dark'
                            ? `rgba(102, 126, 234, ${opacity * 0.3})`
                            : `rgba(102, 126, 234, ${opacity * 0.2})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(otherNode.x, otherNode.y);
                        ctx.stroke();
                    }
                }
            });

            // Draw node
            ctx.fillStyle = theme === 'dark' ? '#667eea' : '#764ba2';
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }

    animate();
}

function renderGeoChart() {
    const ctx = document.getElementById('geoChart');
    const theme = document.documentElement.getAttribute('data-theme');
    const textColor = theme === 'dark' ? '#e4e7eb' : '#1a1a1a';
    const gridColor = theme === 'dark' ? '#2d3748' : '#e2e8f0';

    const regions = ['North America', 'Europe', 'Asia', 'South America', 'Africa', 'Oceania'];
    const data = generateRandomData(6, 20, 100);

    activeChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: regions,
            datasets: [{
                label: 'Market Share (%)',
                data: data,
                backgroundColor: [
                    'rgba(102, 126, 234, 0.8)',
                    'rgba(139, 92, 246, 0.8)',
                    'rgba(236, 72, 153, 0.8)',
                    'rgba(251, 146, 60, 0.8)',
                    'rgba(34, 197, 94, 0.8)',
                    'rgba(59, 130, 246, 0.8)'
                ],
                borderColor: [
                    'rgba(102, 126, 234, 1)',
                    'rgba(139, 92, 246, 1)',
                    'rgba(236, 72, 153, 1)',
                    'rgba(251, 146, 60, 1)',
                    'rgba(34, 197, 94, 1)',
                    'rgba(59, 130, 246, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    grid: {
                        color: gridColor
                    },
                    ticks: {
                        color: textColor
                    }
                },
                y: {
                    grid: {
                        color: gridColor
                    },
                    ticks: {
                        color: textColor
                    },
                    beginAtZero: true
                }
            }
        }
    });
}

function renderTimeSeriesChart() {
    const ctx = document.getElementById('timeseriesChart');
    const theme = document.documentElement.getAttribute('data-theme');
    const textColor = theme === 'dark' ? '#e4e7eb' : '#1a1a1a';
    const gridColor = theme === 'dark' ? '#2d3748' : '#e2e8f0';

    // Generate time series data
    const labels = [];
    const data = [];
    const startDate = new Date(2024, 0, 1);

    for (let i = 0; i < 30; i++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        data.push(Math.sin(i * 0.3) * 20 + 50 + Math.random() * 10);
    }

    activeChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Metric Value',
                data: data,
                borderColor: 'rgba(59, 130, 246, 1)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 3,
                pointHoverRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: gridColor
                    },
                    ticks: {
                        color: textColor,
                        maxRotation: 45,
                        minRotation: 45
                    }
                },
                y: {
                    grid: {
                        color: gridColor
                    },
                    ticks: {
                        color: textColor
                    }
                }
            }
        }
    });
}

function generateRandomData(count, min, max) {
    const data = [];
    for (let i = 0; i < count; i++) {
        data.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return data;
}

// ==================== Project Demos ====================
function initProjectDemos() {
    const modal = document.getElementById('demoModal');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.getElementById('modalClose');

    document.querySelectorAll('.project-demo').forEach(demo => {
        demo.addEventListener('click', () => {
            const demoType = demo.getAttribute('data-demo');
            showDemo(demoType);
            modal.classList.add('active');
        });
    });

    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
        modalBody.innerHTML = '';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            modalBody.innerHTML = '';
        }
    });
}

function showDemo(type) {
    const modalBody = document.getElementById('modalBody');

    const demos = {
        predictive: `
            <h2 style="margin-bottom: 1rem;">Predictive Analytics Demo</h2>
            <p style="margin-bottom: 1.5rem; color: var(--text-secondary);">
                This ML model predicts customer churn with 94% accuracy using ensemble methods.
            </p>
            <div style="background: var(--bg-secondary); padding: 1.5rem; border-radius: 8px; margin-bottom: 1rem;">
                <h3 style="margin-bottom: 0.5rem;">Model Performance</h3>
                <ul style="list-style: none; padding: 0;">
                    <li style="margin: 0.5rem 0;">✓ Accuracy: 94.67%</li>
                    <li style="margin: 0.5rem 0;">✓ Precision: 92.3%</li>
                    <li style="margin: 0.5rem 0;">✓ Recall: 91.8%</li>
                    <li style="margin: 0.5rem 0;">✓ F1-Score: 92.0%</li>
                </ul>
            </div>
            <div style="background: var(--bg-secondary); padding: 1.5rem; border-radius: 8px;">
                <h3 style="margin-bottom: 0.5rem;">Tech Stack</h3>
                <p style="color: var(--text-secondary);">
                    TensorFlow • Keras • Scikit-learn • AWS SageMaker • Flask • Docker
                </p>
            </div>
        `,
        nlp: `
            <h2 style="margin-bottom: 1rem;">NLP Sentiment Analysis Demo</h2>
            <p style="margin-bottom: 1.5rem; color: var(--text-secondary);">
                Advanced sentiment analysis using BERT transformers for multi-language support.
            </p>
            <div style="background: var(--bg-secondary); padding: 1.5rem; border-radius: 8px; margin-bottom: 1rem;">
                <h3 style="margin-bottom: 0.5rem;">Capabilities</h3>
                <ul style="list-style: none; padding: 0;">
                    <li style="margin: 0.5rem 0;">✓ 12 Languages Supported</li>
                    <li style="margin: 0.5rem 0;">✓ Real-time Processing</li>
                    <li style="margin: 0.5rem 0;">✓ Emotion Detection</li>
                    <li style="margin: 0.5rem 0;">✓ Context-Aware Analysis</li>
                </ul>
            </div>
            <div style="background: var(--bg-secondary); padding: 1.5rem; border-radius: 8px;">
                <h3 style="margin-bottom: 0.5rem;">Performance</h3>
                <p style="color: var(--text-secondary);">
                    Processes 10M+ posts daily with 92% F1-Score
                </p>
            </div>
        `,
        dashboard: `
            <h2 style="margin-bottom: 1rem;">Real-time Analytics Dashboard</h2>
            <p style="margin-bottom: 1.5rem; color: var(--text-secondary);">
                Interactive dashboard with WebSocket integration for live data updates.
            </p>
            <div style="background: var(--bg-secondary); padding: 1.5rem; border-radius: 8px; margin-bottom: 1rem;">
                <h3 style="margin-bottom: 0.5rem;">Features</h3>
                <ul style="list-style: none; padding: 0;">
                    <li style="margin: 0.5rem 0;">✓ Real-time Data Streaming</li>
                    <li style="margin: 0.5rem 0;">✓ Interactive Visualizations</li>
                    <li style="margin: 0.5rem 0;">✓ Customizable Widgets</li>
                    <li style="margin: 0.5rem 0;">✓ Alert System</li>
                </ul>
            </div>
            <div style="background: var(--bg-secondary); padding: 1.5rem; border-radius: 8px;">
                <h3 style="margin-bottom: 0.5rem;">Technologies</h3>
                <p style="color: var(--text-secondary);">
                    D3.js • WebSocket • Node.js • MongoDB • Redis
                </p>
            </div>
        `,
        recommendation: `
            <h2 style="margin-bottom: 1rem;">Recommendation Engine</h2>
            <p style="margin-bottom: 1.5rem; color: var(--text-secondary);">
                Hybrid recommendation system combining collaborative and content-based filtering.
            </p>
            <div style="background: var(--bg-secondary); padding: 1.5rem; border-radius: 8px; margin-bottom: 1rem;">
                <h3 style="margin-bottom: 0.5rem;">Impact</h3>
                <ul style="list-style: none; padding: 0;">
                    <li style="margin: 0.5rem 0;">✓ 35% Increase in CTR</li>
                    <li style="margin: 0.5rem 0;">✓ 1M+ Active Users</li>
                    <li style="margin: 0.5rem 0;">✓ 99.9% Uptime</li>
                    <li style="margin: 0.5rem 0;">✓ <50ms Response Time</li>
                </ul>
            </div>
            <div style="background: var(--bg-secondary); padding: 1.5rem; border-radius: 8px;">
                <h3 style="margin-bottom: 0.5rem;">Algorithm</h3>
                <p style="color: var(--text-secondary);">
                    Apache Spark ALS • Matrix Factorization • Deep Learning • FastAPI
                </p>
            </div>
        `
    };

    modalBody.innerHTML = demos[type] || '<p>Demo content not available</p>';
}

// ==================== Contact Form ====================
function initContactForm() {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Simulate form submission
        alert('Thank you for your message! This is a demo portfolio, so the message was not actually sent.');
        form.reset();
    });
}

// ==================== Performance Optimization ====================
// Debounce function for resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
