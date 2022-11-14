import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MongoClient } from 'mongodb'
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    ) {}

  @Get()
  async run() {
    return this.appService.run()
  }
}
