import sys
from collections import defaultdict


def part1(lines):
    total = 0
    for line in lines:
        outputs = line[1].split()
        for output in outputs:
            if len(output.strip()) in {2, 3, 4, 7}:
                total += 1
    return total


def contains(known, chars, n):
    if n not in known:
        return False

    for c in known[n]:
        if c not in chars:
            return False
    return True


def contains_reverse(known, chars, n):
    if n not in known:
        return False

    for c in chars:
        if c not in known[n]:
            return False
    return True


def decode(known, chars):
    for number in known:
        if len(chars) == len(known[number]) and sorted(chars) == sorted(known[number]):
            return number
    print("cannot decode {} with {}, exiting".format(chars, known))
    exit(1)


def part2(lines):
    total = 0
    for line in lines:
        outputs = line[1].split()
        known = {}
        for output in outputs:
            length = len(output)
            if length == 2:
                known[1] = output
            elif length == 3:
                known[7] = output
            elif length == 4:
                known[4] = output
            elif length == 7:
                known[8] = output

        prev_len = -1
        while len(known) != prev_len:
            prev_len = len(known)
            inputs = line[0].split()
            for chars in inputs:
                length = len(chars)
                if length == 2:
                    known[1] = chars
                if length == 3:
                    known[7] = chars
                if length == 4:
                    known[4] = chars
                if length == 5:
                    if contains(known, chars, 7) or contains(known, chars, 1):
                        known[3] = chars

                    if contains_reverse(
                        known, chars, 6
                    ):  # or contains_reverse(known, chars, 9):
                        known[5] = chars

                    if (3 in known and not contains(known, chars, 3)) and (
                        5 in known and not contains(known, chars, 5)
                    ):
                        known[2] = chars

                if length == 6:
                    if contains(known, chars, 4):
                        known[9] = chars
                    if (contains(known, chars, 7) or contains(known, chars, 1)) and (
                        not contains(known, chars, 4)
                    ):
                        known[0] = chars
                    if (not contains(known, chars, 7)) and (
                        not contains(known, chars, 1)
                    ):
                        known[6] = chars

                if length == 7:
                    known[8] = chars

        total += int("".join([str(decode(known, o)) for o in outputs]))
    return total


def run(FILE_NAME):
    lines = []
    with open(FILE_NAME, "r") as file:
        lines = [l.split("|") for l in file.readlines()]

    print("---------------")
    print("part1 answer: {}\n".format(part1(lines)))
    print("part2 answer: {}".format(part2(lines)))
    print("---------------")


if __name__ == "__main__":
    if len(sys.argv) < 1:
        run("sample.txt")
    else:
        run("input.txt")
