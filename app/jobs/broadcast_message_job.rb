class BroadcastMessageJob < ApplicationJob

  def perform(message, current_user)
    message.readers.each do |user|
      if user != current_user
        if user.subscribed?(message.messageable)
          DirectChannel.broadcast_to user, command: 'fetch_message', options: { messageId: message.id }
        else
          if message.messageable.class == Dm
            DirectChannel.broadcast_to user, command: 'fetch_dm', options: { targetId: current_user.id }
          else
            # TODO: Handle Channel
          end
        end
      end
    end
  end
end
