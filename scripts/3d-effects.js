
// 3D Effects and Interactions

// Initialize all 3D effects
function initialize3DEffects() {
    initializeTiltCards();
    initialize3DCube();
    initializeParallax3D();
    initializeHover3D();
    console.log('3D effects initialized');
}

// Tilt card effect
function initializeTiltCards() {
    const tiltCards = document.querySelectorAll('[data-tilt]');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', handleTilt);
        card.addEventListener('mouseleave', resetTilt);
    });
}

function handleTilt(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const rotateX = (mouseY / (rect.height / 2)) * -10;
    const rotateY = (mouseX / (rect.width / 2)) * 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    card.style.transition = 'transform 0.1s ease';
}

function resetTilt(e) {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    card.style.transition = 'transform 0.3s ease';
}

// Enhanced 3D cube animation
function initialize3DCube() {
    const cube = document.querySelector('.cube');
    if (!cube) return;
    
    let isHovered = false;
    
    cube.addEventListener('mouseenter', () => {
        isHovered = true;
        cube.style.animationPlayState = 'paused';
    });
    
    cube.addEventListener('mouseleave', () => {
        isHovered = false;
        cube.style.animationPlayState = 'running';
    });
    
    cube.addEventListener('mousemove', (e) => {
        if (!isHovered) return;
        
        const rect = cube.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const mouseX = (e.clientX - centerX) / (rect.width / 2);
        const mouseY = (e.clientY - centerY) / (rect.height / 2);
        
        const rotateY = mouseX * 30;
        const rotateX = -mouseY * 30;
        
        cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
}

// 3D Parallax scrolling effect
function initializeParallax3D() {
    const parallaxElements = document.querySelectorAll('.parallax-layer');
    
    if (parallaxElements.length === 0) return;
    
    window.addEventListener('scroll', throttle(() => {
        const scrollTop = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrollTop * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }, 16));
}

// Advanced hover 3D effects
function initializeHover3D() {
    const hover3DElements = document.querySelectorAll('.interactive-3d');
    
    hover3DElements.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            const target = e.currentTarget;
            target.style.transition = 'transform 0.3s ease';
            target.style.transform = 'perspective(1000px) rotateY(10deg) rotateX(10deg) translateZ(20px)';
        });
        
        element.addEventListener('mouseleave', (e) => {
            const target = e.currentTarget;
            target.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)';
        });
        
        element.addEventListener('mousedown', (e) => {
            const target = e.currentTarget;
            target.style.transform = 'perspective(1000px) rotateY(5deg) rotateX(5deg) translateZ(10px)';
        });
        
        element.addEventListener('mouseup', (e) => {
            const target = e.currentTarget;
            target.style.transform = 'perspective(1000px) rotateY(10deg) rotateX(10deg) translateZ(20px)';
        });
    });
}

// Create 3D geometric shapes dynamically
function create3DShape(type, container) {
    const shape = document.createElement('div');
    shape.className = `shape-3d ${type}`;
    
    switch (type) {
        case 'pyramid':
            shape.innerHTML = `
                <div class="pyramid-face front"></div>
                <div class="pyramid-face back"></div>
                <div class="pyramid-face left"></div>
                <div class="pyramid-face right"></div>
            `;
            break;
        
        case 'octahedron':
            shape.innerHTML = `
                <div class="octa-face face-1"></div>
                <div class="octa-face face-2"></div>
                <div class="octa-face face-3"></div>
                <div class="octa-face face-4"></div>
                <div class="octa-face face-5"></div>
                <div class="octa-face face-6"></div>
                <div class="octa-face face-7"></div>
                <div class="octa-face face-8"></div>
            `;
            break;
        
        case 'sphere':
            shape.classList.add('sphere');
            break;
    }
    
    if (container) {
        container.appendChild(shape);
    }
    
    return shape;
}

