import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { User } from '../entities/user.entity';
import { Booking } from '../entities/booking.entity';
import { Note } from '../entities/note.entity';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([User, Booking, Note]),
  ],
  exports: [TypeOrmModule],
})
export class EntitiesModule {}