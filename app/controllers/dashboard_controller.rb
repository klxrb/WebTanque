class DashboardController < ApplicationController
  def index
  end

  private

    def user_params
      params.permit(
        :username,
        :password
      )
    end
end
