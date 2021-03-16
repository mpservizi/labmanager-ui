const RisorseProvider = require("./risorse-provider.js");
module.exports = () => {
  const result = {
    risorse: RisorseProvider.getRisorse(),
    tests: [],
    datiCiclatura: [{ id: 1 }]
  };
  // Create 1000 users
  //   for (let i = 0; i < 1000; i++) {
  //     data.users.push({ id: i, name: `user${i}` });
  //   }
  return result;
};
