json.set! channel.id do
  json.id channel.id
  json.name channel.name
  json.serverId channel.server.id
  json.firstMessageId channel.first_message_id
  json.unreadCount channel.reader_membership(current_user.id).unread_count
  json.messages messages
end
