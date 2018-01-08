class CreateChannelMemberships < ActiveRecord::Migration[5.1]
  def change
    create_table :channel_memberships do |t|
      t.integer :user_id, null: false
      t.integer :channel_id, null: false
      t.integer :unread_count, default: 0, null: false

      t.timestamps
    end
    add_index :channel_memberships, :user_id
    add_index :channel_memberships, :channel_id
  end
end
