# frozen_string_literal: true

class ApplicationController < ActionController::API
  include ActionController::Cookies
  before_action :authenticate_with_jwt!

  private

  def authenticate_with_jwt!
    token = cookies.encrypted[:access_token]
    if token.present?
      begin
        payload = Warden::JWTAuth::TokenDecoder.new.call(token)
        @current_user = User.find_by(id: payload["sub"])
      rescue
        @current_user = nil
      end
    end

    unless @current_user
      render json: { error: "You need to sign in or sign up before continuing." }, status: :unauthorized
    end
  end

  def current_user
    @current_user
  end
end
