class DirectChannel < ApplicationCable::Channel
  def subscribed
    current_user.online = true;
    current_user.save
    stream_for current_user
  end


  def unsubscribed
    current_user.online = false;
    current_user.save
  end

  def speak
  end
end
