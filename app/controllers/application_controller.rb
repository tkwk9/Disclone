class ApplicationController < ActionController::Base
  # protect_from_forgery with: :exception

  helper_method :current_user;

  def current_user
    User.find_by(session_token: session[:session_token])
  end

  def assign_session(token)
    session[:session_token] = token
    cookies.signed[:session_token] = token
  end

  def login(user)
    if user.online
      token = user.reset_session_token!
      DirectChannel.broadcast_to user, command: 'force_logout'
      ActionCable.server.remote_connections.where(current_user: user).disconnect
      assign_session(token)
    else
      assign_session(user.reset_session_token!)
    end
  end

  def forceLogout(user)
    assign_session(user.reset_session_token!)

  end

  def logout
    ActionCable.server.remote_connections.where(current_user: current_user).disconnect
    current_user.reset_session_token!
    assign_session(nil)
  end

end
