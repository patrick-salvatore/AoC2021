module Main where

horizontal = filter (\p -> fst p == "forward")

ups = filter (\p -> fst p == "up")

downs = filter (\p -> fst p == "down")

change' :: Num b => ([Char], b) -> b
change' x =
  if fst x == "up"
    then (-1) * snd x
    else snd x

multiply x y = x * y

main :: IO ()
main = do
  moves <- map (head . words) . lines <$> readFile "input.txt"
  numbers <-
    map ((\x -> read (head (tail x)) :: Int) . words) . lines <$>
    readFile "input.txt"
  print
    (sum (map change' $ filter (\p -> fst p /= "forward") $ zip moves numbers))
