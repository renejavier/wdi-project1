////////////////////////////////////////
//
//    JavaScript Poker Game
//    =====================
//    (c) Copyright Paul Griffiths 2001
//    Email: mail@paulgriffiths.net
//
//    Initialisations for Poker game
//


var gamestatus = 1;                 //  Tells whether new deal or not
var bet        = 5;                 //  Holds the amount to bet
var winnings   = 100;               //  Holds winnings
var back       = new Image(73,97);  //  Image for back of card
var offset     = 0;                 //  Image offset

var picked     = new Array(52);     //  To tell which cards already picked
var flipped    = new Array(5);      //  To tell which cards are flipped
var cards      = new Array(5);      //  Holds images for dealt cards
var cardvals   = new Array(5);      //  Holds values of dealt cards
var cardimg    = new Array(52);     //  Holds images of entire deck


for ( var i = 0; i < 5; i++ ) {
    cards[i] = new Image(73,97);    //  Create array of five card images
    flipped[i] = 0;                 //  Set flipped flags to unflipped
}

for ( var i = 0; i < 52; i++ ) {
    cardimg[i] = new Image(73,97);  //  Create image array for whole deck


    //  Precache all the card images

    cardimg[i].src = "img/cards/" + (i+1) + ".gif";
    picked[i] = 0;                  //  Set picked flags to unpicked
}

back.src = "img/cards/b.gif";    //  Store image for back of cards
