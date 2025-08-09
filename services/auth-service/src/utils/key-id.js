import crypto from 'crypto';

const computeKeyId = (publicKey) => {

    const digest = crypto.createHash('sha256')   // create a sha256 hash generator/function
                         .update(publicKey)      // passing the data which needs to be hashed
                         .digest();              // gives a buffer of 32 raw bytes
                    
    const keyId = digest.toString('base64url')   // convert the binary hash buffer into base64url format
    
    return keyId;
}

export default computeKeyId;