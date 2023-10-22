const { App } = require("@slack/bolt");
const axios = require("axios");

require("dotenv").config();

const { analyticsView, homeView, generalStatusView } = require("./views/index");
const { getChannels, getChains, getChainIds } = require("./data/index");
const { cleaner, generateMessages } = require("./helper/index");
const { getChannelHealth } = require("./apis/index");

let channelName, endDate, startDate, chain;

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log("Hello world. Bolt is running!!");
})();

app.event("app_home_opened", ({ event, say, client }) => {
  console.log(
    "Hello! Someone just opened the app to DM so we will send them a message"
  );
  //   say(`Hello World and <@${event.user}>!`);

  try {
    const result = client.views.publish({
      user_id: event.user,

      view: {
        type: "home",
        callback_id: "home_view",

        blocks: homeView(),
      },
    });

    console.log(`Result✅: ${result}`);
  } catch (error) {
    console.error(`Error from home page(Line: 199) ${error}`);
  }
});

app.action("actionId-channel", async ({ body, ack, client }) => {
  // Acknowledge the action
  await ack();
  // console.log("ActionId Channel Name Body: ", body);

  // channelName = body.actions[0].value.toLowerCase(); // <--- Pass to Function
  channelName = body.actions[0].value;

  console.log("Channel Name is here 🍋:", channelName);
});

app.action("actionId-start", async ({ body, ack, client }) => {
  // Acknowledge the action
  await ack();

  startDate = body.actions[0].selected_date;

  console.log("Start Date is here ✅:", startDate);
});

app.action("actionId-end", async ({ body, ack, client }) => {
  // Acknowledge the action
  await ack();

  endDate = body.actions[0].selected_date;

  console.log("End Date is here 👿:", endDate);
});

app.action("actionId-radio", async ({ body, ack, client }) => {
  // Acknowledge the action
  await ack();

  // chain = body.actions[0].selected_option.text.text.toLowerCase(); // <--- Pass to Function
  chain = body.actions[0].selected_option.text.text;

  console.log("Chain Name is here 🥶:", chain);
});

app.action("actionId-allchannels", async ({ body, ack, client }) => {
  // Acknowledge the action
  await ack();

  let glWorkingChannels, glNotWorkingChannels;

  try {
    console.log("Request for all channels fn triggered");

    let { workingChannels, notWorkingChannels } = await getChannelHealth();
    glWorkingChannels = workingChannels;
    glNotWorkingChannels = notWorkingChannels;

    console.log("Working Array & Length: ", glWorkingChannels.length);
    console.log("NOT working Array & Length: ", glNotWorkingChannels.length);
  } catch (error) {
    console.error(
      "Error in actionId-allchannels getChannelHealth() button: ",
      error
    );
  }

  try {
    await client.views.update({
      view_id: body.view.id,

      hash: body.view.hash,

      view: {
        type: "home",
        callback_id: "home_view",

        blocks: generalStatusView(glWorkingChannels, glNotWorkingChannels),
      },
    });
  } catch (error) {
    console.error("Error in actionId-allchannels displaying to slack: ", error);
  }
});

