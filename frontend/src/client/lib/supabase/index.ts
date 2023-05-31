import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://exrlobuxamfvfkfjnmbi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4cmxvYnV4YW1mdmZrZmpubWJpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NDc2NDgwNywiZXhwIjoyMDAwMzQwODA3fQ.fXmR0fPq5gND4nr-kRaHfXU9vdyOnF8gUMjM7TBvY8M",
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
    realtime: {},
  }
);

export default supabase;
