class BroadcastMessageJob < ApplicationJob

  def perform(message, current_user, user)
    DirectChannel.broadcast_to user, command: 'fetch_message', options: { messageId: message.id }
  end
end
