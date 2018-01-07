json.set! dm.id do
  json.id dm.id
  json.recipientId dm.recipient(current_user.id).id
  json.unreadCount dm.reader_membership(current_user.id).unread_count
  json.messages messages
end
