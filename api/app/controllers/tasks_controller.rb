# frozen_string_literal: true

class TasksController < ApplicationController
  before_action :set_task, only: [ :show, :update, :destroy ]
  
  def index
    tasks = Task.all
    render json: tasks, each_serializer: TaskSerializer
  end
  
  def show
    render json: @task, serializer: TaskSerializer
  end
  
  def create
    task = Task.new(task_params)
    if task.save
      render json: task, serializer: TaskSerializer, status: :created
    else
      render json: { errors: task.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  def update
    if @task.update(task_params)
      render json: @task, serializer: TaskSerializer
    else
      render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  def destroy
    if @task.destroy
      head :no_content
    else
      render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  private
  
  def set_task
    @task = Task.find(params[:id])
  end

  def task_params
    params.require(:task).permit(:title, :description, :due_date, :active)
  end
end
