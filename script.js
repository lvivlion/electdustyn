/* ================================
   Dustyn Dorn Campaign - script.js
   Election Countdown & Interactivity
   ================================ */

// Election Dates
const PRIMARY_DATE = new Date('2026-05-19T00:00:00');
const GENERAL_DATE = new Date('2026-11-03T00:00:00');

// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
const mobileMenuClose = document.querySelector('.mobile-menu-close');
const header = document.querySelector('.header');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
    initMobileMenu();
    initSmoothScroll();
    initScrollHeader();
    initAnimations();
    initModal();
});

// Countdown Timer
function initCountdown() {
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

function updateCountdown() {
    const now = new Date();

    // Primary countdown
    const primaryDiff = PRIMARY_DATE - now;
    if (primaryDiff > 0) {
        updateCountdownDisplay('primary', primaryDiff);
    } else {
        showPastElection('primary');
    }

    // General countdown
    const generalDiff = GENERAL_DATE - now;
    if (generalDiff > 0) {
        updateCountdownDisplay('general', generalDiff);
    } else {
        showPastElection('general');
    }
}

function updateCountdownDisplay(type, diff) {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const daysEl = document.getElementById(`${type}-days`);
    const hoursEl = document.getElementById(`${type}-hours`);
    const minutesEl = document.getElementById(`${type}-minutes`);
    const secondsEl = document.getElementById(`${type}-seconds`);

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
}

function showPastElection(type) {
    const container = document.querySelector(`[data-countdown="${type}"]`);
    if (container) {
        container.innerHTML = '<p class="countdown-complete">Election Complete</p>';
    }
}

// Mobile Menu
function initMobileMenu() {
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', openMobileMenu);
    }

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }

    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    }

    // Close menu when clicking links
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
}

function openMobileMenu() {
    mobileMenu.classList.add('active');
    mobileMenuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    mobileMenuOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Smooth Scroll
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Header Scroll Effect
function initScrollHeader() {
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

// Scroll Animations using Intersection Observer
function initAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fadeInUp');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(el => observer.observe(el));
    } else {
        // Fallback for older browsers
        animatedElements.forEach(el => el.classList.add('animate-fadeInUp'));
    }
}

// Construction Modal
function initModal() {
    const modal = document.getElementById('construction-modal');
    const okBtn = document.getElementById('modal-ok-btn');

    if (modal && okBtn) {
        // Show modal on load
        setTimeout(() => {
            modal.classList.add('active');
        }, 500);

        // Close modal
        okBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        // Close on overlay click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
}

// Utility function for form validation (if forms are added later)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Console message
console.log('%c🇺🇸 Dustyn Dorn for PA House District 60', 'font-size: 20px; font-weight: bold; color: #002D72;');
console.log('%cBuilding a better Pennsylvania together!', 'font-size: 14px; color: #FFCD00;');
