class Api::MessagesController < ApplicationController

  def create
    @message = Message.new(message_params)
    if (messageable_params[:messageable] == 'DM')
      @messageable = Dm.find_by(id: messageable_params[:id])
    else

    end
    if @messageable.messages << @message
      render :show
    else
      render json: ["Error"], status: 403
    end
  end

  def show
    @message = Message.find_by(id: params[:id])
    if @message
      @messageable = @message.messageable
      render :show
    else
      render json: ["Error"], status: 403
    end
  end

  def destroy

  end

  private
  def message_params
    params.require(:message).permit(:author_id, :content)
  end

  def messageable_params
    params.require(:messageable).permit(:messageable, :id)
  end

end
