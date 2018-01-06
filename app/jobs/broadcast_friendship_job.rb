class BroadcastFriendshipJob < ApplicationJob

  def perform(target_user)
    if target_user.online == true
      DirectChannel.broadcast_to target_user, command: 'fetch_friends_list'
    end
  end
end
