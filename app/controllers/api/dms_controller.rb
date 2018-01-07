class Api::DmsController < ApplicationController

  before_action :confirm_logged_in

  def create
    if !/\A\d+\z/.match(params[:id])
      targetId = Integer(params[:id].split('@').last)
    else
      targetId = Integer(params[:id])
    end

    if User.find_by(id: targetId)
      @dm = Dm.create_dm(current_user.id, targetId)
      render :show
    else
      render json: ["Target user does not exist"], status: 400
    end
  end

  def show
    if User.find_by(id: params[:id])
      if @dm = Dm.dm_between(current_user.id, Integer(params[:id]))
        @dm.subscribe(current_user.id)
        render :show
      else
        render json: ["That Dm does not exist"], status: 400
      end
    else
      render json: ["Target user does not exist"], status: 400
    end
  end

  def read
    if @dm = Dm.find_by(id: Integer(params[:id]))
      @dm.reader_memebership(current_user.id).update(unread_count: 0)
      render :show
    else
      render json: ["That Dm does not exist"], status: 400
    end
  end

  def destroy
    if @dm = Dm.find_by(id: Integer(params[:id]))
      @dm.unsubscribe(current_user.id)
      render :show
    else
      render json: ["That Dm does not exist"], status: 400
    end
  end

end
