class AddMessageable < ActiveRecord::Migration[5.1]
  def change
    add_column :messages, :messageable_id, :integer, null:false
    add_column :messages, :messageable_type, :string
    add_index :messages, :messageable_id
  end
end
