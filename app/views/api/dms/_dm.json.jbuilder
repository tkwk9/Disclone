json.set! dm.id do
  json.id dm.id
  json.recipientId dm.recipient(current_user.id).id
  json.messages messages
end
