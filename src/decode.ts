import { Buffer } from 'buffer';
import { decompress } from 'fzstd';

export default (data: string) => {
    return Buffer.from(decompress(Buffer.from(data, 'base64'))).toString();
};
