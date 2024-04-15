import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppsettingModule } from './appsetting/appsetting.module';
import { AuthMiddleware } from 'src/shared/middleware/auth.middleware';
import { WEB, PREFIX, LOANOFFICER } from 'src/utils/constant';
import { ContentModule } from './content/content.module';
import { MarketModule } from './market/market.module';
import { ActivityModule } from './activity/activity.module';
import { CalculationModule } from './calculation/calculation.module';

@Module({
  imports: [AppsettingModule, ContentModule, MarketModule, ActivityModule, CalculationModule],
})
export class LoanofficerModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthMiddleware).forRoutes(`${WEB}${PREFIX}${LOANOFFICER}`);
  }
}