app.action("actionId-button", async ({ body, ack, client }) => {
  // with actionId
  // Acknowledge the action
  await ack();
  console.log("ActionId Button Body: ", body);

  let imageURL,
    notificationCount,
    feeds,
    channelAddress,
    chainName,
    chainId,
    subscriberCount;

  // *******************
  // API calls here

  try {
    const formattedChannelName = cleaner(channelName);
    const formattedChainName = cleaner(chain);
    const chains = getChains();
    const channels = getChannels();
    const chainIds = getChainIds();

    channelAddress = channels[formattedChannelName];
    chainName = chains[formattedChainName];
    chainId = chainIds[formattedChainName];

    console.log(
      "Channels and chain🧟‍♂️: ",
      channels[formattedChannelName],
      chains[formattedChainName]
    );

    const { data } =
      chainId &&
      channelAddress &&
      (await axios(
        `https://backend.epns.io/apis/v1/channels/eip155:${chainId}:${channelAddress}/feeds`
      ));

    imageURL = data.feeds[0].payload.data.icon;
    notificationCount = data.feeds.length;
    feeds = data.feeds;
    console.log("Api Response here: ", data.feeds[0]);
  } catch (error) {
    console.error("Error while fetching data from API💥", error);
  }

  try {
    // const {data} = (await axios(`https://${
    //   ENV === `staging` ? "backend-staging" : "backend"
    // }.epns.io/apis/v1/channels/eip155:${ENV == "staging" ? 5 : 1}:${address}`));
    const { data } = await axios(
      `https://backend.epns.io/apis/v1/channels/eip155:${chainId}:${channelAddress}`
    );

    subscriberCount = data.subscriber_count;
    channelName = data.name;

    console.log("Subscribers Api Response here: ", data);
    console.log("Subscribers Count: ", data.subscriber_count);
  } catch (error) {
    console.error("Error while fetching subscribers from API💥", error);
  }

  // *******************

  try {
    await client.views.update({
      view_id: body.view.id,

      hash: body.view.hash,

      view: {
        type: "home",
        callback_id: "home_view",

        blocks: analyticsView(
          channelName,
          chain,
          subscriberCount,
          notificationCount,
          imageURL,
          feeds
        ),
      },
    });
  } catch (error) {
    console.error(`Error from home page action btn(Line: 103) ${error}`);
  }
});

// slash command
app.command("/health", async ({ ack, body, client, logger }) => {
  // Ack the trigger
  await ack();
  const channelId = body.channel_id;

  try {
    // Call the chat.postMessage method using the WebClient
    const result = await client.chat.postMessage({
      channel: channelId,
      text: `Fetching details🔔🔔🔔🔔🔔🔔🔔🔔🔔...`,
    });

    console.log("Send message results: ", result);
  } catch (error) {
    console.error(error);
  }

  let { workingChannels, notWorkingChannels } = await getChannelHealth();

  let workingEthereumChannels = [],
  workingPolygonChannels = [],
  workingBinanceChannels = [];

  let notWorkingEthereumChannels = [],
  notWorkingPolygonChannels = [],
  notWorkingBinanceChannels = [];

  workingChannels.map(async (channel, index) => {
    if (channel.chain == "ETH_MAINNET") {
      workingEthereumChannels.push(channel);
    }
    if (channel.chain == "POLYGON_MAINNET") {
      workingPolygonChannels.push(channel);
    }
    if (channel.chain == "BSC_MAINNET") {
      workingBinanceChannels.push(channel);
    }
  });

  notWorkingChannels.map(async (channel, index) => {
    if (channel.chain == "ETH_MAINNET") {
      notWorkingEthereumChannels.push(channel);
    }
    if (channel.chain == "POLYGON_MAINNET") {
      notWorkingPolygonChannels.push(channel);
    }
    if (channel.chain == "BSC_MAINNET") {
      notWorkingBinanceChannels.push(channel);
    }
  });

  let successFormattedMessageETH = generateMessages(workingEthereumChannels, true, 'Ethereum🩶')
  let successFormattedMessagePOL = generateMessages(workingPolygonChannels, true, 'Polygon💜')
  let successFormattedMessageBSC = generateMessages(workingBinanceChannels, true, 'Binance💛')

  let failedFormattedMessageETH = generateMessages(notWorkingEthereumChannels, false)
  let failedFormattedMessagePOL = generateMessages(notWorkingPolygonChannels, false)
  let failedFormattedMessageBSC = generateMessages(notWorkingBinanceChannels, false)

  // console.log(`FORMATED MESSAGE✉️✉️✉️✉️:\n ${successFormattedMessageETH + successFormattedMessagePOL + successFormattedMessageBSC + failedFormattedMessageETH + failedFormattedMessagePOL + failedFormattedMessageBSC}`)

  let formattedMessage = successFormattedMessageETH + failedFormattedMessageETH + successFormattedMessagePOL + failedFormattedMessagePOL + successFormattedMessageBSC + failedFormattedMessageBSC;

  try {
    // Call the chat.postMessage method using the WebClient
    const result = await client.chat.postMessage({
      channel: channelId,
      text: `${formattedMessage}`,
    });

    console.log("Send message results: ", result);
  } catch (error) {
    console.error(error);
  }

  console.log("Slash channel status triggered!!");
  // console.log("Body: ", body);
  // console.log('Client Chat: ', client.chat);
  // console.log('Logger: ', logger);
});
