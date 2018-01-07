class ApplicationController < ActionController::Base
  # protect_from_forgery with: :exception

  helper_method :current_user;

  def current_user
    User.find_by(session_token: cookies.signed[:session_token])
  end

  def login(user)
    if user.online
      DirectChannel.broadcast_to user, command: 'force_logout'
      sleep(1)
      ActionCable.server.remote_connections.where(current_user: user).disconnect
    end
    cookies.signed[:session_token] = user.reset_session_token!
  end

  def logout
    ActionCable.server.remote_connections.where(current_user: current_user).disconnect
    current_user.reset_session_token!
    cookies.signed[:session_token] = nil
  end

  def confirm_logged_in
    render json: ["User not logged int"], status: 401 if !current_user
  end
end
