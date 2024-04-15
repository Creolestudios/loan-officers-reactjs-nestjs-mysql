import {
  Controller,
  UseInterceptors,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Delete,
} from '@nestjs/common';
import { LOANOFFICER, WEB, PREFIX } from 'src/utils/constant';
import { SentryInterceptor } from 'src/shared/interceptor/sentry.interceptor';
import { ApiTags } from '@nestjs/swagger';
import { JwtWebLOAuthGuard } from 'src/web/auth/jwt-auth.guard';
import { GetUser } from 'src/shared/get-user.decorator';
import { Users } from 'src/shared/entity/users.entity';
import { ResponseGlobalInterface, SuccessResponse } from 'src/utils/types';
import { AppsettingService } from './appsetting.service';
import {
  DashBoardMenuSaveDto,
  AppMenuSaveDto,
  DashBoardCustomLinkSaveDto,
  AppGuideMenusDto,
  MenuCustomLinkDto,
} from 'src/dto/app-setting.dto';

@Controller(`${WEB}${PREFIX}${LOANOFFICER}/appsetting`)
@UseInterceptors(SentryInterceptor)
@ApiTags('Web')
export class AppsettingController {
  constructor(private appSettingService: AppsettingService) {}

  /**
   *
   * @param appGuideMenusDto Array of mortgage guide(uuid,name,status)
   * @param user Lo user details
   * @returns saved mortgage guide
   */
  // ANCHOR SAVE MORTGAGE GUIDE
  @Post('/mortgage-guide')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtWebLOAuthGuard)
  @UsePipes(ValidationPipe)
  saveMortgageGuide(
    @Body() appGuideMenusDto: AppGuideMenusDto,
    @GetUser() user: Users,
  ): Promise<ResponseGlobalInterface<SuccessResponse>> {
    return this.appSettingService.saveMortgageGuide(user, appGuideMenusDto);
  }

  /**
   *
   * @param user Lo user details
   * @returns list of mortgage guide of LO
   */
  // ANCHOR GET LIST OF MORTGAGE GUIDE
  @Get('/mortgage-guide')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtWebLOAuthGuard)
  getMortgageGuide(@GetUser() user: Users): Promise<ResponseGlobalInterface<SuccessResponse>> {
    return this.appSettingService.getMortgageGuide(user);
  }

  /**
   *
   * @param user Lo user details
   * @returns Different data for Employee,Branded-lo, Normal-LO AND their custom-links
   * @returns Employee : Data of company-links of parentLO and other employee links
   * @returns Normal-LO : Data of the default-menu Links of LO
   * @returns Branded-lo : Data of company-links and default-menu links of branded LO
   */
  // ANCHOR - GET DASHBOARD MENU Data
  @Get('/dashboard-menu')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtWebLOAuthGuard)
  getDashboardMenu(@GetUser() user: Users): Promise<ResponseGlobalInterface<SuccessResponse>> {
    return this.appSettingService.getDashboardMenu(user);
  }

  /**
   *
   * @param dashboardMenuDto (different input for : Employee,Branded-lo,Normal-LO)
   * FOR Employee : menu - to be saved as company link for employee
   * FOR Normal-LO : menu - to be saved as default-menu links for normal-lo
   * FOR Branded-Lo : menu & company-menu - to be saved as default-menu & company-links respectively
   * @param user Lo user details
   * @returns Changed menu/s
   */
  // ANCHOR - UPDATE DASHBOARD MENU
  @Post('/dashboard-menu')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtWebLOAuthGuard)
  @UsePipes(ValidationPipe)
  saveDashboardMenu(
    @Body() dashboardMenuDto: DashBoardMenuSaveDto,
    @GetUser() user: Users,
  ): Promise<ResponseGlobalInterface<SuccessResponse>> {
    return this.appSettingService.saveDashboardMenu(user, dashboardMenuDto);
  }

  /**
   *
   * @param dashboardCustomLinkDto Custom link details
   * @param user Lo user details
   * @returns Custom Links of the Lo
   */
  // ANCHOR - ADD CUSTOM LINK DASHBOARD MENU
  @Post('/dashboard-menu/customlink')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtWebLOAuthGuard)
  @UsePipes(ValidationPipe)
  addCustomLinkToDashboardMenu(
    @Body() dashboardCustomLinkDto: DashBoardCustomLinkSaveDto,
    @GetUser() user: Users,
  ): Promise<ResponseGlobalInterface<SuccessResponse>> {
    return this.appSettingService.addCustomLinkToDashboardMenu(user, dashboardCustomLinkDto);
  }

  /**
   *
   * @param menuCustomLinkDto id of the custom link to delete link
   * @param user Lo user details
   * @returns Success message if custom link deleted
   */
  // ANCHOR - DELETE CUSTOM LINK DASHBOARD MENU
  @Delete('/dashboard-menu/customlink')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtWebLOAuthGuard)
  @UsePipes(ValidationPipe)
  deleteCustomLinkToDashboardMenu(
    @Body() menuCustomLinkDto: MenuCustomLinkDto,
    @GetUser() user: Users,
  ): Promise<ResponseGlobalInterface<SuccessResponse>> {
    return this.appSettingService.deleteCustomLinkToDashboardMenu(user, menuCustomLinkDto);
  }

  /**
   *
   * @param user Lo user details
   * @returns Different data for Employee,Branded-lo, Normal-LO AND their custom-links
   * @returns Employee : Data of company-links of parentLO and other employee links
   * @returns Normal-LO : Data of the app-menu Links of LO
   * @returns Branded-lo : Data of company-links and app-menu links of branded LO
   */
  // ANCHOR - GET APP MENU Data
  @Get('/app-menu')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtWebLOAuthGuard)
  getAppMenu(@GetUser() user: Users): Promise<ResponseGlobalInterface<SuccessResponse>> {
    return this.appSettingService.getAppMenu(user);
  }

  /**
   *
   * @param appMenuDto (different input for : Employee,Branded-lo,Normal-LO)
   * FOR Employee : menu - to be saved as company link for employee
   * FOR Normal-LO : menu - to be saved as app-menu links for normal-lo
   * FOR Branded-Lo : menu & company-menu - to be saved as app-menu & company-links respectively
   * @param user Lo user details
   * @returns Changed menu/s
   */
  // ANCHOR - UPDATE APP MENU
  @Post('/app-menu')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtWebLOAuthGuard)
  @UsePipes(ValidationPipe)
  saveAppMenu(
    @Body() appMenuDto: AppMenuSaveDto,
    @GetUser() user: Users,
  ): Promise<ResponseGlobalInterface<SuccessResponse>> {
    return this.appSettingService.saveAppMenu(user, appMenuDto);
  }

  /**
   *
   * @param dashboardCustomLinkDto Custom link details
   * @param user Lo user details
   * @returns Custom Links of the Lo
   */
  // ANCHOR - ADD CUSTOM LINK APP MENU
  @Post('/app-menu/customlink')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtWebLOAuthGuard)
  @UsePipes(ValidationPipe)
  addCustomLinkToAppMenu(
    @Body() appMenuDto: DashBoardCustomLinkSaveDto,
    @GetUser() user: Users,
  ): Promise<ResponseGlobalInterface<SuccessResponse>> {
    return this.appSettingService.addCustomLinkToAppMenu(user, appMenuDto);
  }

  /**
   *
   * @param menuCustomLinkDto id of the custom link to delete link
   * @param user Lo user details
   * @returns Success message if custom link deleted
   */
  // ANCHOR - DELETE CUSTOM LINK APP MENU
  @Delete('/app-menu/customlink')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtWebLOAuthGuard)
  @UsePipes(ValidationPipe)
  deleteCustomLinkToAppMenu(
    @Body() menuCustomLinkDto: MenuCustomLinkDto,
    @GetUser() user: Users,
  ): Promise<ResponseGlobalInterface<SuccessResponse>> {
    return this.appSettingService.deleteCustomLinkToAppMenu(user, menuCustomLinkDto);
  }
}
