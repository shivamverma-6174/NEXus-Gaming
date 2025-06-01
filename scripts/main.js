
// Main JavaScript functionality for NEXUS Gaming

class NexusGaming {
    constructor() {
        this.currentPage = 'home';
        this.games = [
            {
                id: 1,
                title: 'Cyber City',
                category: 'action',
                description: 'Explore a futuristic cyberpunk metropolis with stunning 3D graphics and immersive gameplay.',
                rating: 4.8,
                image: 'cyber-city'
            },
            {
                id: 2,
                title: 'Neon Racing',
                category: 'racing',
                description: 'High-speed racing through neon-lit tracks with realistic physics and dynamic weather.',
                rating: 4.6,
                image: 'neon-racing'
            },
            {
                id: 3,
                title: 'Space Wars',
                category: 'space',
                description: 'Epic space battles with advanced AI and stunning visual effects in deep space.',
                rating: 4.9,
                image: 'space-wars'
            },
            {
                id: 4,
                title: 'Quantum Strategy',
                category: 'strategy',
                description: 'Mind-bending strategy game with time manipulation and quantum mechanics.',
                rating: 4.7,
                image: 'quantum-strategy'
            },
            {
                id: 5,
                title: 'Mech Warriors',
                category: 'action',
                description: 'Control giant mechs in intense combat scenarios with destructible environments.',
                rating: 4.5,
                image: 'mech-warriors'
            },
            {
                id: 6,
                title: 'Racing Legends',
                category: 'racing',
                description: 'Epic space battles with advanced AI and stunning visual effects in deep space.',
                rating: 4.9,
                image: 'racing-legends'
            },
            
        ];
        
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupMobileMenu();
        this.setupGameFilters();
        this.setupHeroButtons();
        this.loadGames();
        this.setupScrollEffects();
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const pages = document.querySelectorAll('.page');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetPage = link.getAttribute('href').substring(1);
                this.showPage(targetPage);
                
                // Update active nav link
                navLinks.forEach(nl => nl.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }

    setupMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    setupGameFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                this.filterGames(filter);
                
                // Update active filter button
                filterBtns.forEach(fb => fb.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }

    setupHeroButtons() {
        const playNowBtn = document.querySelector('.btn-primary');
        const exploreBtn = document.querySelector('.btn-secondary');

        if (playNowBtn) {
            playNowBtn.addEventListener('click', () => {
                this.showPage('games');
                document.querySelector('.nav-link[href="#games"]').classList.add('active');
                document.querySelectorAll('.nav-link').forEach(link => {
                    if (link.getAttribute('href') !== '#games') {
                        link.classList.remove('active');
                    }
                });
            });
        }

        if (exploreBtn) {
            exploreBtn.addEventListener('click', () => {
                document.querySelector('#games').scrollIntoView({ behavior: 'smooth' });
            });
        }
    }

    showPage(pageId) {
        const pages = document.querySelectorAll('.page');
        pages.forEach(page => {
            page.classList.remove('active');
        });
        
        const targetPage = document.querySelector(`#${pageId}`);
        if (targetPage) {
            targetPage.classList.add('active');
            this.currentPage = pageId;
        }
    }

    filterGames(category) {
        const gameCards = document.querySelectorAll('.game-card');
        
        gameCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            if (category === 'all' || cardCategory === category) {
                card.style.display = 'block';
                card.classList.add('fade-in');
            } else {
                card.style.display = 'none';
                card.classList.remove('fade-in');
            }
        });
    }

    loadGames() {
        const gamesGrid = document.querySelector('#games .games-grid');
        if (!gamesGrid) return;

        gamesGrid.innerHTML = '';
        
        this.games.forEach(game => {
            const gameCard = this.createGameCard(game);
            gamesGrid.appendChild(gameCard);
        });
    }

    createGameCard(game) {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.setAttribute('data-category', game.category);
        
        const stars = '★'.repeat(Math.floor(game.rating)) + '☆'.repeat(5 - Math.floor(game.rating));
        
        card.innerHTML = `
            <div class="game-image">
                <div class="game-preview ${game.image}"></div>
            </div>
            <div class="game-info">
                <h3>${game.title}</h3>
                <p>${game.description}</p>
                <div class="game-rating">
                    <div class="stars">${stars}</div>
                    <span class="rating-text">${game.rating}/5</span>
                </div>
            </div>
        `;

        // Add click event for game interaction
        card.addEventListener('click', () => {
            this.playGame(game);
        });

        return card;
    }

    playGame(game) {
        alert(`Starting ${game.title}! This would launch the game in a real implementation.`);
    }

    setupScrollEffects() {
        // Add scroll-based animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.game-card, .tech-item, .stat').forEach(el => {
            observer.observe(el);
        });
    }

    // Utility method to update profile stats
    updateProfileStats() {
        const stats = {
            gamesPlayed: Math.floor(Math.random() * 2000) + 1000,
            winRate: Math.floor(Math.random() * 20) + 80,
            achievements: Math.floor(Math.random() * 100) + 100
        };

        document.querySelector('.stat-value').textContent = stats.gamesPlayed.toLocaleString();
        document.querySelectorAll('.stat-value')[1].textContent = `${stats.winRate}%`;
        document.querySelectorAll('.stat-value')[2].textContent = stats.achievements;
    }
}

// Additional CSS for new game previews
const additionalStyles = `


.fade-in {
    animation: fadeIn 0.6s ease-out forwards;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.game-card {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.3s ease;
}

.game-card.fade-in {
    opacity: 1;
    transform: translateY(0);
}
`;

// Inject additional styles
const style = document.createElement('style');
style.textContent = additionalStyles;
document.head.appendChild(style);

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new NexusGaming();
    
    // Update profile stats periodically
    setInterval(() => {
        if (app.currentPage === 'profile') {
            app.updateProfileStats();
        }
    }, 5000);
});

// Add some interactive effects
document.addEventListener('mousemove', (e) => {
    const cursor = { x: e.clientX, y: e.clientY };
    
    // Add parallax effect to hero background
    const hero = document.querySelector('.hero-background');
    if (hero) {
        const x = (cursor.x / window.innerWidth) * 100;
        const y = (cursor.y / window.innerHeight) * 100;
        hero.style.transform = `translate3d(${x * 0.1}px, ${y * 0.1}px, 0)`;
    }
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        document.querySelector('.hamburger').classList.remove('active');
        document.querySelector('.nav-menu').classList.remove('active');
    }
});












// script.js
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('hologramCanvas');
    const context = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 400;

    function drawOctoid() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.strokeStyle = 'rgba(0, 255, 255, 0.8)';
        context.lineWidth = 4;
        context.beginPath();
        
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 120;
        
        for (let i = 0; i < 8; i++) {
            const angle = i * (Math.PI / 4);
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            context.lineTo(x, y);
        }
        
        context.closePath();
        context.stroke();
    }

    function animateHologram() {
        drawOctoid();
        context.globalCompositeOperation = "lighter";
        context.shadowBlur = 20;
        context.shadowColor = "cyan";
        requestAnimationFrame(animateHologram);
    }

    animateHologram();
});