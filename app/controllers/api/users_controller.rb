class Api::UsersController < ApiController
    def create
      user = User.new(user_params)
      if user.save
        render json: user, status: :created
      else
        render json: {errors: user.errors}, status: :bad_request
      end
    end

    private 
    def user_params
      params.require(:user).permit(:name, :last_name, :email, :password_digest, :role, :gender)
    end
end
