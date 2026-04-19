import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from '../entities/booking.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createBooking(studentId: number, instructorId: number, date: Date, duration: number) {
    const student = await this.userRepository.findOne({ where: { id: studentId } });
    const instructor = await this.userRepository.findOne({ where: { id: instructorId } });
    if (!student || !instructor) {
      throw new Error('User not found');
    }

    // Check if student already has a booking on the same day
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    const existingBooking = await this.bookingRepository.findOne({
      where: {
        student: { id: studentId },
        date: { $gte: startOfDay, $lte: endOfDay } as any,
      },
    });
    if (existingBooking) {
      throw new Error('Student already has a booking on this day');
    }

    const booking = this.bookingRepository.create({ student, instructor, date, duration });
    return this.bookingRepository.save(booking);
  }

  async getBookings() {
    return this.bookingRepository.find({ relations: ['student', 'instructor'] });
  }

  async getAvailableSlots(instructorId: number, date: string) {
    // Operating hours: 08:00 to 17:00, summer 08:00 to 20:00 (assume summer if month 6-8)
    const dateObj = new Date(date);
    const month = dateObj.getMonth() + 1; // 1-12
    const isSummer = month >= 6 && month <= 8;
    const startHour = 8;
    const endHour = isSummer ? 20 : 17;

    const slots = [];
    for (let hour = startHour; hour < endHour; hour++) {
      const slotTime = new Date(`${date}T${hour.toString().padStart(2, '0')}:00:00`);
      // Check if slot is available (not booked)
      const booking = await this.bookingRepository.findOne({
        where: {
          instructor: { id: instructorId },
          date: slotTime,
        },
      });
      if (!booking) {
        slots.push(slotTime);
      }
    }
    return slots;
  }
}