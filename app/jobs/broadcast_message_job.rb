class BroadcastMessageJob < ApplicationJob

  def perform(message, current_user)
    message.readers.each do |user|
      if user != current_user
        DirectChannel.broadcast_to user, command: 'fetch_message', options: { messageId: message.id }
      end
    end
  end
end
