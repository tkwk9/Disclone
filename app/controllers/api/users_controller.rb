class Api::UsersController < ApplicationController

  before_action :confirm_logged_in, only: [:index]

  def index
    @users = User.all
    render :index
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      render :current_user
    else
      render json: @user.errors.full_messages, status: 403
    end
  end

  private
  def user_params
    params.require(:user).permit(:email, :username, :password)
  end

end
