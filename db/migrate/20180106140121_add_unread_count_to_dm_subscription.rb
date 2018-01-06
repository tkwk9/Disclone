class AddUnreadCountToDmSubscription < ActiveRecord::Migration[5.1]
  def change
    add_column :dm_memberships, :unread_count, :integer, default: 0
    change_column :dm_memberships, :unread_count, :integer, null: false
  end
end
