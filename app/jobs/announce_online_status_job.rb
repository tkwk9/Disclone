class AnnounceOnlineStatusJob < ApplicationJob

  def perform(current_user)
    DirectChannel.broadcast_to current_user, command: 'fetch_session_payload' if current_user.online

    current_user.users.select{|user| user.online == true }.each do |user|
      DirectChannel.broadcast_to user, command: "fetch_user", options: { userId: current_user.id }
    end
  end
end
