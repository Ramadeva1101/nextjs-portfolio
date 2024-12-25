import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import CommentsClient from "./CommentsClient";

export const dynamic = 'force-dynamic';

export default async function Comments() {
  const cookieStore = cookies();
  const supabase = createClient();
  
  const { data: comments } = await supabase
    .from('comments')
    .select('*')
    .order('created_at', { ascending: false });

  return <CommentsClient initialComments={comments || []} />;
}