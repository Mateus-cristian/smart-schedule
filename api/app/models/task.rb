# frozen_string_literal: true

class Task < ApplicationRecord
    validates :title, presence: true
    validates :description, presence: true

    def as_json(_options = {})
    {
      id: id,
      title: title,
      description: description,
      due_date: due_date,
      active: active
    }
  end
end
