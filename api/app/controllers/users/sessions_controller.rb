# frozen_string_literal: true

module Users
  class SessionsController < Devise::SessionsController
      respond_to :json
      skip_before_action :authenticate_with_jwt!, only: [ :create ]

      def show
        if current_user
          render json: { user: current_user }, status: :ok
        else
          render json: { user: nil }, status: :unauthorized
        end
      end

      private

       def respond_with(resource, _opts = {})
        token = request.env["warden-jwt_auth.token"]
        cookies.encrypted[:access_token] = {
          value: token,
          httponly: true,
          secure: Rails.env.production?,
          same_site: :lax,
          expires: 1.day.from_now
        }
        render json: { user: resource }, status: :ok
      end

      def respond_to_on_destroy
        cookies.delete(:access_token, secure: Rails.env.production?, same_site: :lax)
        head :no_content
      end
  end
end
