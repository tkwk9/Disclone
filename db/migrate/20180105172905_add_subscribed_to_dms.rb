class AddSubscribedToDms < ActiveRecord::Migration[5.1]
  def change
    add_column :dms, :subscribed, :boolean
    change_column_null :dms, :subscribed, true
  end
end
