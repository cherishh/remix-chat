import { LoaderFunctionArgs, MetaFunction, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import Login from 'components/login';
import createServerSupabase from 'utils/supabase.server';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const response = new Response();
  const supabase = createServerSupabase({
    request,
    response,
  });
  const { data } = await supabase.from('messages').select('*');
  return json({ messages: data }, { headers: response.headers });
};

export const meta: MetaFunction = () => {
  return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }];
};

export default function Index() {
  const { messages } = useLoaderData<typeof loader>();
  return (
    <>
      <Login />
      <pre>{JSON.stringify(messages, null, 2)}</pre>
    </>
  );
}
