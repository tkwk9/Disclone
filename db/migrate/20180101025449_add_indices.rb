class AddIndices < ActiveRecord::Migration[5.1]
  def change
    add_index :dm_memberships, :dm_id
    add_index :dm_memberships, :user_id
  end
end
