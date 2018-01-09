class Api::ServersController < ApplicationController

  before_action :confirm_logged_in

  def create # params
    if @server = Server.create_server(current_user, server_params[:name])
      render :show
    else
      render json: ["Something went wrong"], status: 400
    end
  end

  def show # :id
    if @server = Server.find_by(id: params[:id])
      render :show
    else
      render json: ["Server not found"], status: 400
    end
  end

  def update # :id
    if @server = Server.find_by(id: params[:id])
      if @server.update(name: server_params[:name])
        # fetch_server options: serverId
        @server.members(current_user.id).each do |member|
          BroadcastServerJob.perform_later @server, member
        end
        render :show
      else
        render json: ["Something went wrong"], status: 400
      end
    else
      render json: ["That server does not exist"], status: 400
    end
  end

  def destroy # :id
    if @server = Server.find_by(id: params[:id])
      deletedServerId = @server.id
      members = @server.members(current_user.id)
      if @server.destroy
        payload = {deletedServerId: deletedServerId}
        members.each do |member|
          BroadcastRemoveServerJob.perform_later payload, member
        end
        # remove_server with server id to other users
        render json: {deletedServerId: deletedServerId}, status: 200
      else
        render json: ["Something went wrong"], status: 400
      end
    else
      render json: ["That server does not exist"], status: 400
    end
  end

  def subscribe # :id == user_id
    if @server = Server.find_by(id: params[:server_id])
      if @server.subscribe(params[:id])
        @server.members(current_user.id).each do |member|
          BroadcastServerJob.perform_later @server, member
        end
        # fetch_server with server id to other users
        render :show
      else
        render json: ["Something went wrong"], status: 400
      end
    else
      render json: ["That server does not exist"], status: 400
    end
  end

  def unsubscribe # :id == user_id
    if @server = Server.find_by(id: params[:server_id])
      if @server.unsubscribe(params[:id])
        @server.members(current_user.id).each do |member|
          BroadcastServerJob.perform_later @server, member
        end
        # fetch_server with server id to other users
        render json: {deletedServerId: @server.id}, status: 200
      else
        render json: ["Something went wrong"], status: 400
      end
    else
      render json: ["That server does not exist"], status: 400
    end
  end

  private
  def server_params
    params.require(:server).permit(:name)
  end

end
