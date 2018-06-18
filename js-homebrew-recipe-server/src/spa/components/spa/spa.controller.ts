import { Controller, Get, Res } from '@nestjs/common';
import * as path from 'path';

@Controller('')
export class SpaController {
    @Get()
    root(@Res() res) {
        res.sendFile('index.html');
    }
}
