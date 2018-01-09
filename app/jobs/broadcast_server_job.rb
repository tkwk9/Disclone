class BroadcastServerJob < ApplicationJob

  def perform(server, user)
    DirectChannel.broadcast_to user, command: 'fetch_server', options: { serverId: server.id }
  end
end
