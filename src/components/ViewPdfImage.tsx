import {Image, Platform} from 'react-native';
import React from 'react';
import PDFView from 'react-native-view-pdf';
import {CustomView} from '../components';

type ViewPdfImageprops = {
  width?: any;
  height?: any;
  url: string;
  typePDF?: boolean;
  resizeMode?: any;
  style?: any;
};

const ViewPdfImage: React.FC<ViewPdfImageprops> = ({
  url,
  typePDF,
  resizeMode,
  style,
}) => {
  const resources = {
    file:
      Platform.OS === 'ios'
        ? 'downloadedDocument.pdf'
        : '/sdcard/Download/downloadedDocument.pdf',
    url: url,
  };

  return (
    <CustomView
      style={{
        width: '100%',
        height: '100%',
        ...style,
      }}>
      {typePDF === true ? (
        <PDFView
          fadeInDuration={250.0}
          style={{
            flex: 1,
            backgroundColor: 'lightgray',
            width: '100%',
            ...style,
          }}
          resource={resources.url}
          resourceType={'url'}
          onLoad={() => console.log(`PDF rendered from ${resources.url}`)}
          onError={error => console.log('Cannot render PDF', error)}
        />
      ) : (
        <Image
          resizeMode={resizeMode}
          style={{
            flex: 1,
            backgroundColor: 'lightgray',
            width: '100%',
            height: '100%',
            ...style,
          }}
          source={{uri: url}}
        />
      )}
    </CustomView>
  );
};

export default ViewPdfImage;
