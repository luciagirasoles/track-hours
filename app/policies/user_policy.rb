class UserPolicy  < ApplicationPolicy
    attr_reader :current_user
    def initialize(current_user,_)
        @current_user = current_user
    end
    def index?
        current_user && current_user.role?('admin')
    end

    def create?
        current_user && current_user.role?('admin')
    end

    
end