# frozen_string_literal: true

class ApplicationController < ActionController::API
  before_action :authenticate_user!, unless: :devise_controller?

  def current_user_json
    if user_signed_in?
      render json: { user: current_user.slice(:id, :email) }
    else
      render json: { user: nil }, status: :unauthorized
    end
  end
end
