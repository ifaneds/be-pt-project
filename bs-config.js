module.exports = {
  proxy: "http://localhost:3000",
  files: ["public/**/*", "src/**/*"],
  port: 3001,
  open: false,
  notify: false,
  reloadOnRestart: true
};

