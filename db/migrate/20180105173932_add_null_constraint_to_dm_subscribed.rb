class AddNullConstraintToDmSubscribed < ActiveRecord::Migration[5.1]
  def change
    change_column :dms, :subscribed, :boolean, null: false

  end
end
