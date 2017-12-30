class StaticPagesController < ApplicationController

  def root
    render :root
  end

  def login
    render :login
  end

end
