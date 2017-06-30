Rails.application.routes.draw do
  root 'dashboard#index'

  post '/authenticate', to: 'dashboard#authenticate'
  post '/logout', to: 'dashboard#logout'

  namespace :api, defaults: { format: :json } do
    post '/user/authenticate'
    post '/user/register'
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
