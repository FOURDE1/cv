document.getElementById('warningButton').addEventListener('click', function() {
    startScreenTransition();
    playAlarm();
    addEscapeButton();
    startCountdownTimer(47500);
    setTimeout(showWarning, 47500);
});

function startCountdownTimer(duration) {
    const timerElement = document.createElement('div');
    timerElement.id = 'countdownTimer';
    timerElement.style.position = 'fixed';
    timerElement.style.bottom = '10px';
    timerElement.style.right = '10px';
    timerElement.style.color = 'red';
    timerElement.style.fontSize = '20px';
    timerElement.style.opacity = '1';
    timerElement.style.zIndex = '1003';
    document.body.appendChild(timerElement);

    let remainingTime = duration / 1000; // Convert milliseconds to seconds

    const interval = setInterval(() => {
        if (remainingTime <= 0) {
            clearInterval(interval);
            timerElement.remove();
        } else {
            timerElement.textContent = remainingTime.toFixed(1) + 's';
            remainingTime -= 0.1;
            fadeInOut(timerElement);
        }
    }, 100);
}

function fadeInOut(element) {
    element.style.transition = 'opacity 0.65s';
    element.style.opacity = element.style.opacity == '1' ? '0' : '1';
}

let typingTimeout;
let typingSound;

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
        escapeButton.style.opacity = '0';
        escapeButton.style.transition = 'opacity 2s';
        escapeButton.onclick = function() {
            window.location.href = 'index.html';
        };
        document.body.appendChild(escapeButton);

        // Trigger the fade-in effect
        setTimeout(function() {
            escapeButton.style.opacity = '1';
        }, 100);
    }, 6000);
}

function startScreenTransition() {
    var overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.left = '0';
    overlay.style.bottom = '0';
    overlay.style.width = '100%';
    overlay.style.height = '0';
    overlay.style.backgroundColor = 'black';
    overlay.style.transition = 'height 3s';
    overlay.style.zIndex = '1000';
    document.body.appendChild(overlay);

    setTimeout(function() {
        overlay.style.height = '100%';
    }, 100);

    setTimeout(function() {
        displayHackerMessage();
    }, 3000);
}

function displayHackerMessage() {
    var hackerImg = document.createElement('img');
    hackerImg.src = 'images/hacker.png';
    hackerImg.style.position = 'fixed';
    hackerImg.style.left = '50%';
    hackerImg.style.top = '50%';
    hackerImg.style.transform = 'translate(-50%, -50%)';
    hackerImg.style.zIndex = '1001';
    hackerImg.style.opacity = '0';
    hackerImg.style.transition = 'opacity 2s';
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
    message.style.opacity = '0'
    message.style.transition = 'opacity 2s';
    document.body.appendChild(message);

    typeMessage('You\'ve just exploited Hussein\'s data.', message, 100, function() {
        setTimeout(function() {
            displayCards();
        }, 2000);
    });

    setTimeout(function() {
        hackerImg.style.opacity = '1';
        message.style.opacity = '1';
    }, 100);

    setTimeout(function() {
        message.style.opacity = '0';
    }, 4500);
}

function typeMessage(text, element, speed, callback) {
    if (typingTimeout) clearTimeout(typingTimeout);
    if (typingSound) {
        typingSound.pause();
        typingSound.currentTime = 0;
    }

    var i = 0;
    typingSound = new Audio('sounds/typing-sound.mp3');

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
        'Hussein created Price Pulse to help compare electronic Products.',
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


    cardText.innerHTML = '';

    typeMessage(text, cardText, 100, function() {
        setTimeout(function() {
            if (card.classList.contains('flipped')) {
                card.classList.remove('flipped');
                cardText.style.opacity = '0';
            }
        }, 3000);
    });

    card.classList.toggle('flipped');

    if (!card.classList.contains('flipped')) {
        cardText.style.opacity = '0';
    } else {
        cardText.style.opacity = '1';
    }
}

function showWarning() {
    var warningSound = new Audio('sounds/warning.mp3');
    warningSound.play();

    var warningText = document.createElement('div');
    warningText.className = 'warning-text';
    warningText.innerHTML = 'Hussein detected suspicious activity!';
    document.body.appendChild(warningText);


    setTimeout(function() {
        warningText.style.opacity = '1';
    }, 100);


    setTimeout(function() {
        warningText.style.opacity = '0';
    }, 5000);


    setTimeout(function() {
        window.location.reload();
    }, 7000);


    setTimeout(function() {
        var restoreButton = document.createElement('button');
        restoreButton.className = 'restore-button';
        restoreButton.innerHTML = 'Restoring data...';
        document.body.appendChild(restoreButton);


        setTimeout(function() {
            restoreButton.style.opacity = '1';
        }, 100);


        setTimeout(function() {
            restoreButton.style.opacity = '0';
        }, 4000);
    }, 2000);
}

function playAlarm() {
    var finalAudio = new Audio('sounds/final_alarm.mp3');
    finalAudio.play();
}
document.addEventListener('DOMContentLoaded', function() {
    const colorModeSwitch = document.getElementById('color_mode');
    const body = document.body;


    function toggleColorMode() {
        if (colorModeSwitch.checked) {
            body.classList.add('dark-mode');
            body.classList.remove('light-mode');
        } else {
            body.classList.add('light-mode');
            body.classList.remove('dark-mode');
        }
    }

    colorModeSwitch.addEventListener('change', toggleColorMode);

    toggleColorMode();
});
