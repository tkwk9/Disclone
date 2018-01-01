class AddIndicesToMessageableType < ActiveRecord::Migration[5.1]
  def change
        add_index :messages, :messageable_type
  end
end
