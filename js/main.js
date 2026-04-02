(function () {
    'use strict';

    // ===== Theme Toggle =====
    const THEME_KEY = 'theme';
    const root = document.documentElement;

    function getPreferredTheme() {
        const stored = localStorage.getItem(THEME_KEY);
        if (stored) return stored;
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }

    function applyTheme(theme) {
        root.dataset.theme = theme;
        localStorage.setItem(THEME_KEY, theme);
    }

    applyTheme(getPreferredTheme());

    document.querySelectorAll('.theme-toggle').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
            applyTheme(next);
        });
    });

    // ===== Sticky Header Scroll Effect =====
    var header = document.querySelector('.site-header');
    if (header) {
        window.addEventListener('scroll', function () {
            header.classList.toggle('scrolled', window.scrollY > 40);
        }, { passive: true });
    }

    // ===== Scroll Progress Bar =====
    var progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        window.addEventListener('scroll', function () {
            var scrollTop = window.scrollY;
            var docHeight = document.documentElement.scrollHeight - window.innerHeight;
            progressBar.style.width = docHeight > 0 ? (scrollTop / docHeight * 100) + '%' : '0%';
        }, { passive: true });
    }

    // ===== Scroll Reveal (Intersection Observer) =====
    var revealTargets = document.querySelectorAll('.project-card, .category, .section, .hero, .project-hero');
    if ('IntersectionObserver' in window && revealTargets.length > 0) {
        var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!prefersReduced) {
            revealTargets.forEach(function (el) { el.classList.add('reveal'); });

            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

            revealTargets.forEach(function (el) { observer.observe(el); });
        }
    }

    // ===== Back to Top Button =====
    var backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', function () {
            backToTop.classList.toggle('visible', window.scrollY > 400);
        }, { passive: true });

        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
})();
