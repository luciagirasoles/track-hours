require 'rails_helper'

RSpec.describe Api::UsersController, type: :controller do
    before(:each) do
        @user_admin = User.create(name: 'Mayra', last_name: 'Navarro', gender:"female", email: 'mnavarro@runa.co', password: '123456', role: "admin")
        @user_regular = User.create(name: 'Juan', last_name: 'Perez', gender:"male", email: 'jperez@runa.co', password: '123456', role: "employee")
        request.headers['Content-Type'] = 'application/json'
        @user_params = { user: { name: "John", last_name: "Doe", email: "john.doe@boring.test", password_digest: "123", gender: "male", role: "employee" }}
       
    end

    describe 'POST create' do
        it "returns status unauthorized when user is not logged" do
            post :create, params: @user_params
            expect(response).to have_http_status(:forbidden)
            
        end

        it "returns http status unauthorized when user is not admin" do
            allow(controller).to receive(:authenticate_token).and_return(@user_regular)
            post :create, params: @user_params
            expect(response).to have_http_status(:unauthorized)
            
        end

        it "returns http status created when user is logged and all params required are included" do
            allow(controller).to receive(:authenticate_token).and_return(@user_admin)
            post :create, params: @user_params
            expect(response).to have_http_status(:created)
        end
        it "returns http status created when user is logged and parans are missing" do
            allow(controller).to receive(:authenticate_token).and_return(@user_admin)
            post :create, params: {email: "something@wrong"}
            p response.body
            expect(response).to have_http_status(:bad_request)
        end

        it "returns http bad request status when user email already exists" do  
            allow(controller).to receive(:authenticate_token).and_return(@user_admin)
            post :create, params: { user: {name: 'Juan', last_name: 'Perez', gender:"male", email: 'jperez@runa.co', password_digest: '123456', role: "employee"}}
            expect(response.status).to have_http_status(:bad_request)
        end
    end

end
