import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://exrlobuxamfvfkfjnmbi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4cmxvYnV4YW1mdmZrZmpubWJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ3NjQ4MDcsImV4cCI6MjAwMDM0MDgwN30.VquST57niSW9K9ZMElIOvCF3loVQQRLbPLJje3sJwd8",
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
    realtime: {},
  }
);

export default supabase;
