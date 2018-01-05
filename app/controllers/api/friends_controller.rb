class Api::FriendsController < ApplicationController

  def index
    if current_user
      @friends = current_user.friends
      @friendship_list = @friends.map(&:id)
      render :index
    else
      render json: ["User not logged in"], status: 403
    end
  end

  def create
    if current_user
      if User.find_by(id: params[:id])
        if friend = Friendship.create_friendship(current_user.id, params[:id])
          # TODO: Broadcast to friend
          @friends = current_user.friends
          @friendship_list = @friends.map(&:id)
          render :index
        else
          render json: ["That friendship already exists"], status: 403
        end
      else
        render json: ["Target user does not exist"], status: 403
      end
    else
      render json: ["User not logged in"], status: 403
    end
  end

  def destroy
    if current_user
      if User.find_by(id: params[:id])
        if stranger = Friendship.destroy_friendship(current_user.id, params[:id])
          # TODO: braodcast_to stranger
          @friends = current_user.friends
          @friendship_list = @friends.map(&:id)
          render :index
        else
          render json: ["That friendship does not exist"], status: 403
        end
      else
        render json: ["Target user does not exist"], status: 403
      end
    else
      render json: ["User not logged in"], status: 403
    end
  end

end
