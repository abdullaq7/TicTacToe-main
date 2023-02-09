window.addEventListener('DOMContentLoaded', () => {
        
    const tiles = Array.from(document.querySelectorAll('.tile'));

    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const win = document.querySelector('.win');
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;
    const x_win = 'player X won';
    const o_win = 'player O won';
    const TIE = 'TIE';

    let score1 = document.querySelector('#player1')
    let score2 = document.querySelector('#player2')
    
    let score_X = 0
    let score_O = 0

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

   // game won

    function gameWon() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

    if (roundWon) {
            winner(currentPlayer === 'X' ? x_win : o_win);
            isGameActive = false;
            return;
        }
        if (!board.includes (''))
        winner(TIE)
    } 


// win display

    function winner (event) {
        switch(event){
            case o_win:
                win.innerHTML = 'Player O Won';
                score_O ++;
                score2.textContent = score_O ;
                break;
            case x_win:
                win.innerHTML = 'Player X Won';
                score_X ++;
                score1.textContent = score_X  ;
                break;
            case TIE:
                win.innerText = 'Tie';
        }
        win.classList.remove('hide');
    };


    // tile empty check

    function tileEmpty  (tile)  {
        if (tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }

        return true;
    };

    // update board

    function updateBoard (index)  {
        board[index] = currentPlayer;
    }



    // player change

    function changePlayer () {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }




        // tile click

    function tileClick (tile, index) {
        if(tileEmpty(tile) && isGameActive) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            gameWon();
            changePlayer();
        }
    }


    //reset 

    function resetBoard () {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        win.classList.add('hide');

        if (currentPlayer === 'O') {
            changePlayer();
        }

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }

        // click 

    tiles.forEach( (tile, index) => {
        tile.addEventListener('click', () => tileClick(tile, index));
    });

        // reset click

    resetButton.addEventListener('click', resetBoard);
});