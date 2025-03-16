// Global variables
let isSpinning = false;
let currentSection = 'frame';
let currentFrameIndex = 0;
let frameImages = [];
let currentImageData = null;
let timerInterval;

// DOM Elements
let frameViewer, frameImage, frameCounter, frameTitle, imageName, frameOpenBtn, frameTimer;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize DOM elements
    frameViewer = document.querySelector('.frame-viewer');
    frameImage = document.querySelector('.frame-image');
    frameCounter = document.querySelector('.frame-counter');
    frameTitle = document.querySelector('.frame-title');
    imageName = document.querySelector('.image-name');
    frameOpenBtn = document.querySelector('.frame-open-btn');
    frameTimer = document.querySelector('.frame-timer');
    
    // Initialize the page
    loadSectionImages('frame');
    
    // Initialize event listeners
    initializeEventListeners();

    // Initialize slot machine
    const slotMachine = document.querySelector('.slot-machine');
    if (slotMachine) {
        initializeSlotMachine();
    } else {
        console.error('Slot machine container not found');
    }

    // Initialize referee selector
    initializeRefereeSelector();
});

// Function to shuffle array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Array of images and names
const slotImages = [
    'images/aziz.png',
    'images/vish.png',
    'images/aman.png',
    'images/amesh.png'
];
const people = [
    'Aziz',
    'Vish',
    'Aman',
    'Amesh'
];
let selectedPeople = new Set();

// Get DOM elements
const slotReel = document.querySelector('.slot-reel');
const spinButton = document.querySelector('.spin-button');

