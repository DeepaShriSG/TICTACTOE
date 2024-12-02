let win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8]
];

let cellEle = document.querySelectorAll("[data-cell]");
let board = document.getElementById("board");
let winMsgText = document.querySelector("[data-winning-message-text]");
let restartBtn = document.getElementById("restartButton");

let winMsg = document.getElementById("winningMessage");
let circleTurn;

startGame();

restartBtn.addEventListener("click", startGame);

function startGame() {
    circleTurn = false;
    cellEle.forEach(cell => {
        cell.innerHTML = ""; 
        cell.removeAttribute("data-player");
        cell.class = "";
        cell.removeEventListener("click", handleClick); 
        cell.addEventListener("click", handleClick, { once: true }); 
    });
    winMsg.classList.remove("show");
}

function handleClick(e) {
    const cell = e.target;

    // Play move
    playMove(cell);

    // Check for win or draw
    if (checkWin()) {
        endGame(false);
    } else if (checkDraw()) {
        endGame(true);
    } else {
        // Switch player
        switchPlayer();
    }
}

function playMove(cell) {
    // Add the icon for the current player
    const icon = document.createElement("i");
    icon.className = circleTurn ? "fi fi-br-o" : "fi fi-br-cross"; 
    cell.appendChild(icon);

  
    cell.setAttribute("data-player", circleTurn ? "circle" : "cross");
}

function switchPlayer() {
    circleTurn = !circleTurn;
}

function checkWin() {
    const currentPlayer = circleTurn ? "circle" : "cross";
    const isWin = win.some(combination => {
        return combination.every(index => {
            return cellEle[index].getAttribute("data-player") === currentPlayer;
        });
    });
    return isWin;
}

function endGame(draw) {
    if (draw) {
        winMsgText.textContent = "Draw!";
    } else {
        winMsgText.textContent = `${circleTurn ? "O's" : "X's"} Wins!`;
    }
    winMsg.classList.add("show");
}


function checkDraw() {
    return [...cellEle].every(cell => {
        return cell.hasAttribute("data-player");
    });
}


