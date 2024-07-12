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
const sendEmailWithAttachment = async (email, attachments, fileNames) => {
  try {
    const transporter = nodemailer.createTransport({
      // Provide your email service configuration
      // Example for Gmail:
      service: "gmail",
      auth: {
        // user: "rahulbarua31@gmail.com",
        user: "arunava@push.org",
        // pass: "wvdp hyoe afru brfx", // rahulbarua31@gmail.com
        pass: `${process.env.GMAIL_APP_PASSWORD}`, // arunava@push.org
      },
    });

    const mailOptions = {
      from: "arunava@push.org",
      to: email, // Convert array of emails to comma-separated string
      subject: "Channel Health Excel Report",
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

const sendReportViaEmail = async ( workingChannels, notWorkingChannels, email ) => {
  try {
    const workingExcelAttachment1 = await populateExcel(workingChannels, 'WorkingChannels');
    const notWorkingExcelAttachment2 = await populateExcel(notWorkingChannels, 'NotWorkingChannels');

    const emails = ["rahulbarua31@gmail.com"];

    await sendEmailWithAttachment(email, [workingExcelAttachment1, notWorkingExcelAttachment2], ['WorkingChannels', 'NotWorkingChannels']);

    console.log("Email sent with attachment successfully.");

  } catch (error) {
    console.log("🧨Error sending email: ", error);
  }
}

const getChannelHealth = async (time, email) => {
  let workingChannels = [];
  let notWorkingChannels = [];

  try {
    const allChannelsInfos = await getAllChannels();

    for (let i = 0; i < allChannelsInfos.length; i++) {
      // allChannelsInfos[i]
      const channel = allChannelsInfos[i];
      const channelName = channel.channelName;
      const channelAddress = channel.channelAddress;
      const chainName = channel.chain;
      const subscriberCount = channel.subscriberCount;

      let channelId = channel.aliasBlockchainId ? channel.aliasBlockchainId : 1;
      let data;

      try {
        // let feedsUrl = `https://backend-dev.epns.io/apis/v1/channels/eip155:${channelId}:${channelAddress}/feeds`;
        let feedsUrl = `https://backend.epns.io/apis/v1/channels/eip155:${channelId}:${channelAddress}/feeds`;

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
              .slice(0, 24)}. CHAIN: ${data?.feeds[0]?.source}`
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
            `Address: ${channelAddress} Name: ${channelName} NOT WORKING💥. CHAIN: ${chainName}`
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
          `Address: ${channelAddress} Name: ${channelName} NOT WORKING💥. CHAIN: ${chainName}`
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

  await sendReportViaEmail(workingChannels, notWorkingChannels, email);

  return { workingChannels, notWorkingChannels };
};

module.exports = { getChannelHealth };

const run = async () => {
  const emails = ["rahulbarua31@gmail.com"];
  const run = true;
  const { workingChannels, notWorkingChannels } = await getChannelHealth(15, emails, run);

  console.log(`✅Working Channels: ${workingChannels.length}`);
  console.log(`🔥Not Working Channels: ${notWorkingChannels.length}`);
};

run();
