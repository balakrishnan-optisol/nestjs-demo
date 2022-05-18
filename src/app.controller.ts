import { Controller, Get, Redirect, Query, Body } from '@nestjs/common';
import { AppService } from './app.service';
import Utility from './Utility/Utility';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) { }

	@Get()
	getHello(): string {
		return this.appService.getHello();
	}

	@Get('docs')
	@Redirect('https://docs.nestjs.com', 302)
	getDocs(@Query('version') version) {
		if (version && version === '5') {
			return { url: 'https://docs.nestjs.com/v5/' };
		}
	}

	@Get('encrypt')
	encryptText(@Query('text') text) {
		return Utility.encrypt(text);
	}

	@Get('decrypt')
	decryptText(@Body() data: any) {
		return Utility.decrypt(data.encrypted_text);
	}
}