// 3D Text effect
function apply3DTextEffect(element, text) {
    if (!element) return;
    
    element.innerHTML = '';
    const letters = text.split('');
    
    letters.forEach((letter, index) => {
        const span = document.createElement('span');
        span.textContent = letter === ' ' ? '\u00A0' : letter;
        span.style.display = 'inline-block';
        span.style.transition = 'transform 0.3s ease';
        span.style.transformStyle = 'preserve-3d';
        
        span.addEventListener('mouseenter', () => {
            span.style.transform = 'perspective(500px) rotateY(15deg) rotateX(15deg) translateZ(20px)';
        });
        
        span.addEventListener('mouseleave', () => {
            span.style.transform = 'perspective(500px) rotateY(0deg) rotateX(0deg) translateZ(0px)';
        });
        
        setTimeout(() => {
            span.style.animation = `slideInUp 0.6s ease forwards`;
            span.style.animationDelay = `${index * 0.05}s`;
        }, 100);
        
        element.appendChild(span);
    });
}

// 3D Card flip animation
function initializeFlipCards() {
    const flipCards = document.querySelectorAll('.flip-card');
    
    flipCards.forEach(card => {
        let isFlipped = false;
        
        card.addEventListener('click', () => {
            const inner = card.querySelector('.flip-card-inner');
            isFlipped = !isFlipped;
            
            if (isFlipped) {
                inner.style.transform = 'rotateY(180deg)';
            } else {
                inner.style.transform = 'rotateY(0deg)';
            }
        });
    });
}

// 3D Morphing shapes
function createMorphingShape(container) {
    const shape = document.createElement('div');
    shape.className = 'morphing-shape';
    shape.style.cssText = `
        width: 100px;
        height: 100px;
        background: linear-gradient(45deg, var(--primary-neon), var(--secondary-neon));
        border-radius: 10px;
        transform-style: preserve-3d;
        transition: all 2s ease;
        animation: morph 4s ease-in-out infinite;
    `;
    
    // Add morphing keyframes dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes morph {
            0%, 100% {
                border-radius: 10px;
                transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
            }
            25% {
                border-radius: 50%;
                transform: rotateX(90deg) rotateY(0deg) rotateZ(0deg);
            }
            50% {
                border-radius: 0px;
                transform: rotateX(90deg) rotateY(90deg) rotateZ(0deg);
            }
            75% {
                border-radius: 50%;
                transform: rotateX(0deg) rotateY(90deg) rotateZ(90deg);
            }
        }
    `;
    
    document.head.appendChild(style);
    container.appendChild(shape);
    
    return shape;
}

// 3D Scene management
class Scene3D {
    constructor(container) {
        this.container = container;
        this.objects = [];
        this.animationId = null;
        this.isRunning = false;
    }
    
    addObject(object) {
        this.objects.push(object);
        this.container.appendChild(object.element);
    }
    
    removeObject(object) {
        const index = this.objects.indexOf(object);
        if (index > -1) {
            this.objects.splice(index, 1);
            this.container.removeChild(object.element);
        }
    }
    
    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.animate();
    }
    
    stop() {
        this.isRunning = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
    
    animate() {
        if (!this.isRunning) return;
        
        this.objects.forEach(object => {
            if (object.update) {
                object.update();
            }
        });
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
}

// 3D Object class
class Object3D {
    constructor(element) {
        this.element = element;
        this.rotation = { x: 0, y: 0, z: 0 };
        this.position = { x: 0, y: 0, z: 0 };
        this.scale = { x: 1, y: 1, z: 1 };
    }
    
    rotate(x, y, z) {
        this.rotation.x += x;
        this.rotation.y += y;
        this.rotation.z += z;
        this.updateTransform();
    }
    
    translate(x, y, z) {
        this.position.x += x;
        this.position.y += y;
        this.position.z += z;
        this.updateTransform();
    }
    
    setScale(x, y, z) {
        this.scale.x = x;
        this.scale.y = y || x;
        this.scale.z = z || x;
        this.updateTransform();
    }
    
    updateTransform() {
        const { rotation, position, scale } = this;
        this.element.style.transform = `
            perspective(1000px)
            translateX(${position.x}px)
            translateY(${position.y}px)
            translateZ(${position.z}px)
            rotateX(${rotation.x}deg)
            rotateY(${rotation.y}deg)
            rotateZ(${rotation.z}deg)
            scaleX(${scale.x})
            scaleY(${scale.y})
            scaleZ(${scale.z})
        `;
    }
    
    update() {
        // Override in subclasses for custom animation
    }
}

// Export functions for use in other scripts
window.Scene3D = Scene3D;
window.Object3D = Object3D;
window.create3DShape = create3DShape;
window.apply3DTextEffect = apply3DTextEffect;
