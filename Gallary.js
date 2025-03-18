function createStars() {
    const starsContainer = document.querySelector('.stars');
    for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.width = Math.random() * 3 + 'px';
        star.style.height = star.style.width;
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 2 + 's';
        starsContainer.appendChild(star);
    }
}

function createHearts() {
    const heartsContainer = document.querySelector('.hearts');
    for (let i = 0; i < 50; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        
        // Random size between 5px and 15px
        const size = 5 + Math.random() * 10;
        heart.style.width = size + 'px';
        heart.style.height = size + 'px';
        
        // Set random positions and movement
        heart.style.left = Math.random() * 100 + '%';
        heart.style.bottom = -10 + 'px';
        
        // Custom properties for animation
        heart.style.setProperty('--tx', (Math.random() * 200 - 100) + 'px');
        heart.style.setProperty('--r', (Math.random() * 90 - 45) + 'deg');
        heart.style.setProperty('--s', 0.5 + Math.random() * 1.5);
        
        // Set animation duration and delay
        const duration = 10 + Math.random() * 20;
        heart.style.animationDuration = duration + 's';
        heart.style.animationDelay = Math.random() * 20 + 's';
        
        heartsContainer.appendChild(heart);
    }
}

// ...existing code...

function createGallery() {
const gallery = document.querySelector('.gallery');
const totalCards = 10;
const radius = window.innerWidth < 768 ? 400 : 600;
let currentAngle = 0;
let isDragging = false;
let startX = 0;
let currentX = 0;
let autoRotateInterval;

const prevButton = document.querySelector('.nav-button.prev');
const nextButton = document.querySelector('.nav-button.next');

// Array of image URLs
const imageUrls = [
'pic4.jpg',
'pic1.jpg',
'pic2.jpg',
'pic3.jpg',
'pic4.jpg',
'pic5.jpg',
'pic6.jpg',
'pic7.jpg',
'pic8.jpg',
'pic9.jpg'
];

// Create cards
for (let i = 0; i < totalCards; i++) {
const card = document.createElement('div');
card.className = 'card';
if (i === 0) card.classList.add('active');

// Calculate the angle of this card
const angle = (i / totalCards) * Math.PI * 2;

// Calculate position around the circle
const x = Math.sin(angle) * radius;
const z = Math.cos(angle) * radius;

// Position the card
card.style.transform = `translateX(${x}px) translateZ(${z}px)`;

// Add image element
const img = document.createElement('img');
img.src = imageUrls[i];
card.appendChild(img);

// Add number badge
const number = document.createElement('div');
number.className = 'number';
number.textContent = (i + 1).toString();
card.appendChild(number);

gallery.appendChild(card);
}

// Update rotation
function updateRotation() {
gallery.style.transform = `rotateY(${currentAngle}deg)`;

// Update active card
const cards = document.querySelectorAll('.card');
const activeIndex = Math.round((-currentAngle / 360) * totalCards) % totalCards;

cards.forEach((card, index) => {
    if (index === (activeIndex + totalCards) % totalCards) {
        card.classList.add('active');
    } else {
        card.classList.remove('active');
    }
});
}

// Navigation buttons
prevButton.addEventListener('click', () => {
currentAngle += (360 / totalCards);
updateRotation();
clearInterval(autoRotateInterval);
startAutoRotate();
});

nextButton.addEventListener('click', () => {
currentAngle -= (360 / totalCards);
updateRotation();
clearInterval(autoRotateInterval);
startAutoRotate();
});

// Touch/mouse events for dragging
document.addEventListener('mousedown', (e) => {
isDragging = true;
startX = e.clientX;
currentX = e.clientX;
clearInterval(autoRotateInterval);
document.body.style.cursor = 'grabbing';
});

document.addEventListener('touchstart', (e) => {
isDragging = true;
startX = e.touches[0].clientX;
currentX = e.touches[0].clientX;
clearInterval(autoRotateInterval);
});

document.addEventListener('mousemove', (e) => {
if (isDragging) {
    const delta = e.clientX - currentX;
    currentAngle += delta * 0.5;
    currentX = e.clientX;
    updateRotation();
}
});

document.addEventListener('touchmove', (e) => {
if (isDragging) {
    const delta = e.touches[0].clientX - currentX;
    currentAngle += delta * 0.5;
    currentX = e.touches[0].clientX;
    updateRotation();
}
});

document.addEventListener('mouseup', () => {
isDragging = false;
document.body.style.cursor = 'default';
startAutoRotate();
});

document.addEventListener('touchend', () => {
isDragging = false;
startAutoRotate();
});

// Automatic rotation
function startAutoRotate() {
autoRotateInterval = setInterval(() => {
    currentAngle -= 0.2;
    updateRotation();
}, 30);
}

// Spotlight effect follows mouse
document.addEventListener('mousemove', (e) => {
const spotlight = document.querySelector('.spotlight');
spotlight.style.left = e.clientX + 'px';
spotlight.style.top = e.clientY + 'px';
});

// Music control
const musicToggle = document.getElementById('music-toggle');
const backgroundMusic = document.getElementById('background-music');
let isMusicPlaying = false;

musicToggle.addEventListener('click', () => {
if (isMusicPlaying) {
    backgroundMusic.pause();
    musicToggle.innerHTML = '♫';
    musicToggle.style.background = 'rgba(255, 105, 180, 0.4)';
} else {
    backgroundMusic.play();
    musicToggle.innerHTML = '◼';
    musicToggle.style.background = 'rgba(255, 105, 180, 0.7)';
}
isMusicPlaying = !isMusicPlaying;
});

// Initialize
updateRotation();
startAutoRotate();
}

// Initialize everything when the page loads
window.addEventListener('DOMContentLoaded', () => {
createStars();
createHearts();
createGallery();

// Handle resize
window.addEventListener('resize', () => {
// Recreate gallery for new screen size
document.querySelector('.gallery').innerHTML = '';
createGallery();
});
});
// ...existing code...