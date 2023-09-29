import {Image} from 'react-native-compressor';

const compressionFileSystem = async (img: string) => {
  const result = await Image.compress(img, {
    // maxWidth: 1000,
    // quality: 0.8,
    compressionMethod: 'auto',
  });
  return await result;
};

export default compressionFileSystem;
