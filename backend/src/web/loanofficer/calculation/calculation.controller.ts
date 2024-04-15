import {
  Controller,
  UseInterceptors,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Put,
  Body,
  Post,
  Delete,
} from '@nestjs/common';
import { LOANOFFICER, WEB, PREFIX } from 'src/utils/constant';
import { SentryInterceptor } from 'src/shared/interceptor/sentry.interceptor';
import { ApiTags } from '@nestjs/swagger';
import { JwtWebLOAuthGuard } from 'src/web/auth/jwt-auth.guard';
import { GetUser } from 'src/shared/get-user.decorator';
import { Users } from 'src/shared/entity/users.entity';
import { ResponseGlobalInterface, SuccessResponse } from 'src/utils/types';
import { CalculationService } from './calculation.service';
import {
  AffordabilityCalculatorDto,
  ConventionalCalculatorDto,
  DisclaimerUpdateDto,
  FhaCalculatorDto,
  CalculationChangeTypeDto,
  LoanFactorDeleteDto,
  ServiceFeesAddDto,
  UsdaCalculatorDto,
  VaCalculatorDto,
  JumboCalculatorDto,
  ServiceFeesDeleteDto,
} from 'src/dto/calculation.dto';

@Controller(`${WEB}${PREFIX}${LOANOFFICER}/calculation`)
@UseInterceptors(SentryInterceptor)
@ApiTags('Web')
export class CalculationController {
  constructor(private calculationService: CalculationService) {}

