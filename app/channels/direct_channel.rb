class DirectChannel < ApplicationCable::Channel
  def subscribed
    stream_for current_user
    current_user.update(online: true)
    AnnounceOnlineStatusJob.perform_later current_user, 'online'
  end


  def unsubscribed
    current_user.update(online: false)
    AnnounceOnlineStatusJob.perform_later current_user, 'offline'
  end

  def speak
  end

end
