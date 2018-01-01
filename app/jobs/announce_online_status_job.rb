class AnnounceOnlineStatusJob < ApplicationJob
  queue_as :default

  def perform(current_user)
    User.where(online: true).each do |user|
      if user != current_user
        DirectChannel.broadcast_to(user, "#{current_user.username} is now #{current_user.online ? "online" : "offline"}.")
      end
    end
  end

end
