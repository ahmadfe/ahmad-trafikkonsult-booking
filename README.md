# Ahmad Trafikkonsult Driving School Booking System

This repository contains the full-stack application for Ahmad Trafikkonsult driving school booking system.

## Project Structure

- `frontend/` - Next.js application
- `backend/` - NestJS API
- `database/` - Database setup
- `docker/` - Docker configuration

## Getting Started

### Prerequisites

- Node.js 18+
- Docker and Docker Compose
- PostgreSQL (or use Docker)

### Development Setup

1. Clone the repository
2. Install dependencies for frontend and backend
3. Set up the database
4. Run the applications

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

#### Backend

```bash
cd backend
npm install
npm run start:dev
```

#### Database

Use Docker Compose to run PostgreSQL:

```bash
cd docker
docker-compose up -d db
```

### Production Setup

Use Docker Compose to run the entire stack:

```bash
cd docker
docker-compose up --build
```

## Features

- User authentication (students, instructors, admins)
- Booking system with available slots
- Instructor management
- Notes and feedback
- Reports (planned)

## API Endpoints

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login
- `GET /booking` - Get all bookings
- `POST /booking` - Create a booking
- `GET /booking/slots/:instructorId/:date` - Get available slots

## Environment Variables

Create `.env` files in backend and frontend directories.

Backend:
- `DB_HOST`
- `DB_PORT`
- `DB_USERNAME`
- `DB_PASSWORD`
- `DB_NAME`
- `JWT_SECRET`

## License

ISC