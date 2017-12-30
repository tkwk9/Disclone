class StaticPagesController < ApplicationController

  def root
    render :root
  end

  def login
    render :login
  end

  def signup
    render :signup
  end
end
