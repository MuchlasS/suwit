const game = () => {
    let playerScore = 0;
    let computerScore = 0;

    // START THE GAME
    const startGame = () => {
        const playButton = document.querySelector('.intro button');
        const introScreen = document.querySelector('.intro');
        const match = document.querySelector('.match');

        playButton.addEventListener('click', () => {
            introScreen.classList.add('fadeOut');
            match.classList.add('fadeIn');
        });
    }

    // PLAY MATCH
    const playMatch = () => {
        // PLAYER OPTIONS
        const options = document.querySelectorAll('.options button');
        // COMPUTER OPTIONS
        const computerOptions = ['gunting', 'batu', 'kertas'];

        // IMAGES
        const playerImage = document.querySelector('.player-hand');
        const computerImage = document.querySelector('.computer-hand');
        const hands = document.querySelectorAll('.hands img');

        // REFRESH THE ANIMATION
        hands.forEach(hand => {
            hand.addEventListener('animationend', function () {
                this.style.animation = '';
            });
        });

        // GAME LOGIC
        options.forEach(option => {
            option.addEventListener('click', function () {
                const computerNumber = Math.floor(Math.random() * 3);
                const computerChoice = computerOptions[computerNumber];

                playerImage.src = `img/batu.png`;
                computerImage.src = `img/batu.png`;

                setTimeout(() => {
                    // UPDATE IMAGES
                    playerImage.src = `img/${this.textContent.toLowerCase()}.png`;
                    computerImage.src = `img/${computerChoice}.png`;
                    
                    // COMPARE HANDS
                    compareHands(this.textContent.toLowerCase(), computerChoice);
                }, 2000);

                // HAND ANIMATION
                playerImage.style.animation = 'shakePlayer 2s ease';
                computerImage.style.animation = 'shakeComputer 2s ease';
            })
        })
    }

    // UPDATE SCORE
    const updateScore = () => {
        const scorePlayer = document.querySelector('.player-score p');
        const scoreComputer = document.querySelector('.computer-score p');

        scorePlayer.textContent = playerScore;
        scoreComputer.textContent = computerScore;
    }

    // COMPARE HANDS
    const compareHands = (playerChoice, computerChoice) => {
        const winner = document.querySelector('.winner');
        const playerWinText = 'Kamu Menang!';
        const computerWinText = 'Komputer Menang!';

        // CHECK A TIE
        if (playerChoice === computerChoice) {
            winner.textContent = 'Kalian Seri!';
            return;
        }

        // CHECK ROCK (BATU)
        if (playerChoice === 'batu') {
            computerChoice === 'gunting' ? winner.textContent = playerWinText : winner.textContent = computerWinText;
        }

        // CHECK PAPER (KERTAS)
        if (playerChoice === 'kertas') {
            computerChoice === 'gunting' ? winner.textContent = computerWinText : winner.textContent = playerWinText;
        }

        // CHECK SCISSORS (GUNTING)
        if (playerChoice === 'gunting') {
            computerChoice === 'batu' ? winner.textContent = computerWinText : winner.textContent = playerWinText;
        }

        winner.textContent === playerWinText ? playerScore++ : computerScore++;
        updateScore();
        return;
    }

    startGame();
    playMatch();
}

game();