import { Stream } from 'stream';

interface UploadInput {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}

export default UploadInput;
