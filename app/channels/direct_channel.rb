class DirectChannel < ApplicationCable::Channel
  def subscribed
    stream_for "req_req_#{current_user.id}"
  end


  def unsubscribed
  end

  def speak
  end
end
