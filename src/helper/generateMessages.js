const generateMessages = (channelsArr, working, chain = "") => {
  let temp = [
      `${chain}\n ${working ? `WORKING✅: ` : "NOT WORKING💥: "}${
        channelsArr.length
      } channels \n\n`,
    ],
    result = "";

  try {
    if (working) {
      channelsArr.map((channel, index) => {
        let message = `${index + 1}.  ${channel.channelName}. \nLast Notif: ${
          channel.lastNotif
        }. \nChain: ${channel.chain}.\n\n`;

        temp.push(message);
      });
      temp.push("\n");
    }

    if (!working) {
      channelsArr.map((channel, index) => {
        let message = `${index + 1}.  ${
          channel.channelName[0].toUpperCase() +
          channel.channelName.slice(1, channel.channelName.length)
        }. \nChain: ${channel.chain}.\n\n`;

        temp.push(message);
      });
      temp.push("\n");
    }

    temp.push(
      "---------------------------------------------------------------------------------\n"
    );

    console.log("Results array: ", temp);
    result = temp.join("");
    console.log("Results string: ", result);
    
  } catch (error) {
    console.log("Error in generateMessaagesFunction() ", error);
  }

  return result;
};

module.exports = { generateMessages };
