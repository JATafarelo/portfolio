// particles.js — efeito rede neural
particlesJS('particles-js', {
  particles: {
    number: {
      value: 50,
      density: { enable: true, value_area: 800 }
    },
    color: { value: "#00ff00" },
    shape: {
      type: "circle",
      stroke: { width: 0, color: "#000000" }
    },
    opacity: {
      value: 0.7,
      random: true,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0.3,
        sync: false
      }
    },
    size: {
      value: 5,
      random: true,
      anim: {
        enable: true,
        speed: 2,
        size_min: 1,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 200,
      color: "#00ff00",
      opacity: 0.8,
      width: 2
    },
    move: {
      enable: true,
      speed: 1.2,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "bounce",
      attract: {
        enable: true,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "grab"
      },
      onclick: {
        enable: true,
        mode: "push"
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 250,
        line_linked: { opacity: 1 }
      },
      push: { particles_nb: 4 }
    }
  },
  retina_detect: true
});
