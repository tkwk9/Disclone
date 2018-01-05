class AddSubscribedToDmMembership < ActiveRecord::Migration[5.1]
  def change
    add_column :dm_memberships, :subscribed, :boolean
    change_column_null :dm_memberships, :subscribed, true
  end
end
