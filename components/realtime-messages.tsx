import { useEffect, useState } from "react";
import type { Database } from "db_types";
import { useOutletContext } from "@remix-run/react";
import type { OutletContext } from "~/root";

type Message = Database['public']['Tables']['messages']['Row'];


export default function RealtimeMessages({
  serverMessages,
}: {
  serverMessages: Message[];
}) {
  const [messages, setMessages] = useState(serverMessages);
  const { supabase } = useOutletContext<OutletContext>();

  useEffect(() => {
    setMessages(serverMessages);
  }, [serverMessages]);

  useEffect(() => {
    const channel = supabase.channel('*').on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
      const newMessage = payload.new as Message;
      if (!messages.find((message) => message.id === newMessage.id)) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    }).subscribe();

    return () => {
      channel.unsubscribe();
    }
  }, [supabase, messages, setMessages]); 


  return (
    <div>
        <pre>{JSON.stringify(messages, null, 2)}</pre>
    </div>
  );
}
