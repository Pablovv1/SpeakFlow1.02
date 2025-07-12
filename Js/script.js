// Navegación responsive
document.addEventListener('DOMContentLoaded', () => {
    // Menú móvil
    const menuToggle = document.querySelector('.menu-toggle');
    const navContent = document.querySelector('.nav-content');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navContent.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navContent.classList.remove('active');
        });
    });

    // Animación suave para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Efecto de scroll para la navbar
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            navbar.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // Animación para las tarjetas de características
    const featureCards = document.querySelectorAll('.feature-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });

    featureCards.forEach(card => {
        observer.observe(card);
    });

    // Animación para los posts del foro
    const posts = document.querySelectorAll('.post');
    posts.forEach(post => {
        post.addEventListener('mouseenter', () => {
            post.style.transform = 'translateX(10px)';
            post.style.transition = 'transform 0.3s ease';
        });

        post.addEventListener('mouseleave', () => {
            post.style.transform = 'translateX(0)';
        });
    });

    // Funcionalidad para los botones de inicio de sesión y registro
    const loginBtn = document.querySelector('.btn-login');
    const registerBtn = document.querySelector('.btn-register');

    loginBtn.addEventListener('click', () => {
        // Aquí iría la lógica para mostrar el modal de inicio de sesión
        console.log('Mostrar modal de inicio de sesión');
    });

    registerBtn.addEventListener('click', () => {
        // Aquí iría la lógica para mostrar el modal de registro
        console.log('Mostrar modal de registro');
    });

    // Animación para los números en las estadísticas
    const stats = document.querySelectorAll('.stat-number');
    const animateValue = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value + '+';
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endValue = parseInt(target.textContent);
                animateValue(target, 0, endValue, 2000);
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Funcionalidad para los botones de acción en los posts
    const postActions = document.querySelectorAll('.post-action');
    postActions.forEach(action => {
        action.addEventListener('click', (e) => {
            const icon = action.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                if (icon.classList.contains('fa-heart')) {
                    action.style.color = '#f43f5e';
                }
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                if (icon.classList.contains('fa-heart')) {
                    action.style.color = '';
                }
            }
        });
    });

    // Animación para los enlaces de características
    const featureLinks = document.querySelectorAll('.feature-link');
    featureLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            const arrow = link.querySelector('i');
            arrow.style.transform = 'translateX(5px)';
        });

        link.addEventListener('mouseleave', () => {
            const arrow = link.querySelector('i');
            arrow.style.transform = 'translateX(0)';
        });
    });

    // Botón "Comenzar Ahora"
    const startButton = document.querySelector('.btn-primary');
    startButton.addEventListener('click', () => {
        // Aquí iría la lógica para redirigir al registro o mostrar el modal
        console.log('Comenzar el proceso de registro');
    });

    // Botón "Ver Demo"
    const demoButton = document.querySelector('.btn-secondary');
    demoButton.addEventListener('click', () => {
        // Aquí iría la lógica para mostrar el demo
        console.log('Mostrar demo');
    });
}); 