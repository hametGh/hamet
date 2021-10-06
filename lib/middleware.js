const middleware = (req, res, next) => {
  console.log("sss");
  next();
};
export default middleware;
