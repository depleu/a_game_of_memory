const cardArray = [
    {name: "fries", icon: "🍟"},
    {name: "burger", icon: "🍔"},
    {name: "hotdog", icon: "🌭"},
    {name: "icecream", icon: "🍦"},
    {name: "sushi", icon: "🍙"},
    {name: "pizza",icon: "🍕"},
    {name: "fries", icon: "🍟"},
    {name: "burger", icon: "🍔"},
    {name: "hotdog", icon: "🌭"},
    {name: "icecream", icon: "🍦"},
    {name: "sushi", icon: "🍙"},
    {name: "pizza",icon: "🍕"}
]

cardArray.sort(() => 0.5 - Math.random());

const board = document.querySelector("#board");
const result = document.querySelector("#result");
const trys = document.querySelector("#try");
let i = 0;
let cardsChosen = []
let cardsChosenIds = []
const cardsWon = []

result.innerText = "0";
trys.innerText = "0";

function createBoard () {
    for(let i = 0; i < 12; i++) {
        const card = document.createElement("div");
        card.classList.add("blank");
        card.setAttribute("data-id", i);
        board.append(card);
        card.addEventListener("click", flipCard)
    }
}

createBoard()

function checkMatch() {
    const cards = document.querySelectorAll("#board div")

    if (cardsChosenIds[0] === cardsChosenIds[1]) {
        alert("You cliked the same Card twice")
        cards[cardsChosenIds[0]].innerHTML = "";
    } else {
        if (cardsChosen[0] === cardsChosen[1]) {
            alert("You found a match!")
            cards[cardsChosenIds[0]].style.backgroundColor = "green";
            cards[cardsChosenIds[0]].style.color = "white";
            cards[cardsChosenIds[1]].style.backgroundColor = "green";
            cards[cardsChosenIds[1]].style.color = "white";
            cards[cardsChosenIds[0]].removeEventListener("click", flipCard);
            cards[cardsChosenIds[1]].removeEventListener("click", flipCard);
            cardsWon.push(cardsChosen);
        } else {
            cards[cardsChosenIds[0]].innerHTML = "";
            cards[cardsChosenIds[1]].innerHTML = "";
            alert("Sorry, try again!")
        }
    }

    result.innerText = cardsWon.length;
    trys.innerText = i;

    cardsChosen = []
    cardsChosenIds = []

    if (cardsWon.length === (cardArray.length/2)) {
        result.innerText = `Congrats, you found every Match and you just needed ${i} trys`
        trys.parentElement.remove();
    }
}

function flipCard() {
    const cardID = this.getAttribute("data-id");
    cardsChosen.push(cardArray[cardID].name);
    cardsChosenIds.push(cardID)
    this.innerHTML = `<span>${cardArray[cardID].icon}</span>`;

    if (cardsChosen.length === 2) {
        setTimeout(checkMatch, 500);
        i++;
    }
}