import React, {FC, useEffect, useRef, useState} from 'react';
import {FadeInView} from '../../components';
import {ContainerNoF} from '../../navigation/options';
import {StreamChat} from 'stream-chat';
import {ChannelList, Chat, OverlayProvider} from 'stream-chat-react-native';

const client = StreamChat.getInstance('vvkgbze9b2xf');

const ChatHome: FC = (props: any) => {
  return (
    <ContainerNoF>
      <FadeInView style={{marginTop: 40}} align="flex-start">
        <OverlayProvider>
          <Chat client={client}>{/* <ChannelList /> */}</Chat>
        </OverlayProvider>
      </FadeInView>
    </ContainerNoF>
  );
};

export default ChatHome;
