module.exports.getInfoAboutMe = (req, res) => {
  res.send({
    message: {
      name: 'name',
      surname: 'surname',
    },
  });
};
