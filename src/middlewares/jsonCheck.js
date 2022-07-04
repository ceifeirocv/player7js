module.exports = (err, req, res, next) => {
  if (err) {
    res.json({ erro: 'Invalid Request data' });
  } else {
    next();
  }
};
