# frozen_string_literal: true

class TasksController < ApplicationController
  before_action :set_task, only: [ :show, :update, :destroy]
  
  def index
    page = params[:page] || 1
    per_page = params[:per_page] || 10
    paginated = Task.order(:id).page(page).per(per_page)
    render json: {
      tasks: ActiveModelSerializers::SerializableResource.new(paginated, each_serializer: TaskSerializer),
      meta: {
        current_page: paginated.current_page,
        total_pages: paginated.total_pages,
        total_count: paginated.total_count
      }
    }
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

  def search_by_title
    page = params[:page] || 1
    per_page = params[:per_page] || 10
    
    tasks = Task.all
    if params[:title].present?
      tasks = tasks.search_by_title(params[:title].to_s)
    end
    if params[:active].to_s == 'true'
      tasks = tasks.where(active: true)
    end
    paginated = tasks.order(:id).page(page).per(per_page)
    render json: {
      tasks: ActiveModelSerializers::SerializableResource.new(paginated, each_serializer: TaskSerializer),
      meta: {
        current_page: paginated.current_page,
        total_pages: paginated.total_pages,
        total_count: paginated.total_count
      }
    }
  end
  
  private
  
  def set_task
    @task = Task.find(params[:id])
  end

  def task_params
    params.require(:task).permit(:title, :description, :due_date, :active)
  end
end
