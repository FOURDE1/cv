document.getElementById('warningButton').addEventListener('click', function() {
    startScreenTransition();
    playAlarm();
    addEscapeButton();
    setTimeout(showWarning, 47500); // Show warning after 1 minutes
});

let typingTimeout; // To store the timeout for typing
let typingSound; // To store the typing sound

function addEscapeButton() {
    setTimeout(function() {
        var escapeButton = document.createElement('button');
        escapeButton.textContent = 'Escape Before Hussein Detects';
        escapeButton.className = 'button';
        escapeButton.style.position = 'fixed';
        escapeButton.style.bottom = '10px';
        escapeButton.style.left = '10px';
        escapeButton.style.padding = '10px 20px';
        escapeButton.style.backgroundColor = 'red';
        escapeButton.style.color = 'white';
        escapeButton.style.border = 'none';
        escapeButton.style.borderRadius = '5px';
        escapeButton.style.zIndex = '1002';
        escapeButton.style.cursor = 'pointer';
        escapeButton.style.opacity = '0'; // Start with opacity 0
        escapeButton.style.transition = 'opacity 2s'; // Smooth transition for opacity
        escapeButton.onclick = function() {
            window.location.href = 'index.html'; // Replace 'index.html' with the actual URL of your CV page
        };
        document.body.appendChild(escapeButton);

        // Trigger the fade-in effect
        setTimeout(function() {
            escapeButton.style.opacity = '1';
        }, 100); // Small delay to ensure the transition is applied
    }, 6000); // Delay of 5 seconds
}

function startScreenTransition() {
    var overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.left = '0';
    overlay.style.bottom = '0'; // Start from the bottom
    overlay.style.width = '100%';
    overlay.style.height = '0';
    overlay.style.backgroundColor = 'black';
    overlay.style.transition = 'height 3s'; // Increase transition time
    overlay.style.zIndex = '1000';
    document.body.appendChild(overlay);

    setTimeout(function() {
        overlay.style.height = '100%';
    }, 100);

    setTimeout(function() {
        displayHackerMessage();
    }, 3000); // Increase delay for displaying hacker message
}

function displayHackerMessage() {
    var hackerImg = document.createElement('img');
    hackerImg.src = 'images/hacker.png';
    hackerImg.style.position = 'fixed';
    hackerImg.style.left = '50%';
    hackerImg.style.top = '50%';
    hackerImg.style.transform = 'translate(-50%, -50%)';
    hackerImg.style.zIndex = '1001';
    hackerImg.style.opacity = '0'; // Start with opacity 0
    hackerImg.style.transition = 'opacity 2s'; // Smooth transition for opacity
    document.body.appendChild(hackerImg);

    var message = document.createElement('div');
    message.id = 'hackerMessage';
    message.style.position = 'fixed';
    message.style.left = '50%';
    message.style.top = '60%';
    message.style.transform = 'translate(-50%, -50%)';
    message.style.color = 'white';
    message.style.fontSize = '2em';
    message.style.zIndex = '1001';
    message.style.opacity = '0'; // Start with opacity 0
    message.style.transition = 'opacity 2s'; // Smooth transition for opacity
    document.body.appendChild(message);

    typeMessage('You\'ve just exploited Hussein\'s data.', message, 100, function() {
        setTimeout(function() {
            displayCards();
        }, 2000);
    });

    setTimeout(function() {
        hackerImg.style.opacity = '1'; // Fade in
        message.style.opacity = '1'; // Fade in
    }, 100);

    setTimeout(function() {
        message.style.opacity = '0'; // Fade out slightly earlier
    }, 4500); // Adjust the delay for how long the image stays visible
}

function typeMessage(text, element, speed, callback) {
    if (typingTimeout) clearTimeout(typingTimeout); // Clear any previous typing timeout
    if (typingSound) {
        typingSound.pause();
        typingSound.currentTime = 0;
    }

    var i = 0;
    typingSound = new Audio('sounds/typing-sound.mp3'); // Typing sound effect

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            typingSound.play();
            typingTimeout = setTimeout(type, speed);
        } else {
            typingSound.pause();
            typingSound.currentTime = 0;
            if (callback) {
                callback();
            }
        }
    }

    typingSound.loop = true;
    typingSound.play();
    type();
}

function displayCards() {
    var cardContainer = document.createElement('div');
    cardContainer.className = 'card-container';
    document.body.appendChild(cardContainer);

    var cardDates = ['23/6/2024', '15/3/2023', '20/6/2022', '4/9/2021'];
    var cardImages = ['images/PrisePulse.png', 'images/trivia-game.png', 'images/anywhere.jpeg', 'images/SimonGame.png'];
    var cardTexts = [
        'Hussein created Price Pulse to help compare electronics Products.',
        'He developed a trivia game for a university competition.',
        'He built a delivery website to improve regional delivery.',
        'He implemented a Simon game to test memory.'
    ];

    cardDates.forEach(function(date, index) {
        var card = createCard(date, cardImages[index], cardTexts[index]);
        cardContainer.appendChild(card);
    });
}

function createCard(date, image, text) {
    var card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <div class="card-inner">
            <div class="front">${date}</div>
            <div class="back"><img src="${image}" alt="Project Image" /></div>
        </div>
    `;

    card.addEventListener('click', function() {
        flipCard(card, text);
    });

    return card;
}

function flipCard(card, text) {
    var allCards = document.querySelectorAll('.card');
    var cardText = document.querySelector('.card-text');

    allCards.forEach(function(c) {
        if (c !== card) {
            c.classList.remove('flipped');
        }
    });

    if (!cardText) {
        cardText = document.createElement('div');
        cardText.className = 'card-text';
        document.body.appendChild(cardText);
    }

    // Clear the text content before typing the new message
    cardText.innerHTML = '';

    typeMessage(text, cardText, 100, function() {
        setTimeout(function() {
            if (card.classList.contains('flipped')) {
                card.classList.remove('flipped');
                cardText.style.opacity = '0';
            }
        }, 3000); // Flip back after 3 seconds from the end of the typing
    });

    card.classList.toggle('flipped');

    if (!card.classList.contains('flipped')) {
        cardText.style.opacity = '0';
    } else {
        cardText.style.opacity = '1';
    }
}

function showWarning() {
    var warningSound = new Audio('sounds/warning.mp3'); // Sudden warning sound
    warningSound.play();

    var warningText = document.createElement('div');
    warningText.className = 'warning-text';
    warningText.innerHTML = 'Hussein detected suspicious activity!';
    document.body.appendChild(warningText);

    // Trigger fade-in
    setTimeout(function() {
        warningText.style.opacity = '1';
    }, 100);

    // Trigger fade-out after 5 seconds
    setTimeout(function() {
        warningText.style.opacity = '0';
    }, 5000);

    // Reload after 10 seconds
    setTimeout(function() {
        window.location.reload();
    }, 7000);

    // Display "Restoring data..." button after 2 seconds
    setTimeout(function() {
        var restoreButton = document.createElement('button');
        restoreButton.className = 'restore-button';
        restoreButton.innerHTML = 'Restoring data...';
        document.body.appendChild(restoreButton);

        // Trigger fade-in for the button
        setTimeout(function() {
            restoreButton.style.opacity = '1';
        }, 100);

        // Trigger fade-out for the button after 3 seconds
        setTimeout(function() {
            restoreButton.style.opacity = '0';
        }, 4000);
    }, 2000);
}

function playAlarm() {
    var finalAudio = new Audio('sounds/final_alarm.mp3');
    finalAudio.play();
}
