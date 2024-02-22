import type { MetaFunction } from '@remix-run/node';
import { json, useLoaderData } from '@remix-run/react';
import supabase from 'utils/supabase';

export const loader = async () => {
  const { data, error } = await supabase.from('messages').select('*');
  if (error) throw error;
  return { data };
};

export const meta: MetaFunction = () => {
  return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }];
};

export default function Index() {
  const { data } = useLoaderData();
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
