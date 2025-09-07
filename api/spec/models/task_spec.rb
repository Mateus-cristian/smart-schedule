# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Task, type: :model do
  it "é válido com atributos padrão da factory" do
    task = build(:task)
    expect(task).to be_valid
  end

  it "é inválido sem título" do
    task = build(:task, title: nil)
    expect(task).not_to be_valid
  end

  it "é inválido sem descrição" do
    task = build(:task, description: nil)
    expect(task).not_to be_valid
  end

  it "é inválido sem usuário" do
    task = build(:task, user: nil)
    expect(task).not_to be_valid
  end

  describe ".search_by_title" do
    let(:user) { create(:user) }
    it "retorna tasks que começam com o prefixo (case insensitive)" do
      t1 = create(:task, title: "Comprar pão", user: user)
      t2 = create(:task, title: "Comprar leite", user: user)
      t3 = create(:task, title: "Estudar", user: user)
      expect(Task.search_by_title("Comprar")).to match_array([t1, t2])
      expect(Task.search_by_title("Estu")).to eq([t3])
    end
  end
end