// Add styles
const style = document.createElement('style');
style.textContent = `
    .slot-machine {
        position: fixed;
        bottom: 50px;
        left: 100px;
        z-index: 1000;
        background: rgba(0, 0, 0, 0.5);
        padding: 20px;
        border-radius: 15px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    }
    .slot-container {
        margin-bottom: 20px;
    }
    .slot-window {
        width: 160px;
        height: 160px;
        overflow: hidden;
        border-radius: 10px;
        background: rgba(0, 0, 0, 0.3);
        position: relative;
    }
    .slot-reel {
        position: absolute;
        width: 100%;
        transition: transform 3s cubic-bezier(0.4, 0.0, 0.2, 1);
    }
    .slot-item {
        width: 160px;
        height: 160px;
        margin: 4px 0;
        background-size: cover;
        background-position: center;
        border-radius: 8px;
    }
    .spin-button {
        width: 80%;
        margin: 0 auto;
        padding: 10px;
        font-size: 16px;
        font-weight: 300;
        background: #4CAF50;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background 0.3s;
    }
    .spin-button:hover {
        background: #45a049;
    }
    .spin-button:disabled {
        background: #cccccc;
        cursor: not-allowed;
    }
    .notification {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        padding: 15px 30px;
        border-radius: 25px;
        color: white;
        font-size: 18px;
        font-weight: bold;
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
        animation: slideDown 0.5s ease-out;
        z-index: 1001;
    }

    @keyframes slideDown {
        from {
            transform: translate(-50%, -100%);
            opacity: 0;
        }
        to {
            transform: translate(-50%, 0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Use the existing isSpinning variable or initialize it if not defined
let currentPosition = 0;
const itemHeight = 168; // 160px height + 8px margin
const duration = 3000;

// Function to get base URL for GitHub Pages
function getBaseUrl() {
    // If running on GitHub Pages, use the repository name as the base URL
    if (window.location.hostname.includes('github.io')) {
        const pathParts = window.location.pathname.split('/');
        const repoName = pathParts[1]; // Get repository name from URL
        return `/${repoName}`;
    }
    // If running locally via file://, use an empty base
    if (window.location.protocol === 'file:') {
        return '';
    }
    return '';
}

// Function to fix image path for both local and GitHub Pages
function fixImagePath(src) {
    if (!src) return src;
    
    // Just return the path as is since we're using relative paths
    // Remove any leading './' as it's not needed
    return src.replace(/^\.\//, '');
}

// Function to preload images and verify they exist
function preloadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            console.log('Successfully loaded image:', src);
            resolve(src);
        };
        img.onerror = () => {
            console.error(`Failed to load image: ${src}`);
            reject(new Error(`Failed to load image: ${src}`));
        };
        const fixedPath = fixImagePath(src);
        console.log('Attempting to load image from:', fixedPath);
        img.src = fixedPath;
    });
}

// Function to update frame display with error handling
function updateFrameDisplay(imageData) {
    if (!imageData) {
        console.error('No image data provided to updateFrameDisplay');
        return;
    }

    console.log('Updating display with image:', imageData);

    const frameImage = document.querySelector('.frame-image');
    if (!frameImage) {
        console.error('Frame image element not found');
        return;
    }

    // Show loading state
    frameImage.style.opacity = '0.5';
    frameImage.classList.add('blurred'); // Make sure image starts blurred
    
    // Make sure the open button is visible
    if (frameOpenBtn) {
        frameOpenBtn.style.display = 'block';
    }

    // Try to load the image
    const fixedPath = fixImagePath(imageData.src);
    console.log('Loading image from path:', fixedPath);
    
    const img = new Image();
    img.onload = () => {
        console.log('Image loaded successfully:', fixedPath);
        frameImage.src = fixedPath;
        frameImage.style.opacity = '1';
        frameImage.style.display = 'block';
        
        // Update counter if needed
        if (frameCounter) {
            frameCounter.textContent = `${currentFrameIndex + 1} / ${frameImages.length}`;
        }
    };
    
    img.onerror = (error) => {
        console.error('Failed to load image:', fixedPath, error);
        // Try without the ./ prefix as fallback
        const fallbackPath = fixedPath.replace(/^\.\//, '');
        console.log('Trying fallback path:', fallbackPath);
        
        img.src = fallbackPath;
    };
    
    img.src = fixedPath;
}

// Function to load section images with error handling
function loadSectionImages(section) {
    console.log(`Loading images for section: ${section}`);
    
    if (!imagesConfig || !imagesConfig[section]) {
        console.error(`No configuration found for section: ${section}`);
        return [];
    }

    const images = imagesConfig[section];
    console.log(`Found ${images.length} images for ${section} section:`, images);
    
    // Store the images in the global frameImages array
    frameImages = images;
    currentFrameIndex = 0;
    
    // Update the frame counter
    if (frameCounter) {
        frameCounter.textContent = `1 / ${images.length}`;
    }
    
    // Update display with first image
    if (images.length > 0) {
        currentImageData = images[0];
        updateFrameDisplay(currentImageData);
    }

    return images;
}

// Function to handle reveal
function handleReveal() {
    console.log('Reveal button clicked');
    if (currentImageData && currentImageData.name) {
        // Create glitch overlay
        const overlay = document.createElement('div');
        overlay.className = 'glitch-overlay';
        document.body.appendChild(overlay);
        
        // Remove overlay after animation
        setTimeout(() => overlay.remove(), 1000);
        
        // Get clean filename for display
        let displayName = currentImageData.name;
        if (displayName.includes('/')) {
            displayName = displayName.split('/').pop();
        }
        if (displayName.includes('.')) {
            displayName = displayName.split('.')[0];
        }
        
        // Set up the popup
        const popup = document.querySelector('.reveal-popup');
        const image = popup.querySelector('.reveal-image');
        const nameElement = popup.querySelector('.reveal-name');
        
        // Clear any existing content
        nameElement.textContent = '';
        image.style.display = 'none';
        
        // Remove any previously created revealed-name elements
        const existingNames = popup.querySelectorAll('.revealed-name');
        existingNames.forEach(element => element.remove());
        
        // Handle different sections
        if (currentSection === 'dialogue' || currentSection === 'frame') {
            // For dialogue and frame sections, only show the name
            image.style.display = 'none';
            nameElement.textContent = displayName;
        } else if (currentSection === 'curves' || currentSection === 'eyes') {
            // For curves and eyes sections, show both image and name
            if (currentImageData.revealSrc) {
                image.src = currentImageData.revealSrc;
            } else {
                image.src = currentImageData.src;
            }
            image.style.display = 'block';
            nameElement.textContent = displayName;
        }
        
        // Show the popup
        popup.classList.add('show');
    } else {
        console.log('No image data or name available');
    }
}

// Initialize reveal button functionality
function initializeRevealButton() {
    console.log('Initializing reveal button...');
    const revealButton = document.querySelector('.reveal-button');
    
    if (revealButton) {
        console.log('Found reveal button, adding event listener');
        revealButton.addEventListener('click', function() {
            console.log('Reveal button clicked');
            handleReveal();
        });
    } else {
        console.log('Reveal button not found, will try again after delay');
        setTimeout(() => {
            const delayedRevealButton = document.querySelector('.reveal-button');
            if (delayedRevealButton) {
                console.log('Found reveal button after delay, adding event listener');
                delayedRevealButton.addEventListener('click', function() {
                    console.log('Reveal button clicked (delayed)');
                    handleReveal();
                });
            } else {
                console.error('Reveal button not found even after delay');
            }
        }, 1000);
    }
}

// Initialize everything when the document is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing application...');
    initializeRevealButton();
    
    // Initialize section navigation
    const sections = ['frame', 'dialogue', 'eyes', 'curves'];
    sections.forEach(section => {
        const button = document.querySelector(`[data-section="${section}"]`);
        if (button) {
            button.addEventListener('click', () => {
                console.log(`Switching to section: ${section}`);
                switchSection(section);
            });
        }
    });
});

// Spin function
function spin() {
    if (isSpinning) return;
    
    const items = document.querySelectorAll('.slot-item');
    if (items.length === 0) return;

    isSpinning = true;
    spinButton.disabled = true;

    // Find available people
    const availablePeople = people.filter(person => !selectedPeople.has(person));
    if (availablePeople.length === 0) {
        selectedPeople.clear();
        availablePeople.push(...people);
    }

    // Calculate random position
    const randomPerson = availablePeople[Math.floor(Math.random() * availablePeople.length)];
    const personIndex = people.indexOf(randomPerson);
    const baseOffset = items.length / 3 * itemHeight;
    const targetPosition = -(baseOffset + (personIndex * itemHeight));

    // Apply animation
    slotReel.style.transition = `transform ${duration}ms cubic-bezier(0.4, 0.0, 0.2, 1)`;
    slotReel.style.transform = `translateY(${targetPosition}px)`;

    // Reset after animation
    setTimeout(() => {
        isSpinning = false;
        spinButton.disabled = false;
        currentPosition = targetPosition;
        selectedPeople.add(randomPerson);

        // Show selected person notification
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = `Selected: ${randomPerson}`;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 2000);

        // Update display with selected image
        updateDisplay(randomPerson);
    }, duration);
}

// Initialize slot machine function
function initializeSlotMachine() {
    const slotReel = document.querySelector('.slot-reel');
    if (!slotReel) {
        console.warn('Slot reel not found');
        return;
    }

    // Clear existing items
    slotReel.innerHTML = '';

    // Create slot items from spinConfig
    if (window.spinConfig && window.spinConfig.players) {
        spinConfig.players.forEach(player => {
            const item = document.createElement('div');
            item.className = 'slot-item';
            item.style.backgroundImage = `url(${player.image})`;
            slotReel.appendChild(item);
        });
    } else {
        console.error('Spin configuration not found');
    }

    // Initialize variables
    currentPosition = 0;
    isSpinning = false;
}

// Add event listener to spin button if it exists
if (spinButton) {
    spinButton.addEventListener('click', spin);
} else {
    console.warn('Spin button not found');
}

// Wheel spinning functionality
const wheel = document.querySelector('.wheel-outer');
// Use the existing isSpinning variable
let currentRotation = 0;
let spinSpeed = 0;
let targetRotation = 0;

function getRandomRotation() {
    return Math.floor(Math.random() * 360) + 1440; // At least 4 full rotations
}

function getSelectedName(rotation) {
    const normalizedRotation = rotation % 360;
    const sections = ['aziz', 'vish'];
    const sectionSize = 360 / sections.length;
    const selectedIndex = Math.floor(normalizedRotation / sectionSize);
    return sections[selectedIndex];
}

// Add hover effect to wheel sections
document.querySelectorAll('.wheel-section').forEach(section => {
    section.addEventListener('mouseenter', () => {
        if (!isSpinning) {
            section.style.filter = 'brightness(1.2)';
        }
    });
    
    section.addEventListener('mouseleave', () => {
        section.style.filter = 'brightness(1)';
    });
});

function startSpinning() {
    const wheel = document.querySelector('.wheel'); // Try to find the wheel element
    
    if (!wheel) {
        console.warn('Wheel element not found - spin animation cancelled');
        return; // Exit early if wheel is not found
    }
    
    if (isSpinning) return;
    
    isSpinning = true;
    targetRotation = currentRotation + getRandomRotation();
    spinSpeed = 20; // Initial fast speed
    
    // Animate the wheel
    function animate() {
        if (spinSpeed > 0.1) {
            currentRotation += spinSpeed;
            spinSpeed *= 0.98; // Gradually slow down
            wheel.style.transform = `rotate(${currentRotation}deg)`;
            requestAnimationFrame(animate);
        } else {
            const selectedName = getSelectedName(currentRotation);
            isSpinning = false;
        }
    }
    
    animate();
}

// Start spinning when the page loads, but only if the wheel element exists
document.addEventListener('DOMContentLoaded', function() {
    const wheel = document.querySelector('.wheel-outer');
    
    if (!wheel) {
        console.warn('Wheel element not found - spin animation not started');
        return; // Exit early if wheel is not found
    }
    
    // Continue if wheel exists
    startSpinning();
});

function updateDisplay(selectedImage) {
    const slotReel = document.querySelector('.slot-reel');
    slotReel.style.transform = 'translateY(0)';
    slotReel.innerHTML = `<img src="${selectedImage}" alt="Selected" style="width: 100%; height: 100%; object-fit: contain;">`;
    
    // Show referee popup with the selected name
    const name = selectedImage.split('/').pop().split('.')[0];
    const displayName = name.charAt(0).toUpperCase() + name.slice(1).replace('2', '');
    showRefereePopup(displayName);
}

function initializeEventListeners() {
    console.log('Simple reveal button fix running');
    
    // Initialize reveal button
    const revealButton = document.querySelector('.reveal-button');
    if (revealButton) {
        console.log('Found reveal button, adding event listener');
        revealButton.addEventListener('click', handleReveal);
    }

    // Initialize section buttons
    const sectionButtons = document.querySelectorAll('.section-btn');
    sectionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const section = button.dataset.section;
            console.log('Switching to section:', section);
            
            currentSection = section;
            
            // Update active button
            sectionButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Update title
            frameTitle.textContent = `Guess The ${section.charAt(0).toUpperCase() + section.slice(1)}`;
            
            // Load images for new section
            loadSectionImages(section);
        });
    });

    // Initialize navigation buttons
    document.querySelector('.frame-prev')?.addEventListener('click', () => {
        if (currentFrameIndex > 0) {
            currentFrameIndex--;
            currentImageData = frameImages[currentFrameIndex];
            updateFrameDisplay(currentImageData);
        }
    });

    document.querySelector('.frame-next')?.addEventListener('click', () => {
        if (currentFrameIndex < frameImages.length - 1) {
            currentFrameIndex++;
            currentImageData = frameImages[currentFrameIndex];
            updateFrameDisplay(currentImageData);
        }
    });

    // Initialize frame open button
    frameOpenBtn?.addEventListener('click', function() {
        console.log('Open button clicked');
        frameImage.classList.remove('blurred');
        frameOpenBtn.style.display = 'none';
        startTimer();
    });
}

// Timer functionality
let timerDuration = 10; // 10 seconds timer
let remainingTime = timerDuration;

function startTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    remainingTime = timerDuration;
    frameTimer.style.display = 'block';
    frameTimer.textContent = remainingTime;
    
    timerInterval = setInterval(() => {
        remainingTime--;
        frameTimer.textContent = remainingTime;
        
        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            frameImage.classList.add('blurred');
            frameOpenBtn.style.display = 'block';
            frameTimer.style.display = 'none';
        }
    }, 1000);
}

function closeRevealPopup() {
    const popup = document.querySelector('.reveal-popup');
    if (popup) {
        popup.classList.remove('show');
        // Clear the image and name after animation
        setTimeout(() => {
            const image = popup.querySelector('.reveal-image');
            const nameElement = popup.querySelector('.reveal-name');
            if (image) image.src = '';
            if (nameElement) nameElement.textContent = '';
        }, 300);
    }
}

// Update audio paths to use the correct directory
const scoreAudio = new Audio('./audio/score.mp3');
const winnerAudio = new Audio('./audio/winner.mp3');

// Scoreboard functionality
function updateScore(playerId, points) {
    const scoreCard = document.querySelector(`.score-card[data-player="${playerId}"]`);
    if (scoreCard) {
        const scoreElement = scoreCard.querySelector('.player-score');
        if (scoreElement) {
            let currentScore = parseInt(scoreElement.textContent) || 0;
            currentScore += points;
            scoreElement.textContent = currentScore;
            
            // Play sound for positive points
            if (points > 0) {
                scoreAudio.currentTime = 0; // Reset audio to start
                scoreAudio.play().catch(e => console.log('Error playing audio:', e));
            }
            
            // Add animation class
            scoreElement.classList.add('score-updated');
            setTimeout(() => {
                scoreElement.classList.remove('score-updated');
            }, 500);
        }
    }
}

function announceWinner() {
    // Get all score cards
    const scoreCards = document.querySelectorAll('.score-card');
    let highestScore = -1;
    let winners = [];

    // Find highest score
    scoreCards.forEach(card => {
        const scoreElement = card.querySelector('.player-score');
        const score = parseInt(scoreElement.textContent) || 0;
        const playerName = card.querySelector('.player-name').textContent;

        if (score > highestScore) {
            highestScore = score;
            winners = [playerName];
        } else if (score === highestScore) {
            winners.push(playerName);
        }
    });

    // Show winner popup
    const winnerPopup = document.querySelector('.winner-popup');
    const winnerName = winnerPopup.querySelector('.winner-name');
    const winnerScore = winnerPopup.querySelector('.winner-score');

    if (winners.length === 1) {
        winnerName.textContent = `${winners[0]} Wins!`;
    } else {
        winnerName.textContent = `It's a tie between ${winners.join(' and ')}!`;
    }
    winnerScore.textContent = `Score: ${highestScore}`;
    
    // Play winner sound
    winnerAudio.currentTime = 0;
    winnerAudio.play().catch(e => console.log('Error playing audio:', e));
    
    // Show the popup with animation
    winnerPopup.style.opacity = '0';
    winnerPopup.style.display = 'flex';
    winnerPopup.style.flexDirection = 'column';
    winnerPopup.style.alignItems = 'center';
    
    // Add fade-in animation
    setTimeout(() => {
        winnerPopup.style.opacity = '1';
        winnerPopup.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 10);
    
    // Add confetti effect
    createConfetti();
}

