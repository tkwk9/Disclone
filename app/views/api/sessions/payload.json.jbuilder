json.directMessages do
  @payload[:directMessages].each do |dm|
    json.set! dm.id do
      json.id dm.id
      json.participantIds dm.users.map{|user| user.id}
      json.messages dm.messages.map{|message| message.id}
    end
  end
end
json.messages do
  @payload[:messages].each do |message|
    json.set! message.id do
      json.id message.id
      json.authorId message.author_id
      json.content message.content
      json.timestamp message.created_at
    end
  end
end
json.ui do
  json.sessionPayloadReceived true
end
