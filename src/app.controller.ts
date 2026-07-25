import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

/**
 * Root controller reserved for application-level endpoints.
 *
 * It currently declares the base route but exposes no HTTP handlers.
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
