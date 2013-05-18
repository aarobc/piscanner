#!/bin/bash

#ptpcam --dev=$1 --chdk='mode 1'


# to run it
#eval ptpcam $rstr
function getPath(){
	let dep=$2+1
	rfls="ptpcam --dev=$1 --chdk=\"luar loadfile('A/CHDK/SCRIPTS/scan.lua')()\""
#	rfls="ptpcam --chdk=\"luar loadfile('A/CHDK/SCRIPTS/scan.lua')()\""
	path=`eval $rfls | grep -o 'A[^J]*JPG'`
  echo $path
}

pth=$(getPath $1 0)
nm=`echo $pth | grep -o 'IMG[^J]*JPG'`

echo $pth
#echo $nm

imdir="/home/pi/scan/images"
ptpcam --dev=$1 --chdk="download $pth $imdir/$2.$nm"
#ptpcam --chdk="download $pth $imdir/$2.$nm"
echo "downloaden..."
junk=`ptpcam --chdk="getm"`
#delete the file from the cam after it is downloaded
ptpcam -D

echo "$imdir/$nm"
