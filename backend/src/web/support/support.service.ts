import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Support_Guides } from 'src/shared/entity/support_guides.entity';
import { Support_Guides_Categories } from 'src/shared/entity/support_guides_categories.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseGlobalInterface, SuccessResponse } from 'src/utils/types';
import { ResponseMap } from 'src/utils/constant';
import { Faqs } from 'src/shared/entity/faqs.entity';

@Injectable()
export class SupportService {
  constructor(
    @InjectRepository(Faqs)
    private faqsRepository: Repository<Faqs>,
    @InjectRepository(Support_Guides)
    private SupportGuidesRepository: Repository<Support_Guides>,
    @InjectRepository(Support_Guides_Categories)
    private SupportGuidesCategoriesRepository: Repository<Support_Guides_Categories>
  ) { }

  // ANCHOR GET support guides 
  async getSupportGuides(): Promise<ResponseGlobalInterface<SuccessResponse>> {
    try {
      const categoryData = await this.SupportGuidesCategoriesRepository.find({
        where: {
          deleted_at: null
        }
      });
      const category = categoryData.map(element => {
        return {
          id: element.id,
          category_name: element.category_name
        };
      });
      let guide_list = {};
      await Promise.all(
        category.map(async categorydata => {
          const guideData = await this.SupportGuidesRepository.find({
            where: {
              category_id: categorydata.id,
              deleted_at: null
            },
          });
          const guide = guideData.map(element => {
            return {
              id: element.id,
              title: element.title,
              description: element.description,
              guide_url: element.guide_url
            };
          });
          if (guide.length > 0) {
            guide_list[categorydata.category_name] = guide;
          }
        })
      );
      return ResponseMap(
        {
          guide_list
        },
        'Success',
      );
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // ANCHOR GET faqs
  async getFaqs(): Promise<ResponseGlobalInterface<SuccessResponse>> {
    try {
      const faqsData = await this.faqsRepository.find({
        select: [`id`, `question`, `answer`, `sequence_number`],
        where: {
          deleted_at: null,
        }, order: {
          sequence_number: 'ASC'
        }
      });
      return ResponseMap(
        {
          faqs_list: faqsData,
        },
        'success',
      );
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
