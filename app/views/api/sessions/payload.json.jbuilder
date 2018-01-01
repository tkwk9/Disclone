json.directMessages do
  @payload[:directMessages].each do |dm|
    json.partial! 'api/dms/dm.json.jbuilder', dm: dm
  end
end
json.messages do
  @payload[:messages].each do |message|
    json.partial! 'api/messages/message.json.jbuilder', message: message
  end
end
json.ui do
  json.sessionPayloadReceived true
end
