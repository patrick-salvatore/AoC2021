package main

import (
	"flag"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func remove_index(s int, slice []int) []int {
	return append(slice[:s], slice[s+1:]...)
}

func part_1(lst []int) int {
	fish := make([]int, len(lst))
	copy(fish, lst)

	for i := 0; i < 80; i++ {
		newFish := make([]int, len(fish))

		for i := 0; i < len(fish); i++ {
			timer := fish[i]
			if timer == 0 {
				newFish[i] = 6
				newFish = append(newFish, 8)
			} else {
				newFish[i] = timer - 1
			}
		}

		fish = newFish
	}

	return len(fish)
}

func get_map_values(m map[int]int) []int {
	values := make([]int, len(m))

	for k, v := range m {
		values[k] = v
	}

	return values
}

func part_2(lst []int) int {
	fish_map := make(map[int]int, 8)

	fish_map[0] = 0
	fish_map[1] = 0
	fish_map[2] = 0
	fish_map[3] = 0
	fish_map[4] = 0
	fish_map[5] = 0
	fish_map[6] = 0
	fish_map[7] = 0
	fish_map[8] = 0

	for i := 0; i < len(lst); i++ {
		timer := lst[i]
		fish_map[timer] += 1
	}

	for i := 0; i < 256; i++ {
		map_vals := get_map_values(fish_map)

		for timer := 0; timer <= 8; timer++ {
			numFish := map_vals[timer]

			if numFish == 0 {
				continue
			}

			if timer == 0 {
				fish_map[0] = fish_map[0] - numFish
				fish_map[6] = fish_map[6] + numFish
				fish_map[8] = fish_map[8] + numFish
			} else {
				fish_map[timer] = fish_map[timer] - numFish
				fish_map[timer-1] += numFish
			}
		}
	}

	total := 0

	for _, v := range get_map_values(fish_map) {
		total += v
	}

	return total
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
	slices := strings.Split(strings.Trim(contents, ""), ",")

	ints := make([]int, len(slices))

	for i, s := range slices {
		ints[i], _ = strconv.Atoi(s)
	}

	println("---------------")
	fmt.Printf("part1 answer: %v \n", part_1(ints))
	fmt.Printf("\npart2 answer: %v \n", part_2(ints))
	println("---------------")
}
