class User < ApplicationRecord
    has_secure_password
    has_secure_token

     ### Validations
    validates :email, :name, :last_name, :password_digest, :role, :gender, presence: true
    validates :email, uniqueness: true
 
    def invalidate_token
        update(token: nil)
    end
    
    def self.valid_login?(email, password)
    user = find_by(email: email)
    user if user&.authenticate(password)
    end

    def fullname
        "#{name} #{last_name}"
    end

    def role?(expected_role)
        role == expected_role
    end

end
