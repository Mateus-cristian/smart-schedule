# frozen_string_literal: true

class Task < ApplicationRecord
    validates :name, presence: true
    validates :description, presence: true

    def as_json(_options = {})
    {
      id: id,
      name: name,
      description: description,
      due_date: due_date,
      active: active
    }
  end
end
