let path;
let executor;
let nodes;

const reset = () => {
  path = undefined;
  executor = undefined;
  nodes = undefined;
};

module.exports = {
  data: {
    path, executor, nodes
  },
  reset
};
