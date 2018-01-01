class DirectChannel < ApplicationCable::Channel
  def subscribed
    stream_for current_user
    current_user.online = true;
    current_user.save
    AnnounceOnlineStatusJob.perform_later current_user
  end


  def unsubscribed
    current_user.online = false;
    current_user.save
    AnnounceOnlineStatusJob.perform_later current_user
  end

  def speak
  end
end
