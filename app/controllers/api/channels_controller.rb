class Api::ChannelsController < ApplicationController

  before_action :confirm_logged_in

  def create # :server_id
    if server = Server.find_by(id: params[:server_id])
      if @channel = server.create_channel(channel_params[:name])
        @channel.recipients(current_user.id).each do |member|
          BroadcastMessageableJob.perform_later @channel, current_user, member
        end
        # fetch_channel options: chanelId
        render :show
      else
        render json: ["Something went wrong"], status: 400

      end
    else
      render json: ["That server does not exist"], status: 400
    end
  end

  def show # :server_id, :id
    if @channel = Channel.find_by(id: params[:id])
      render :show
    else
      render json: ["That channel does not exist"], status: 400
    end
  end

  def update # :server_id, :id
    if @channel = Channel.find_by(id: params[:id])
      if @channel.update(name: channel_params[:name])
        BroadcastMessageableJob.perform_later @channel, current_user, member
        # fetch_channel with new channel id to other users
        render :show
      else
        render json: ["Something went wrong"], status: 400
      end
    else
      render json: ["That channel does not exist"], status: 400
    end
  end

  def destroy # :server_id, :id
    if @channel = Channel.find_by(id: params[:id])
      server = @channel.server
      if @channel.destroy
        payload = {servers: {"#{server.id}" => {channelIds: server.channels.map{|channel| channel.id}}}}
        server.members(current_user.id).each do |member|
          BroadcastRemoveChannelJob.perform_later payload, member
        end

        # remove_channel with channel id to other users
        # send server
        render json: {servers: {"#{server.id}" => {channelIds: server.channels.map{|channel| channel.id}}}}, status: 200
      else
        render json: ["Something went wrong"], status: 400
      end
    else
      render json: ["That channel does not exist"], status: 400
    end
  end

  def read # :id == channel_id
    if @channel = Channel.find_by(id: Integer(params[:id]))
      @channel.reader_membership(current_user.id).update(unread_count: 0)
      render :show
    else
      render json: ["That Dm does not exist"], status: 400
    end
  end

  def channel_params
    params.require(:channel).permit(:name)
  end

end
