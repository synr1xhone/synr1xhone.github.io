// Ce script charge la configuration des particules lorsque le DOM est prêt.

window.addEventListener('DOMContentLoaded', (event) => {
    tsParticles.load("particles-js", {
        "fullScreen": {
            "enable": false // Important : définir sur false pour que les particules restent dans leur conteneur
        },
        "particles": {
            "number": {
                "value": 80, // Nombre de particules, n'en mettez pas trop
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff" // Couleur des particules
            },
            "shape": {
                "type": "circle"
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2, // Vitesse de déplacement
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "repulse" // Effet lorsque la souris passe dessus
                },
                "onclick": {
                    "enable": true,
                    "mode": "push" // Effet au clic de la souris
                },
                "resize": true
            },
            "modes": {
                "repulse": {
                    "distance": 100,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                }
            }
        },
        "retina_detect": true
    });
});
