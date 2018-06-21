import { Controller, Get, Res } from '@nestjs/common';

@Controller('')
export class SpaController {
    @Get()
    root(@Res() res) {
        res.sendFile('index.html');
    }
}
