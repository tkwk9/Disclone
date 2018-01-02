class AnnounceOnlineStatusJob < ApplicationJob

  def perform(current_user)
    DirectChannel.broadcast_to current_user, command: 'fetch_session_payload' if current_user.online
    User.where(online: true).each do |user|
      if user != current_user
        DirectChannel.broadcast_to(user, command: "print", options: { message: "#{current_user.username} is now #{current_user.online ? "online" : "offline"}." })
      end
    end
  end
end
