class ChangeDmMembershipSubscribedConstraint < ActiveRecord::Migration[5.1]
  def change
        change_column :dm_memberships, :subscribed, :boolean, null: false
  end
end
