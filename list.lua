--[[
@title Listdir
rem 10-11-2008 by msl
--]]

local hur=os.listdir("A/DCIM")
    
--write_usb_msg(hur)

  if not hur[1] then
    return "no dir"
  end
  local pth="A/DCIM/" .. hur[1]
  write_usb_msg(pth)

  local fl=os.listdir(pth)
  write_usb_msg(fl[1])
  
  if not fl[1] then
    return "no file"
  end

os.rename("A/DCIM", "A/_DCIM")
return "A/DCIM/" .. hur[1] .. "/" .. fl[1]
