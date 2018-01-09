if @messageable.class == Dm
  json.directMessages do
    json.partial! 'api/dms/dm.json.jbuilder', dm: @messageable, messages: [@message.id]
  end
else
  json.channels do
    json.partial! 'api/channels/channel.json.jbuilder', channel: @messageable, messages: [@message.id]
  end
end

json.messages do
  json.partial! 'api/messages/message.json.jbuilder', message: @message
end
