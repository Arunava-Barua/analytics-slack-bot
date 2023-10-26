const { getChannelAddresses, getChannels } = require("../data");
const axios = require("axios");

const getChannelHealthFor = async (chain) => {
  let chainId = 0, workingChannels = [], notWorkingChannels = [];

  if (chain == "ETH_MAINNET") chainId = 1;
  if (chain == "POLYGON_MAINNET") chainId = 137;
  if (chain == "BSC_MAINNET") chainId = 56;

  try {
    const allChannelAddresses = getChannelAddresses();
    const allChannels = getChannels();

    const channels = allChannelAddresses[chain];

    await Promise.all(channels.map(async (address, index) => {
        let feedsUrl = `https://backend.epns.io/apis/v1/channels/eip155:${chainId}:${address}/feeds`;

        const { data } = await axios(feedsUrl);

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
              chain: chain,
            });
          } else {
            console.log(
              `Address: ${address} Name: ${Object.keys(allChannels).find(
                (key) => allChannels[key] === address
              )} NOT WORKING💥. CHAIN: ${chain}`
            );

            notWorkingChannels.push({
              address: address,
              channelName: Object.keys(allChannels).find((key) => allChannels[key] === address),
              chain: chain
            });
          }
    }))

  } catch (error) {
    console.error("Error occurred at getChannelHealthFor(): ", error);
  }

  return { workingChannels, notWorkingChannels };
};

module.exports = { getChannelHealthFor };
