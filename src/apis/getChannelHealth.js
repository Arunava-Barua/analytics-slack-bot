const { getAllChannels } = require("./getAllChannels.js");
const axios = require("axios");
const XLSX = require("xlsx");
const nodemailer = require("nodemailer");
const fs = require('fs');

require("dotenv").config();

// Function to populate Excel sheet
const populateExcel = (data, fileName) => {
  return new Promise((resolve, reject) => {
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(workbook, worksheet, "Data Sheet");
      XLSX.writeFile(workbook, `${fileName}.xlsx`);

      const file = fs.readFileSync(`${fileName}.xlsx`);
      resolve(file);
  })
}

// Function to send email with attachment
const sendEmailWithAttachment = async (time, emails, attachments, fileNames, server) => {
  try {
    const transporter = nodemailer.createTransport({
      // Provide your email service configuration
      // Example for Gmail:
      service: "gmail",
      auth: {
        // user: "rahulbarua31@gmail.com",
        user: "arunava@push.org",
        // pass: "wvdp hyoe afru brfx", // rahulbarua31@gmail.com
        pass: "leel amsv ovny vuyl",   //arunava@push.org
      },
    });

    const emailSubject = `Channel Health Excel Report ${server} (${time} days)`;

    const mailOptions = {
      from: "arunava@push.org",
      to: emails.join(', '), // Convert array of emails to comma-separated string
      subject: emailSubject,
      text: "Hi there, this email consist of two excel sheet attachments containing both working and non-working channels.",
      attachments: [
        {
          filename: `${fileNames[0]}.xlsx`,
          content: attachments[0],
        },
        {
          filename: `${fileNames[1]}.xlsx`,
          content: attachments[1],
        }
      ],
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

const sendReportViaEmail = async ( workingChannels, notWorkingChannels, emails, time, server) => {
  try {
    const workingExcelAttachment1 = await populateExcel(workingChannels, 'WorkingChannels');
    const notWorkingExcelAttachment2 = await populateExcel(notWorkingChannels, 'NotWorkingChannels');

    // const emails = ["rahulbarua31@gmail.com"];

    await sendEmailWithAttachment(time, emails, [workingExcelAttachment1, notWorkingExcelAttachment2], ['WorkingChannels', 'NotWorkingChannels'], server);

    console.log("Email sent with attachment successfully.");

  } catch (error) {
    console.log("🧨Error sending email: ", error);
  }
}

const getChannelHealth = async (time, emails, run, server) => {
  let workingChannels = [];
  let notWorkingChannels = [];

  try {
    const allChannelsInfos = await getAllChannels(server);

    for (let i = 0; i < allChannelsInfos.length; i++) {
      // allChannelsInfos[i]
      const channel = allChannelsInfos[i];
      const channelName = channel.channelName;
      const channelAddress = channel.channelAddress;
      const chainName = channel.chain;
      const subscriberCount = channel.subscriberCount;

      let channelId;
      let data, feedsUrl;

      try {
        // let feedsUrl = `https://backend-dev.epns.io/apis/v1/channels/eip155:${channelId}:${channelAddress}/feeds`;

        if (server == 'prod') {
                channelId = channel.aliasBlockchainId ? channel.aliasBlockchainId : 1;
                feedsUrl = `https://backend.epns.io/apis/v1/channels/eip155:${channelId}:${channelAddress}/feeds`;
        } else {
                channelId = channel.aliasBlockchainId ? channel.aliasBlockchainId : 11155111;
                feedsUrl = `https://backend-staging.epns.io/apis/v1/channels/eip155:${channelId}:${channelAddress}/feeds`;
        }

        const response = await axios.get(feedsUrl);
        data = response.data;

      } catch (error) {
        console.log(`🤖API Error ${error}`);
      }

      /* Check for channels with notifications sent not older than a week */
      const currentDate = new Date();

      /* *************************************************************** */

      if (data.feeds.length > 0) {
        // Condition here
        const variableDate = new Date(
          new Date(data?.feeds[0].epoch).toString().slice(0, 24)
        );

        const differenceInDays =
          (currentDate - variableDate) / (1000 * 60 * 60 * 24);

        if (differenceInDays <= time) {
          console.log(
            `${
              data?.feeds[0].payload?.data?.app
            } WORKING✅. Last Notif: ${new Date(data?.feeds[0].epoch)
              .toString()
              .slice(0, 24)}. CHAIN: ${data?.feeds[0]?.source}. Subscribers: ${subscriberCount}. Address: ${channelAddress}.`
          );

          workingChannels.push({
            address: channelAddress,
            channelName: data?.feeds[0].payload?.data?.app,
            lastNotif: new Date(data?.feeds[0].epoch).toString().slice(0, 24),
            subscribers: subscriberCount,
            chain: chainName,
          });
        } else {
          console.log(
            `Address: ${channelAddress}.
             Name: ${channelName} NOT WORKING💥.
             CHAIN: ${chainName}.
             Subscribers: ${subscriberCount}.
             Last Notif: ${ new Date(data?.feeds[0].epoch).toString().slice(0, 24) }`
          );

          notWorkingChannels.push({
            address: channelAddress,
            channelName: channelName,
            lastNotif: new Date(data?.feeds[0].epoch).toString().slice(0, 24),
            subscribers: subscriberCount,
            chain: chainName,
          });
        }
      } else {
        console.log(
          `Address: ${channelAddress}
           Name: ${channelName} NOT WORKING💥.
           CHAIN: ${chainName}
           Subscribers: ${subscriberCount}
           Last Notif: ${null}`
        );

        notWorkingChannels.push({
          address: channelAddress,
          channelName: channelName,
          lastNotif: null,
          subscribers: subscriberCount,
          chain: chainName,
        });
      }
    }

    // await Promise.all(
    //   allChannelsInfos?.map(async (channel, index) => {

    //   })
    // );
    // }
  } catch (error) {
    console.error("Error occurred at getChannelHealth(): ", error);
  }

  let allEmails = [];

  if (run) {
        emails.map((email, index) => {
                allEmails.push(email);
        });
  } else {
        allEmails.push(emails);
  }

  await sendReportViaEmail(workingChannels, notWorkingChannels, allEmails, time, server);

  return { workingChannels, notWorkingChannels };
};

module.exports = { getChannelHealth };

const run = async () => {
  const emails = ["rahulbarua31@gmail.com"];
  const run = true;
  const { workingChannels, notWorkingChannels } = await getChannelHealth(30, emails, run);

  console.log(`✅Working Channels: ${workingChannels.length}`);
  console.log(`🔥Not Working Channels: ${notWorkingChannels.length}`);
};

// run();
