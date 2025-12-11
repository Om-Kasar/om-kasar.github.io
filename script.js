// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(20, 20, 20, 0.98)';
    } else {
        navbar.style.background = 'rgba(20, 20, 20, 0.95)';
    }
});

// Gallery Tab Switching
const tabButtons = document.querySelectorAll('.tab-btn');
const galleryContents = document.querySelectorAll('.gallery-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        galleryContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Show corresponding content
        const tabId = button.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// Video Modal
const videoModal = document.getElementById('videoModal');
const videoFrame = document.getElementById('videoFrame');
const closeVideoModal = videoModal.querySelector('.close-modal');
const modalWatchBtn = document.getElementById('modalWatchBtn');
const modalLinkBtn = document.getElementById('modalLinkBtn');

// Add click event to video items directly
document.querySelectorAll('.video-item').forEach(item => {
    item.addEventListener('click', () => {
        const videoUrl = item.getAttribute('data-video');
        videoFrame.src = videoUrl;
        
        // Extract Google Drive file ID from the preview URL
        const fileIdMatch = videoUrl.match(/\/file\/d\/([a-zA-Z0-9-_]+)\//);
        const fileId = fileIdMatch ? fileIdMatch[1] : null;
        const driveLink = fileId ? `https://drive.google.com/file/d/${fileId}/view` : videoUrl;
        
        // Update the link button
        modalLinkBtn.href = driveLink;
        
        videoModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

// Watch Now button - just ensures the iframe is playing
modalWatchBtn.addEventListener('click', () => {
    // The iframe is already displaying, this just focuses attention
    videoFrame.focus();
});

closeVideoModal.addEventListener('click', () => {
    videoModal.style.display = 'none';
    videoFrame.src = '';
    document.body.style.overflow = 'auto';
});

// Photo Modal
const photoModal = document.getElementById('photoModal');
const photoModalImage = document.getElementById('photoModalImage');
const closePhotoModal = document.getElementById('closePhotoModal');

// Add click event to storyboard items directly
document.querySelectorAll('.photo-item').forEach(item => {
    item.addEventListener('click', () => {
        const photoUrl = item.getAttribute('data-photo');
        photoModalImage.src = photoUrl;
        photoModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

closePhotoModal.addEventListener('click', () => {
    photoModal.style.display = 'none';
    photoModalImage.src = '';
    document.body.style.overflow = 'auto';
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === videoModal) {
        videoModal.style.display = 'none';
        videoFrame.src = '';
        document.body.style.overflow = 'auto';
    }
    if (e.target === photoModal) {
        photoModal.style.display = 'none';
        photoModalImage.src = '';
        document.body.style.overflow = 'auto';
    }
});

// Close modals with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (videoModal.style.display === 'block') {
            videoModal.style.display = 'none';
            videoFrame.src = '';
            document.body.style.overflow = 'auto';
        }
        if (photoModal.style.display === 'block') {
            photoModal.style.display = 'none';
            photoModalImage.src = '';
            document.body.style.overflow = 'auto';
        }
    }
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
    }

    // Simulate form submission
    showMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
    contactForm.reset();
});

function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
        formMessage.className = 'form-message';
    }, 5000);
}

// Scroll animations for gallery items
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all gallery items
document.querySelectorAll('.gallery-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < hero.offsetHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Dynamic year in footer
const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer p');
if (footerText) {
    footerText.textContent = `© ${currentYear} Film Portfolio. All rights reserved.`;
}

// Add active state to navigation based on scroll position
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// Smooth animations for certification cards
document.querySelectorAll('.cert-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Smooth animations for application cards
document.querySelectorAll('.application-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Lazy loading for images
const images = document.querySelectorAll('img');
const imageOptions = {
    threshold: 0,
    rootMargin: '0px 0px 300px 0px'
};

const imageObserver = new IntersectionObserver((entries, imgObserver) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';
            
            if (img.complete) {
                img.style.opacity = '1';
            } else {
                img.addEventListener('load', () => {
                    img.style.opacity = '1';
                });
            }
            
            imageObserver.unobserve(img);
        }
    });
}, imageOptions);

images.forEach(image => {
    imageObserver.observe(image);
});

console.log('Portfolio website loaded successfully!');
