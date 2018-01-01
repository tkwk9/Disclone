class ApplicationController < ActionController::Base

  # protect_from_forgery with: :exception
  helper_method :current_user;

  def current_user
    User.find_by(session_token: session[:session_token])
  end

  def login(user)
    DirectChannel.broadcast_to("req_req_1", 'stuff')
    session[:session_token] = user.reset_session_token!
    cookies.signed[:user_id] = user.id
  end

  def logout
    current_user.reset_session_token!
    session[:session_token] = nil;
    cookies.signed[:user_id] = nil;
  end

end
