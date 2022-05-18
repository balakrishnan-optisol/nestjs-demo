import { HttpException } from '@nestjs/common';
import { createCipheriv, randomBytes, scrypt, createDecipheriv } from 'crypto';
import { promisify } from 'util';
import Constants from 'src/constants/constants';
const iv = randomBytes(16);

class Utility {
	successRes(code = 200, data?: any, meesage = 'Success!') {
		return {
			status_code: code,
			timestamp: new Date().toISOString(),
			data,
			message: meesage,
		};
	}

	errorRes(code = 400, error: any, meesage = 'Error!') {
		return new HttpException(
			{
				status: code,
				error: error && error.message ? error.message : meesage,
			},
			code,
		);
	}

	async encrypt(data) {
		try {

			const password = Constants.ENCRYPT_PASSWORD;

			// The key length is dependent on the algorithm.
			// In this case for aes256, it is 32 bytes.
			const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
			const cipher = createCipheriv('aes-256-ctr', key, iv);
			let encryptedStr = cipher.update(data, 'utf8', 'base64')
			encryptedStr += cipher.final('base64');
			return encryptedStr;
		} catch (error) {
			console.log('encrypt - ', error);
			return '';
		}
	}

	async decrypt(data) {
		try {

			const password = Constants.ENCRYPT_PASSWORD;

			const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
			const decipher = createDecipheriv('aes-256-ctr', key, iv);
			let decryptedStr = decipher.update(data, 'base64', 'utf8')
			decryptedStr += decipher.final('utf8');
			return decryptedStr;
		} catch (error) {
			console.log('decrypt - ', error);
			return '';
		}
	}
}

export default new Utility();
