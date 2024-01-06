const {
  Chat,
  ChannelList,
  Channel,
  ChannelHeader,
  Window,
  MessageList,
  MessageInput,
  Thread,
  Avatar,
  useChatContext,
} = require("stream-chat-react");
const { useAccounts } = require("@/context/AccountContext");
import ClientDashboardLayout from "@/layouts/ClientDashboardLayout";
import withRouteProtect from "@/helpers/withRouteProtect";
import Spinner from "@/components/Spinner";
import Head from "next/head";
import { useEffect } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";

function Inbox() {
  const { isLoading, createChatUser, chatClient, error } = useAccounts();

  useEffect(() => {
    createChatUser();
  }, []);
  return (
    <>
      <Head>
        <title>Inbox | ChainWork</title>
      </Head>
      <ClientDashboardLayout>
        <div className="min-h-[24rem]">
          {isLoading && !chatClient && (
            <div className="h-96 flex items-center justify-center">
              <Spinner />
              <span className="text-sm">Loading...</span>
            </div>
          )}

          {!isLoading && error && (
            <div className="h-[24rem] flex items-center justify-center">
              <div>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-warning-100">
                  <ExclamationTriangleIcon
                    className="h-6 w-6 text-warning-600"
                    aria-hidden="true"
                  />
                </div>
                <p className="text-center text-neutral-500">{error}</p>
              </div>
            </div>
          )}

          {chatClient && (
            <Chat client={chatClient}>
              <div className="border flex max-h-[32rem] pt-5">
                <div className="basis-3/12">
                  <Channels />
                </div>
                <div className="basis-9/12">
                  <Channel>
                    <Window>
                      <CustomChannelHeader />
                      <MessageList />
                      <MessageInput />
                    </Window>
                    <Thread />
                  </Channel>
                </div>
              </div>
            </Chat>
          )}
        </div>
      </ClientDashboardLayout>
    </>
  );
}

export default withRouteProtect(Inbox, ["client"]);

function Channels() {
  const { client } = useChatContext();
  const filter = { members: { $in: [client.userID] } };
  return (
    <ChannelList
      filters={filter}
      Preview={(props) => <CustomChannelPreview {...props} client={client} />}
    />
  );
}

function CustomChannelHeader() {
  const { client, channel } = useChatContext();

  const members = Object.values(channel?.state?.members).filter(
    ({ user }) => user.id !== client.userID
  );

  return <ChannelHeader title={members[0].user.fullName} />;
}

const CustomChannelPreview = (props) => {
  const members = Object.values(props.channel?.state?.members).filter(
    ({ user }) => user.id !== props.client.userID
  );

  return (
    <div
      className={`flex items-center gap-2 hover:bg-primary-100 p-2 cursor-pointer ${
        props.channel?.id === props.activeChannel?.id ? "bg-primary-100" : ""
      }`}
      onClick={() => props.setActiveChannel(props.channel)}
    >
      <Avatar
        image={members[0]?.user?.image}
        name={members[0]?.user?.fullName || members[0]?.user?.id}
        size={48}
      />
      <div className="text-sm">
        <p className="font-medium">
          {members[0]?.user?.fullName || members[0]?.user?.id}
        </p>
        <p className="text-neutral-500">{props.lastMessage?.text || "Nothing Yet"}</p>
      </div>
    </div>
  );
};
