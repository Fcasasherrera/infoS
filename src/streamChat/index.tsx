import {StreamChat} from 'stream-chat';

const client = StreamChat.getInstance('vvkgbze9b2xf');

const connectUser = (user: {id: string; name: string; image: string}) => {
  return new Promise(async (resolve, reject) => {
    await client.connectUser(
      {
        id: user.id,
        name: user.name,
        image: user.image,
      },
      client.devToken(user.name),
    );
  });
};

export default client;
