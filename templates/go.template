package main

import (
	"flag"
	"fmt"
	"os"
	"strings"
)

func main() {
	var FILE_NAME string

	flag.StringVar(&FILE_NAME, "f", "sample.txt", "")
	flag.Parse()

	f, err := os.ReadFile(FILE_NAME)
	if err != nil {
		panic(err)
	}

	contents := string(f)
	slices := strings.SplitAfter(contents, " ")

	fmt.Println("%v", slices)
}
