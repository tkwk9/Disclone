json.session do
  json.currentUser do
    json.partial! 'api/users/user.json.jbuilder', user: @payload[:user]
  end
end
