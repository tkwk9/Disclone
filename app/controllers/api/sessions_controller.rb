class Api::SessionsController < ApplicationController

  def create
    user = User.find_by_credentials(user_params[:email], user_params[:password])
    if user
      @payload = login(user)
      render :init
    else
      render json: ["Invalid credentials"], status: 403
    end
  end

  def destroy
    if current_user
      logout
      render json: {}
    else
      render json: ["User not logged in"], status: 403
    end
  end

  private
  def user_params
    params.require(:user).permit(:email, :password)
  end

end
