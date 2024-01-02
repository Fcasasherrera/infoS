import React, {FC} from 'react';
import {FadeInView} from '../../components';
import {ContainerNoF} from '../../navigation/options';
import {ChannelList, Chat, OverlayProvider} from 'stream-chat-react-native';
import {useChatClient} from '../../streamChat/useChatClient';
import {DotIndicator} from 'react-native-indicators';

const ChatHome: FC = (props: any) => {
  const {chatClient, isConnecting, loginUser, logout, switchUser, unreadCount} =
    useChatClient();
  console.log(isConnecting);

  return (
    <ContainerNoF>
      <OverlayProvider>
        {isConnecting && !chatClient ? (
          <DotIndicator color="#068DC4" />
        ) : chatClient ? (
          <Chat client={chatClient}>
            <ChannelList />
          </Chat>
        ) : null}
      </OverlayProvider>
    </ContainerNoF>
  );
};

export default ChatHome;
