-- Enable realtime for apartment_bookings and contact_submissions
ALTER TABLE apartment_bookings REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE apartment_bookings;

ALTER TABLE contact_submissions REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE contact_submissions;