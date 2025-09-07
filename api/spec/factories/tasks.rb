# frozen_string_literal: true

FactoryBot.define do
  factory :task do
    title { "Tarefa de teste" }
    description { "Descrição da tarefa" }
    due_date { 1.day.from_now }
    active { false }
    association :user
  end
end