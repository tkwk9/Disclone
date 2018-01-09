json.servers do
  json.partial! 'api/servers/server.json.jbuilder', server: @server
end

json.channels do
  @server.channels.each do |channel|
    messages = channel.payload_snippets
    json.partial! 'api/channels/channel.json.jbuilder', channel: channel, messages: messages.map{|message| message.id}
  end
end

json.messages do
  @server.messages.each do |message|
    json.partial! 'api/messages/message.json.jbuilder', message: message
  end
end

json.users do
  @server.members(current_user.id).each do |user|
    json.partial! 'api/users/user.json.jbuilder', user: user
  end
end
