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

// Load Extracurricular Activities
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

    const viewButtons = document.querySelectorAll('.pdf-view-trigger');

    if (!viewButtons || viewButtons.length === 0) {
        console.warn("No elements found with the class 'pdf-view-trigger'.");
        return;
    }

    viewButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();

            // Get the relative path from href (e.g., "pdf/Resume_NatdanaiThamthong.pdf")
            const relativePdfPath = event.currentTarget.getAttribute('href');

            if (!relativePdfPath) {
                console.error("Button href attribute is missing or empty.", event.currentTarget);
                alert("Could not find the PDF file path for this button.");
                return;
            }

            // Construct the absolute path FROM THE SERVER ROOT.
            // We assume index.html is served from the root, so the href
            // path is relative to the root. Prepending '/' makes it absolute.
            // If your index.html is in a subfolder, you might need more complex logic,
            // but for standard Live Server setup, this works.
            const absolutePdfPath = '/' + relativePdfPath;

            // URL-encode the *absolute* path for the query parameter
            const encodedPdfPath = encodeURIComponent(absolutePdfPath);

            // Construct the URL for the viewer, pointing to viewer.html
            // and passing the encoded absolute path of the PDF
            // NOTE: The path to viewer.html itself is still relative to index.html
            const viewerUrl = `pdfjs/web/viewer.html?file=${encodedPdfPath}`;

            console.log(`Opening PDF viewer for ${absolutePdfPath} in new window with URL: ${viewerUrl}`);

            // Open the viewer URL in a new window/tab
            window.open(viewerUrl, '_blank');
        });
    });
});