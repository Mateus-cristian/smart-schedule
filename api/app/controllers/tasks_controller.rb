# frozen_string_literal: true

class TasksController < ApplicationController
  before_action :set_task, only: [ :show, :update ]

  def index
    tasks = Task.all
    render json: tasks.map(&:as_json)
  end

  def show
    render json: @task.as_json
  end

  def create
    task = Task.new(task_params)
    if task.save
      render json: task.as_json, status: :created
    else
      render json: { errors: task.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @task.update(task_params)
      render json: @task.as_json
    else
      render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def set_task
    @task = Task.find(params[:id])
  end

  def task_params
    params.require(:task).permit(:name, :description, :due_date, :active)
  end
end
