require 'rails_helper'

RSpec.describe SessionsController, type: :controller do
  before(:each) do
    User.destroy_all
    @user1 = User.create(name: 'Mayra', last_name: 'Navarro', gender:"female", email: 'mnavarro@runa.co', password: '123456', role: "admin")
  end

  describe 'Testing login' do
    it 'returns json with status unauthorized' do
      post :create
      expect(response).to have_http_status(:bad_request)

      expect(response.body).to include("errors")
    end

    it 'returns status ok when login correct' do
      request.headers['Content-Type'] = 'application/json' # adding access permission
      post :create, params: { email: @user1.email, password: @user1.password }
      expect(response).to have_http_status(:ok)
    end

    it 'returns authorization cookie when login is correct' do
      request.headers['Content-Type'] = 'application/json'
      post :create, params: { email: @user1.email, password: @user1.password }
      expect(response.cookies["auth_token"]).not_to be_nil
    end
  end

  describe "Testing logout" do
    it 'returns status no content' do
      request.headers['Content-Type'] = 'application/json'
      post :create, params: { email: @user1.email, password: @user1.password }      
      delete :destroy
      expect(response.cookies["auth_token"]).to be_nil
      expect(response).to have_http_status(:no_content)

    end
  end
end
