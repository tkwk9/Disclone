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
    assign_session(user.reset_session_token!)
    # session[:session_token] = user.reset_session_token!
    # cookies.signed[:session_token] = session[:session_token]
  end


  def logout
    ActionCable.server.remote_connections.where(current_user: current_user).disconnect
    current_user.reset_session_token!
    assign_session(nil)
    # session[:session_token] = nil
    # cookies.signed[:user_id] = nil;
  end

end
