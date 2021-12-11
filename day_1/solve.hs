module Main where

import           Control.Monad
import           Data.List

cnv1 :: [Int] -> [[Int]]
cnv1 []           = []
cnv1 [_]          = []
cnv1 (ft:sd:rest) = [ft, sd] : cnv1 (sd : rest)

checkIfGreater :: [Int] -> Int
checkIfGreater [_] = 0
checkIfGreater list =
  if head list < list !! 1
    then 1
    else 0

part1 inp' = print $ sum $ map checkIfGreater $ cnv1 inp'

slidingWindows :: Int -> [Int] -> [[Int]]
slidingWindows n l = take n <$> tails l

countIf :: (a -> Bool) -> [a] -> Int
countIf p = length . filter p

countIncrs = countIf (== LT) . (zipWith compare `ap` tail)

part2 l = print $ countIncrs (sum <$> slidingWindows 3 l)

main :: IO ()
main = do
  inp <- lines <$> readFile "input.txt"
  let inp' = read <$> inp :: [Int]
  part1 inp'
  part2 inp'
