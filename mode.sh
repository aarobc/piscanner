#!/bin/bash

rstr="--chdk='mode $1'"
#rstr="--dev=$1 --chdk='mode $2'"
#echo $rstr

# to run it
eval ptpcam $rstr

