
// Particle System for NeonGaming

class ParticleSystem {
    constructor(container, options = {}) {
        this.container = container;
        this.particles = [];
        this.options = {
            count: options.count || 50,
            speed: options.speed || 1,
            size: options.size || 2,
            color: options.color || '#00ffff',
            direction: options.direction || 'up',
            life: options.life || 5000,
            gravity: options.gravity || 0.1,
            ...options
        };
        
        this.animationId = null;
        this.isRunning = false;
        
        this.init();
    }
    
    init() {
        this.createParticles();
        this.start();
    }
    
    createParticles() {
        for (let i = 0; i < this.options.count; i++) {
            this.createParticle();
        }
    }
    
    createParticle() {
        const particle = {
            element: document.createElement('div'),
            x: Math.random() * this.container.clientWidth,
            y: Math.random() * this.container.clientHeight,
            vx: (Math.random() - 0.5) * this.options.speed,
            vy: (Math.random() - 0.5) * this.options.speed,
            life: this.options.life,
            maxLife: this.options.life,
            size: this.options.size + Math.random() * this.options.size
        };
        
        particle.element.className = 'particle';
        particle.element.style.cssText = `
            position: absolute;
            width: ${particle.size}px;
            height: ${particle.size}px;
            background: ${this.options.color};
            border-radius: 50%;
            pointer-events: none;
            filter: blur(0.5px);
            box-shadow: 0 0 ${particle.size * 2}px ${this.options.color};
        `;
        
        this.container.appendChild(particle.element);
        this.particles.push(particle);
        
        return particle;
    }
    
    updateParticle(particle) {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Apply gravity
        particle.vy += this.options.gravity;
        
        // Update life
        particle.life -= 16; // Assuming 60fps
        
        // Update opacity based on life
        const opacity = particle.life / particle.maxLife;
        
        // Update element
        particle.element.style.left = particle.x + 'px';
        particle.element.style.top = particle.y + 'px';
        particle.element.style.opacity = opacity;
        
        // Boundary checking
        if (particle.x < 0 || particle.x > this.container.clientWidth ||
            particle.y < 0 || particle.y > this.container.clientHeight ||
            particle.life <= 0) {
            this.resetParticle(particle);
        }
    }
    
    resetParticle(particle) {
        particle.x = Math.random() * this.container.clientWidth;
        particle.y = -10;
        particle.vx = (Math.random() - 0.5) * this.options.speed;
        particle.vy = Math.random() * this.options.speed + 0.5;
        particle.life = particle.maxLife;
    }
    
