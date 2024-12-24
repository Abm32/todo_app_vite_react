import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uqpvzaplzefbuovwbidz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxcHZ6YXBsemVmYnVvdndiaWR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUwNjUxNjEsImV4cCI6MjA1MDY0MTE2MX0.b5VRPEy0LfAvPE7rFCZH9kGKEGrfJzRq0t8DMQ5x0qU';

export const supabase = createClient(supabaseUrl, supabaseKey);