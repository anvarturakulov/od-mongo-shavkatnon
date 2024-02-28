module.exports = {
  apps : [{
    name: "backend",
    script: "./backend/dist/main.js",
    cwd: "./backend/app",
    watch: true,
    env: {
      NODE_ENV: "production",
    }
  },
  {
    name: "frontend",
    script: "npm",
    args: "start",
    cwd: "./frontend/app",
    watch: true,
    env: {
      NODE_ENV: "production",
    }
  }
]
};