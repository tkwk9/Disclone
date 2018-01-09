json.set! channel.id do
  json.id channel.id
  json.unreadCount channel.reader_membership(current_user.id).unread_count
  json.messages messages
end
