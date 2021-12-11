package main

import (
	"flag"
	"fmt"
	"os"
	"strconv"
	"strings"
)

type Matrix = [][]int

func create_matrix(input []string) [][]int {
	Matrix := make([][]int, len(input))

	for i, strRow := range input {
		row := make([]int, len(strRow))

		for idx, item := range strings.Split(strRow, "") {
			num, _ := strconv.Atoi(item)
			row[idx] = num
		}

		Matrix[i] = row
	}
	return Matrix
}

func print_matrix(Matrix [][]int) {
	N := len(Matrix)
	for i := 0; i < N; i++ {
		fmt.Printf("%d ", Matrix[i])
		println("")
	}
}

func remove(s [][]int, idx int) [][]int {
	new := make([][]int, len(s))
	index := 0
	for i, item := range s {
		if i != idx {
			new[index] = item
			index++
		}
	}
	return new[:index]
}

func min(s []int) int {
	m := s[0]

	for i := 1; i < len(s); i++ {
		if m > s[i] {
			m = s[i]
		}

	}

	return m
}

func get_valid_neighbors(r int, c int, Mat Matrix) []int {
	var Neighbors []int

	if r-1 >= 0 {
		Neighbors = append(Neighbors, Mat[r-1][c])
	}
	if r+1 < len(Mat) {
		Neighbors = append(Neighbors, Mat[r+1][c])
	}
	if c-1 >= 0 {
		Neighbors = append(Neighbors, Mat[r][c-1])
	}
	if c+1 < len(Mat[0]) {
		Neighbors = append(Neighbors, Mat[r][c+1])
	}

	return Neighbors
}

func part_1(Matrix [][]int) int {
	rl := 0
	for i := 0; i < len(Matrix); i++ {
		for j := 0; j < len(Matrix[i]); j++ {
			neighbors := get_valid_neighbors(i, j, Matrix)
			if Matrix[i][j] < min(neighbors) {
				rl += Matrix[i][j] + 1
			}
		}
	}
	return rl
}

func part_2() {

}

func main() {
	var FILE_NAME string

	flag.StringVar(&FILE_NAME, "f", "sample.txt", "")
	flag.Parse()

	f, err := os.ReadFile(FILE_NAME)
	if err != nil {
		panic(err)
	}

	contents := string(f)
	input := strings.Split(contents, "\n")
	Matrix := create_matrix(input)

	println("---------------")
	fmt.Printf("part1 answer: %v \n", part_1(Matrix))
	fmt.Printf("part2 answer: %v")
	println("---------------")
}
