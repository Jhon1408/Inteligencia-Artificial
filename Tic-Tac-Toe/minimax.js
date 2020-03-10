let scores = {
    X:   1,
    O:  -1,
    tie: 0
}

function minimax(board, depth, isMaximazing) {
    let result = checkWinner();
    if(result !== null) {
        return scores[result];
    }

    if (isMaximazing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == '') {
                    board[i][j] = ia;
                    let score = minimax(board, depth + 1, false);
                    board[i][j] = '';
                    bestScore = max(score, bestScore);
                }
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == '') {
                    board[i][j] = human;
                    let score = minimax(board, depth + 1, true);
                    board[i][j] = '';
                    bestScore = min(score, bestScore);
                }
            }
        }
        return bestScore;
    }
}

function bestMove() {
    if (ia == 'X') {
        let bestScore = -Infinity;
        let move;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == '') {
                    board[i][j] = ia;
                    let score = minimax(board, 0, false);
                    board[i][j] = '';
                    if(score > bestScore) {
                        bestScore = score;
                        move = { i, j };
                    }
                }
            }
        }
        print("Best Score: " + bestScore)
        print([move.i,move.j])
        board[move.i][move.j] = ia;
        currentPlayer = human;
    } else {
        let bestScore = Infinity;
        let move;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == '') {
                    board[i][j] = ia;
                    let score = minimax(board, 0, true);
                    board[i][j] = '';
                    if(score < bestScore) {
                        bestScore = score;
                        move = { i, j };
                    }
                }
            }
        }
        print([move.i,move.j])
        board[move.i][move.j] = ia;
        currentPlayer = human;
    }
    
}