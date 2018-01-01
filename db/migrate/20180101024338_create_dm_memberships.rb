class CreateDmMemberships < ActiveRecord::Migration[5.1]
  def change
    create_table :dm_memberships do |t|
      t.integer :dm_id, null: false
      t.integer :user_id, null: false
      t.timestamps
    end
  end
end
