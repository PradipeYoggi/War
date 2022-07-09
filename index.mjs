
// constants
const Suit = {
    Club: 0,
    Diamond: 1,
    Heart: 2,
    Spade: 3
};
const SuitText = ['Club', 'Diamond', 'Heart', 'Spade'];
const RankText = ['','','2','3','4','5','6','7','8','9','10','Joker','Queen','King','Ace'];

// Represents a Card. 
// A card has a suit (Club, Diamond, Heart, Spade) and a rank (Ace,King, Queen, Jack, 10 - 2)
class Card {
    constructor(rank, suit) {
        if (rank < 2 || rank >14) {
            throw new Error(`rank value has to be between 2 and 14`);
        }
        this.rank = rank;
        this.suit = suit;
    }

    // get a textual description of this card
    getInfo() {
        return `${this.getSuit()} ${this.getRank()}`;
    }

    // get the suit name of this card
    getSuit() {
        return SuitText[this.suit];
    }

    // get the rank of this card
    getRank() {
        return RankText[this.rank];
    }

    // compare this card with the given card
    // returns < 0 when this card's rank is less than the given card's rank
    // > 1 if this card's rank is greater than the given card's rank and
    // 0 if both card's rank are equal.
    compare(card) {
        if (!(card instanceof Card)) {
            throw new Error(`card should be of type Card`);
        }
        if (this.rank < card.rank) {
            return -1;
        }
        if (this.rank == card.rank) {
            return 0;
        }
        else return 1;
    }
}

// Base deck class
class Deck {
    constructor() {
        this.cards = [];
    }
}

// Represents a full deck of cards
export class FullDeck extends Deck {
    constructor() {
        super();
        this.initialize(Suit.Club);
        this.initialize(Suit.Diamond);
        this.initialize(Suit.Heart);
        this.initialize(Suit.Spade);
    }

    // creates a set of cards for a given suit
    initialize(suit) {
        for (let i=0;i<13;i++) {
            // rank starts at 2 and goes through 14
            this.cards.push(new Card(i+2, suit));
        }
    }

    // does a shuffle of the cards in place, using the fisher yates algorithm
    // shuffles the array by picking items in random and putting them at the back of the array
    shuffle() {

        let pos = this.cards.length - 1, randomPos, swapHolder;

        while (pos > 0) {
            // pick a random element
            randomPos = Math.floor(Math.random() * pos);

            // swap item at the back with the random index
            swapHolder = this.cards[pos];
            this.cards[pos] = this.cards[randomPos];
            this.cards[randomPos] = swapHolder;
            pos--;
        }
    }

    // splits the full deck of cards into two sets of 26 each
    split() {
        return this.cards.splice(0,26);
    }
}

// Represents a player's deck of cards
class PlayersDeck extends Deck {
    constructor(cardDeck) {
        super();
        this.cards = cardDeck;
    }
}

// Represents a player
class Player {
    constructor(name, cards) {
        this.name = name;
        this.cards = cards;
        this.score = 0;
    }

    // plays one card from the player's deck
    play() {
        if (this.cards.length)
            return this.cards.splice(0,1)[0];
        else
            return null;
    }
}

// represents the War game
export class War {
    constructor() {
        this.Players = [];
    }

    // sets up the game for playing
    initialize() {
        let deck = new FullDeck();
        deck.shuffle();

        let deck1 = deck.split();
        let deck2 = deck.cards;

        this.Players.push(new Player('Player1', deck1));
        this.Players.push(new Player('Player2', deck2));
    }

    // plays out the game until all cards are played by both players
    play() {
        for (let i=0; i < 26; i++) {
            let player1sCard = this.Players[0].play();
            let player2sCard = this.Players[1].play();

            console.log(`${this.Players[0].name} played ${player1sCard.getInfo()}`);
            console.log(`${this.Players[1].name} played ${player2sCard.getInfo()}`);

            let compareScore = player1sCard.compare(player2sCard);
            if (compareScore > 0) {
                this.Players[0].score++;
                console.log(`${this.Players[0].name} scored 1 point`);
            } else if (compareScore < 0){
                this.Players[1].score++;
                console.log(`${this.Players[1].name} scored 1 point`);
            }
            else {
                console.log(`Tie, neither player scored`);
            }
        }

        // output the result of the game
        if (this.Players[0].score > this.Players[1].score) {
            console.log(`${this.Players[0].name} won`);
        }
        else if (this.Players[0].score < this.Players[1].score) {
            console.log(`${this.Players[1].name} won`);
        }
        else {
            console.log(`Tied, both players scored equally`);
        }
    }
}

// instantiate the game and play it
let game = new War();
game.initialize();
game.play();