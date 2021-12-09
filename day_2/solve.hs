module Main where

cnv :: [String] -> [[String]]
cnv []          = []
cnv (move:rest) = words move : cnv rest

main :: IO () 
main = do
        ans <- cnv . lines <$> readFile "input.txt"
        print ans
