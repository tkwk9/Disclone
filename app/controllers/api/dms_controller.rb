class Api::DmsController < ApplicationController

  def create
    if current_user
      if User.find_by(id: params[:id])
        @dm = Dm.create_dm(current_user.id, Integer(params[:id]))
        render :show
      else
        render json: ["Target user does not exist"], status: 403
      end
    else
      render json: ["User not logged in"], status: 403
    end
  end

  def show
    if current_user
      if User.find_by(id: params[:id])
        if @dm = Dm.dm_between(current_user.id, Integer(params[:id]))
          @dm.subscribe(current_user.id)
          render :show
        else
          render json: ["That Dm does not exist"], status: 403
        end
      else
        render json: ["Target user does not exist"], status: 403
      end
    else
      render json: ["User not logged in"], status: 403
    end
  end

  def read
    if current_user
      if User.find_by(id: params[:id])
        if @dm = Dm.dm_between(current_user.id, Integer(params[:id]))
          @dm.reader_memebership(current_user.id).update(unread_count: 0)
        else
          render json: ["That Dm does not exist"], status: 403
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
        if @dm = Dm.dm_between(current_user.id, Integer(params[:id]))
          @dm.unsubscribe(current_user.id)
          render :show
        else
          render json: ["That Dm does not exist"], status: 403
        end
      else
        render json: ["Target user does not exist"], status: 403
      end
    else
      render json: ["User not logged in"], status: 403
    end
  end

end
