# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users,
  defaults: { format: :json },
  controllers: {
    registrations: 'users/registrations'
  }

  get "up" => "rails/health#show", as: :rails_health_check

  resources :tasks, only: [:create, :show, :update, :index]
end
