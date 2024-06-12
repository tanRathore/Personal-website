// Interactive background with Three.js
let scene, camera, renderer;
let particles, particleGeometry, particleMaterial;
let particleCount = 500;

init();
animate();

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;

    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    particleGeometry = new THREE.BufferGeometry();
    let positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() * 2 - 1) * 50;
        positions[i * 3 + 1] = (Math.random() * 2 - 1) * 50;
        positions[i * 3 + 2] = (Math.random() * 2 - 1) * 50;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    particleMaterial = new THREE.PointsMaterial({ color: 0x00ffcc, size: 0.5 });
    particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('mousemove', onDocumentMouseMove, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
    let mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    let mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    particles.rotation.x = mouseY * 0.2;
    particles.rotation.y = mouseX * 0.2;
}

function animate() {
    requestAnimationFrame(animate);
    particles.rotation.z += 0.002;
    renderer.render(scene, camera);
}
