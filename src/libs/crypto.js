import crypto from "crypto";

// AES-256-CBC configuration
const algorithm = 'aes-256-cbc';
const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex'); // Your encryption key (32 bytes for AES-256)
const ivLength = 16; // AES block size (16 bytes for AES-256)

/**
 * Encrypts a given text using AES-256-CBC encryption.
 *
 * @function
 * @param {string} text - The string to be encrypted.
 * @returns {string} - The encrypted string in the format 'iv:encryptedData', where the IV is concatenated with the encrypted data, both in hexadecimal format.
 * @throws {Error} - Throws an error if the encryption process fails.
 *
 * @example
 * const encryptedText = encrypt('mySecretText');
 * console.log(encryptedText); // Outputs: 'iv:encryptedData'
 */
export const encrypt = (text) => {
    const iv = crypto.randomBytes(ivLength); // Generate a random IV
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    // Return the IV and encrypted data concatenated
    return `${iv.toString('hex')}:${encrypted}`;
}

/**
 * Decrypts a given encrypted text using AES-256-CBC decryption.
 *
 * @function
 * @param {string} encryptedText - The encrypted text in the format "iv:encryptedData", where the IV is concatenated with the encrypted data, both in hexadecimal format.
 * @returns {string} - The decrypted text in UTF-8 format.
 * @throws {Error} - Throws an error if the decryption process fails or if the input format is incorrect.
 *
 * @example
 * const decryptedText = decrypt('iv:encryptedData');
 * console.log(decryptedText); // Outputs: "mySecretText"
 */
export const decrypt = (encryptedText) => {
    const [ivHex, encryptedData] = encryptedText.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}