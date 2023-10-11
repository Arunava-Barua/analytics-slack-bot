const analyticsView = (
  channelName = "",
  chain = "",
  subscriberCount = 0,
  notificationCount = 0,
  imgUrl = "",
  feeds
) => {

  let results = []; // epoch
  let obj = {
    type: "plain_text",
    text: "",
    emoji: true,
  }

  feeds.map((element, i) => {
    let newObj = {
      ...obj, text: element.epoch
    }

    results.push(newObj);
  })

  let view = [
    {
      type: "divider",
    },
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "Showrunners Analytics📈",
        emoji: true,
      },
    },
    {
      type: "section",
      block_id: "sectionBlockOnlyPlainText",
      text: {
        type: "plain_text",
        text: "This channel is for on-demand analytics report and updates for channels using Showrunners 📊",
        emoji: true,
      },
    },
    {
      type: "divider",
    },
    {
      dispatch_action: true,
      type: "input",
      element: {
        type: "plain_text_input",
        action_id: "actionId-channel",
      },
      label: {
        type: "plain_text",
        text: "Enter Channel Name",
        emoji: true,
      },
    },
    {
      type: "divider",
    },
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "Date Interval",
        emoji: true,
      },
    },
    {
      type: "actions",
      elements: [
        {
          type: "datepicker",
          initial_date: "2020-01-01",
          placeholder: {
            type: "plain_text",
            text: "Select a date",
            emoji: true,
          },
          action_id: "actionId-start",
        },
        {
          type: "datepicker",
          initial_date: "2020-01-01",
          placeholder: {
            type: "plain_text",
            text: "Select a date",
            emoji: true,
          },
          action_id: "actionId-end",
        },
      ],
    },
    {
      type: "divider",
    },
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "Chains",
        emoji: true,
      },
    },
    {
      type: "actions",
      elements: [
        {
          type: "radio_buttons",
          options: [
            {
              text: {
                type: "plain_text",
                text: "Ethereum Mainnet",
                emoji: true,
              },
              value: "value-0",
            },
            {
              text: {
                type: "plain_text",
                text: "Polygon Mainnet",
                emoji: true,
              },
              value: "value-1",
            },
            {
              text: {
                type: "plain_text",
                text: "Binance Mainnet",
                emoji: true,
              },
              value: "value-2",
            },
            {
              text: {
                type: "plain_text",
                text: "Ethereum Staging",
                emoji: true,
              },
              value: "value-3",
            },
            {
              text: {
                type: "plain_text",
                text: "Polygon Staging",
                emoji: true,
              },
              value: "value-4",
            },
            {
              text: {
                type: "plain_text",
                text: "Binance Staging",
                emoji: true,
              },
              value: "value-5",
            },
          ],
          action_id: "actionId-radio",
        },
      ],
    },
    {
      type: "divider",
    },
    {
      type: "actions",
      elements: [
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "Request",
            emoji: true,
          },
          value: "click_me_123",
          action_id: "actionId-button",
        },
      ],
    },
    {
      type: "divider",
    },
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "Results & Analytics ✅",
        emoji: true,
      },
    },
    {
      type: "image",
      block_id: "image4",
      image_url: `${imgUrl}`, // <--- Image URL
      alt_text: "Channel logo",
    },
    {
      type: "rich_text",
      elements: [
        {
          type: "rich_text_list",
          style: "bullet",
          indent: 0,
          border: 0,
          elements: [
            {
              type: "rich_text_section",
              elements: [
                {
                  type: "text",
                  text: "Channel Name ",
                  style: {
                    bold: true,
                  },
                },
                {
                  type: "emoji",
                  name: "black_nib",
                  unicode: "2712-fe0f",
                },
                {
                  type: "text",
                  text: `: ${channelName}`, // Channel Name
                },
              ],
            },
            {
              type: "rich_text_section",
              elements: [
                {
                  type: "text",
                  text: "Chain ",
                  style: {
                    bold: true,
                  },
                },
                {
                  type: "emoji",
                  name: "link",
                  unicode: "1f517",
                },
                {
                  type: "text",
                  text: `: ${chain}`, // Chain Name
                },
              ],
            },
            {
              type: "rich_text_section",
              elements: [
                {
                  type: "text",
                  text: "Subscribers ",
                  style: {
                    bold: true,
                  },
                },
                {
                  type: "emoji",
                  name: "man-frowning",
                  unicode: "1f64d-200d-2642-fe0f",
                },
                {
                  type: "text",
                  text: ": ",
                },
                {
                  type: "text",
                  text: `${subscriberCount}`, // Subscribers
                },
              ],
            },
            {
              type: "rich_text_section",
              elements: [
                {
                  type: "text",
                  text: "Notifications ",
                  style: {
                    bold: true,
                  },
                },
                {
                  type: "emoji",
                  name: "bell",
                  unicode: "1f514",
                },
                {
                  type: "text",
                  text: `: ${notificationCount}`, // Total Notifications
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "section", // Analytics
      block_id: "sectionBlockOnlyFields",
      fields: results,
    },
  ];

  return view;
};

module.exports = { analyticsView };

/*
{
          type: "plain_text",
          text: `${"Analytics 2"}`,
          emoji: true,
        },
        {
          type: "plain_text",
          text: `${"Analytics 3"}`,
          emoji: true,
        },
        {
          type: "plain_text",
          text: `${"Analytics 4"}`,
          emoji: true,
        },
        {
          type: "plain_text",
          text: `${"Analytics 5"}`,
          emoji: true,
        },
        {
          type: "plain_text",
          text: `${"Analytics 6"}`,
          emoji: true,
        },
*/
