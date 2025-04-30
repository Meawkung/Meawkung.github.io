// Project Data
const projectsData = [
    {
        id: 'ctf',
        title: '1st Place - Capture The Flag "PSRU Cyber Hackathon 2023 โครงการอบรมเชิงปฏิบัติการและแข่งขันทักษะทางไซเบอร์ ครั้งที่ 1"',
        icon: 'bi-trophy-fill',
        iconColor: 'text-warning',
        images: [
            'images/projects/psructf.jpg',
            'images/projects/psructf1.jpg',
            'images/projects/psructf2.jpg',
            'images/projects/psructf3.jpg',
        ],
        description: 'Achieved first place in a team-based CTF competition. Specialized in analyzing network traffic (.pcap) using Wireshark and system logs (.txt) to uncover hidden flags.',
        link: 'https://www.up.ac.th/NewsRead.aspx?itemID=30174',
        badges: [
            { text: 'Network Analysis', color: 'bg-primary' },
            { text: 'Log Analysis', color: 'bg-primary' },
            { text: 'Wireshark', color: 'bg-secondary' },
            { text: 'Teamwork', color: 'bg-info' },
            { text: 'Problem Solving', color: 'bg-info' }
        ],
        achievements: [
            'Successfully analyzed complex network traffic patterns',
            'Identified and exploited security vulnerabilities',
            'Collaborated effectively with team members'
        ]
    },
    {
        id: 'discord-bot',
        title: 'Multi-functional Discord Bot',
        icon: 'bi-robot',
        iconColor: 'text-primary',
        images: [
            'images/projects/discordbot.png',
            'images/projects/discordbot2.png',
            'images/projects/discordbot3.png',
            'images/projects/discordbot4.png',
        ],
        description: 'Developed and deployed a Python Discord bot on an Ubuntu Linux VPS. Features include TTS scheduling, voice channel logging, bidding system, and image analysis via Google Gemini API.',
        badges: [
            { text: 'Python', color: 'bg-success' },
            { text: 'discord.py', color: 'bg-success' },
            { text: 'API Integration', color: 'bg-warning' },
            { text: 'Linux Admin', color: 'bg-danger' },
            { text: 'VPS', color: 'bg-danger' }
        ],
        features: [
            'Text-to-Speech scheduling system',
            'Voice channel activity logging',
            'Automated bidding system',
            'Image analysis using Google Gemini API'
        ]
    },
    {
        id: 'ta',
        title: 'Teaching Assistant',
        icon: 'bi-person-workspace',
        iconColor: 'text-primary',
        images: [
            'images/projects/ta.jpg',
            'images/projects/ta2.jpg',
            'images/projects/ta3.jpg'
        ],
        description: 'Assisted instructors and participants during hands-on labs for "Forensic Techniques for Email/Cybersecurity" & "Cisco Cybersecurity Essentials". Provided technical support with Kali Linux tools.',
        badges: [
            { text: 'Technical Support', color: 'bg-secondary' },
            { text: 'Communication', color: 'bg-secondary' },
            { text: 'Kali Linux', color: 'bg-info' },
            { text: 'Cybersecurity', color: 'bg-danger' }
        ],
        responsibilities: [
            'Provided hands-on technical support during labs',
            'Assisted with Kali Linux tool usage',
            'Helped troubleshoot technical issues',
            'Supported participants in understanding cybersecurity concepts'
        ]
    }
];

// Function to handle image loading errors
function handleImageError(img) {
    img.onerror = function() {
        this.src = 'images/placeholder.jpg';
        this.alt = 'Image not available';
    };
}

// Function to render project cards for index.html
function renderProjectCards() {
    const container = document.querySelector('#experience .row');
    if (!container) return;

    container.innerHTML = projectsData.map(project => `
        <div class="col-lg-4 mb-4 d-flex align-items-stretch">
            <div class="card w-100 shadow-sm">
                <div id="carousel-${project.id}" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        ${project.images.map((image, index) => `
                            <div class="carousel-item ${index === 0 ? 'active' : ''}">
                                <img src="${image}" class="d-block w-100 card-img-top" alt="${project.title}" onerror="handleImageError(this)">
                            </div>
                        `).join('')}
                    </div>
                    ${project.images.length > 1 ? `
                        <button class="carousel-control-prev" type="button" data-bs-target="#carousel-${project.id}" data-bs-slide="prev" style="width: 15%; background: rgba(0,0,0,0.3);">
                            <span class="carousel-control-prev-icon" style="width: 30px; height: 30px;"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carousel-${project.id}" data-bs-slide="next" style="width: 15%; background: rgba(0,0,0,0.3);">
                            <span class="carousel-control-next-icon" style="width: 30px; height: 30px;"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    ` : ''}
                </div>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title fw-bold">
                        <i class="bi ${project.icon} ${project.iconColor}"></i> ${project.title}
                    </h5>
                    <p class="card-text">${project.description}</p>
                    <div class="mt-auto">
                        ${project.badges.map(badge => `
                            <span class="badge ${badge.color} me-1">${badge.text}</span>
                        `).join('')}
                        ${project.link ? `
                            <div class="mt-2">
                                <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-primary btn-sm">
                                    <i class="bi bi-link-45deg"></i> Read More
                                </a>
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Function to render detailed projects for projects.html
function renderDetailedProjects() {
    const container = document.querySelector('#projects .container');
    if (!container) return;

    container.innerHTML = projectsData.map((project, index) => `
        <div class="row mb-5" data-aos="fade-up" ${index > 0 ? 'data-aos-delay="100"' : ''}>
            <div class="col-lg-6 mb-4 mb-lg-0">
                <div id="carousel-${project.id}-detail" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        ${project.images.map((image, index) => `
                            <div class="carousel-item ${index === 0 ? 'active' : ''}">
                                <img src="${image}" class="d-block w-100 img-fluid rounded shadow" alt="${project.title}" onerror="handleImageError(this)">
                            </div>
                        `).join('')}
                    </div>
                    ${project.images.length > 1 ? `
                        <button class="carousel-control-prev" type="button" data-bs-target="#carousel-${project.id}-detail" data-bs-slide="prev" style="width: 15%; background: rgba(0,0,0,0.3);">
                            <span class="carousel-control-prev-icon" style="width: 40px; height: 40px;"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carousel-${project.id}-detail" data-bs-slide="next" style="width: 15%; background: rgba(0,0,0,0.3);">
                            <span class="carousel-control-next-icon" style="width: 40px; height: 40px;"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    ` : ''}
                </div>
            </div>
            <div class="col-lg-6">
                <div class="project-content">
                    <h3 class="mb-3">
                        <i class="bi ${project.icon} ${project.iconColor}"></i> ${project.title}
                    </h3>
                    <p class="lead">${project.description}</p>
                    <div class="mb-4">
                        ${project.badges.map(badge => `
                            <span class="badge ${badge.color} me-1">${badge.text}</span>
                        `).join('')}
                        ${project.link ? `
                            <div class="mt-2">
                                <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-primary">
                                    <i class="bi bi-link-45deg"></i> Read More
                                </a>
                            </div>
                        ` : ''}
                    </div>
                    <h5 class="mb-3">${project.achievements ? 'Key Achievements:' : project.features ? 'Key Features:' : 'Responsibilities:'}</h5>
                    <ul class="list-unstyled">
                        ${(project.achievements || project.features || project.responsibilities).map(item => `
                            <li><i class="bi bi-check-circle-fill text-success me-2"></i>${item}</li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `).join('');
}

// Initialize based on the current page
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('projects.html')) {
        renderDetailedProjects();
    } else {
        renderProjectCards();
    }
}); 