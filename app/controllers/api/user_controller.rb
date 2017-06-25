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

    def register
      user = User.create register_params
      registered = user.save
      render json: { registered: registered }
    end

    private

    def user_params
      params.require(:user).permit(
        :username,
        :password
      )
    end

    def register_params
      params.require(:user).permit(
        :username,
        :email,
        :password,
        :password_confirmation
      )
    end
  end
end
