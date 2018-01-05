messages = @dm.payload_snippets

json.directMessages do
  json.partial! 'api/dms/dm.json.jbuilder', dm: @dm, messages: messages.map{|message| message.id}
end
json.messages do
  messages.each do |message|
    json.partial! 'api/messages/message.json.jbuilder', message: message
  end
end
