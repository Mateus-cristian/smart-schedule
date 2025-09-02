# frozen_string_literal: true

module Users
  class Users::SessionsController < Devise::SessionsController
    respond_to :json

    def show
      if current_user
        render json: { user: current_user }, status: :ok
      else
        render json: { user: nil }, status: :unauthorized
      end
    end

    private

    def respond_with(resource, _opts = {})
      render json: { user: resource }, status: :ok
    end

    def respond_to_on_destroy
      head :no_content
    end
  end
end
