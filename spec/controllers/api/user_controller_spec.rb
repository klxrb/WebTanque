require 'rails_helper'

RSpec.describe Api::UserController, type: :controller do

  describe "GET #authenticate" do
    let(:valid_user) {
      {
        username: 'Good name'
      }
    }

    let(:unknown_user) {
      {
        username: 'Unknown name'
      }
    }

    it "returns http success" do
      post :authenticate, params: { user: valid_user}, format: :json
      expect(response).to have_http_status(:success)
    end

    it "authenticates a valid user" do
      post :authenticate, params: { user: valid_user }, format: :json
      expect(JSON.parse(response.body)['authorised']).to be_truthy
    end

    it "does not authenticate an unknown user" do
      post :authenticate, params: { user: unknown_user }, format: :json
      expect(JSON.parse(response.body)['authorised']).to be_falsey
    end
  end

  describe '#register' do
    let(:valid_user) {
      {
        username: 'Good name',
        email: 'test@example.com',
        password: 'passw0rd',
        password_confirmation: 'passw0rd'
      }
    }

    let(:mismatched_passwords) {
      {
        username: 'Good name',
        email: 'test@example.com',
        password: 'passw0rd',
        password_confirmation: 'passw0rd1'
      }
    }

    it 'registers a user with valid parameters' do
      expect{post :register, params: { user: valid_user }, format: :json}.to change(User, :count).by 1
      expect(JSON.parse(response.body)['registered']).to be_truthy
    end

    it 'does not register a user with unmatching passwords' do
      expect{post :register, params: { user: mismatched_passwords }, format: :json}.to change(User, :count).by 0
      expect(JSON.parse(response.body)['registered']).to be_falsey
    end
  end
end
