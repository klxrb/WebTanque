require 'rails_helper'

RSpec.describe DashboardController, type: :controller do

  let(:valid_user_params) {
    {
      username: 'Test user',
      password: 'passw0rd'
    }
  }

  let(:invalid_user_params) {
    {
      username: 'Invalid user',
      password: 'boo'
    }
  }

  let(:valid_user_wrong_password_params) {
    {
      username: 'Test user',
      password: 'passw1rd'
    }
  }

  let(:valid_user) {
    User.create(
      username: valid_user_params[:username],
      email: 'test@example.com',
      password: valid_user_params[:password],
      password_confirmation: valid_user_params[:password],
    )
  }

  before(:each) do
    valid_user
  end

  describe "GET #index" do
    it "returns http success" do
      get :index
      expect(response).to have_http_status(:success)
    end
  end

  describe "POST #authenticate" do
    it 'redirects to :index' do
      post :authenticate, params: valid_user_params
      expect(response).to redirect_to('/')
    end

    it 'updates the session for a valid user' do
      post :authenticate, params: valid_user_params
      expect(session[:user_id]).to eq valid_user.id
    end

    it 'updates the session for a valid user with incorrect password' do
      post :authenticate, params: valid_user_wrong_password_params
      expect(session[:user_id]).to be_nil
    end

    it 'updates the session for an invalid user' do
      post :authenticate, params: invalid_user_params
      expect(session[:user_id]).to be_nil
    end
  end
end
