let scene, camera, renderer, particles, particleSystem, particlePositions, particleSpeeds;

init();
animate();

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 400;

    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    particles = new THREE.BufferGeometry();
    let particleCount = 10000;
    particlePositions = new Float32Array(particleCount * 3);
    particleSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
        particlePositions[i * 3] = Math.random() * 1000 - 500;
        particlePositions[i * 3 + 1] = Math.random() * 1000 - 500;
        particlePositions[i * 3 + 2] = Math.random() * 1000 - 500;

        particleSpeeds[i] = Math.random() * 0.02 + 0.02;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    let particleMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 2,
        transparent: true,
        opacity: 0.7
    });

    particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

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
    camera.position.x = mouseX * 100;
    camera.position.y = mouseY * 100;
}

function animate() {
    requestAnimationFrame(animate);

    let positions = particles.attributes.position.array;
    for (let i = 0; i < particlePositions.length; i++) {
        particlePositions[i * 3 + 1] += particleSpeeds[i];
        if (particlePositions[i * 3 + 1] > 500) {
            particlePositions[i * 3 + 1] = -500;
        }
    }
    particles.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
}
