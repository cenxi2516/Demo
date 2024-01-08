export default (duration = 1e3) =>
  new Promise((resolve) => setTimeout(resolve, duration));
