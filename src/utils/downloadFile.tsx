import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL_FILES} from '../constants/.env';

type DownloadFileOptions = {
  fromUrl: any;
  toFile: any;
  headers: any;
};

const downloadFile = async (url: string, fileName: string): Promise<any> => {
  //Define path to store file along with the extension

  const token: string | null = await AsyncStorage.getItem('token');

  const path = `${RNFS.DocumentDirectoryPath}/${fileName}.pdf`;
  const headers = {
    Accept: 'application/pdf',
    'Content-Type': 'application/pdf',
    Authorization: `Bearer ${token}`,
  };
  //Define options
  const options: DownloadFileOptions = {
    fromUrl: [BASE_URL_FILES] + url,
    toFile: path,
    headers: headers,
  };
  //Call downloadFile
  const response = await downloadFile(options, 'download');
  return response.promise.then(async (res: any) => {
    //Transform response
    if (res && res.statusCode === 200 && res.bytesWritten > 0 && res.path) {
      console.log('Downloaded here: ', res);
    } else {
      console.log('error here:', res);
    }
  });
};

export default downloadFile;
