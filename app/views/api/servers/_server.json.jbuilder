json.set! server.id do
  json.id server.id
  json.membersIds server.members(current_user.id).map{|user| user.id}
  json.channelIds server.channels.map{|channel| channel.id}
  json.imgURL server.img_url
end
