Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'
  get '/dev/login', to: 'static_pages#login'
  get '/dev/signup', to: 'static_pages#signup'

  namespace :api, default: { format: :json } do
    resources :users, only: [:create, :index]
    resource :session, only: [:create, :destroy] do
      get '/payload', to: 'sessions#payload'
      # resource :friends, only: [, :create, :destroy]
      resources :friends, only: [:index, :destroy]
      post '/friends/:id', to: 'friends#create'
      # get '/friends_list', to: 'sessions#friends_list'

      resources :dms, only: [:create, :show]
    end

    resources :messages, only: [:create, :index, :show, :destroy]
  end
end
