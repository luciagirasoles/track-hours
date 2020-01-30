require 'swagger_helper'

describe 'Sessions API' do
    path '/login' do
        post 'Create user session' do
            tags 'Sessions'
            consumes 'application/json'
            description 'Generate an Authorization Token from User data'
            security [ api_key: {} ]
            parameter name: :params, in: :body, schema: {
                type: :object,
              properties: {
                email: { type: :string },
                password: { type: :string }
              },
              required:[:email, :password]
            }
           
            response 200, 'An authorization token is generated' do
                examples 'application/json' => {
                    email: 'user@example.co', password: '123456'
                  }
                let(:session){User.create(email: 'user@example.co', password: '123456', gender: "male", role:"employee", name:"John", last_name:"Doe")}
                let(:api_key){"some_api_key"}
                let(:params){{ email: session.email, password: session.password }}
                after do |example|
                    example.metadata[:response][:examples] = { 'application/json' => JSON.parse(response.body, symbolize_names: true) }
                  end
                run_test!
            end
            response 400, 'Incorrect password / Incorrect email' do
                parameter name: :params, in: :body, schema: {
                    type: :object,
                  properties: {
                    email: { type: :string },
                    password: { type: :string }
                  },
                  required:[:email, :password]
                }
                examples 'application/json' => {
                    email: 'not@email.co',
                    password: ''
                  }
                let(:params) { 'unauthorized' }
                let(:api_key) {'some_api_key'}
                after do |example|
                    example.metadata[:response][:examples] = { 'application/json' => JSON.parse(response.body, symbolize_names: true) }
                  end
                run_test!
            end

            response 400, 'Incorrect password / Incorrect email' do
                parameter name: :params, in: :body, schema: {
                    type: :object,
                  properties: {
                    email: { type: :string },
                    password: { type: :string }
                  },
                  required:[:email, :password]
                }
                examples 'application/json' => {
                    email: 'not@email.co',
                    password: ''
                  }
                let(:params) { 'unauthorized' }
                let(:api_key){ "some_api_key" }
                after do |example|
                    example.metadata[:response][:examples] = { 'application/json' => JSON.parse(response.body, symbolize_names: true) }
                  end
                run_test!
            end


        end
    end

    path '/logout' do
        delete 'destroy user session' do
            description 'Destroy Authorization Token from User data'
            tags 'Sessions'
            security [ api_key: {} ]
                response 204, 'Authorization token has been destroyed' do
                    xit
                end
        end
     end
    

    

end