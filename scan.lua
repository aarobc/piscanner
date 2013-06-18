--[[
@title scan and go

--]]

function fastshoot()
  press("shoot_half")
  repeat 
sleep(1)
  until get_shooting() == true
  press("shoot_full")
  release("shoot_full")
  release("shoot_half")
  repeat
sleep(1)
  until get_shooting() ~= true
end


fastshoot()

--write_usb_msg("After func...")
sleep(1500)

--write_usb_msg("After delay...")
local hur=os.listdir("A/DCIM")
    
--write_usb_msg(hur)

  if not hur[1] then
    return "no dir"
  end
  local pth="A/DCIM/" .. hur[1]
--  write_usb_msg(pth)

  local fl=os.listdir(pth)
--  write_usb_msg(fl[1])
  
  if not fl[1] then
    return "no file"
  end

os.rename("A/DCIM", "A/_DCIM")
return "A/DCIM/" .. hur[1] .. "/" .. fl[1]
