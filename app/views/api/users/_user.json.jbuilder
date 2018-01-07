json.set! user.id do
  json.id user.id
  json.stringId "#" + sprintf('%04d', user.id)
  json.username user.username
  json.imgURL user.img_url
  json.online user.online
end
