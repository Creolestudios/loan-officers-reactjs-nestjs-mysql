import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmpty, round } from 'lodash';
import {
  AffordabilityCalculatorDto,
  CalculationChangeTypeDto,
  ConventionalCalculatorDto,
  DisclaimerUpdateDto,
  FhaCalculatorDto,
  JumboCalculatorDto,
  LoanFactorDeleteDto,
  ServiceFeesAddDto,
  ServiceFeesDeleteDto,
  UsdaCalculatorDto,
  VaCalculatorDto,
} from 'src/dto/calculation.dto';
import { Calculation_Types } from 'src/shared/entity/calculation_types.entity';
import { Service_Fees } from 'src/shared/entity/service_fees.entity';
import { Users } from 'src/shared/entity/users.entity';
import {
  AFFORDABILITY,
  CalculationTypeConst,
  CONVENTIONAL,
  FHA,
  JUMBO,
  ResponseMap,
  SuccessMessage,
  USDA,
  UserRole,
  VA,
  VALIDATION_MSG,
} from 'src/utils/constant';
import { ResponseGlobalInterface, SuccessResponse } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class CalculationService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    @InjectRepository(Service_Fees)
    private serviceFeesRepository: Repository<Service_Fees>,
    @InjectRepository(Calculation_Types)
    private calculationTypesRepository: Repository<Calculation_Types>,
  ) { }

  propertyPricePercentOnLoanAmount = 0.8;

  // ANCHOR - GET SERVICE FEES
  async getServiceFees(loanOfficer: Users): Promise<ResponseGlobalInterface<SuccessResponse>> {
    try {
      const serviceFees = await this.serviceFeesRepository.find({
        loan_officer_id: loanOfficer.id,
        deleted_at: null,
      });

      const serviceFeesFiltered = serviceFees.map(element => ({
        id: element.id,
        service_name: element.service_name,
        service_fee: element.service_fee,
        is_default: element.is_default,
        created_at: element.created_at,
      }));

      const service_fees = serviceFeesFiltered ?? [];
      return ResponseMap(service_fees);
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // ANCHOR - DELETE SERVICE FEES
  async deleteServiceFees(
    loanOfficer: Users,
    serviceFeesDeleteDto: ServiceFeesDeleteDto,
  ): Promise<ResponseGlobalInterface<SuccessResponse>> {
    try {
      const serviceFees = await this.serviceFeesRepository.findOne({
        loan_officer_id: loanOfficer.id,
        id: serviceFeesDeleteDto.service_id,
        is_default: false,
        deleted_at: null,
      });

      if (!serviceFees) {
        throw new NotFoundException(VALIDATION_MSG.service_fees_not_exist);
      }

      await serviceFees.remove();

      return ResponseMap({ ...serviceFeesDeleteDto }, SuccessMessage.service_fees_removed);
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // ANCHOR - UPDATE SERVICE FEES
  async updateServiceFees(
    loanOfficer: Users,
    serviceFeesUpdate: Record<string, unknown>,
  ): Promise<ResponseGlobalInterface<SuccessResponse>> {
    try {
      const errorFields = [];
      const serviceFees = await this.serviceFeesRepository.find({
        loan_officer_id: loanOfficer.id,
        deleted_at: null,
      });

      serviceFees.map(element => {
        if (
          serviceFeesUpdate[element.service_name] === null ||
          serviceFeesUpdate[element.service_name] === undefined ||
          typeof serviceFeesUpdate[element.service_name] === 'string' ||
          typeof serviceFeesUpdate[element.service_name] === 'boolean'
        ) {
          errorFields.push(`${element.service_name} is not correct format`);
        }
      });

      if (!isEmpty(errorFields)) {
        throw new BadRequestException(errorFields.toString());
      }

      const filteredServiceFees = {};

      await Promise.all(
        serviceFees.map(async fees => {
          fees.service_fee = +serviceFeesUpdate[fees.service_name].toString();

          filteredServiceFees[fees.service_name] = fees.service_fee;

          await fees.save();
        }),
      );

      return ResponseMap({ ...filteredServiceFees });
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // ANCHOR - ADD SERVICE FEES
  async addServiceFees(
    loanOfficer: Users,
    serviceFeesAddDto: ServiceFeesAddDto,
  ): Promise<ResponseGlobalInterface<SuccessResponse>> {
    try {
      const { service_name, service_fee } = serviceFeesAddDto;
      const serviceFeesData = await this.serviceFeesRepository.find({
        where: {
          deleted_at: null,
          loan_officer_id: loanOfficer,
        },
      });

      if (!serviceFeesData) {
        throw new BadRequestException(VALIDATION_MSG.service_fees_not_exist);
      }

      let nameExit = false;

      serviceFeesData.map(fee => {
        if (fee.service_name.toLowerCase() === service_name.toLowerCase()) {
          nameExit = true;
        }
      });

      if (nameExit) {
        throw new BadRequestException(VALIDATION_MSG.service_fees_name_exist);
      }

      const newServiceFees = new Service_Fees();
      newServiceFees.loan_officer_id = loanOfficer.id;
      newServiceFees.service_name = service_name;
      newServiceFees.service_fee = service_fee;

      const serviceFeesDetail = await newServiceFees.save();

      return ResponseMap({
        id: serviceFeesDetail.id,
        ...serviceFeesAddDto,
      });
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // ANCHOR - GET TYPES CALCULATION
  async getTypesCalculations(loanOfficer: Users): Promise<ResponseGlobalInterface<SuccessResponse>> {
    try {
      const calculationTypes = await this.calculationTypesRepository.find({
        where: {
          deleted_at: null,
          loan_officer_id: loanOfficer,
        },
      });

      const filteredCalculationTypes = calculationTypes.map(data => ({
        id: data.id,
        calculation_name: data.calculation_name,
        is_enable: data.is_enable,
      }));

      return ResponseMap([...filteredCalculationTypes]);
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // ANCHOR - ENABLE/DISABLE TYPES CALCULATION
  async changeTypesCalculations(
    loanOfficer: Users,
    calculationChangeTypeDto: CalculationChangeTypeDto,
  ): Promise<ResponseGlobalInterface<SuccessResponse>> {
    try {
      const calculationType = await this.calculationTypesRepository.findOne({
        where: {
          deleted_at: null,
          loan_officer_id: loanOfficer,
          calculation_name: CalculationTypeConst[calculationChangeTypeDto.type],
        },
      });

      if (!calculationType) {
        throw new BadRequestException(VALIDATION_MSG.calculate_not_exist);
      }

      calculationType.is_enable = calculationChangeTypeDto.is_enable;

      await calculationType.save();

      return ResponseMap({ ...calculationChangeTypeDto });
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // ANCHOR - GET FHA CALCULATION
  async getFHACalculation(loanOfficer: Users): Promise<ResponseGlobalInterface<SuccessResponse>> {
    try {
      const fhaCalculationData = await this.calculationTypesRepository.findOne({
        where: {
          deleted_at: null,
          loan_officer_id: loanOfficer,
          calculation_name: FHA,
        },
      });

      const fhaCalculationFiltered = {
        id: fhaCalculationData?.id,
        calculation_name: fhaCalculationData?.calculation_name,
        calculation_default_values: JSON.parse(fhaCalculationData?.calculation_default_values),
        calculation_loan_factors: JSON.parse(fhaCalculationData?.calculation_loan_factors),
        calculator_disclaimer: fhaCalculationData?.calculator_disclaimer,
        created_at: fhaCalculationData?.created_at,
      };

      return ResponseMap({
        ...fhaCalculationFiltered,
      });
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // ANCHOR - SAVE FHA CALCULATION
  async saveFHACalculation(
    loanOfficer: Users,
    saveFhaCalculatorDto: FhaCalculatorDto,
  ): Promise<ResponseGlobalInterface<SuccessResponse>> {
    try {
      const { default_values, loan_factors } = saveFhaCalculatorDto;
      const fhaCalculationData = await this.calculationTypesRepository.findOne({
        where: {
          deleted_at: null,
          loan_officer_id: loanOfficer,
          calculation_name: FHA,
        },
      });

      if (!fhaCalculationData) {
        throw new BadRequestException(VALIDATION_MSG.calculate_not_exist);
      }

      let new_loan_amount = 0;
      if (default_values.property_price) {
        new_loan_amount = round(default_values.property_price * this.propertyPricePercentOnLoanAmount, 2);
      }

      default_values.new_loan_amount = new_loan_amount;

      fhaCalculationData.calculation_default_values = JSON.stringify({
        ...default_values,
      });

      fhaCalculationData.calculation_loan_factors = JSON.stringify([...loan_factors]);

      fhaCalculationData.restore_default_values = 0;

      await fhaCalculationData.save();

      return ResponseMap({ ...saveFhaCalculatorDto });
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // ANCHOR - Default FHA CALCULATION
  async defaultFHACalculation(
    loanOfficer: Users,
  ): Promise<ResponseGlobalInterface<SuccessResponse>> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          role: UserRole.ADMIN,
          deleted_at: null
        }
      });
      const fhaCalculationDataAdmin = await this.calculationTypesRepository.findOne({
        where: {
          deleted_at: null,
          loan_officer_id: user.id,
          calculation_name: FHA,
        },
      });

      if (!fhaCalculationDataAdmin) {
        throw new BadRequestException(VALIDATION_MSG.calculate_not_exist);
      }
      const fhaCalculationDataLO = await this.calculationTypesRepository.findOne({
        where: {
          deleted_at: null,
          loan_officer_id: loanOfficer,
          calculation_name: FHA,
        },
      });

      fhaCalculationDataLO.calculation_default_values = fhaCalculationDataAdmin.calculation_default_values;
      fhaCalculationDataLO.calculation_loan_factors = fhaCalculationDataAdmin.calculation_loan_factors;
      fhaCalculationDataLO.calculator_disclaimer = fhaCalculationDataAdmin.calculator_disclaimer;
      fhaCalculationDataLO.other_default_values = fhaCalculationDataAdmin.other_default_values;
      fhaCalculationDataLO.restore_default_values = fhaCalculationDataAdmin.restore_default_values;
      fhaCalculationDataLO.is_enable = fhaCalculationDataAdmin.is_enable;

      await fhaCalculationDataLO.save();

      return ResponseMap({ message: SuccessMessage.restored_default });
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  // ANCHOR - GET CONVENTIONAL CALCULATION
  async getConventionalCalculation(loanOfficer: Users): Promise<ResponseGlobalInterface<SuccessResponse>> {
    try {
      const conventionalCalculationData = await this.calculationTypesRepository.findOne({
        where: {
          deleted_at: null,
          loan_officer_id: loanOfficer,
          calculation_name: CONVENTIONAL,
        },
      });

      const conventionalCalculationFiltered = {
        id: conventionalCalculationData?.id,
        calculation_name: conventionalCalculationData?.calculation_name,
        calculation_default_values: JSON.parse(conventionalCalculationData?.calculation_default_values),
        calculation_loan_factors: JSON.parse(conventionalCalculationData?.calculation_loan_factors),
        calculator_disclaimer: conventionalCalculationData?.calculator_disclaimer,
        created_at: conventionalCalculationData?.created_at,
      };

      return ResponseMap({
        ...conventionalCalculationFiltered,
      });
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // ANCHOR - SAVE CONVENTIONAL CALCULATION
  async saveConventionalCalculation(
    loanOfficer: Users,
    saveConventionalCalculatorDto: ConventionalCalculatorDto,
  ): Promise<ResponseGlobalInterface<SuccessResponse>> {
    try {
      const { default_values, loan_factors } = saveConventionalCalculatorDto;
      const conventionalCalculationData = await this.calculationTypesRepository.findOne({
        where: {
          deleted_at: null,
          loan_officer_id: loanOfficer,
          calculation_name: CONVENTIONAL,
        },
      });

      if (!conventionalCalculationData) {
        throw new BadRequestException(VALIDATION_MSG.calculate_not_exist);
      }

      let new_loan_amount = 0;
      if (default_values.property_price) {
        new_loan_amount = round(default_values.property_price * this.propertyPricePercentOnLoanAmount, 2);
      }

      default_values.new_loan_amount = new_loan_amount;

      conventionalCalculationData.calculation_default_values = JSON.stringify({
        ...default_values,
      });

      conventionalCalculationData.calculation_loan_factors = JSON.stringify([...loan_factors]);

      conventionalCalculationData.restore_default_values = 0;

      await conventionalCalculationData.save();

      return ResponseMap({ ...saveConventionalCalculatorDto });
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // ANCHOR - Default Conventional CALCULATION
  async defaultConventionalCalculation(
    loanOfficer: Users,
  ): Promise<ResponseGlobalInterface<SuccessResponse>> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          role: UserRole.ADMIN,
          deleted_at: null
        }
      });
      const conventionalCalculationDataAdmin = await this.calculationTypesRepository.findOne({
        where: {
          deleted_at: null,
          loan_officer_id: user.id,
          calculation_name: CONVENTIONAL,
        },
      });

      if (!conventionalCalculationDataAdmin) {
        throw new BadRequestException(VALIDATION_MSG.calculate_not_exist);
      }
      const conventionalCalculationDataLO = await this.calculationTypesRepository.findOne({
        where: {
          deleted_at: null,
          loan_officer_id: loanOfficer,
          calculation_name: CONVENTIONAL,
        },
      });

      conventionalCalculationDataLO.calculation_default_values = conventionalCalculationDataAdmin.calculation_default_values;
      conventionalCalculationDataLO.calculation_loan_factors = conventionalCalculationDataAdmin.calculation_loan_factors;
      conventionalCalculationDataLO.calculator_disclaimer = conventionalCalculationDataAdmin.calculator_disclaimer;
      conventionalCalculationDataLO.other_default_values = conventionalCalculationDataAdmin.other_default_values;
      conventionalCalculationDataLO.restore_default_values = conventionalCalculationDataAdmin.restore_default_values;
      conventionalCalculationDataLO.is_enable = conventionalCalculationDataAdmin.is_enable;

      await conventionalCalculationDataLO.save();

      return ResponseMap({ message: SuccessMessage.restored_default });
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  // ANCHOR - GET JUMBO CALCULATION
  async getJumboCalculation(loanOfficer: Users): Promise<ResponseGlobalInterface<SuccessResponse>> {
    try {
      const jumboCalculationData = await this.calculationTypesRepository.findOne({
        where: {
          deleted_at: null,
          loan_officer_id: loanOfficer,
          calculation_name: JUMBO,
        },
      });

      const jumboCalculationFiltered = {
        id: jumboCalculationData?.id,
        calculation_name: jumboCalculationData?.calculation_name,
        calculation_default_values: JSON.parse(jumboCalculationData?.calculation_default_values),
        calculation_loan_factors: JSON.parse(jumboCalculationData?.calculation_loan_factors),
        calculator_disclaimer: jumboCalculationData?.calculator_disclaimer,
        created_at: jumboCalculationData?.created_at,
      };

      return ResponseMap({
        ...jumboCalculationFiltered,
      });
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // ANCHOR - SAVE JUMBO CALCULATION
  async saveJumboCalculation(
    loanOfficer: Users,
    saveJumboCalculatorDto: JumboCalculatorDto,
  ): Promise<ResponseGlobalInterface<SuccessResponse>> {
    try {
      const { default_values, loan_factors } = saveJumboCalculatorDto;
      const jumboCalculationData = await this.calculationTypesRepository.findOne({
        where: {
          deleted_at: null,
          loan_officer_id: loanOfficer,
          calculation_name: JUMBO,
        },
      });

      if (!jumboCalculationData) {
        throw new BadRequestException(VALIDATION_MSG.calculate_not_exist);
      }

      let new_loan_amount = 0;
      if (default_values.property_price) {
        new_loan_amount = round(default_values.property_price * this.propertyPricePercentOnLoanAmount, 2);
      }

      default_values.new_loan_amount = new_loan_amount;

      jumboCalculationData.calculation_default_values = JSON.stringify({
        ...default_values,
      });

      jumboCalculationData.calculation_loan_factors = JSON.stringify([...loan_factors]);

      jumboCalculationData.restore_default_values = 0;

      await jumboCalculationData.save();

      return ResponseMap({ ...saveJumboCalculatorDto });
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // ANCHOR - Default Jumbo CALCULATION
  async defaultJumboCalculation(
    loanOfficer: Users,
  ): Promise<ResponseGlobalInterface<SuccessResponse>> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          role: UserRole.ADMIN,
          deleted_at: null
        }
      });
      const jumboCalculationDataAdmin = await this.calculationTypesRepository.findOne({
        where: {
          deleted_at: null,
          loan_officer_id: user.id,
          calculation_name: JUMBO,
        },
      });

      if (!jumboCalculationDataAdmin) {
        throw new BadRequestException(VALIDATION_MSG.calculate_not_exist);
      }
      const jumboCalculationDataLO = await this.calculationTypesRepository.findOne({
        where: {
          deleted_at: null,
          loan_officer_id: loanOfficer,
          calculation_name: JUMBO,
        },
      });

      jumboCalculationDataLO.calculation_default_values = jumboCalculationDataAdmin.calculation_default_values;
      jumboCalculationDataLO.calculation_loan_factors = jumboCalculationDataAdmin.calculation_loan_factors;
      jumboCalculationDataLO.calculator_disclaimer = jumboCalculationDataAdmin.calculator_disclaimer;
      jumboCalculationDataLO.other_default_values = jumboCalculationDataAdmin.other_default_values;
      jumboCalculationDataLO.restore_default_values = jumboCalculationDataAdmin.restore_default_values;
      jumboCalculationDataLO.is_enable = jumboCalculationDataAdmin.is_enable;

      await jumboCalculationDataLO.save();

      return ResponseMap({ message: SuccessMessage.restored_default });
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // ANCHOR - GET USDA CALCULATION
  async getUsdaCalculation(loanOfficer: Users): Promise<ResponseGlobalInterface<SuccessResponse>> {
    try {
      const usdaCalculationData = await this.calculationTypesRepository.findOne({
        where: {
          deleted_at: null,
          loan_officer_id: loanOfficer,
          calculation_name: USDA,
        },
      });

      const usdaCalculationFiltered = {
        id: usdaCalculationData?.id,
        calculation_name: usdaCalculationData?.calculation_name,
        calculation_default_values: JSON.parse(usdaCalculationData?.calculation_default_values),
        calculation_loan_factors: JSON.parse(usdaCalculationData?.calculation_loan_factors),
        calculator_disclaimer: usdaCalculationData?.calculator_disclaimer,
        created_at: usdaCalculationData?.created_at,
      };

      return ResponseMap({
        ...usdaCalculationFiltered,
      });
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // ANCHOR - SAVE USDA CALCULATION
  async saveUsdaCalculation(
    loanOfficer: Users,
    saveUsdaCalculatorDto: UsdaCalculatorDto,
  ): Promise<ResponseGlobalInterface<SuccessResponse>> {
    try {
      const { default_values, loan_factors } = saveUsdaCalculatorDto;
      const usdaCalculationData = await this.calculationTypesRepository.findOne({
        where: {
          deleted_at: null,
          loan_officer_id: loanOfficer,
          calculation_name: USDA,
        },
      });

      if (!usdaCalculationData) {
        throw new BadRequestException(VALIDATION_MSG.calculate_not_exist);
      }

      let new_loan_amount = 0;
      if (default_values.property_price) {
        new_loan_amount = round(default_values.property_price * this.propertyPricePercentOnLoanAmount, 2);
      }

      default_values.new_loan_amount = new_loan_amount;

      usdaCalculationData.calculation_default_values = JSON.stringify({
        ...default_values,
      });

      usdaCalculationData.calculation_loan_factors = JSON.stringify([...loan_factors]);

      usdaCalculationData.restore_default_values = 0;

      await usdaCalculationData.save();

      return ResponseMap({ ...saveUsdaCalculatorDto });
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // ANCHOR - Default Usda CALCULATION
  async defaultUsdaCalculation(
    loanOfficer: Users,
  ): Promise<ResponseGlobalInterface<SuccessResponse>> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          role: UserRole.ADMIN,
          deleted_at: null
        }
      });
      const usdaCalculationDataAdmin = await this.calculationTypesRepository.findOne({
        where: {
          deleted_at: null,
          loan_officer_id: user.id,
          calculation_name: USDA,
        },
      });

      if (!usdaCalculationDataAdmin) {
        throw new BadRequestException(VALIDATION_MSG.calculate_not_exist);
      }
      const usdaCalculationDataLO = await this.calculationTypesRepository.findOne({
        where: {
          deleted_at: null,
          loan_officer_id: loanOfficer,
          calculation_name: USDA,
        },
      });

      usdaCalculationDataLO.calculation_default_values = usdaCalculationDataAdmin.calculation_default_values;
      usdaCalculationDataLO.calculation_loan_factors = usdaCalculationDataAdmin.calculation_loan_factors;
      usdaCalculationDataLO.calculator_disclaimer = usdaCalculationDataAdmin.calculator_disclaimer;
      usdaCalculationDataLO.other_default_values = usdaCalculationDataAdmin.other_default_values;
      usdaCalculationDataLO.restore_default_values = usdaCalculationDataAdmin.restore_default_values;
      usdaCalculationDataLO.is_enable = usdaCalculationDataAdmin.is_enable;

      await usdaCalculationDataLO.save();

      return ResponseMap({ message: SuccessMessage.restored_default });
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // ANCHOR - GET VA CALCULATION
  async getVaCalculation(loanOfficer: Users): Promise<ResponseGlobalInterface<SuccessResponse>> {
    try {
      const vaCalculationData = await this.calculationTypesRepository.findOne({
        where: {
          deleted_at: null,
          loan_officer_id: loanOfficer,
          calculation_name: VA,
        },
      });

      const vaCalculationFiltered = {
        id: vaCalculationData?.id,
        calculation_name: vaCalculationData?.calculation_name,
        calculation_default_values: JSON.parse(vaCalculationData?.calculation_default_values),
        calculation_loan_factors: JSON.parse(vaCalculationData?.calculation_loan_factors),
        calculator_disclaimer: vaCalculationData?.calculator_disclaimer,
        created_at: vaCalculationData?.created_at,
      };

      return ResponseMap({
        ...vaCalculationFiltered,
      });
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // ANCHOR - SAVE VA CALCULATION
  async saveVaCalculation(
    loanOfficer: Users,
    saveVaCalculatorDto: VaCalculatorDto,
  ): Promise<ResponseGlobalInterface<SuccessResponse>> {
    try {
      const { default_values, loan_factors } = saveVaCalculatorDto;
      const vaCalculationData = await this.calculationTypesRepository.findOne({
        where: {
          deleted_at: null,
          loan_officer_id: loanOfficer,
          calculation_name: VA,
        },
      });

      if (!vaCalculationData) {
        throw new BadRequestException(VALIDATION_MSG.calculate_not_exist);
      }

      let new_loan_amount = 0;
      if (default_values.property_price) {
        new_loan_amount = round(default_values.property_price * this.propertyPricePercentOnLoanAmount, 2);
      }

      default_values.new_loan_amount = new_loan_amount;

      vaCalculationData.calculation_default_values = JSON.stringify({
        ...default_values,
      });

      vaCalculationData.calculation_loan_factors = JSON.stringify([...loan_factors]);

      vaCalculationData.restore_default_values = 0;

      await vaCalculationData.save();

      return ResponseMap({ ...saveVaCalculatorDto });
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  // ANCHOR - Default VA CALCULATION
  async defaultVaCalculation(
    loanOfficer: Users,
  ): Promise<ResponseGlobalInterface<SuccessResponse>> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          role: UserRole.ADMIN,
          deleted_at: null
        }
      });
      const vaCalculationDataAdmin = await this.calculationTypesRepository.findOne({
        where: {
          deleted_at: null,
          loan_officer_id: user.id,
          calculation_name: VA,
        },
      });

      if (!vaCalculationDataAdmin) {
        throw new BadRequestException(VALIDATION_MSG.calculate_not_exist);
      }
      const vaCalculationDataLO = await this.calculationTypesRepository.findOne({
        where: {
          deleted_at: null,
          loan_officer_id: loanOfficer,
          calculation_name: VA,
        },
      });

      vaCalculationDataLO.calculation_default_values = vaCalculationDataAdmin.calculation_default_values;
      vaCalculationDataLO.calculation_loan_factors = vaCalculationDataAdmin.calculation_loan_factors;
      vaCalculationDataLO.calculator_disclaimer = vaCalculationDataAdmin.calculator_disclaimer;
      vaCalculationDataLO.other_default_values = vaCalculationDataAdmin.other_default_values;
      vaCalculationDataLO.restore_default_values = vaCalculationDataAdmin.restore_default_values;
      vaCalculationDataLO.is_enable = vaCalculationDataAdmin.is_enable;

      await vaCalculationDataLO.save();

      return ResponseMap({ message: SuccessMessage.restored_default });
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  // ANCHOR - GET AFFORDABILITY CALCULATION
  async getAffordabilityCalculation(loanOfficer: Users): Promise<ResponseGlobalInterface<SuccessResponse>> {
    try {
      const affordabilityCalculationData = await this.calculationTypesRepository.findOne({
        where: {
          deleted_at: null,
          loan_officer_id: loanOfficer,
          calculation_name: AFFORDABILITY,
        },
      });

      const affordabilityCalculationFiltered = {
        id: affordabilityCalculationData?.id,
        calculation_name: affordabilityCalculationData?.calculation_name,
        calculation_default_values: JSON.parse(affordabilityCalculationData?.calculation_default_values),
        calculation_loan_factors: JSON.parse(affordabilityCalculationData?.calculation_loan_factors),
        calculator_disclaimer: affordabilityCalculationData?.calculator_disclaimer,
        created_at: affordabilityCalculationData?.created_at,
      };

      return ResponseMap({
        ...affordabilityCalculationFiltered,
      });
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // ANCHOR - SAVE AFFORDABILITY CALCULATION
  async saveAffordabilityCalculation(
    loanOfficer: Users,
    affordabilityCalculatorDto: AffordabilityCalculatorDto,
  ): Promise<ResponseGlobalInterface<SuccessResponse>> {
    try {
      const { default_values, loan_factors } = affordabilityCalculatorDto;
      const affordCalculationData = await this.calculationTypesRepository.findOne({
        where: {
          deleted_at: null,
          loan_officer_id: loanOfficer,
          calculation_name: AFFORDABILITY,
        },
      });

      if (!affordCalculationData) {
        throw new BadRequestException(VALIDATION_MSG.calculate_not_exist);
      }

      let new_loan_amount = 0;
      if (default_values.property_price) {
        new_loan_amount = round(default_values.property_price * this.propertyPricePercentOnLoanAmount, 2);
      }

      default_values.new_loan_amount = new_loan_amount;

      affordCalculationData.calculation_default_values = JSON.stringify({
        ...default_values,
      });

      affordCalculationData.calculation_loan_factors = JSON.stringify([...loan_factors]);

      affordCalculationData.restore_default_values = 0;

      await affordCalculationData.save();

      return ResponseMap({ ...affordabilityCalculatorDto });
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // ANCHOR - Default AFFORDABILITY CALCULATION
  async defaultAffordabilityCalculation(
    loanOfficer: Users,
  ): Promise<ResponseGlobalInterface<SuccessResponse>> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          role: UserRole.ADMIN,
          deleted_at: null
        }
      });
      const affordabilityCalculationDataAdmin = await this.calculationTypesRepository.findOne({
        where: {
          deleted_at: null,
          loan_officer_id: user.id,
          calculation_name: AFFORDABILITY,
        },
      });

      if (!affordabilityCalculationDataAdmin) {
        throw new BadRequestException(VALIDATION_MSG.calculate_not_exist);
      }
      const affordabilityCalculationDataLO = await this.calculationTypesRepository.findOne({
        where: {
          deleted_at: null,
          loan_officer_id: loanOfficer,
          calculation_name: AFFORDABILITY,
        },
      });

      affordabilityCalculationDataLO.calculation_default_values = affordabilityCalculationDataAdmin.calculation_default_values;
      affordabilityCalculationDataLO.calculation_loan_factors = affordabilityCalculationDataAdmin.calculation_loan_factors;
      affordabilityCalculationDataLO.calculator_disclaimer = affordabilityCalculationDataAdmin.calculator_disclaimer;
      affordabilityCalculationDataLO.other_default_values = affordabilityCalculationDataAdmin.other_default_values;
      affordabilityCalculationDataLO.restore_default_values = affordabilityCalculationDataAdmin.restore_default_values;
      affordabilityCalculationDataLO.is_enable = affordabilityCalculationDataAdmin.is_enable;

      await affordabilityCalculationDataLO.save();

      return ResponseMap({ message: SuccessMessage.restored_default });
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  // ANCHOR - DELETE LOAN FACTOR FOR CALCULATION
  async deleteLoanFactorForCalculator(
    loanOfficer: Users,
    loanFactorDeleteDto: LoanFactorDeleteDto,
  ): Promise<ResponseGlobalInterface<SuccessResponse>> {
    try {
      const { type, id } = loanFactorDeleteDto;
      const calculationTypeData = await this.calculationTypesRepository.findOne({
        where: {
          deleted_at: null,
          loan_officer_id: loanOfficer,
          calculation_name: CalculationTypeConst[type],
        },
      });

      if (!calculationTypeData) {
        throw new BadRequestException(VALIDATION_MSG.calculate_not_exist);
      }

      let calculatorTypeLoanFactor = JSON.parse(calculationTypeData.calculation_loan_factors);

      calculatorTypeLoanFactor = calculatorTypeLoanFactor.filter(element => element.id !== id);

      calculationTypeData.calculation_loan_factors = JSON.stringify(calculatorTypeLoanFactor);

      await calculationTypeData.save();

      return ResponseMap(calculatorTypeLoanFactor);
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // ANCHOR - DISCLAIMER UPDATE FOR CALCULATOR
  async disclaimerUpdateCalculator(
    loanOfficer: Users,
    disclaimerUpdateDto: DisclaimerUpdateDto,
  ): Promise<ResponseGlobalInterface<SuccessResponse>> {
    try {
      const { type, disclaimer } = disclaimerUpdateDto;
      const calculationTypeData = await this.calculationTypesRepository.findOne({
        where: {
          deleted_at: null,
          loan_officer_id: loanOfficer,
          calculation_name: CalculationTypeConst[type],
        },
      });

      if (!calculationTypeData) {
        throw new BadRequestException(VALIDATION_MSG.calculate_not_exist);
      }

      calculationTypeData.calculator_disclaimer = disclaimer;

      await calculationTypeData.save();

      return ResponseMap({ ...disclaimerUpdateDto });
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
