# frozen_string_literal: true

module Users
  class RegistrationsController < Devise::RegistrationsController
    respond_to :json
    skip_before_action :authenticate_with_jwt!, only: [ :create ]

    def create
      build_resource(sign_up_params)

      resource.save
      if resource.persisted?
        render json: { user: resource }, status: :created
      else
        clean_up_passwords resource
        set_minimum_password_length
        render json: { errors: resource.errors.full_messages.join(", ") }, status: :unprocessable_entity
      end
    end

    private

    def sign_up_params
      params.require(:user).permit(:email, :password, :password_confirmation, :username)
    end
  end
end
