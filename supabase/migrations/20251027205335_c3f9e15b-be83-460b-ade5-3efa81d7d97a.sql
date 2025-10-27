-- Add timezone column to apartment_bookings table
ALTER TABLE apartment_bookings ADD COLUMN IF NOT EXISTS timezone TEXT;
ALTER TABLE apartment_bookings ADD COLUMN IF NOT EXISTS timezone_offset INTEGER;