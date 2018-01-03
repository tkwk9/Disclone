Time.zone = 'EST' # TODO: implement current_user.zone

json.set! message.id do
  json.id message.id
  json.authorId message.author_id
  json.author message.author.username
  json.content message.content
  json.timestamp message.created_at.to_s
end
