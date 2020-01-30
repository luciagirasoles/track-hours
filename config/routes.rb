Rails.application.routes.draw do
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: "home#index"
   # sessions routes
   post '/login', to: 'sessions#create'
   delete '/logout', to: 'sessions#destroy'
   namespace :api do
    resources :users, only:[:index, :create]
   end
   get "*path", to: "home#index", constraints: { format: "html" }
end
