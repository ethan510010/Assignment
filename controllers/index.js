const handleBusinessLogic = async (req, res) => {
  const { currentRequestValue } = req;
  res.json(currentRequestValue);
};

module.exports = {
  handleBusinessLogic,
};
