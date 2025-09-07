# frozen_string_literal: true

class Task < ApplicationRecord
    validates :title, presence: true
    validates :description, presence: true
    belongs_to :user

    def as_json(_options = {})
    {
      id: id,
      title: title,
      description: description,
      due_date: due_date,
      active: active
    }
  end

  def self.search_by_title(prefix)
    where("title ILIKE ?", "#{prefix}%")
  end
end
