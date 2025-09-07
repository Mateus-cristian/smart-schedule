# frozen_string_literal: true

require 'rails_helper'

RSpec.describe "Users", type: :request do
  describe "POST /users" do
    it "creates a user with valid data" do
      params = {
        user: {
          username: "John",
          email: "john@example.com",
          password: "password123",
          password_confirmation: "password123"
        }
      }
      expect {
        post "/users", params: params
      }.to change(User, :count).by(1)
      expect(response).to have_http_status(:created).or have_http_status(:ok)
    end

    it "does not create a user with invalid data" do
      params = {
        user: {
          username: "",
          email: "",
          password: "",
          password_confirmation: ""
        }
      }
      expect {
        post "/users", params: params
      }.not_to change(User, :count)
      expect(response).to have_http_status(:unprocessable_entity).or have_http_status(:bad_request)
    end
  end
end
