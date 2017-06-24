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

end
