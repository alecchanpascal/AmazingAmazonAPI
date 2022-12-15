class UsersController < ApplicationController
    before_action :authenticate_user!, only: [:current]

    def create
      user = User.new params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation)
      if user.save
        session[:user_id] = user.id
        render json: { id: user.id }
      else
        render(json: { errors: user.errors.full_messages }, status: 422)
      end
    end
 
    def current
      render json: current_user
    end
end
