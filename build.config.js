module.exports = {
  apps: [
    {
      name: 'BEIS-3000',
      autorestart: true,
      script: 'yarn',
      exec_interpreter: 'bash',
      args: 'start',
      max_memory_restart: '256M',
      ignore_watch: ['node_modules'],
      watch_options: {
        followSymlinks: false
      },
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        PORT: 9898,
        NODE_ENV: 'production'
      }
    }
  ]
};
