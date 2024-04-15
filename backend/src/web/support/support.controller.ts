import {
  Controller,
  UseInterceptors,
  Get,
  HttpCode,
  UseGuards,
  UsePipes,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { LOANOFFICER, WEB, PREFIX } from 'src/utils/constant';
import { SentryInterceptor } from 'src/shared/interceptor/sentry.interceptor';
import { JwtWebLOAuthGuard } from 'src/web/auth/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { SupportService } from './support.service';
import { ResponseGlobalInterface, SuccessResponse } from 'src/utils/types';

@Controller(`${WEB}${PREFIX}${LOANOFFICER}/support`)
@UseInterceptors(SentryInterceptor)
@ApiTags('Web')
export class SupportController {
  constructor(private supportService: SupportService) {}

  /**
   *
   * @returns Data of category guides and list of guide in each category
   */
  // ANCHOR Get Support Guide Data
  @Get('/guide')
  @HttpCode(HttpStatus.OK)
  @UsePipes(ValidationPipe)
  @UseGuards(JwtWebLOAuthGuard)
  getGuides(): Promise<ResponseGlobalInterface<SuccessResponse>> {
    return this.supportService.getSupportGuides();
  }

  /**
   *
   * @returns List of faq's with sequence
   */
  // ANCHOR Get List of FAQ
  @Get('/faqs')
  @HttpCode(HttpStatus.OK)
  @UsePipes(ValidationPipe)
  @UseGuards(JwtWebLOAuthGuard)
  getFaqs(): Promise<ResponseGlobalInterface<SuccessResponse>> {
    return this.supportService.getFaqs();
  }
}
