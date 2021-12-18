// deno-lint-ignore-file camelcase
import { parse } from "https://deno.land/std/flags/mod.ts";

export const split_line_break = (str: string) => {
  return str.split(/\r?\n/);
};

type Routes = Map<string, string[]>;

const last = <T>(xs: T[]) => xs[xs.length - 1];

const make_graph = (
  lines: string,
  GRAPH = new Map<string, string[]>(),
): Routes => {
  new Set(split_line_break(lines).flatMap((l) => l.split("-"))).forEach((n) => {
    GRAPH.set(n, []);
  });
  new Set(split_line_break(lines).map((l) => l.split("-"))).forEach(
    ([A, B]) => {
      GRAPH.get(A)?.push(B);
      GRAPH.get(B)?.push(A);
    },
  );

  return GRAPH;
};

const lower_case_reg = /[a-z]/;
const upper_case_reg = /[A-Z]/;

const part1 = (lines: string) => {
  const GRAPH = make_graph(lines);

  const pqueue = []; // queue of paths
  const completed_paths = [];
  let path = ["start"];
  pqueue.push(path.slice());

  while (pqueue.length) {
    path = pqueue.shift() || []; // first path in the queue

    if (last(path) === "end") {
      completed_paths.push(path);
    } else {
      const prev = last(path);
      GRAPH.get(prev)
        ?.filter((edge) => {
          if (prev === "start") return true;
          if (edge === "end" || upper_case_reg.test(edge)) return true;
          if (edge === "start" || path.indexOf(edge) > -1) return false;
          return true;
        })
        .forEach((edge) => {
          pqueue.push([...path.slice(), edge]);
        });
    }
  }

  return completed_paths.length;
};

const part2 = (lines: string) => {
  const GRAPH = make_graph(lines);

  let paths = ["start"];
  while (!paths.every((p) => p.endsWith("end"))) {
    const newPaths = [];

    for (let i = 0; i < paths.length; i++) {
      const path = paths[i];
      const split = path.split(",");
      const last = split[split.length - 1] || "start";

      if (last === "end") {
        newPaths.push(path);
        continue;
      }

      const nextCaves = GRAPH.get(last) || [];
      for (let j = 0; j < nextCaves.length; j++) {
        const next = nextCaves[j];
        if (next === "start") continue;

        if (next === "end" || !lower_case_reg.test(next)) {
          newPaths.push(`${path},${next}`);
          continue;
        }

        const smallCaves = split.filter((cave) => lower_case_reg.test(cave));
        const visitedTwice = smallCaves.some((cave) =>
          split.filter((p) => p === cave).length === 2
        );
        if (visitedTwice && split.includes(next)) continue;
        newPaths.push(`${path},${next}`);
      }
    }

    paths = newPaths;
  }
  return paths.length;
};

const FILE_NAME = parse(Deno.args)["sample"] ? "sample.txt" : "input.txt";
Deno.readTextFile(FILE_NAME)
  .then((data) => {
    console.log("---------------");
    console.log(`part1 answer: ${part1(data)}\n`);
    console.log(`part2 answer: ${part2(data)}\n`);
    console.log("---------------");
  })
  .catch((err) => {
    console.error(err);
    Deno.exit(1);
  });
