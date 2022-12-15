class ApplicationController < ActionController::Base
    skip_before_action :verify_authenticity_token

    rescue_from ActiveRecord::RecordNotFound, with: :not_found
    rescue_from ActiveRecord::RecordInvalid, with: :record_invalid
    rescue_from StandardError, with: :standard_error

    def not_found
        render(
            json: {
                errors: [
                    {
                        type: "Not found"
                    }
                ]
            },
            status: :not_found  #alias for 404 in rails
        )
    end
    
    def record_invalid(error)
        invalid_record = error.record
        errors = invalid_record.errors.map do |field, message|
            {
                type: error.class.to_s,
                record_type: invalid_record.class.to_s,
                field: field,
                message: message
            }
        end
        render(
            json: { status: 422, errors: errors },
            status: 422 #alias: unprocessable entity
        )
    end

    def standard_error(error)
        render(
            status: 500,
            json: {
                errors: [
                    type: error.class.to_s,
                    message: error.message
                ]
            }
        )
    end

    private

    def authenticate_user!
        unless current_user.present?
        render(json: { status: 401 }, status: 401)
        end
    end

    def current_user
        @current_user ||= User.find_by_id session[:user_id]
    end
    helper_method :current_user
end
