const axios = require("axios");

const getAllChannels = async () => {
  let i = 1;
  let isLooping = true;
  const allChannelsInfo = [];
  try {
    while (isLooping) {
      const { data } = await axios.get(
        // `https://backend-dev.epns.io/apis/v1/channels?page=${i}&limit=30`
        `https://backend.epns.io/apis/v1/channels?page=${i}&limit=30`
      );

      allChannelsInfo.push(data.channels);

      if (data.itemcount != 0) {
        i++;
      } else {
        i = 1;
        isLooping = false;

        const flattenArray = allChannelsInfo.flat();
        const formattedChannelArray = [];

        flattenArray.map((channel, index) => {
          const aliasPresent = channel.alias_blockchain_id
            ? channel.alias_blockchain_id
            : 1;

          let channelInfo;

          if (aliasPresent == 1) {
            channelInfo = {
              channelAddress: channel.channel,
              channelName: channel.name,
              subscriberCount: channel.subscriber_count,
              aliasAddress: channel.alias_address,
              aliasBlockchainId: channel.alias_blockchain_id,
              chain: "ETH_MAINNET",
            };
          } else if (aliasPresent == 56) {
            channelInfo = {
              channelAddress: channel.channel,
              channelName: channel.name,
              subscriberCount: channel.subscriber_count,
              aliasAddress: channel.alias_address,
              aliasBlockchainId: channel.alias_blockchain_id,
              chain: "POLYGON_MAINNET",
            };
          } else {
            channelInfo = {
              channelAddress: channel.channel,
              channelName: channel.name,
              subscriberCount: channel.subscriber_count,
              aliasAddress: channel.alias_address,
              aliasBlockchainId: channel.alias_blockchain_id,
              chain: "BSC_MAINNET",
            };
          }

          formattedChannelArray.push(channelInfo);
        });

        formattedChannelArray.sort(
          (a, b) => b.subscriberCount - a.subscriberCount
        );

        // console.log(`👋 Verified Channels: ${JSON.stringify(formattedChannelArray)}`)

        return formattedChannelArray;
        // break;
      }
    }
  } catch (error) {
    console.log("Error while fetching all channel info from API: " + error);
  }
};

getAllChannels();

module.exports = { getAllChannels };
