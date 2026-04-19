import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { EntitiesModule } from '../entities/entities.module';

@Module({
  imports: [EntitiesModule],
  providers: [BookingService],
  controllers: [BookingController],
})
export class BookingModule {}