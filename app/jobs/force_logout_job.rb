class ForceLogoutJob < ApplicationJob

  def perform(user)
      DirectChannel.broadcast_to user, command: 'force_logout'
  end
end
