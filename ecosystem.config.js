module.exports = {
  apps: [
    {
      name: "frontend",
      script: "npm",
      args: "start",
      env: {
        REACT_APP_SERVER_ADDRESS: "http://ec2-3-24-169-149.ap-southeast-2.compute.amazonaws.com:3000",
      },
      watch: false, // This is set to false to avoid watching files and continuously restarting.
      instances: 1, // Run only one instance of the frontend.
      exec_mode: "fork", // Run in fork mode for a frontend app. Cluster mode is more suited for backend apps.
      autorestart: true, // Restart on failures.
      max_memory_restart: "1G", // Restart if the app exceeds this memory amount.
    },
  ],
};
