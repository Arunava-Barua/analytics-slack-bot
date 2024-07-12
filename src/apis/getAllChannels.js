const axios = require("axios");

const getAllChannels = async (server) => {
  let i = 1;
  let isLooping = true, data;
  const allChannelsInfo = [];
  try {
    while (isLooping) {
        if (server == 'prod') {
                const response = await axios.get(`https://backend.epns.io/apis/v1/channels?page=${i}&limit=30`);
                data = response.data;
        } else {
                const response = await axios.get(`https://backend-staging.epns.io/apis/v1/channels?page=${i}&limit=30`);
                data = response.data;
        }

      allChannelsInfo.push(data.channels);

      if (data.itemcount != 0) {
        i++;
      } else {
        i = 1;
        isLooping = false;

        const flattenArray = allChannelsInfo.flat();
        const formattedChannelArray = [];
        let aliasPresent;

        flattenArray.map((channel, index) => {

        if (server == 'prod') {
                aliasPresent = channel.alias_blockchain_id ? channel.alias_blockchain_id : 1;
        } else {
                aliasPresent = channel.alias_blockchain_id ? channel.alias_blockchain_id : 11155111;
        }

          let channelInfo;

        if (server == 'prod') {
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
              chain: "BSC_MAINNET",
            };
          } else {
            channelInfo = {
              channelAddress: channel.channel,
              channelName: channel.name,
              subscriberCount: channel.subscriber_count,
              aliasAddress: channel.alias_address,
              aliasBlockchainId: channel.alias_blockchain_id,
              chain: "POLYGON_MAINNET",
            };
          }
       } else {
        if (aliasPresent == 11155111) {
            channelInfo = {
              channelAddress: channel.channel,
              channelName: channel.name,
              subscriberCount: channel.subscriber_count,
              aliasAddress: channel.alias_address,
              aliasBlockchainId: channel.alias_blockchain_id,
              chain: "ETH_TESTNET",
            };
          } else if (aliasPresent == 56) {
            channelInfo = {
              channelAddress: channel.channel,
              channelName: channel.name,
              subscriberCount: channel.subscriber_count,
              aliasAddress: channel.alias_address,
              aliasBlockchainId: channel.alias_blockchain_id,
              chain: "BSC_TESTNET",
            };
          } else {
            channelInfo = {
              channelAddress: channel.channel,
              channelName: channel.name,
              subscriberCount: channel.subscriber_count,
              aliasAddress: channel.alias_address,
              aliasBlockchainId: channel.alias_blockchain_id,
              chain: "POLYGON_TESTNET",
            };
          }
        }

          formattedChannelArray.push(channelInfo);
        });

        formattedChannelArray.sort(
          (a, b) => b.subscriberCount - a.subscriberCount
        );

        // console.log(`👋 Verified Channels: ${formattedChannelArray.length}`)

        return formattedChannelArray;
        // break;
      }
    }
  } catch (error) {
    console.log("Error while fetching all channel info from API: " + error);
  }
};

module.exports = { getAllChannels };
