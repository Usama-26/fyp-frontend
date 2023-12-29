import { useAccounts } from "@/context/AccountContext";
import { isEmpty } from "@/utils/generics";
import React, { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  ChannelHeader,
  ChannelList,
  MessageList,
  MessageInput,
  Thread,
  Window,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";

const filters = { type: "messaging" };
const options = { state: true, presence: true, limit: 10 };
const sort = { last_message_at: -1 };

export default function Inbox() {
  const [client, setClient] = useState(null);
  const { user } = useAccounts();

  useEffect(() => {
    const newClient = new StreamChat("vth4fpnzn8rm");

    const token = window.localStorage.getItem("token");

    const handleConnectionChange = ({ online = false }) => {
      if (!online) return console.log("connection lost");
      setClient(newClient);
    };

    newClient.on("connection.changed", handleConnectionChange);
    if (!isEmpty(user)) {
      newClient.connectUser(
        {
          id: user?.data?.id,
          name: "Dave Matthews",
        },
        token
      );
    }

    return () => {
      newClient.off("connection.changed", handleConnectionChange);
      newClient.disconnectUser().then(() => console.log("connection closed"));
    };
  }, []);

  if (!client) return null;

  return (
    <Chat client={client}>
      <ChannelList filters={filters} sort={sort} options={options} />
      <Channel>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
}
