import copy
import sys
from os import read
from itertools import chain


def put_str_to_nums(str):
    return [x for x in str.split(" ") if x != r""]


def compose_boards(lines):
    boards = []
    step = -1

    for line in lines:
        if line == "":
            boards.append([])
            step += 1
            continue
        boards[step].append(put_str_to_nums(line))

    return boards


def fill_in_board(board, pick):
    for r in range(len(board)):
        for c in range(len(board[r])):
            if board[r][c] == pick:
                return [True, [r, c]]
    return [False]


def rotate_board_90(A):
    N = len(A[0])
    for i in range(N // 2):
        for j in range(i, N - i - 1):
            temp = A[i][j]
            A[i][j] = A[N - 1 - j][i]
            A[N - 1 - j][i] = A[N - 1 - i][N - 1 - j]
            A[N - 1 - i][N - 1 - j] = A[j][N - 1 - i]
            A[j][N - 1 - i] = temp

    return A


def check_for_winner(board):
    for row in board:
        if all(i == "X" for i in row):
            return [True, board]

    rotated_board = rotate_board_90(copy.deepcopy(board))
    for row in rotated_board:
        if all(i == "X" for i in row):
            return [True, board]

    return [False]


def run(FILE_NAME):
    f = open(FILE_NAME, "r")
    text = f.read()
    lines = text.split("\n")
    draws = lines[0].split(",")
    mut_boards = compose_boards(lines[1:])

    for draw in draws:
        for i in range(len(mut_boards)):
            mut_board = mut_boards[i]
            valid_draw = fill_in_board(mut_board, draw)

            if not valid_draw[0]:
                continue

            [row, col] = valid_draw[1]
            mut_board[row][col] = "X"

            result = check_for_winner(mut_board)

            if result[0]:
                winner = result[1]
                N = len(winner)
                tot = sum(
                    [
                        int(winner[x][y])
                        for x in range(N)
                        for y in range(len(winner[x]))
                        if winner[x][y] != "X"
                    ]
                )
                print(tot * int(draw))
                return


if __name__ == "__main__":
    if len(sys.argv) > 1:
        run("sample.txt")
    else:
        run("input.txt")
