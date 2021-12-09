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
	NUMBER_OF_DAYS := 256
	results := lst

	for NUMBER_OF_DAYS > 0 {
		for i := 0; i < len(results); i++ {
			if results[i] == 0 {
				results = append(results, 9)
				results[i] = 7
			}
			results[i] -= 1
		}

		NUMBER_OF_DAYS -= 1
	}

	return len(results)
}

func updateMap(_map map[int][]int) {
	//  values = Array.from(map.values());
	// for (let timer = 0; timer <= 8; timer++) {
	//    numberOfFish = values[timer];
	//   if (numberOfFish === 0) continue;

	//   if (timer === 0) {
	// 	map.set(0, map.get(0) - numberOfFish);
	// 	map.set(6, map.get(6) + numberOfFish);
	// 	map.set(8, map.get(8) + numberOfFish);
	//   } else {
	// 	map.set(timer, map.get(timer) - numberOfFish);
	// 	map.set(timer - 1, map.get(timer - 1) + numberOfFish);
	//   }
	// }
}

func part_2(lst []int) {
	var fish = make(map[int][]int)

	fish[0] = []int{0, 0}
	fish[1] = []int{1, 0}
	fish[2] = []int{2, 0}
	fish[3] = []int{3, 0}
	fish[4] = []int{4, 0}
	fish[5] = []int{5, 0}
	fish[6] = []int{6, 0}
	fish[7] = []int{7, 0}
	fish[8] = []int{8, 0}

	for i := 0; i < len(lst); i++ {
		timer := lst[i]
		fish[timer][1] += 1
	}

	// Simulate 256 days
	for i := 0; i < 256; i++ {
		updateMap(fish)
	}

	// 	return Array.from(fish.values()).reduce((a, b) => a + b, 0);
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

	fmt.Printf("%v \n", part_1(ints))

}
