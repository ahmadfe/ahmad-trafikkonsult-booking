import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BookingService } from './booking.service';

@Controller('booking')
@UseGuards(JwtAuthGuard)
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Post()
  create(@Body() body: { studentId: number; instructorId: number; date: Date; duration: number }) {
    return this.bookingService.createBooking(body.studentId, body.instructorId, body.date, body.duration);
  }

  @Get()
  findAll() {
    return this.bookingService.getBookings();
  }

  @Get('slots/:instructorId/:date')
  getSlots(@Param('instructorId') instructorId: number, @Param('date') date: string) {
    return this.bookingService.getAvailableSlots(instructorId, date);
  }
}