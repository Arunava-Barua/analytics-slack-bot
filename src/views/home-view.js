const homeView = () => {
  const view = [
    {
			"type": "divider"
		},
		{
			"type": "header",
			"text": {
				"type": "plain_text",
				"text": "Showrunners Analytics Channel wise📈",
				"emoji": true
			}
		},
		{
			"type": "section",
			"block_id": "sectionBlockOnlyPlainText",
			"text": {
				"type": "plain_text",
				"text": "This channel is for on-demand analytics report and updates for channels using Showrunners 📊",
				"emoji": true
			}
		},
		{
			"dispatch_action": true,
			"type": "input",
			"element": {
				"type": "plain_text_input",
				"action_id": "actionId-channel"
			},
			"label": {
				"type": "plain_text",
				"text": "Enter Channel Name",
				"emoji": true
			}
		},
		{
			"type": "header",
			"text": {
				"type": "plain_text",
				"text": "Date Interval",
				"emoji": true
			}
		},
		{
			"type": "actions",
			"elements": [
				{
					"type": "datepicker",
					"initial_date": "2020-01-01",
					"placeholder": {
						"type": "plain_text",
						"text": "Select a date",
						"emoji": true
					},
					"action_id": "actionId-start"
				},
				{
					"type": "datepicker",
					"initial_date": "2020-01-01",
					"placeholder": {
						"type": "plain_text",
						"text": "Select a date",
						"emoji": true
					},
					"action_id": "actionId-end"
				}
			]
		},
		{
			"type": "header",
			"text": {
				"type": "plain_text",
				"text": "Chains",
				"emoji": true
			}
		},
		{
			"type": "actions",
			"elements": [
				{
					"type": "radio_buttons",
					"options": [
						{
							"text": {
								"type": "plain_text",
								"text": "Ethereum Mainnet",
								"emoji": true
							},
							"value": "value-0"
						},
						{
							"text": {
								"type": "plain_text",
								"text": "Polygon Mainnet",
								"emoji": true
							},
							"value": "value-1"
						},
						{
							"text": {
								"type": "plain_text",
								"text": "Binance Mainnet",
								"emoji": true
							},
							"value": "value-2"
						},
						{
							"text": {
								"type": "plain_text",
								"text": "Ethereum Staging",
								"emoji": true
							},
							"value": "value-3"
						},
						{
							"text": {
								"type": "plain_text",
								"text": "Polygon Staging",
								"emoji": true
							},
							"value": "value-4"
						},
						{
							"text": {
								"type": "plain_text",
								"text": "Binance Staging",
								"emoji": true
							},
							"value": "value-5"
						}
					],
					"action_id": "actionId-radio"
				}
			]
		},
		{
			"type": "actions",
			"elements": [
				{
					"type": "button",
					"text": {
						"type": "plain_text",
						"text": "Request",
						"emoji": true
					},
					"value": "click_me_123",
					"action_id": "actionId-button"
				}
			]
		},
		{
			"type": "divider"
		},
		{
			"type": "header",
			"text": {
				"type": "plain_text",
				"text": "Showrunners Channel Health💖",
				"emoji": true
			}
		},
		{
			"type": "context",
			"elements": [
				{
					"type": "plain_text",
					"text": "This section is to get the statuses of the channels. Stay updates on which channels are working and which are not in the Showrunners",
					"emoji": true
				}
			]
		},
		{
			"type": "actions",
			"elements": [
				{
					"type": "button",
					"text": {
						"type": "plain_text",
						"text": "Request for all channels",
						"emoji": true
					},
					"value": "click_me_123",
					"action_id": "actionId-allchannels"
				}
			]
		},
		{
			"type": "divider"
		}
  ]

  return view;
}

module.exports = { homeView }
  