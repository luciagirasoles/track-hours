class ApiController < ActionController::API
    include ActionController::Cookies

    before_action :require_login, :authorization
    rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

    include Pundit
  
    def require_login
      authenticate_token || render_unauthenticated('Access denied')
    end
  
    def current_user
      @current_user ||= authenticate_token
    end

    def authorization
        if current_user
          authorize current_user, policy_class: UserPolicy
        else
          user_not_authorized
        end
    end
  
    private

    def render_unauthorized(message)
      errors = { errors: { message: message } }
      render json: errors, status: :unauthorized
    end

    def render_unauthenticated(message)
      errors = { errors: { message: message } }
      render json: errors, status: :forbidden
    end
  
    def authenticate_token
      User.find_by_token(cookies.signed[:auth_token])
    end
  
    def regenerate_and_signed_token(user)
      cookies.signed[:auth_token] = { value: user.token, httponly: true, :expires => 1.hour.from_now }
      user
    end


    def user_not_authorized
      render_unauthorized("Token - This user doesn't have permissions")
    end

end