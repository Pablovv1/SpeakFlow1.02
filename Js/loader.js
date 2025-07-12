class Loader {
    constructor() {
        this.loaderContainer = document.querySelector('.loader-container');
        this.particlesContainer = document.querySelector('.loader-particles');
        this.init();
    }

    init() {
        // Crear partículas dinámicamente
        this.createParticles();
        
        // Simular carga de recursos
        this.simulateLoading();
        
        // Añadir eventos de carga real
        window.addEventListener('load', () => this.hideLoader());
    }

    createParticles() {
        const particleCount = 15;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Posición aleatoria
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            particle.style.left = `${x}%`;
            particle.style.top = `${y}%`;
            
            // Tamaño aleatorio
            const size = Math.random() * 4 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Retraso de animación aleatorio
            particle.style.animationDelay = `${Math.random() * 2}s`;
            
            this.particlesContainer.appendChild(particle);
        }
    }

    simulateLoading() {
        // Simular tiempo de carga mínimo
        const minLoadTime = 1500;
        const startTime = Date.now();
        
        const checkLoadTime = () => {
            const elapsedTime = Date.now() - startTime;
            if (elapsedTime >= minLoadTime) {
                this.hideLoader();
            } else {
                requestAnimationFrame(checkLoadTime);
            }
        };
        
        checkLoadTime();
    }

    hideLoader() {
        // Añadir clase para la animación de salida
        this.loaderContainer.classList.add('fade-out');
        
        // Remover el loader después de la animación
        setTimeout(() => {
            this.loaderContainer.remove();
        }, 500);
    }
}

// Inicializar el loader cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new Loader();
}); 