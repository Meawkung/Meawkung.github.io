// Certifications Data
const certificationsData = [
    {
        id: 'ccna',
        title: 'Cisco CCNA (In Progress)',
        organization: 'Cisco',
        issueDate: 'Expected 2024',
        image: 'images/certifications/ccna.jpg',
        description: 'Currently pursuing the Cisco Certified Network Associate (CCNA) certification, which validates the ability to install, configure, operate, and troubleshoot medium-size routed and switched networks.',
        skills: [
            { text: 'Network Configuration', color: 'bg-primary' },
            { text: 'Routing & Switching', color: 'bg-secondary' },
            { text: 'Network Security', color: 'bg-success' },
            { text: 'Troubleshooting', color: 'bg-info' }
        ],
        achievements: [
            'Learning advanced networking concepts and protocols',
            'Mastering Cisco IOS configuration and management',
            'Understanding network security fundamentals',
            'Developing practical troubleshooting skills'
        ]
    },
    {
        id: 'm365',
        title: 'Microsoft 365 Administration',
        organization: 'Microsoft',
        issueDate: '2023',
        image: 'images/certifications/m365.jpg',
        description: 'Completed comprehensive training in Microsoft 365 administration, covering user management, security, compliance, and service management.',
        skills: [
            { text: 'M365 Admin', color: 'bg-primary' },
            { text: 'User Management', color: 'bg-secondary' },
            { text: 'Security & Compliance', color: 'bg-success' },
            { text: 'Service Management', color: 'bg-info' }
        ],
        achievements: [
            'Mastered user and license management',
            'Implemented security and compliance policies',
            'Configured and managed M365 services',
            'Developed troubleshooting expertise'
        ]
    },
    {
        id: 'hyperv',
        title: 'Hyper-V Management',
        organization: 'Microsoft',
        issueDate: '2023',
        image: 'images/certifications/hyperv.jpg',
        description: 'Completed training in Hyper-V virtualization technology, focusing on virtual machine management, networking, and storage configuration.',
        skills: [
            { text: 'Virtualization', color: 'bg-primary' },
            { text: 'VM Management', color: 'bg-secondary' },
            { text: 'Network Configuration', color: 'bg-success' },
            { text: 'Storage Management', color: 'bg-info' }
        ],
        achievements: [
            'Configured and managed virtual machines',
            'Implemented virtual networking solutions',
            'Optimized storage performance',
            'Mastered backup and recovery procedures'
        ]
    }
];

// Function to render certification cards for index.html
function renderCertificationCards() {
    console.log('Attempting to render certification cards...');
    const container = document.querySelector('#certifications-container');
    console.log('Container found:', container);
    if (!container) {
        console.log('Container not found, trying alternative selector...');
        const altContainer = document.querySelector('#education .row:last-child');
        console.log('Alternative container found:', altContainer);
        if (!altContainer) {
            console.error('No container found for certifications');
            return;
        }
        container = altContainer;
    }

    console.log('Rendering certifications:', certificationsData);
    container.innerHTML = certificationsData.map((cert, index) => `
        <div class="col-md-4 mb-4" data-aos="fade-up" ${index > 0 ? 'data-aos-delay="100"' : ''}>
            <div class="certification-card" data-bs-toggle="modal" data-bs-target="#certModal${cert.id}" style="cursor: pointer;">
                <div class="certification-image">
                    <img src="${cert.image}" class="img-fluid rounded" alt="${cert.title}">
                </div>
                <div class="certification-content">
                    <h5 class="mt-3 mb-2">${cert.title}</h5>
                    <p class="text-muted mb-2">${cert.organization}</p>
                    <p class="small mb-3">Issued: ${cert.issueDate}</p>
                    <div class="skills-badges">
                        ${cert.skills.map(skill => `
                            <span class="badge ${skill.color} me-1 mb-1">${skill.text}</span>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    console.log('Certification cards rendered');

    // Render certification modals
    const modalsContainer = document.querySelector('#certification-modals-container');
    if (modalsContainer) {
        modalsContainer.innerHTML = certificationsData.map(cert => `
            <div class="modal fade" id="certModal${cert.id}" tabindex="-1" aria-labelledby="certModal${cert.id}Label" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="certModal${cert.id}Label">${cert.title}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-md-6 mb-3 mb-md-0">
                                    <img src="${cert.image}" class="img-fluid rounded" alt="${cert.title}">
                                </div>
                                <div class="col-md-6">
                                    <h6 class="text-muted mb-3">${cert.organization}</h6>
                                    <p class="mb-3">Issued: ${cert.issueDate}</p>
                                    <h6 class="mb-2">Description:</h6>
                                    <p>${cert.description}</p>
                                    <h6 class="mb-2">Key Skills:</h6>
                                    <ul class="list-unstyled">
                                        ${cert.skills.map(skill => `
                                            <li><i class="bi bi-check-circle-fill text-success me-2"></i>${skill.text}</li>
                                        `).join('')}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
        console.log('Certification modals rendered');
    }

    // Render all certifications in the modal
    const allCertsContainer = document.querySelector('#all-certifications-container');
    if (allCertsContainer) {
        allCertsContainer.innerHTML = certificationsData.map(cert => `
            <div class="col-md-6 col-lg-4">
                <div class="certification-card" data-bs-toggle="modal" data-bs-target="#certModal${cert.id}" style="cursor: pointer;">
                    <div class="certification-image">
                        <img src="${cert.image}" class="img-fluid rounded" alt="${cert.title}">
                    </div>
                    <div class="certification-content">
                        <h5 class="mt-3 mb-2">${cert.title}</h5>
                        <p class="text-muted mb-2">${cert.organization}</p>
                        <p class="small">Issued: ${cert.issueDate}</p>
                    </div>
                </div>
            </div>
        `).join('');
        console.log('All certifications modal content rendered');
    }
}

// Function to render detailed certifications for certifications.html
function renderDetailedCertifications() {
    const container = document.querySelector('#certifications .container');
    if (!container) return;

    container.innerHTML = certificationsData.map((cert, index) => `
        <div class="row mb-5" data-aos="fade-up" ${index > 0 ? 'data-aos-delay="100"' : ''}>
            <div class="col-lg-6 mb-4 mb-lg-0">
                <img src="${cert.image}" class="img-fluid rounded shadow" alt="${cert.title}">
            </div>
            <div class="col-lg-6">
                <div class="certification-content">
                    <h3 class="mb-3">${cert.title}</h3>
                    <p class="lead">${cert.description}</p>
                    <div class="mb-4">
                        ${cert.skills.map(skill => `
                            <span class="badge ${skill.color} me-1">${skill.text}</span>
                        `).join('')}
                    </div>
                    <h5 class="mb-3">Key Achievements:</h5>
                    <ul class="list-unstyled">
                        ${cert.achievements.map(achievement => `
                            <li><i class="bi bi-check-circle-fill text-success me-2"></i>${achievement}</li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `).join('');
}

// Initialize based on the current page
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    if (window.location.pathname.includes('certifications.html')) {
        console.log('On certifications page, rendering detailed view');
        renderDetailedCertifications();
    } else {
        console.log('On index page, rendering cards');
        // Add a small delay to ensure the DOM is fully loaded
        setTimeout(() => {
            renderCertificationCards();
        }, 100);
    }
}); 