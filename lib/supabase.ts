import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mwntbmfrzjtkyzalpdl.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13bnRibWZyemp0a3lkemFscGRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUwNTExMzEsImV4cCI6MjA1MDYyNzEzMX0.-Winq9Xer2im_ikjQlVF-H9pFhPmOj1dCXKqoVqEAhk'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export { supabase }