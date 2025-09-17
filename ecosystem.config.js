module.exports = {
  apps: [
    {
      name: "my-backend",
      script: "dist/server.js", // compiled entry point
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ]
}
