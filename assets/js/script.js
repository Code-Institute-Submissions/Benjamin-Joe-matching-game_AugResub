if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready());
} else {
    ready();
}

function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));
    var flips = 0;
    var timer = 60;

    function shuffle(array) {
        var currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }

    function generate_card_deck(cards){
        let available_cards = shuffle([
        'blanket-dog2.jpg', 'cool-dog.jpg', 'biker-dog.jpg',  'dog-chain.jpg', 'dog-drink.jpg', 'dog-pjs.jpg', 'flying-dog.jpg', 'lab-tea.jpg', 'pug-blanket.jpg',
        'blanket-dog2.jpg', 'cool-dog.jpg', 'biker-dog.jpg',  'dog-chain.jpg', 'dog-drink.jpg', 'dog-pjs.jpg', 'flying-dog.jpg', 'lab-tea.jpg', 'pug-blanket.jpg']);
        for (let index = 0; index < available_cards.length; index++) {
            cards[index].getElementsByClassName('card-front')[0].getElementsByTagName('img')[0].src = './assets/images/' + available_cards[index];
        }
    }

    function startGame(){
        flips = 0;
        timer = 60;
        generate_card_deck(cards)

    }

    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
             startGame()
        });
    });
    
}
