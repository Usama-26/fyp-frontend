import { useEffect, useState } from "react";
import { StreamChat, TokenOrProvider, User } from "stream-chat";

export type UseClientOptions = {
  user: User;
  tokenOrProvider: TokenOrProvider;
};

export const useChatClient = ({
  user,
  tokenOrProvider,
}: UseClientOptions): StreamChat | undefined => {
  const [chatClient, setChatClient] = useState<StreamChat>();
  const apiKey = process.env.NEXT_PUBLIC_GETSTREAM_API_KEY;

  useEffect(() => {
    if (user && tokenOrProvider) {
      const client = new StreamChat(apiKey, { timeout: 6000 });
      // prevents application from setting stale client (user changed, for example)
      let didUserConnectInterrupt = false;

      const connectionPromise = client.connectUser(user, tokenOrProvider).then(() => {
        if (!didUserConnectInterrupt) {
          setChatClient(client);
        }
      });

      return () => {
        didUserConnectInterrupt = true;
        setChatClient(undefined);
        // wait for connection to finish before initiating closing sequence
        connectionPromise
          .then(() => client.disconnectUser())
          .then(() => {
            console.log("connection closed");
          });
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- should re-run only if user.id changes
  }, [apiKey, user?.id, tokenOrProvider]);

  return chatClient;
};
