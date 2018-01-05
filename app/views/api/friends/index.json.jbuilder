json.friendsList @friendship_list
json.users do
  @friends.each do |friend|
    json.partial! 'api/users/user.json.jbuilder', user: friend
  end
end
