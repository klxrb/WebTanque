class DashboardController < ApplicationController
  def index
    @user = User.find(session['user_id']) if session['user_id']
  end

  def authenticate
    user = User.find_by_username(user_params[:username])
    if user && user.authenticate(user_params[:password])
      authorised = true
      session[:user_id] = user.id
    else
      session[:user_id] = nil
    end
    redirect_to '/'
  end

  def logout
    session[:'user_id'] = nil
    redirect_to '/'
  end

  private

  def user_params
    params.permit(
      :username,
      :password
    )
  end
end
