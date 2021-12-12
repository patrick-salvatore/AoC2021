from functools import total_ordering
from os import error
import sys

OPENED = ["(", "[", "{", "<"]
CLOSED = [")", "]", "}", ">"]

CLOSED_OPEN_MAP = {")": "(", "]": "[", "}": "{", ">": "<"}
OPENED_CLOSE_MAP = {"(": ")", "[": "]", "{": "}", "<": ">"}

ERRORS_POINTS = {")": 3, "]": 57, "}": 1197, ">": 25137}
MISSING_POINTS = {")": 1, "]": 2, "}": 3, ">": 4}


def find_errors(line):
    opening = []
    errors = {}

    while line:
        char = line[0]

        if char in CLOSED:
            if CLOSED_OPEN_MAP[char] != opening.pop(len(opening) - 1):
                errors[char] = errors[char] + 1 if errors.get(char) else 1

        if char in OPENED:
            opening.append(char)

        line = line[1:]

    return [True, errors] if len(errors) else [False]


def find_missing(line):
    remaining = []

    while line:
        char = line[0]

        if char in CLOSED:
            remaining.pop(len(remaining) - 1)

        if char in OPENED:
            remaining.append(char)

        line = line[1:]

    return remaining


def part1(lines):
    scores = []
    for line in lines:
        errors = find_errors(line)

        if errors[0] is False:
            continue

        score = 0
        for char, val in errors[1].items():
            score += ERRORS_POINTS[char] * val

        scores.append(score)

    return sum(scores)


def part2(lines):
    scores = []

    for line in lines:
        errors = find_errors(line)

        if errors[0] is True:
            continue

        remaining = find_missing(line)
        score = 0
        for i in range(len(remaining) - 1, -1, -1):
            score = (score * 5) + MISSING_POINTS[OPENED_CLOSE_MAP[remaining[i]]]

        scores.append(score)

    sorted_scores = sorted(scores)

    return sorted_scores[len(sorted_scores) // 2]


def run(FILE_NAME):

    with open(FILE_NAME, "r") as f:
        data = f.read()

    print("---------------")
    print("part1 answer: {}\n".format(part1(data.split("\n"))))
    print("part2 answer: {}".format(part2(data.split("\n"))))
    print("---------------")


if __name__ == "__main__":
    if len(sys.argv) == 1:
        run("sample.txt")
    else:
        run("input.txt")
