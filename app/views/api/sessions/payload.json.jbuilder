json.directMessages do
  @payload[:directMessages].each do |dm|
    # json.partial! 'api/dms/dm.json.jbuilder', dm: dm, messages: @payload[:messages].select{|message| message.messageable_id == dm.id}.map{|message| message.id}
    json.partial! 'api/dms/dm.json.jbuilder', dm: dm, messages: dm.payload_snippets.map{|message| message.id}
  end
end
json.servers do
  @payload[:servers].each do |server|
    json.partial! 'api/servers/server.json.jbuilder', server: server
  end
end
json.channels do
  @payload[:channels].each do |channel|
    # json.partial! 'api/channels/channel.json.jbuilder', channel: channel, messages: @payload[:messages].select{|message| message.messageable_id == channel.id}.map{|message| message.id}
    json.partial! 'api/channels/channel.json.jbuilder', channel: channel, messages: channel.payload_snippets.map{|message| message.id}
  end
end
json.messages do
  @payload[:messages].each do |message|
    json.partial! 'api/messages/message.json.jbuilder', message: message
  end
end
json.users do
  @payload[:users].each do |user|
    json.partial! 'api/users/user.json.jbuilder', user: user
  end
end
json.friendsList @payload[:friendsList]
json.ui do
  json.sessionPayloadReceived true
end
