class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by_credentials(user_params[:email], user_params[:password])
    if @user
      login(@user)
      render "api/users/current_user.json.jbuilder"
    else
      if User.find_by(email: user_params[:email])
        render json: ["Password is incorrect"], status: 403
      else
        render json: ["Email not found"], status: 403
      end
    end
  end

  def payload
    if current_user
      @payload = current_user.session_payload
      render :payload
    else
      render json: ["User not logged in"], status: 403
      # redirect_to root_url, status: 301
    end
  end

  def friends_list
    if current_user
      @friends = current_user.friends
      @friendship_ids = @friends.map(&:id)
      render :friends_list
    else
      render json: ["User not logged in"], status: 403
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
