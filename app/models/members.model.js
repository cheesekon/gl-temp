module.exports = (sequelize, Sequelize) => {
  // DataTypes - https://sequelize.org/master/manual/model-basics.html#data-types
  const TestNfts = sequelize.define("test-nfts", {
    name: {
      type: Sequelize.STRING
    },
    guildId: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    rank: {
      type: Sequelize.STRING
    },
    joinDate:{
      type: Sequelize.DATE
    },
    contribute:{
      type: Sequelize.BIGINT
    },
    rating:{
      type: Sequelize.BIGINT
    }

  });

  return TestNfts;
};