// Add confetti effect
function createConfetti() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 3 + 's';
        document.body.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => confetti.remove(), 3000);
    }
}

function closeWinnerPopup() {
    const popup = document.querySelector('.winner-popup');
    if (popup) {
        // Add fade-out animation
        popup.style.opacity = '0';
        popup.style.transform = 'translate(-50%, -50%) scale(0.9)';
        
        // Hide popup after animation
        setTimeout(() => {
            popup.style.display = 'none';
        }, 300);
    }
}

// Add styles for score animation and winner popup
const scoreStyle = document.createElement('style');
scoreStyle.textContent = `
    .score-updated {
        animation: scoreUpdate 0.5s ease-out;
    }

    @keyframes scoreUpdate {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.2);
            color: #4CAF50;
        }
        100% {
            transform: scale(1);
        }
    }

    .winner-popup {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.9);
        transition: all 0.3s ease;
    }

    .winner-title {
        font-size: 32px;
        margin: 0;
        color: #4CAF50;
        text-shadow: 0 0 10px rgba(76, 175, 80, 0.5);
    }

    .winner-name {
        font-size: 28px;
        font-weight: bold;
        margin: 10px 0;
        color: #fff;
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    }

    .winner-score {
        font-size: 24px;
        color: #4CAF50;
        text-shadow: 0 0 10px rgba(76, 175, 80, 0.3);
    }

    .creator-credit {
        margin-top: 20px;
        text-align: center;
    }

    .creator-credit p {
        margin: 0 0 10px 0;
        font-size: 16px;
        color: rgba(255, 255, 255, 0.8);
    }

    .qr-code {
        width: 120px;
        height: 120px;
        border-radius: 10px;
        margin-top: 10px;
        box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
    }

    .close-popup {
        margin-top: 20px;
        padding: 10px 30px;
        font-size: 16px;
        background: #4CAF50;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background 0.3s, transform 0.2s;
    }

    .close-popup:hover {
        background: #45a049;
        transform: scale(1.05);
    }

    .confetti {
        position: fixed;
        top: -10px;
        width: 10px;
        height: 10px;
        animation: confetti-fall 3s linear forwards;
        z-index: 1999;
    }

    @keyframes confetti-fall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(scoreStyle);

// Referee selection functionality
const refereeData = {
    aziz: { name: 'Aziz', image: 'images/aziz.png' },
    vish: { name: 'Vish', image: 'images/vish.png' },
    aman: { name: 'Aman', image: 'images/aman.png' },
    amesh: { name: 'Amesh', image: 'images/amesh.png' }
};

let selectedReferees = new Set();

function initializeRefereeSelector() {
    const selectRefereeBtn = document.getElementById('select-referee-btn');
    const resetRefereesBtn = document.getElementById('reset-referees-btn');
    const selectedRefereesContainer = document.getElementById('selected-referees');

    if (selectRefereeBtn) {
        selectRefereeBtn.addEventListener('click', selectRandomReferee);
    }

    if (resetRefereesBtn) {
        resetRefereesBtn.addEventListener('click', resetReferees);
    }
}

function selectRandomReferee() {
    const availableReferees = Object.keys(refereeData).filter(ref => !selectedReferees.has(ref));
    
    if (availableReferees.length === 0) {
        showNotification('All referees have been selected!');
        return;
    }

    const randomIndex = Math.floor(Math.random() * availableReferees.length);
    const selectedReferee = availableReferees[randomIndex];
    selectedReferees.add(selectedReferee);

    // Show referee popup
    showRefereePopup(selectedReferee);
    
    // Update selected referees display
    updateSelectedRefereesDisplay();
}

function showRefereePopup(refereeId) {
    const referee = refereeData[refereeId];
    const popup = document.querySelector('.referee-popup');
    const avatar = popup.querySelector('.referee-avatar');
    const name = popup.querySelector('.referee-name');

    avatar.src = referee.image;
    name.textContent = referee.name;
    
    popup.style.display = 'block';
    setTimeout(() => popup.classList.add('show'), 10);
}

function closeRefereePopup() {
    const popup = document.querySelector('.referee-popup');
    popup.classList.remove('show');
    setTimeout(() => popup.style.display = 'none', 300);
}

function resetReferees() {
    selectedReferees.clear();
    updateSelectedRefereesDisplay();
    showNotification('Referees have been reset!');
}

function updateSelectedRefereesDisplay() {
    const container = document.getElementById('selected-referees');
    if (!container) return;

    container.innerHTML = '';
    selectedReferees.forEach(refereeId => {
        const referee = refereeData[refereeId];
        const element = document.createElement('div');
        element.className = 'selected-referee';
        element.innerHTML = `
            <img src="${referee.image}" alt="${referee.name}">
            <span>${referee.name}</span>
        `;
        container.appendChild(element);
    });
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 2000);
}