const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', event => {
        event.preventDefault();
        
        var tempParams = {
            from_name: document.getElementById("fromName").value,
            email: document.getElementById("email").value,
            msg: document.getElementById("msg").value,
        };

        emailjs.send('service_0r4k5tg', 'template_tpr7pxu', tempParams)
        .then(function(response){
            console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
            console.log('Failed...', error);
        })
    })
    
    
}


class PairAPup {
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time-remaining');
        this.ticker = document.getElementById('flips');

    }

    startGame() {
        this.cardToCheck = null;
        this.totalClicks = 0;
        this.timeRemaining = this.totalTime;
        this.matchedCards = [];
        this.busy = true;

        setTimeout(() => {
            this.shuffleCards();
            this.countDown = this.startCountDown();
            this.busy = false;
        }, 500);
        this.hideCards();
        this.timer.innerText = this.timeRemaining;
        this.ticker.innerText = this.totalClicks;

    }

    hideCards() {
        this.cardsArray.forEach(card => {
            card.classList.remove('visible');
            card.classList.remove('matched');
        });
    }
    flipCard(card) {
        if(this.canFlipCard(card)) {
            this.totalClicks++;
            this.ticker.innerText = this.totalClicks;
            card.classList.add('visible');

           if(this.cardToCheck)
           this.checkforCardMatch(card);
           else
           this.cardToCheck = card;
        }
    }
    checkforCardMatch(card){ 
        if(this.getCardType(card) === this.getCardType(this.cardToCheck))
        this.cardMatch(card, this.cardToCheck);
        else
        this.cardMisMatch(card, this.cardToCheck);

        this.cardToCheck = null;
    }

    cardMatch(card1, card2) {
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        card1.classList.add('matched');
        card2.classList.add('matched');
        if(this.matchedCards.length === this.cardsArray.length)
        this.winner();

    }
    cardMisMatch(card1, card2) {
        this.busy = true;
        setTimeout(() => {
            card1.classList.remove('visible');
            card2.classList.remove('visible');
            this.busy = false;
        }, 1000);
    }

    getCardType(card) {
        return card.getElementsByClassName('card-value')[0].src;
    }

    startCountDown() {
        return setInterval(() => {
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;
            if(this.timeRemaining === 0)
            this.gameOver();
        }, 1000);
    }

    winner() {
        clearInterval(this.countDown);
        document.getElementById('winner').classList.add('visible');
    }

    gameOver() {
        clearInterval(this.countDown);
        document.getElementById('game-over-text').classList.add('visible');
    }
 
    shuffleCards() {
        for(let i = this.cardsArray.length -1; i >0; i--) {
           let randomIndex = Math.floor(Math.random() * (i+1));
           this.cardsArray[randomIndex].style.order = i;
           this.cardsArray[i].style.order = randomIndex;
        }
    }

    canFlipCard(card){
        return !this.busy && this.matchedCards.includes(card) !==this.cardToCheck;
    }
}

function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new PairAPup(80, cards);
    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            game.startGame();
        });
    });
    cards.forEach(card => {
        card.addEventListener('click', () =>{
            game.flipCard(card);
        });
    });
}

if(document.addEventListener === 'loading') {
    document.addEventListener('DOMContentLoaded', ready());
} else {
    ready();
}