import { copilotApi } from 'copilot-node-sdk';
import { need } from '@/utils/need';
import { TokenGate } from '@/components/TokenGate';
import Dashboard from '@/components/Dashboard'

const API_KEY = need<string>(process.env.COPILOT_API_KEY);

/**
 * A helper function that instantiates the Copilot SDK and fetches data
 * from the Copilot API based on the contents of the token that gets
 * passed to your app in the searchParams.
 */
async function getContent(searchParams: SearchParams) {
  const copilot = copilotApi({
    apiKey: API_KEY,
    token:
      'token' in searchParams && typeof searchParams.token === 'string'
        ? searchParams.token
        : undefined,
  });
  const data: {
    workspace: Awaited<ReturnType<typeof copilot.retrieveWorkspace>>;
    client?: Awaited<ReturnType<typeof copilot.retrieveClient>>;
    company?: Awaited<ReturnType<typeof copilot.retrieveCompany>>;
    internalUser?: Awaited<ReturnType<typeof copilot.retrieveInternalUser>>;
    allClients: Awaited<ReturnType<typeof copilot.listClients>>;
  } = {
    workspace: await copilot.retrieveWorkspace(),
    allClients: await copilot.listClients({
      limit: 100
    })
  };
  const tokenPayload = await copilot.getTokenPayload?.();

  if (tokenPayload?.clientId) {
    data.client = await copilot.retrieveClient({ id: tokenPayload.clientId });
  }
  if (tokenPayload?.companyId) {
    data.company = await copilot.retrieveCompany({
      id: tokenPayload.companyId,
    });
  }
  if (tokenPayload?.internalUserId) {
    data.internalUser = await copilot.retrieveInternalUser({
      id: tokenPayload.internalUserId,
    });
  }

  return data;
}


async function Content({ searchParams }: { searchParams: SearchParams }) {
  const data = await getContent(searchParams);
  const allClients = data.allClients.data
  // console.log(typeof(allClients.data))
  // Console log the data to see what's available
  // You can see these logs in the terminal where
  // you run `yarn dev`
  // console.log({ data });
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Internal Page&nbsp;
          {data.internalUser && (
            <code className="font-mono font-bold">
              — Logged in as {data.internalUser.givenName}{' '}
              {data.internalUser.familyName}
            </code>
          )}
        </p>
      </div>
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
      <Dashboard clients={allClients} />
    </div>
    </main>
  );
}

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  return (
    <TokenGate searchParams={searchParams}>
      <Content searchParams={searchParams} />
    </TokenGate>
  );
}
