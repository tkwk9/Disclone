class BroadcastRemoveServerJob <ApplicationJob
  def perform(payload, user)
    DirectChannel.broadcast_to user, command: 'remove_server', options: {payload: payload}
  end
end
