Rails.application.routes.draw do
  root 'dashboard#index'

  namespace :api, defaults: { format: :json } do
    post '/user/authenticate'
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
