class pairapup {
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time-remaining');
        this.ticker = document.getElementById('flips');
        this.score = document.getElementsById('high-score');
        
    }
    startGame() {
        this.cardToCheck = null;
    }
}

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready());
}else {
    ready()
}

function ready() {
    let cards = Array.from(document.getElementsByClassName('card'));

    cards.forEach(card => {
        card.addEventListener('click', () => {
            //game.flipCard(card);
        })
    })
}