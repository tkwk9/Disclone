class CreateFriendships < ActiveRecord::Migration[5.1]
  def change
    create_table :friendships do |t|
      t.integer :friend_1_id, null: false
      t.integer :friend_2_id, null: false
      t.timestamps
    end
    add_index :friendships, :friend_1_id
    add_index :friendships, :friend_2_id
  end
end
