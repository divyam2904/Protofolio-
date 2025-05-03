// Three.js Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg'), alpha: true });

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// Torus Geometry
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xFFD700, wireframe: false });
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// Particle System
const particleGeometry = new THREE.BufferGeometry();
const particleCount = 1000; // Increase particle count for a denser effect
const posArray = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount * 3; i++) {
  posArray[i] = (Math.random() - 0.5) * 200; // Spread particles over a larger area
}

particleGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particleMaterial = new THREE.PointsMaterial({ size: 0.2, color: 0xFFD700 });
const particles = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particles);

// Lighting
const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0x404040); // Soft ambient light
scene.add(ambientLight);

// Mouse Interaction for Particles
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
  mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  // Torus rotation
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;

  // Particle rotation
  particles.rotation.y += 0.002;

  // Dynamic particle movement based on mouse
  particles.rotation.x = mouseY * 0.2;
  particles.rotation.y = mouseX * 0.2;

  renderer.render(scene, camera);
}
animate();

// Camera Animation
let scrollPosition = 0;

document.body.onscroll = () => {
  const t = document.body.getBoundingClientRect().top;
  camera.position.z = 30 + t * -0.01;
  camera.position.x = t * -0.002;
  camera.rotation.y = t * -0.002;
};

// Resize Handler
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Hover Effects on Portfolio Items
const portfolioItems = document.querySelectorAll('.video-item');

portfolioItems.forEach((item) => {
  item.addEventListener('mouseenter', () => {
    item.style.transform = 'scale(1.05)';
    item.style.transition = 'transform 0.3s ease-in-out';
  });

  item.addEventListener('mouseleave', () => {
    item.style.transform = 'scale(1)';
  });
});

// Contact Form Submission (Using Formspree)
document.getElementById('contact-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);

  try {
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      alert('Message sent successfully!');
      form.reset();
    } else {
      alert('Error sending message. Please try again.');
    }
  } catch (error) {
    alert('Error sending message. Please try again.');
  }
});