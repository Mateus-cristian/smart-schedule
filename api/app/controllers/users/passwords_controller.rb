# frozen_string_literal: true

module Users
  class PasswordsController < Devise::PasswordsController
    skip_before_action :authenticate_with_jwt!, raise: false
    respond_to :json
  protected

    def respond_with(resource, _opts = {})
      if resource.respond_to?(:errors) && resource.errors.any?
        render json: { error: resource.errors.full_messages.join(', ') }, status: :unprocessable_entity
      else
        super
      end
    end
  end
end
