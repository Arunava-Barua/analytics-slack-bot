const generateMessages = (channelsArr, working, chain="") => {
    let temp = [`${chain}\n ${working ? `WORKING✅: ` : 'NOT WORKING💥: '}${channelsArr.length} channels \n\n`], result = '';

    if (working) {
        channelsArr.map((channel, index) => {
            let message = `⚓${channel.channelName} (${channel.address}). Last Notif: ${channel.lastNotif}. Chain: ${channel.chain}.\n`

            temp.push(message);
        })
        temp.push('\n');
    }

    if (!working) {
        channelsArr.map((channel, index) => {
            let message = `⚓${channel.channelName} (${channel.address}). Chain: ${channel.chain}.\n`

            temp.push(message);
        })
        temp.push('\n');
    }

    console.log('Results array: ', temp)
    result = temp.join('');
    console.log('Results string: ', result)


    return result;
}

module.exports={ generateMessages };