import math
import sys


def get_adjacent_points(arr, i, j):  # no diagonals
    points = []
    if i - 1 >= 0:
        points.append(arr[i - 1][j])  # up
    if i + 1 < len(arr):
        points.append(arr[i + 1][j])  # down
    if j - 1 >= 0:
        points.append(arr[i][j - 1])  # left
    if j + 1 < len(arr[0]):
        points.append(arr[i][j + 1])  # right
    return points


def part1(arr):
    rl = 0
    for i in range(len(arr)):
        for j in range(len(arr[0])):
            pts = get_adjacent_points(arr, i, j)
            if arr[i][j] < min(pts):
                rl += arr[i][j] + 1

    return rl


def build_graph(arr):
    graph = {}
    for i in range(len(arr)):
        for j in range(len(arr[0])):
            pt = (i, j)
            neighbors = []
            if i - 1 >= 0 and arr[i - 1][j] != 9:
                neighbors.append((i - 1, j))
            if i + 1 < len(arr) and arr[i + 1][j] != 9:
                neighbors.append((i + 1, j))
            if j - 1 >= 0 and arr[i][j - 1] != 9:
                neighbors.append((i, j - 1))
            if j + 1 < len(arr[0]) and arr[i][j + 1] != 9:
                neighbors.append((i, j + 1))
            graph[pt] = neighbors
    return graph


def part2(arr):
    graph = build_graph(arr)
    basin_sizes = []
    visited = set()
    for v in graph.keys():
        if v in visited:
            continue
        basin_size = 0
        q = [v]
        while q:
            node = q.pop(0)
            for neighbor in graph[node]:
                if neighbor not in visited:
                    visited.add(neighbor)
                    q.append(neighbor)
                    basin_size += 1
        basin_sizes.append(basin_size)
    return math.prod(sorted(basin_sizes)[::-1][:3])


def run(FILE_NAME):

    with open(FILE_NAME, "r") as f:
        data = f.read()
    arr = [[int(e) for e in line] for line in data.splitlines()]

    print("---------------")
    print("part1 answer: {}\n".format(part1(arr)))
    print("part2 answer: {}".format(part2(arr)))
    print("---------------")


if __name__ == "__main__":
    if len(sys.argv) < 1:
        run("sample.txt")
    else:
        run("input.txt")
