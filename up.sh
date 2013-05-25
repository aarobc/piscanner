#!/bin/bash
# little helper script for uploading lua files to the camera via phpcam.
# Specifiy the lua file you want to upload as the arguement
ptpcam --chdk="upload $1 A/CHDK/SCRIPTS/$1"
