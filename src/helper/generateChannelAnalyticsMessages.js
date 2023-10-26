const generateChannelAnalyticsMessages = ({
  name,
  chainId,
  channelAddress,
  chainName,
  imageURL,
  notificationCount,
  feeds,
  subscriberCount,
  aliasAddress,
  channelSettings,
}) => {
    let result = `Results for ${name}✅\n\n\nChannel Name: ${name}\nChain: ${chainName}\nChannel Address: ${channelAddress}\nSubscribers: ${subscriberCount}\nAlias Address: ${aliasAddress == 'NULL' ? 'No address found' : aliasAddress}\nChannel Settings: ${channelSettings == null ? 'No settings found' : channelSettings.toString()}\n\n\nRecent Notifications🔔\n\n`;

    // let formattedDateTime = new Date(element.epoch).toString().slice(0, 24);
    feeds.map((feed, index) => {
        result = result + `❄️Notification ${index + 1}\nTimestamp: ${new Date(feed.epoch).toString().slice(0, 24)}\nPayload:\n\t\tTitle: ${feed.payload.notification.title}\n\t\tBody: ${feed.payload.notification.body}\n\n`
    })

    console.log('Result from generateChannelAnalyticsMessages: ', result);
    return result;
};

module.exports = { generateChannelAnalyticsMessages };
