module Api
  class UserController < ApplicationController
    def authenticate
      if user_params[:username] == 'Good name'
        authorised = true
      else
        authorised = false
      end
      render json: { authorised: authorised }
    end

    private

    def user_params
      params.require(:user).permit(
        :username,
        :password
      )
    end
  end
end
