class Api::UsersController < ApplicationController

  def index
    @users = User.all
    render :index
  end

  def create
    user = User.new(user_params)
    if user.save
      @payload = login(user)
      render 'api/sessions/init.json.jbuilder'
    else
      render json: user.errors.full_messages, status: 403
    end
  end

  private
  def user_params
    params.require(:user).permit(:email, :username, :password)
  end

end
