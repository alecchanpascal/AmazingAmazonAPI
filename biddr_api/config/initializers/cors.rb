Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
        origins "localhost:9999", "127.0.0.1:9999"
        resource(
            "*",
            headers: :any,
            credentials: true,
            methods: [:get, :post, :delete, :patch, :put, :options]
        )
    end
end