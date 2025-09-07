# frozen_string_literal: true

require 'rails_helper'

RSpec.describe "Tasks", type: :request do
  let(:user) { create(:user) }
  let(:headers) { { "ACCEPT" => "application/json" } }

  before do
    post "/users/sign_in", params: { user: { email: user.email, password: "password123" } }, headers: headers
  end

  describe "GET /tasks" do
    it "retorna as tasks do usuário autenticado" do
      task = create(:task, user: user, title: "Tarefa")
      get "/tasks", headers: headers
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)["tasks"].first["title"]).to eq("Tarefa")
    end
  end

  describe "POST /tasks" do
    it "cria uma nova task" do
      params = attributes_for(:task)
      expect {
        post "/tasks", params: { task: params }, headers: headers
      }.to change(Task, :count).by(1)
      expect(response).to have_http_status(:created)
    end

    it "não cria task inválida" do
      params = { title: "", description: "", due_date: nil }
      expect {
        post "/tasks", params: { task: params }, headers: headers
      }.not_to change(Task, :count)
      expect(response).to have_http_status(:unprocessable_entity)
    end
  end

  describe "PATCH /tasks/:id" do
    it "atualiza uma task existente" do
      task = create(:task, user: user, title: "Antigo")
      patch "/tasks/#{task.id}", params: { task: { title: "Novo" } }, headers: headers
      expect(response).to have_http_status(:ok)
      expect(task.reload.title).to eq("Novo")
    end
  end

  describe "DELETE /tasks/:id" do
    it "remove uma task" do
      task = create(:task, user: user, title: "Remover")
      expect {
        delete "/tasks/#{task.id}", headers: headers
      }.to change(Task, :count).by(-1)
      expect(response).to have_http_status(:no_content)
    end
  end
end