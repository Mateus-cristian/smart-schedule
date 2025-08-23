# frozen_string_literal: true

class CreateTableTasks < ActiveRecord::Migration[8.0]
  def change
    create_table :tasks do |t|
      t.string :name
      t.text :description
      t.datetime :due_date
      t.boolean :active, default: false

      t.timestamps
    end
  end
end
