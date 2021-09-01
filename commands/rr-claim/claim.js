const addReactions = (message, reactions) => {
    message.react(reactions[0]);
    reactions.shift();
    if (reactions.length > 0) {
        setTimeout(() => addReactions(message, reactions), 750);
    }
};

module.exports = async (client, id, Text, reactions = []) => {
    const channel = await client.channels.fetch(id);
    channel.messages.fetch().then((messages) => {
        if (messages.size === 0) {
            // Send a new message
            channel.send(Text).then((message) => {
                addReactions(message, reactions);
            });
        } else {
            // Edit the existing message
            for (const message of messages) {
                message[1].edit(Text);
                message[1].reactions.removeAll()
                addReactions(message[1], reactions);
            }
        }
    });
};