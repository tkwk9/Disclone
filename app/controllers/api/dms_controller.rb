class Api::DmsController < ApplicationController

  def index

  end

  def create

  end

  def show

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
