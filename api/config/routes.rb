# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users, defaults: { format: :json },
                     controllers: {
                       registrations: "users/registrations",
                       sessions: "users/sessions",
                       passwords: 'users/passwords'
                     }

  devise_scope :user do
    get "/current_user", to: "users/sessions#show"
  end


  resources :tasks, only: [ :create, :show, :update, :index, :destroy ] do
    collection do
      get :search_by_title
    end
  end
end