    animate() {
        if (!this.isRunning) return;
        
        this.particles.forEach(particle => {
            this.updateParticle(particle);
        });
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    start() {
        this.isRunning = true;
        this.animate();
    }
    
    stop() {
        this.isRunning = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
    
    destroy() {
        this.stop();
        this.particles.forEach(particle => {
            if (particle.element.parentNode) {
                particle.element.parentNode.removeChild(particle.element);
            }
        });
        this.particles = [];
    }
}

// Specialized particle effects
class NeonParticles extends ParticleSystem {
    constructor(container, options = {}) {
        super(container, {
            count: 30,
            speed: 0.5,
            size: 1,
            color: '#00ffff',
            gravity: 0.02,
            ...options
        });
    }
    
    createParticle() {
        const particle = super.createParticle();
        
        // Add neon glow effect
        particle.element.style.boxShadow = `
            0 0 ${particle.size * 3}px ${this.options.color},
            0 0 ${particle.size * 6}px ${this.options.color}
        `;
        
        return particle;
    }
}

class FloatingParticles extends ParticleSystem {
    constructor(container, options = {}) {
        super(container, {
            count: 20,
            speed: 0.3,
            size: 3,
            color: '#ff0080',
            gravity: -0.01,
            ...options
        });
    }
    
    updateParticle(particle) {
        // Add floating motion
        particle.x += Math.sin(Date.now() * 0.001 + particle.x * 0.01) * 0.5;
        particle.y += particle.vy;
        
        // Update life
        particle.life -= 16;
        
        // Update opacity
        const opacity = particle.life / particle.maxLife;
        
        // Update element
        particle.element.style.left = particle.x + 'px';
        particle.element.style.top = particle.y + 'px';
        particle.element.style.opacity = opacity;
        particle.element.style.transform = `scale(${opacity})`;
        
        // Boundary checking
        if (particle.y < -50 || particle.life <= 0) {
            this.resetParticle(particle);
        }
    }
    
    resetParticle(particle) {
        particle.x = Math.random() * this.container.clientWidth;
        particle.y = this.container.clientHeight + 50;
        particle.vy = -Math.random() * 0.5 - 0.2;
        particle.life = particle.maxLife;
    }
}

class SparkleEffect extends ParticleSystem {
    constructor(container, options = {}) {
        super(container, {
            count: 15,
            speed: 2,
            size: 2,
            color: '#39ff14',
            life: 2000,
            ...options
        });
    }
    
    createParticle() {
        const particle = super.createParticle();
        
        // Random sparkle positions
        particle.x = Math.random() * this.container.clientWidth;
        particle.y = Math.random() * this.container.clientHeight;
        particle.vx = 0;
        particle.vy = 0;
        
        // Sparkle animation
        particle.element.style.animation = 'sparkle 2s ease-in-out infinite';
        
        return particle;
    }
    
    updateParticle(particle) {
        particle.life -= 16;
        
        if (particle.life <= 0) {
            this.resetParticle(particle);
        }
    }
    
    resetParticle(particle) {
        particle.x = Math.random() * this.container.clientWidth;
        particle.y = Math.random() * this.container.clientHeight;
        particle.life = particle.maxLife;
        
        particle.element.style.left = particle.x + 'px';
        particle.element.style.top = particle.y + 'px';
    }
}

// Mouse trail effect
class MouseTrail {
    constructor(options = {}) {
        this.particles = [];
        this.maxParticles = options.maxParticles || 20;
        this.particleLife = options.particleLife || 1000;
        this.colors = options.colors || ['#00ffff', '#ff0080', '#39ff14'];
        
        this.bindEvents();
    }
    
    bindEvents() {
        document.addEventListener('mousemove', (e) => {
            this.createTrailParticle(e.clientX, e.clientY);
        });
    }
    
    createTrailParticle(x, y) {
        const particle = document.createElement('div');
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];
        const size = Math.random() * 4 + 2;
        
        particle.style.cssText = `
            position: fixed;
            left: ${x - size/2}px;
            top: ${y - size/2}px;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            animation: trailFade ${this.particleLife}ms ease-out forwards;
            box-shadow: 0 0 ${size * 2}px ${color};
        `;
        
        document.body.appendChild(particle);
        this.particles.push(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
            const index = this.particles.indexOf(particle);
            if (index > -1) {
                this.particles.splice(index, 1);
            }
        }, this.particleLife);
        
        // Limit number of particles
        if (this.particles.length > this.maxParticles) {
            const oldParticle = this.particles.shift();
            if (oldParticle.parentNode) {
                oldParticle.parentNode.removeChild(oldParticle);
            }
        }
    }
}

// Initialize particles system
function initializeParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    // Create multiple particle systems
    const neonParticles = new NeonParticles(particlesContainer, {
        count: 25,
        color: '#00ffff'
    });
    
    const floatingParticles = new FloatingParticles(particlesContainer, {
        count: 15,
        color: '#ff0080'
    });
    
    const sparkles = new SparkleEffect(particlesContainer, {
        count: 10,
        color: '#39ff14'
    });
    
    // Initialize mouse trail
    const mouseTrail = new MouseTrail({
        maxParticles: 15,
        particleLife: 800
    });
    
    console.log('Particle systems initialized');
    
    // Add trail fade animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes trailFade {
            0% {
                opacity: 1;
                transform: scale(1);
            }
            100% {
                opacity: 0;
                transform: scale(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    return {
        neonParticles,
        floatingParticles,
        sparkles,
        mouseTrail
    };
}

// Explosion effect
function createExplosion(x, y, container = document.body) {
    const particleCount = 20;
    const colors = ['#00ffff', '#ff0080', '#39ff14', '#ffff00'];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 6 + 2;
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = Math.random() * 150 + 50;
        
        particle.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            pointer-events: none;
            box-shadow: 0 0 ${size * 2}px ${color};
        `;
        
        container.appendChild(particle);
        
        // Animate particle
        const deltaX = Math.cos(angle) * velocity;
        const deltaY = Math.sin(angle) * velocity;
        
        particle.animate([
            {
                transform: `translate(0, 0) scale(1)`,
                opacity: 1
            },
            {
                transform: `translate(${deltaX}px, ${deltaY}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        };
    }
}

// Export for global use
window.ParticleSystem = ParticleSystem;
window.NeonParticles = NeonParticles;
window.FloatingParticles = FloatingParticles;
window.SparkleEffect = SparkleEffect;
window.MouseTrail = MouseTrail;
window.createExplosion = createExplosion;
