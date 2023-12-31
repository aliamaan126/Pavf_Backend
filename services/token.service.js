import { sign, verify } from '../utils/token.utils.js';

/**
 * The function generates a token using the provided payload, expiration time, and secret.
 * @param payload - The payload is an object that contains the data you want to include in the token.
 * It can be any valid JSON object that you want to encode and include in the token.
 * @param expiresIn - The expiresIn parameter specifies the time duration for which the generated token
 * will be valid. It can be a number representing the time in seconds or a string representing a time
 * span (e.g., "1d" for one day, "2h" for two hours, etc.).
 * @param secret - The `secret` parameter is a string that is used to sign the token. It is a secret
 * key that should be kept confidential and should not be shared with anyone.
 * @returns the result of the `sign` function, which is being awaited.
 */
export const generateToken = async (payload, expiresIn, secret) => {
  return await sign(payload, expiresIn, secret);
};
/**
 * The function `verifyToken` verifies a token using a secret.
 * @param token - The `token` parameter is a string that represents the token to be verified. This
 * token is typically generated by a server and is used to authenticate and authorize a user's access
 * to certain resources or actions.
 * @param secret - The `secret` parameter is a string that represents the secret key used to sign and
 * verify the token. It is a shared secret between the server and the client, and it should be kept
 * confidential to ensure the security of the token.
 * @returns the result of the `verify` function, which is being awaited.
 */
export const verifyToken = async (token, secret) => {
  return await verify(token, secret);
};
