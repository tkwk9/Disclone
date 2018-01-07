class Api::FriendsController < ApplicationController

  before_action :confirm_logged_in

  def index
    @friends = current_user.friends
    @friendship_list = @friends.map(&:id)
    render :index
  end

  def create

    if !/\A\d+\z/.match(params[:id])
      targetId = Integer(params[:id].split('@').last)
    else
      targetId = Integer(params[:id])
    end

    if User.find_by(id: targetId)
      if friend = Friendship.create_friendship(current_user.id, targetId)
        BroadcastFriendshipJob.perform_later friend
        @friends = current_user.friends
        @friendship_list = @friends.map(&:id)
        render :index
      else
        render json: ["That friendship already exists"], status: 403
      end
    else
      render json: ["Target user does not exist"], status: 403
    end
  end

  def destroy
    if User.find_by(id: params[:id])
      if stranger = Friendship.destroy_friendship(current_user.id, params[:id])
        BroadcastFriendshipJob.perform_later stranger
        @friends = current_user.friends
        @friendship_list = @friends.map(&:id)
        render :index
      else
        render json: ["That friendship does not exist"], status: 403
      end
    else
      render json: ["Target user does not exist"], status: 402
    end
  end

end
