-- lptpgui.lua -- store this file in CHDK/LUALIB

lptpgui = {}

lptpgui.version=120

  -- begin -- DCIM Download --
local function getfileson(path,hfile)
  local fd,c,s,fpath,stat,i,tc,ts=os.listdir(path),0,0
  if fd~=nil and #fd>0 then
  for i=1, #fd do
  fpath=path .. "/" .. fd[i]
stat=os.stat(fpath)
  if stat~=nil then
  if stat.is_dir==true then
  if fd[i]~="CANONMSC" then
tc,ts=getfileson(fpath,hfile)
  c=c+tc
  s=s+ts
  end
  elseif stat.is_file==true then
  hfile:write(path .. "/"  .. "|" .. fd[i] .. "|" .. os.date("%Y%m%d%H%M%S", stat.mtime) .. "\n")
  s=s+(stat.size-1)/4096+1
  c=c+1
  end
  end
  end
  end
  return c,s
  end

local function getdcimfiles()
  local fn,count,size,tc,ts="A/ptpgui.txt",0,0
  local file=io.open(fn,"wb")
  if file then
  tc,ts=getfileson("A/DCIM",file)
  count=count+tc
  size=size+ts
file:close()
  end
  if count>0 then size=(size-1)/256+1 else size=0 end
  return count .. "\n" .. fn .. "\n" .. size
  end

  function lptpgui.dcimdl()
return getdcimfiles()
  end
  -- end -- DCIM Download --

  -- begin -- GetCamMode --
function lptpgui.getcammode()
  modemap=require("GEN/modelist")
  capmode=require("capmode")
  mode=""
  for i=1, #modemap do
  if capmode.valid(modemap[i]) then mode=mode..modemap[i].."|" end
  end
  return mode
  end
  -- end -- GetCamMode --

  -- begin -- GetCamInfo --
function lptpgui.getcaminfo()
  info=""
  info=info..get_vbatt().."|"..get_config_value(8).."|"..get_config_value(9).."|"..get_free_disk_space()
  return info
  end
  -- end -- GetCamInfo --

  -- begin -- ExecLuaString --
local function init_defaultvars(tvars)
  if type(tvars)=="table" then
  for var,val in pairs(tvars) do rawset(_G,var,val) end
  end
  end
local function gui_print(...)
  local str=""
  for i=1,select("#",...) do
  if str~="" then str=str.." " end
str=str..tostring(select(i,...))
  end
  write_usb_msg(str)
cam_print(...)
  end
  function lptpgui.exec_luastring(script,tvars)
init_defaultvars(tvars)
  script=string.gsub(script,"\002","\n")
  script=string.gsub(script,"\003","]]")
  cam_print=print
  print=gui_print
func,merr=loadstring(script)
  if func==nil then
print(merr)
  else
func()
  end
  end
  -- end -- ExecLuaString --

  -- begin -- ExecLuaFile --
  function lptpgui.exec_luafile(filename,tvars)
init_defaultvars(tvars)
  cam_print=print
  print=gui_print
func,merr=loadfile(filename)
  if func==nil then
print(merr)
  else
func()
  end
  end
  -- end -- ExecLuaFile --

  return lptpgui

