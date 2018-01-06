class Api::MessagesController < ApplicationController

  def index
    if(snippet_params[:messageable_type] == 'DM')
      @messages = Dm.find_by(id: snippet_params[:messageable_id]).snippet(snippet_params[:msg_id], Integer(snippet_params[:req_count]))
    else

    end
    if (!@messages.empty?)
      @messageable = @messages.first.messageable
      render :show
    else
      render json: ["Error"], status: 404
    end
  end

  def create
    @message = Message.new(message_params)
    if (messageable_params[:messageable] == 'DM')
      @messageable = Dm.find_by(id: messageable_params[:id])
    else

    end
    if @messageable.messages << @message
      @message.mark_unread(current_user.id)
      BroadcastMessageJob.perform_later @message, current_user
      render :index
    else
      render json: ["Error"], status: 403
    end
  end

  def show
    @messages = Message.where(id: params[:id])
    if !@messages.empty?
      @messageable = @messages.first.messageable
      # @messages.first.mark_read(current_user.id) # DEBUG: this should go in dm_controller
      @messageable.subscribe(current_user.id) if @messageable.class == Dm
      render :show
    else
      render json: ["Error"], status: 403
    end
  end

  def destroy

  end

  private

  def snippet_params
    params.require(:snippet).permit(:messageable_type, :messageable_id, :msg_id, :req_count)
  end

  def message_params
    params.require(:message).permit(:author_id, :content)
  end

  def messageable_params
    params.require(:messageable).permit(:messageable, :id)
  end

end
