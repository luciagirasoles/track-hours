class Api::UsersController < ApiController

    def index
      render json: User.all.as_json( only: [ :id, :name, :last_name, :email, :gender, :role ] )
    end

    def create
      user = User.new( user_params )
      if user.save
        render json: user, status: :created
      else
        render_bad_request( user.errors )
      end
    end

    private 
    def user_params
      params.require(:user).permit(:name, :last_name, :email, :password_digest, :role, :gender)
    end
end
