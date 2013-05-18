#!/bin/bash
#ptpcam --chdk="luar loadfile('A/CHDK/SCRIPTS/scan.lua')()"
#ptpcam --chdk="luar loadfile('A/CHDK/SCRIPTS/shot.lua')()"
#ptpcam --chdk="luar loadfile('A/CHDK/SCRIPTS/fastshot.lua')()"
ptpcam --chdk="luar loadfile('A/CHDK/SCRIPTS/$1')()"
#ptpcam --chdk="lua shoot()"
