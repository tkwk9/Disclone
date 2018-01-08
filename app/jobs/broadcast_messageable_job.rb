class BroadcastMessageableJob < ApplicationJob

  def perform(messageable, current_user, user)
    if messageable.class == Dm
      DirectChannel.broadcast_to user, command: 'fetch_dm', options: { targetId: current_user.id }
    else
      # TODO: Handle Channel
    end
  end
end
