json.set! dm.id do
  json.id dm.id
  json.participantIds dm.users.map{|user| user.id}
  json.messages dm.messages.map{|message| message.id}
end
