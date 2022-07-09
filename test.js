import {expect} from "chai";
import {FullDeck} from './index.mjs';

describe("WAR Tests", () => {
    describe("shuffle", () => {
        it ("array before should not be equal to after", () => {
            let fullDeck = new FullDeck();
            fullDeck.initialize();
            let cards = Array.from(fullDeck.cards);
            fullDeck.shuffle();
            expect(cards).to.not.equal(fullDeck.cards);
        });
    });    
  });