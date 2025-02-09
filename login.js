document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const captchaPopup = document.getElementById('captchaPopup');
    const captchaLoadingPopup = document.createElement('div'); // New loading popup
    const closeBtn = document.querySelector('.close-btn');
    const images = document.querySelectorAll('.captcha-image');
    const message = document.getElementById('captchaMessage');
    const body = document.querySelector('body');
    const makeAccountBtn = document.getElementById('makeAccountBtn');  // "Create Account" button

    let solvedCaptcha = false;
    let position = 0; // Track position

    // Spinner and Loading Text HTML structure
    const loadingPopupHTML = `
        <div class="loading-popup">
            <div class="loading-text">Loading CAPTCHA...</div>
            <div class="spinner"></div>
        </div>
    `;
    captchaLoadingPopup.innerHTML = loadingPopupHTML;

    // Function to handle CAPTCHA logic
    function handleHover(event) {
        const hoveredImage = event.target;

        if (hoveredImage.classList.contains('smiling')) {
            // Get a random normal image
            const normalImages = document.querySelectorAll('.captcha-image.normal');
            const randomNormal = normalImages[Math.floor(Math.random() * normalImages.length)];

            // Swap the hovered smiling face with the random normal face
            const tempSrc = randomNormal.src;
            randomNormal.src = hoveredImage.src;
            hoveredImage.src = tempSrc;

            // Swap the classes as well
            randomNormal.classList.remove('normal');
            randomNormal.classList.add('smiling');
            hoveredImage.classList.remove('smiling');
            hoveredImage.classList.add('normal');
        }

        // Check if all are smiling
        const allSmiling = document.querySelectorAll('.captcha-image.smiling').length === 9;
        if (allSmiling && !solvedCaptcha) {
            solvedCaptcha = true;
            message.textContent = "Problem solved!";
            loginForm.querySelector('button').disabled = false;  // Enable the login button
        }
    }

    // Handle login form submission
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Save the username to localStorage
        const usernameInput = document.getElementById('username');
        localStorage.setItem('username', usernameInput.value);

        // Show loading spinner in the popup
        body.appendChild(captchaLoadingPopup);

        // 2-second delay with loading spinner before showing CAPTCHA popup
        setTimeout(function() {
            body.removeChild(captchaLoadingPopup); // Remove loading animation
            captchaPopup.style.display = 'flex';
            images.forEach(image => {
                image.addEventListener('mouseenter', handleHover);
            });

            // Redirect to account.html after 5 seconds
            setTimeout(function() {
                window.location.href = 'account.html'; // Redirect to account page
            }, 5000); // 5 seconds
        }, 900);  // 900 millisecond delay
    });

    // Close the CAPTCHA popup
    closeBtn.addEventListener('click', function() {
        captchaPopup.style.display = 'none';
        images.forEach(image => {
            image.removeEventListener('mouseenter', handleHover);
        });

        // Redirect to error.html
        window.location.href = 'error.html';
    });

    // Move the "Create Account" button on hover
    makeAccountBtn.addEventListener('mouseover', function() {
        position = position === 0 ? 150 : 0; // Toggle between 0 and 150px
        makeAccountBtn.style.transform = `translateX(${position}px)`;
        makeAccountBtn.style.transition = "all 0.3s ease";
    });
});
