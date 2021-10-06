module.exports = {
  config: {},
  set: (config) => {
    this.config = config;
  },
  get: () => {
    return this.config;
  },
};
