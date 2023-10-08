const { App } = require("@slack/bolt");
require("dotenv").config();

const { analyticsView } = require("./analytics-view");
const { homeView } = require("./home-view");

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

app.action("actionId-channel", async ({body, ack, client}) => {
    // Acknowledge the action
    await ack();
    // console.log("ActionId Channel Name Body: ", body);
    channelName = body.actions[0].value.toLowerCase();

    console.log("Channel Name is here 🍋:", channelName)
})

app.action("actionId-start", async ({body, ack, client}) => {
    // Acknowledge the action
    await ack();
    // console.log("ActionId Start Date Body: ", body);
    startDate = body.actions[0].selected_date;

    console.log("Start Date is here ✅:", startDate)
})

app.action("actionId-end", async ({body, ack, client}) => {
    // Acknowledge the action
    await ack();
    // console.log("ActionId End Date Body: ", body);
    endDate = body.actions[0].selected_date;

    console.log("End Date is here 👿:", endDate)
})

app.action("actionId-radio", async ({body, ack, client}) => {
    // Acknowledge the action
    await ack();
    // console.log("ActionId Chain Name Body: ", body);
    chain = body.actions[0].selected_option.text.text.toLowerCase();

    console.log("Chain Name is here 🥶:", chain)
})

app.action("actionId-button", async ({ body, ack, client }) => {
  // with actionId
  // Acknowledge the action
  await ack();
  console.log("ActionId Button Body: ", body);

  // *******************
  // API calls here
  // *******************

  try {
    await client.views.update({
      view_id: body.view.id,

      hash: body.view.hash,

      view: {
        type: "home",
        callback_id: "home_view",

        blocks: analyticsView(channelName, chain),
      },
    });
  } catch (error) {
    console.error(`Error from home page action btn(Line: 103) ${error}`);
  }
});
