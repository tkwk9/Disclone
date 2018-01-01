class BroadcastMessageJob < ApplicationJob

  def perform(message)
    message.readers.each do |user|
      DirectChannel.broadcast_to(user, {command: 'fetch_message', options: {messageId: message.id}})
      # if user != current_user
      # end
    end
  end
end
