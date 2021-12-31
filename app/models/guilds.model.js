module.exports = (sequelize, Sequelize) => {
  // DataTypes - https://sequelize.org/master/manual/model-basics.html#data-types
  const TestNfts = sequelize.define("test-nfts", {
    name: {
      type: Sequelize.STRING
    },
    founderAddress: {
      type: Sequelize.STRING
    },
    founderEmail: {
      type: Sequelize.STRING
    },

  });

  return TestNfts;
};