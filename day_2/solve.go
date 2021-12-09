package main

import (
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
)

func part1(rawMoves []string) int {
	depth, horizontal := 0, 0

	for i := 0; i < len(rawMoves); i++ {
		move := strings.Split(rawMoves[i], " ")
		dir, s := move[0], move[1]
		v, _ := strconv.Atoi(s)

		switch dir {
		case "forward":
			horizontal += v
		case "up":
			depth -= v
		case "down":
			depth += v
		}
	}

	return depth * horizontal

}

func part2(rawMoves []string) int {
	depth, horizontal, aim := 0, 0, 0

	for i := 0; i < len(rawMoves); i++ {
		move := strings.Split(rawMoves[i], " ")
		dir, s := move[0], move[1]
		v, _ := strconv.Atoi(s)

		switch dir {
		case "forward":
			horizontal += v
			depth += aim * v
		case "up":
			aim -= v
		case "down":
			aim += v
		}
	}

	return depth * horizontal
}

func main() {
	contents, err := os.ReadFile("input.txt")
	if err != nil {
		log.Fatal(err)
	}

	rawMoves := strings.Split(string(contents), "\n")

	println("---------------")
	fmt.Printf("part1 answer: %d", part1(rawMoves))
	println("\n")
	fmt.Printf("part2 answer: %v", part2(rawMoves))
	println("\n---------------")

}
