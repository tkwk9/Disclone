class AddSubscribedToDmMembership < ActiveRecord::Migration[5.1]
  def change
    add_column :dm_memberships, :subscribed, :boolean, default: true
    change_column :dm_memberships, :subscribed, :boolean, null: false
  end
end
