# frozen_string_literal: true

class TaskSerializer < ActiveModel::Serializer
	attributes :id, :title, :description, :due_date

	def due_date
		object.due_date&.strftime("%d/%m/%Y")
	end
end
