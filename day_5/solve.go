package main

import (
	"flag"
	"fmt"
	"os"
	"strconv"
	"strings"
)

type Point struct {
	x int
	y int
}

type Vec2 struct {
	from Point
	to   Point
}

func (p Point) gen_point(x int, y int) *Point {
	p.x = x
	p.y = y

	return &p
}

func (v Vec2) gen_vector(to Point, from Point) *Vec2 {
	v.to = to
	v.from = from

	return &v
}

func find_max(contents string) int {
	max := -1
	for _, c := range strings.Split(strings.TrimSpace(contents), "->") {
		n := strings.Split(c, ",")
		for _, item := range n {
			number, _ := strconv.Atoi(strings.TrimSpace(item))

			if number > max {
				max = number
			}
		}
	}
	return max
}

func create_matrix(N int) [][]int {
	var Matrix = make([][]int, N)
	for i := range Matrix {
		Matrix[i] = make([]int, N)
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

func count_answer(Matrix [][]int) int {
	N := len(Matrix)
	answer := 0

	for i := 0; i < N; i++ {
		for j := 0; j < N; j++ {
			if Matrix[i][j] > 1 {
				answer += 1
			}
		}
	}

	return answer
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
	N := find_max(contents)
	slices := strings.SplitAfter(contents, "\n")

	Matrix := create_matrix(N + 1)

	for i := 0; i < len(slices); i++ {
		coord := strings.Split(strings.TrimSpace(slices[i]), "->")
		start := strings.Split(strings.TrimSpace(coord[0]), ",")
		end := strings.Split(strings.TrimSpace(coord[1]), ",")

		x1, _ := strconv.Atoi(start[0])
		y1, _ := strconv.Atoi(start[1])
		x2, _ := strconv.Atoi(end[0])
		y2, _ := strconv.Atoi(end[1])

		if x1 == x2 || y1 == y2 {
			var start int
			var end int

			if x1 != x2 {
				if x1 > x2 {
					start = x2
					end = x1
				} else {
					start = x1
					end = x2
				}

				for i := start; i <= end; i++ {
					Matrix[y1][i] = Matrix[y1][i] + 1
				}

			} else {
				if y1 > y2 {
					start = y2
					end = y1
				} else {
					start = y1
					end = y2
				}

				for i := start; i <= end; i++ {
					Matrix[i][x1] = Matrix[i][x1] + 1
				}
			}
		}
	}

	// print_matrix(Matrix)
	fmt.Println((count_answer(Matrix)))
}
