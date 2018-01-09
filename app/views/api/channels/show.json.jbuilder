messages = @channel.payload_snippets

json.channels do
  json.partial! 'api/channels/channel.json.jbuilder', channel: @channel, messages: messages.map{|message| message.id}
end

json.messages do
  messages.each do |message|
    json.partial! 'api/messages/message.json.jbuilder', message: message
  end
end

# json.users do
#   json.partial! 'api/users/user.json.jbuilder', user: @channel.recipients(current_user.id)
# end