  // ANCHOR - GET SERVICE FEES
  @Get('/service-fees')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtWebLOAuthGuard)
  @UsePipes(ValidationPipe)
  getServiceFees(@GetUser() user: Users): Promise<ResponseGlobalInterface<SuccessResponse>> {
    return this.calculationService.getServiceFees(user);
  }

  // ANCHOR - UPDATE SERVICE FEES
  @Put('/service-fees')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtWebLOAuthGuard)
  @UsePipes(ValidationPipe)
  updateServiceFees(
    @GetUser() user: Users,
    @Body() serviceFeesUpdate: Record<string, unknown>,
  ): Promise<ResponseGlobalInterface<SuccessResponse>> {
    return this.calculationService.updateServiceFees(user, serviceFeesUpdate);
  }
  // ANCHOR - DELETE SERVICE FEES
  @Delete('/service-fees')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtWebLOAuthGuard)
  @UsePipes(ValidationPipe)
  deleteServiceFees(
    @GetUser() user: Users,
    @Body() serviceFeesDeleteDto: ServiceFeesDeleteDto,
  ): Promise<ResponseGlobalInterface<SuccessResponse>> {
    return this.calculationService.deleteServiceFees(user, serviceFeesDeleteDto);
  }

  // ANCHOR - ADD SERVICE FEES
  @Post('/service-fees')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtWebLOAuthGuard)
  @UsePipes(ValidationPipe)
  addServiceFees(
    @GetUser() user: Users,
    @Body() serviceFeesAddDto: ServiceFeesAddDto,
  ): Promise<ResponseGlobalInterface<SuccessResponse>> {
    return this.calculationService.addServiceFees(user, serviceFeesAddDto);
  }

  // ANCHOR - GET TYPES CALCULATION
  @Get('/types')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtWebLOAuthGuard)
  @UsePipes(ValidationPipe)
  getTypesCalculations(@GetUser() user: Users): Promise<ResponseGlobalInterface<SuccessResponse>> {
    return this.calculationService.getTypesCalculations(user);
  }

  // ANCHOR - ENABLE/DISABLE TYPES CALCULATION
  @Post('/types')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtWebLOAuthGuard)
  @UsePipes(ValidationPipe)
  changeTypesCalculations(
    @GetUser() user: Users,
    @Body() calculationChangeTypeDto: CalculationChangeTypeDto,
  ): Promise<ResponseGlobalInterface<SuccessResponse>> {
    return this.calculationService.changeTypesCalculations(user, calculationChangeTypeDto);
  }

  // ANCHOR - GET FHA CALCULATION
  @Get('/fha')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtWebLOAuthGuard)
  @UsePipes(ValidationPipe)
  getFHACalculation(@GetUser() user: Users): Promise<ResponseGlobalInterface<SuccessResponse>> {
    return this.calculationService.getFHACalculation(user);
  }

  // ANCHOR - SAVE FHA CALCULATION (Calculate FHA)
  @Post('/fha')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtWebLOAuthGuard)
  @UsePipes(ValidationPipe)
  saveFHACalculation(
    @GetUser() user: Users,
    @Body() saveFhaCalculatorDto: FhaCalculatorDto,
  ): Promise<ResponseGlobalInterface<SuccessResponse>> {
    return this.calculationService.saveFHACalculation(user, saveFhaCalculatorDto);
  }

  // ANCHOR - Default FHA CALCULATION
  @Post('/fha/default')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtWebLOAuthGuard)
  @UsePipes(ValidationPipe)
  defaultFHACalculation(@GetUser() user: Users): Promise<ResponseGlobalInterface<SuccessResponse>> {
    return this.calculationService.defaultFHACalculation(user);
  }

  // ANCHOR - GET CONVENTIONAL CALCULATION
  @Get('/conventional')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtWebLOAuthGuard)
  @UsePipes(ValidationPipe)
  getConventionalCalculation(@GetUser() user: Users): Promise<ResponseGlobalInterface<SuccessResponse>> {
    return this.calculationService.getConventionalCalculation(user);
  }

  // ANCHOR - SAVE CONVENTIONAL CALCULATION
  @Post('/conventional')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtWebLOAuthGuard)
  @UsePipes(ValidationPipe)
  saveConventionalCalculation(
    @GetUser() user: Users,
    @Body() saveConventionalCalculatorDto: ConventionalCalculatorDto,
  ): Promise<ResponseGlobalInterface<SuccessResponse>> {
    return this.calculationService.saveConventionalCalculation(user, saveConventionalCalculatorDto);
  }

  // ANCHOR - Default conventional CALCULATION
  @Post('/conventional/default')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtWebLOAuthGuard)
  @UsePipes(ValidationPipe)
  defaultConventionalCalculation(@GetUser() user: Users): Promise<ResponseGlobalInterface<SuccessResponse>> {
    return this.calculationService.defaultConventionalCalculation(user);
  }

  // ANCHOR - GET JUMBO CALCULATION
  @Get('/jumbo')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtWebLOAuthGuard)
  @UsePipes(ValidationPipe)
  getJumboCalculation(@GetUser() user: Users): Promise<ResponseGlobalInterface<SuccessResponse>> {
    return this.calculationService.getJumboCalculation(user);
  }

  // ANCHOR - SAVE JUMBO CALCULATION
  @Post('/jumbo')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtWebLOAuthGuard)
  @UsePipes(ValidationPipe)
  saveJumboCalculation(
    @GetUser() user: Users,
    @Body() saveJumboCalculatorDto: JumboCalculatorDto,
  ): Promise<ResponseGlobalInterface<SuccessResponse>> {
    return this.calculationService.saveJumboCalculation(user, saveJumboCalculatorDto);
  }

  // ANCHOR - Default Jumbo CALCULATION
  @Post('/jumbo/default')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtWebLOAuthGuard)
  @UsePipes(ValidationPipe)
  defaultJumboCalculation(@GetUser() user: Users): Promise<ResponseGlobalInterface<SuccessResponse>> {
    return this.calculationService.defaultJumboCalculation(user);
  }

  // ANCHOR - GET USDA CALCULATION
  @Get('/usda')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtWebLOAuthGuard)
  @UsePipes(ValidationPipe)
  getUsdaCalculation(@GetUser() user: Users): Promise<ResponseGlobalInterface<SuccessResponse>> {
    return this.calculationService.getUsdaCalculation(user);
  }

  // ANCHOR - SAVE USDA CALCULATION
  @Post('/usda')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtWebLOAuthGuard)
  @UsePipes(ValidationPipe)
  saveUsdaCalculation(
    @GetUser() user: Users,
    @Body() saveUsdaCalculatorDto: UsdaCalculatorDto,
  ): Promise<ResponseGlobalInterface<SuccessResponse>> {
    return this.calculationService.saveUsdaCalculation(user, saveUsdaCalculatorDto);
  }

  // ANCHOR - Default USDA CALCULATION
  @Post('/usda/default')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtWebLOAuthGuard)
  @UsePipes(ValidationPipe)
  defaultUsdaCalculation(@GetUser() user: Users): Promise<ResponseGlobalInterface<SuccessResponse>> {
    return this.calculationService.defaultUsdaCalculation(user);
  }

  // ANCHOR - GET VA CALCULATION
  @Get('/va')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtWebLOAuthGuard)
  @UsePipes(ValidationPipe)
  getVACalculation(@GetUser() user: Users): Promise<ResponseGlobalInterface<SuccessResponse>> {
    return this.calculationService.getVaCalculation(user);
  }

  // ANCHOR - SAVE VA CALCULATION
  @Post('/va')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtWebLOAuthGuard)
  @UsePipes(ValidationPipe)
  saveVaCalculation(
    @GetUser() user: Users,
    @Body() saveVaCalculatorDto: VaCalculatorDto,
  ): Promise<ResponseGlobalInterface<SuccessResponse>> {
    return this.calculationService.saveVaCalculation(user, saveVaCalculatorDto);
  }

  // ANCHOR - Default VA CALCULATION
  @Post('/va/default')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtWebLOAuthGuard)
  @UsePipes(ValidationPipe)
  defaultVaCalculation(@GetUser() user: Users): Promise<ResponseGlobalInterface<SuccessResponse>> {
    return this.calculationService.defaultVaCalculation(user);
  }

  // ANCHOR - GET AFFORDABILITY CALCULATION
  @Get('/affordability')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtWebLOAuthGuard)
  @UsePipes(ValidationPipe)
  getAffordabilityCalculation(@GetUser() user: Users): Promise<ResponseGlobalInterface<SuccessResponse>> {
    return this.calculationService.getAffordabilityCalculation(user);
  }

  // ANCHOR - SAVE AFFORDABILITY CALCULATION
  @Post('/affordability')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtWebLOAuthGuard)
  @UsePipes(ValidationPipe)
  saveAffordabilityCalculation(
    @GetUser() user: Users,
    @Body() affordabilityCalculatorDto: AffordabilityCalculatorDto,
  ): Promise<ResponseGlobalInterface<SuccessResponse>> {
    return this.calculationService.saveAffordabilityCalculation(user, affordabilityCalculatorDto);
  }

  // ANCHOR - Default AFFORDABILITY CALCULATION
  @Post('/affordability/default')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtWebLOAuthGuard)
  @UsePipes(ValidationPipe)
  defaultAffordabilityCalculation(@GetUser() user: Users): Promise<ResponseGlobalInterface<SuccessResponse>> {
    return this.calculationService.defaultAffordabilityCalculation(user);
  }

  // ANCHOR - DELETE LOAN FACTOR FOR CALCULATION
  @Delete('/loan-factor')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtWebLOAuthGuard)
  @UsePipes(ValidationPipe)
  deleteLoanFactorForCalculator(
    @GetUser() user: Users,
    @Body() loanFactorDeleteDto: LoanFactorDeleteDto,
  ): Promise<ResponseGlobalInterface<SuccessResponse>> {
    return this.calculationService.deleteLoanFactorForCalculator(user, loanFactorDeleteDto);
  }

  // ANCHOR - DISCLAIMER UPDATE FOR CALCULATOR
  @Post('/disclaimer')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtWebLOAuthGuard)
  @UsePipes(ValidationPipe)
  disclaimerUpdateCalculator(
    @GetUser() user: Users,
    @Body() disclaimerUpdateDto: DisclaimerUpdateDto,
  ): Promise<ResponseGlobalInterface<SuccessResponse>> {
    return this.calculationService.disclaimerUpdateCalculator(user, disclaimerUpdateDto);
  }
}
