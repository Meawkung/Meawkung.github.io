// Basic script - can be expanded later

// Example: Activate Bootstrap scrollspy on the main nav element
// Although data attributes often handle this, explicit initialization is fine.
const mainNav = document.body.querySelector('#mainNav');
if (mainNav) {
    new bootstrap.ScrollSpy(document.body, {
        target: '#mainNav',
        offset: 70, // Adjust offset based on navbar height
    });
};

// Example: Add active class to navbar links on scroll (alternative/enhancement to scrollspy)
// You might not need this if Bootstrap's scrollspy works well enough via data attributes.

// Example: Navbar shrink effect on scroll (Optional)
// window.addEventListener('scroll', function() {
//     const navbar = document.getElementById('mainNav');
//     if (window.scrollY > 50) { // Adjust scroll distance
//         navbar.classList.add('navbar-shrink'); // Add a class to style the shrunk navbar in CSS
//     } else {
//         navbar.classList.remove('navbar-shrink');
//     }
// });

// Add more JavaScript for animations (e.g., using AOS library),
// form validation (if you add a contact form), etc.

// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

// Particles.js Configuration
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#ffffff'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            random: false
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#ffffff',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 1
                }
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        nav.style.padding = '0.5rem 1rem';
        nav.style.backgroundColor = 'rgba(33, 37, 41, 0.95)';
    } else {
        nav.style.padding = '1rem';
        nav.style.backgroundColor = 'rgba(33, 37, 41, 0.9)';
    }
});

// Fade Up Animation
const fadeElements = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1
});

fadeElements.forEach(element => {
    observer.observe(element);
});

// PDF Viewer Functionality
let pdfDoc = null;
let pageNum = 1;
let pageRendering = false;
let pageNumPending = null;
let scale = 1.0;
const canvas = document.getElementById('pdf-render');
const ctx = canvas.getContext('2d');

function renderPage(num) {
    pageRendering = true;
    pdfDoc.getPage(num).then(function(page) {
        // Get device pixel ratio
        const pixelRatio = window.devicePixelRatio || 1;
        
        // Calculate viewport with device pixel ratio
        const viewport = page.getViewport({scale: scale * pixelRatio});
        
        // Set canvas dimensions with device pixel ratio
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        // Scale the canvas context to match the device pixel ratio
        ctx.scale(pixelRatio, pixelRatio);
        
        const renderContext = {
            canvasContext: ctx,
            viewport: viewport,
            enableWebGL: true,
            renderInteractiveForms: true
        };
        
        const renderTask = page.render(renderContext);

        renderTask.promise.then(function() {
            pageRendering = false;
            if (pageNumPending !== null) {
                renderPage(pageNumPending);
                pageNumPending = null;
            }
        });
    });

    document.getElementById('page-num').textContent = num;
}

function queueRenderPage(num) {
    if (pageRendering) {
        pageNumPending = num;
    } else {
        renderPage(num);
    }
}

function onPrevPage() {
    if (pageNum <= 1) {
        return;
    }
    pageNum--;
    queueRenderPage(pageNum);
}

function onNextPage() {
    if (pageNum >= pdfDoc.numPages) {
        return;
    }
    pageNum++;
    queueRenderPage(pageNum);
}

function onZoomIn() {
    scale += 0.2;
    queueRenderPage(pageNum);
}

function onZoomOut() {
    if (scale <= 0.5) return;
    scale -= 0.2;
    queueRenderPage(pageNum);
}

// Initialize PDF viewer when modal opens
document.getElementById('resumeModal').addEventListener('show.bs.modal', function () {
    // Reset scale to 1.0 when opening modal
    scale = 1.0;
    
    // Set initial scale based on device width
    const deviceWidth = window.innerWidth;
    if (deviceWidth < 768) {
        scale = 0.8; // Slightly smaller scale for mobile
    }
    
    pdfjsLib.getDocument('resume/UP23.pdf').promise.then(function(pdfDoc_) {
        pdfDoc = pdfDoc_;
        document.getElementById('page-count').textContent = pdfDoc.numPages;
        renderPage(pageNum);
    });
});

// Add event listeners for controls
document.getElementById('prev-page').addEventListener('click', onPrevPage);
document.getElementById('next-page').addEventListener('click', onNextPage);
document.getElementById('zoom-in').addEventListener('click', onZoomIn);
document.getElementById('zoom-out').addEventListener('click', onZoomOut);

// Reset viewer when modal closes
document.getElementById('resumeModal').addEventListener('hidden.bs.modal', function () {
    pdfDoc = null;
    pageNum = 1;
    scale = 1.0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Function to load extracurricular activities
function loadExtracurricularActivities() {
    const container = document.getElementById('extracurricular-container');
    if (!container) return;

    extracurricularData.activities.forEach(activity => {
        const activityHtml = `
            <div class="col-md-6 mb-4">
                <div class="p-3 border rounded shadow-sm h-100">
                    <h4 class="mb-3"><i class="bi ${activity.icon} ${activity.iconColor}"></i> ${activity.title}</h4>
                    <ul class="list-unstyled mb-0">
                        ${activity.items.map(item => `
                            <li class="mb-3">
                                <h5 class="fw-bold">${item.title}</h5>
                                <p class="text-muted mb-1">${item.subtitle}</p>
                                <p class="small">${item.description}</p>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        `;
        container.innerHTML += activityHtml;
    });
}

// Initialize AOS
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        once: true
    });

    // Load extracurricular activities
    loadExtracurricularActivities();
});