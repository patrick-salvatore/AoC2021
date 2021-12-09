# ! /bin/bash

SECRET_TOKEN=$(<.keys)

for i in "$@"
do
case $i in
    -d=*|--day=*)
    DAY="${i#*=}"
    ;;
    -l=*|--lang=*)
    LANGUAGE="${i#*=}"
    ;;
    *)
    # unknown option
    ;;
    esac
done

if [ -z "$DAY" ]
then 
    printf "ERROR: You did not provide a day \n"
    exit 1 
fi

if [ -z "$LANGUAGE" ]
then 
    printf "ERROR: You did not provide a language platform \n"
    exit 1 
fi

langs_array=(hs go js ts, py)
day_folder="day_$DAY"
input_file="$day_folder/input.txt"

if [ -d "$day_folder" ]
then 
    printf "ERROR: You already created a folder for AoC Day $DAY \n"
    exit 1 
else
    mkdir -p $day_folder
    cd -Path $day_folder
fi

echo $DAY
echo $LANGUAGE

if [[ ${langs_array[*]} =~ "$LANGUAGE" ]]
then
    # CREATE LANAUGE PLATFORM FILE
    cat templates/${LANGUAGE}.template > "$day_folder/solve.$LANGUAGE"
    #CREATE INPUT FILE
    curl --cookie "session=$SECRET_TOKEN" "https://adventofcode.com/2021/day/$DAY/input" > $input_file 

    echo "SUCCESS: Good luck on day $DAY"       
    exit 0
fi

echo "ERROR: You provided a language platform that I don't i know"
exit 1
