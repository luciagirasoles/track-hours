class SessionsController < ApiController
    skip_before_action :require_login, :authorization
  
    def create
      user = User.valid_login?(params[:email], params[:password])
      if user
        regenerate_and_signed_token(user)
        render json: {name:user.fullname, role:user.role}, status: :ok
      else
        email = User.find_by(email: params[:email])
        error = email ? "Incorrect password" : "Incorrect email"
        render json: { errors: error },
        status: :bad_request
      end
    end
  
    def destroy
      current_user.invalidate_token
      cookies.delete :auth_token
      head :no_content
    end
end
  