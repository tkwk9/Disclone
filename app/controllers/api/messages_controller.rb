class Api::MessagesController < ApplicationController

  def index
    if(snippet_params[:messageable_type] == 'DM')
      @messages = Dm.find_by(id: snippet_params[:messageable_id]).some_messages(snippet_params[:id])
      @messageable = @messages.first.messageable
      render :index
    else

    end
  end

  def create
    @message = Message.new(message_params)
    if (messageable_params[:messageable] == 'DM')
      @messageable = Dm.find_by(id: messageable_params[:id])
    else

    end
    if @messageable.messages << @message
      BroadcastMessageJob.perform_later @message, current_user
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

  def snippet_params
    params.require(:snippet).permit(:messageable_type, :messageable_id, :id)
  end

  def message_params
    params.require(:message).permit(:author_id, :content)
  end

  def messageable_params
    params.require(:messageable).permit(:messageable, :id)
  end

end
