import { useOutletContext } from "@remix-run/react";
import type { OutletContext } from "~/root";

export default function Login() {
  const { supabase } = useOutletContext<OutletContext>();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github'
    })

    if (error) {
      console.log(error);
    }
  }
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log(error);
    }
  }

  return (
    <>
      <button onClick={handleLogout}>logout</button>
      <button onClick={handleLogin}>login</button>
    </>
  )
}