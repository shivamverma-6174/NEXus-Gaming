
// Advanced Animation System for NeonGaming

class AnimationManager {
    constructor() {
        this.animations = new Map();
        this.timelines = new Map();
        this.observers = new Map();
        this.init();
    }
    
    init() {
        this.setupScrollAnimations();
        this.setupHoverAnimations();
        this.setupClickAnimations();
        this.setupPageTransitions();
        console.log('Animation Manager initialized');
    }
    
    // Scroll-based animations
    setupScrollAnimations() {
        const options = {
            threshold: [0, 0.25, 0.5, 0.75, 1],
            rootMargin: '-10% 0px -10% 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const element = entry.target;
                const ratio = entry.intersectionRatio;
                
                if (entry.isIntersecting) {
                    this.triggerScrollAnimation(element, ratio);
                }
            });
        }, options);
        
        // Observe elements with scroll animations
        document.querySelectorAll('[data-scroll-animation]').forEach(el => {
            observer.observe(el);
        });
        
        this.observers.set('scroll', observer);
    }
    
    triggerScrollAnimation(element, ratio) {
        const animationType = element.dataset.scrollAnimation;
        
        switch (animationType) {
            case 'fade-in':
                this.fadeIn(element, ratio);
                break;
            case 'slide-up':
                this.slideUp(element, ratio);
                break;
            case 'scale-in':
                this.scaleIn(element, ratio);
                break;
            case 'rotate-in':
                this.rotateIn(element, ratio);
                break;
            case 'glow-pulse':
                this.glowPulse(element);
                break;
        }
    }
    
    // Animation methods
    fadeIn(element, ratio = 1) {
        element.style.opacity = ratio;
        element.style.transform = `translateY(${(1 - ratio) * 50}px)`;
    }
    
    slideUp(element, ratio = 1) {
        element.style.opacity = ratio;
        element.style.transform = `translateY(${(1 - ratio) * 100}px)`;
    }
    
    scaleIn(element, ratio = 1) {
        const scale = 0.8 + (ratio * 0.2);
        element.style.opacity = ratio;
        element.style.transform = `scale(${scale})`;
    }
    
    rotateIn(element, ratio = 1) {
        const rotation = (1 - ratio) * 180;
        element.style.opacity = ratio;
        element.style.transform = `rotateY(${rotation}deg)`;
    }
    
    glowPulse(element) {
        if (!element.classList.contains('glow-animated')) {
            element.classList.add('glow-animated');
            element.style.animation = 'glow 2s ease-in-out infinite';
        }
    }
    
    // Hover animations
    setupHoverAnimations() {
        document.querySelectorAll('[data-hover-animation]').forEach(element => {
            const animationType = element.dataset.hoverAnimation;
            
            element.addEventListener('mouseenter', () => {
                this.triggerHoverAnimation(element, animationType, 'enter');
            });
            
            element.addEventListener('mouseleave', () => {
                this.triggerHoverAnimation(element, animationType, 'leave');
            });
        });
    }
    
    triggerHoverAnimation(element, type, phase) {
        switch (type) {
            case 'lift':
                this.liftAnimation(element, phase);
                break;
            case 'glow':
                this.glowAnimation(element, phase);
                break;
            case 'rotate':
                this.rotateAnimation(element, phase);
                break;
            case 'scale':
                this.scaleAnimation(element, phase);
                break;
            case 'neon-border':
                this.neonBorderAnimation(element, phase);
                break;
        }
    }
    
    liftAnimation(element, phase) {
        if (phase === 'enter') {
            element.style.transform = 'translateY(-10px) translateZ(20px)';
            element.style.boxShadow = '0 20px 40px rgba(0, 255, 255, 0.3)';
        } else {
            element.style.transform = 'translateY(0) translateZ(0)';
            element.style.boxShadow = '0 5px 15px rgba(0, 255, 255, 0.2)';
        }
    }
    
    glowAnimation(element, phase) {
        if (phase === 'enter') {
            element.style.boxShadow = '0 0 30px var(--primary-neon), 0 0 60px var(--primary-neon)';
            element.style.textShadow = '0 0 20px var(--primary-neon)';
        } else {
            element.style.boxShadow = '0 0 10px var(--primary-neon)';
            element.style.textShadow = '0 0 5px var(--primary-neon)';
        }
    }
    
    rotateAnimation(element, phase) {
        if (phase === 'enter') {
            element.style.transform = 'rotateY(5deg) rotateX(5deg)';
        } else {
            element.style.transform = 'rotateY(0deg) rotateX(0deg)';
        }
    }
    
    scaleAnimation(element, phase) {
        if (phase === 'enter') {
            element.style.transform = 'scale(1.05)';
        } else {
            element.style.transform = 'scale(1)';
        }
    }
    
    neonBorderAnimation(element, phase) {
        if (phase === 'enter') {
            element.style.animation = 'neonBorder 2s ease-in-out infinite';
        } else {
            element.style.animation = '';
        }
    }
    
    // Click animations
    setupClickAnimations() {
        document.querySelectorAll('[data-click-animation]').forEach(element => {
            element.addEventListener('click', (e) => {
                const animationType = element.dataset.clickAnimation;
                this.triggerClickAnimation(element, animationType, e);
            });
        });
    }
    
    triggerClickAnimation(element, type, event) {
        switch (type) {
            case 'ripple':
                this.rippleEffect(element, event);
                break;
            case 'pulse':
                this.pulseEffect(element);
                break;
            case 'explosion':
                this.explosionEffect(element, event);
                break;
            case 'shake':
                this.shakeEffect(element);
                break;
        }
    }
    
    rippleEffect(element, event) {
        const rect = element.getBoundingClientRect();
        const ripple = document.createElement('div');
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(0, 255, 255, 0.5) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            animation: ripple 0.6s ease-out;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }
    
    pulseEffect(element) {
        element.style.animation = 'pulse 0.3s ease';
        setTimeout(() => {
            element.style.animation = '';
        }, 300);
    }
    
    explosionEffect(element, event) {
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        // Use the global explosion function
        if (window.createExplosion) {
            window.createExplosion(event.clientX, event.clientY);
        }
    }
    
    shakeEffect(element) {
        element.style.animation = 'shake 0.5s ease';
        setTimeout(() => {
            element.style.animation = '';
        }, 500);
    }
    
    // Page transitions
    setupPageTransitions() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                0% {
                    transform: scale(0);
                    opacity: 1;
                }
                100% {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                20%, 40%, 60%, 80% { transform: translateX(5px); }
            }
            
            .page-enter {
                opacity: 0;
                transform: translateY(30px) scale(0.95);
            }
            
            .page-enter-active {
                opacity: 1;
                transform: translateY(0) scale(1);
                transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            
            .page-exit {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
            
            .page-exit-active {
                opacity: 0;
                transform: translateY(-30px) scale(0.95);
                transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
        `;
        document.head.appendChild(style);
    }
    
    // Timeline animations
    createTimeline(name) {
        const timeline = {
            animations: [],
            duration: 0,
            delay: 0,
            playing: false
        };
        
        this.timelines.set(name, timeline);
        return this.getTimelineAPI(name);
    }
    
    getTimelineAPI(name) {
        return {
            add: (element, properties, duration, delay = 0) => {
                const timeline = this.timelines.get(name);
                timeline.animations.push({
                    element,
                    properties,
                    duration,
                    delay: timeline.duration + delay
                });
                timeline.duration += duration + delay;
                return this.getTimelineAPI(name);
            },
            
            play: () => {
                const timeline = this.timelines.get(name);
                timeline.playing = true;
                
                timeline.animations.forEach(anim => {
                    setTimeout(() => {
                        this.animateElement(anim.element, anim.properties, anim.duration);
                    }, anim.delay);
                });
                
                return this.getTimelineAPI(name);
            },
            
            pause: () => {
                // Implementation for pause
                return this.getTimelineAPI(name);
            },
            
            reverse: () => {
                // Implementation for reverse
                return this.getTimelineAPI(name);
            }
        };
    }
    
    animateElement(element, properties, duration) {
        const keyframes = [];
        const fromProps = {};
        const toProps = {};
        
        Object.keys(properties).forEach(prop => {
            const computedStyle = window.getComputedStyle(element);
            fromProps[prop] = computedStyle[prop] || properties[prop].from || '0';
            toProps[prop] = properties[prop].to || properties[prop];
        });
        
        keyframes.push(fromProps);
        keyframes.push(toProps);
        
        element.animate(keyframes, {
            duration: duration,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            fill: 'forwards'
        });
    }
    
    // Particle text effect
    createParticleText(element, text) {
        const letters = text.split('');
        element.innerHTML = '';
        
        letters.forEach((letter, index) => {
            const span = document.createElement('span');
            span.textContent = letter === ' ' ? '\u00A0' : letter;
            span.style.cssText = `
                display: inline-block;
                opacity: 0;
                transform: translateY(50px) rotateX(90deg);
                transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            `;
            
            element.appendChild(span);
            
            setTimeout(() => {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0) rotateX(0)';
            }, index * 50 + 100);
        });
    }
    
    // Morphing shapes animation
    createMorphingBackground(container) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.zIndex = '-1';
        
        container.appendChild(canvas);
        
        const shapes = [];
        for (let i = 0; i < 5; i++) {
            shapes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                size: Math.random() * 100 + 50,
                color: `hsla(${Math.random() * 360}, 70%, 50%, 0.1)`
            });
        }
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            shapes.forEach(shape => {
                shape.x += shape.vx;
                shape.y += shape.vy;
                
                if (shape.x < 0 || shape.x > canvas.width) shape.vx *= -1;
                if (shape.y < 0 || shape.y > canvas.height) shape.vy *= -1;
                
                ctx.beginPath();
                ctx.arc(shape.x, shape.y, shape.size, 0, Math.PI * 2);
                ctx.fillStyle = shape.color;
                ctx.fill();
            });
            
            requestAnimationFrame(animate);
        }
        
        animate();
    }
}

// Initialize animation system
function initializeAnimations() {
    const animationManager = new AnimationManager();
    
    // Add scroll animation attributes to elements
    document.querySelectorAll('.game-card').forEach((card, index) => {
        card.setAttribute('data-scroll-animation', 'fade-in');
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    document.querySelectorAll('.hero-title').forEach(title => {
        title.setAttribute('data-scroll-animation', 'scale-in');
    });
    
    document.querySelectorAll('.section-title').forEach(title => {
        title.setAttribute('data-scroll-animation', 'glow-pulse');
    });
    
    // Add hover animations
    document.querySelectorAll('.btn').forEach(btn => {
        btn.setAttribute('data-hover-animation', 'lift');
        btn.setAttribute('data-click-animation', 'ripple');
    });
    
    document.querySelectorAll('.game-card').forEach(card => {
        card.setAttribute('data-hover-animation', 'glow');
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.setAttribute('data-hover-animation', 'neon-border');
    });
    
    console.log('Advanced animations initialized');
    
    return animationManager;
}

// Export for global use
window.AnimationManager = AnimationManager;
window.initializeAnimations = initializeAnimations;
