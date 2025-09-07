# frozen_string_literal: true

class AddUserIdToTasks < ActiveRecord::Migration[8.0]
  def change
    add_reference :tasks, :user, foreign_key: true, null: true
  end
end
