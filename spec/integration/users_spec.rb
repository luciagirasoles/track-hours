require 'swagger_helper'


describe 'Users API' do
    path '/api/users' do
        post 'user with admin privileges can register new user' do
            tags 'Users'
            consumes 'application/json'
            description 'Allow user with admin role to create new users '
            operationId 'testApiKey'
            security [ api_key: {} ]
            parameter name: :user, in: :body, schema: {
                properties: {
                    user:{
                        type: :object,
                        properties:{
                            name: { type: :string },
                            last_name: { type: :string },
                            email: { type: :string },
                            password_digest: { type: :string },
                            gender: { type: :string },
                            role: {type: :string }
                        }
                  },
                required:[:email, :password_digest, :name, :last_name, :role, :gender]
                }
              }

              let(:session_admin){User.create(name: 'Mayra', last_name: 'Navarro', gender:"female", email: 'mnavarro@runa.co', password: '123456', role: "admin")}
              let(:session_regular){User.create(name: 'Juan', last_name: 'Perez', gender:"male", email: 'jperez@runa.co', password: '123456', role: "employee")}
                
              response 403, 'Access denied' do
                let(:api_key) {'some key'}
                examples 'application/json' => {
                    user: { email: 'newuser@example.co', password_digest: '123456',gender: "male", role:"admin", name:"John", last_name:"Doe"}
                  }
                  let(:user) {{user: { email: 'newuser@example.co', password: '123456',gender: "male", role:"admin", name:"John", last_name:"Doe" }}}
                  after do |example|
                    example.metadata[:response][:examples] = { 'application/json' => JSON.parse(response.body, symbolize_names: true) }
                  end
                  run_test!
                end

                response 401, "Token - This user doesn't have permissions" do
                    examples 'application/json' => {
                    user: { email: 'newuser@example.co', password_digest: '123456',gender: "male", role:"admin", name:"John", last_name:"Doe"}
                    }
                    let(:api_key) {"auth_token #{session_regular.token}" }
                    let(:user) {{user: { email: 'newuser@example.co', password: '123456',gender: "male", role:"admin", name:"John", last_name:"Doe" }}}
                    
                    after do |example|
                        example.metadata[:response][:examples] = { 'application/json' => JSON.parse(response.body, symbolize_names: true) }
                    end
                    xit
                end

                response 400, " Bad Request - Some parameter missing or email has already been taken" do
                    description
                    examples 'application/json' => {
                    user: { email: 'newuser@example.co', password_digest: '123456',gender: "male", role:"admin", name:"John", last_name:"Doe"}
                    }
                    let(:api_key) {"auth_token #{session_regular.token}" }
                    let(:user) {{user: { email: 'newuser@example.co', password: '123456',gender: "male", role:"admin", name:"John", last_name:"Doe" }}}
                    
                    after do |example|
                        example.metadata[:response][:examples] = { 'application/json' => JSON.parse(response.body, symbolize_names: true) }
                    end
                    xit
                end

                response 201, "User was created" do
                    examples 'application/json' => {
                    user: { email: 'newuser@example.co', password_digest: '123456',gender: "male", role:"admin", name:"John", last_name:"Doe"}
                    }
                    let(:api_key) {"auth_token #{session_regular.token}" }
                    let(:user) {{user: { email: 'newuser@example.co', password_digest: '123456',gender: "male", role:"admin", name:"John", last_name:"Doe" }}}
                    after do |example|
                        example.metadata[:response][:examples] = { 'application/json' => JSON.parse(response.body, symbolize_names: true) }
                    end
                    xit
                end
              end

              
    end
end

