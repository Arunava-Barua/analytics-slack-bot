const { getChannelAddresses, getChannels } = require("../data");
const axios = require("axios");

const getChannelHealth = async () => {
  const chainIds = [1, 137, 56];
  const chains = [
    "ETH_MAINNET",
    "POLYGON_MAINNET",
    "BSC_MAINNET",
    // "ETH_TEST_GOERLI",
    // "POLYGON_TEST_MUMBAI",
    // "BSC_TESTNET",
  ];

  let workingChannels = [];
  let notWorkingChannels = [];
  let promiseArray = [];

  try {
    const allChannelAddresses = getChannelAddresses();
    const allChannels = getChannels();

    for (let i = 0; i < chains.length; i++) {
      await Promise.all(
        allChannelAddresses[chains[i]].map(async (address, index) => {
          let feedsUrl = `https://backend.epns.io/apis/v1/channels/eip155:${chainIds[i]}:${address}/feeds`;

          const {data} = await axios(feedsUrl);

          if (data.feeds.length > 0) {
            console.log(
              `${
                data?.feeds[0].payload?.data?.app
              } WORKING✅. Last Notif: ${new Date(data?.feeds[0].epoch)
                .toString()
                .slice(0, 24)}. CHAIN: ${data?.feeds[0]?.source}`
            );

            workingChannels.push({
              address: address,
              channelName: data?.feeds[0].payload?.data?.app,
              lastNotif: new Date(data?.feeds[0].epoch).toString().slice(0, 24),
              chain: chains[i],
            });
          } else {
            console.log(
              `Address: ${address} Name: ${Object.keys(allChannels).find(
                (key) => allChannels[key] === address
              )} NOT WORKING💥. CHAIN: ${chains[i]}`
            );

            notWorkingChannels.push({
              address: address,
              channelName: Object.keys(allChannels).find((key) => allChannels[key] === address),
              chain: chains[i]
            });
          }
        })
      );
    }
  } catch (error) {
    console.error("Error occurred at getChannelHealth(): ", error);
  }

  return { workingChannels, notWorkingChannels };
};

module.exports = { getChannelHealth };
