Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'

  namespace :api, default: { format: :json } do
    resources :users, only: [:create, :index, :show]
    resource :session, only: [:create, :destroy] do
      get '/payload', to: 'sessions#payload'

      resources :friends, only: [:index, :destroy]
      post '/friends/:id', to: 'friends#create'

      resources :dms, only: [:show, :destroy]
      post '/dms/:id', to: 'dms#create'
      post '/dms/read/:id', to: 'dms#read'
    end

    resources :messages, only: [:create, :index, :show, :destroy]
  end
end
