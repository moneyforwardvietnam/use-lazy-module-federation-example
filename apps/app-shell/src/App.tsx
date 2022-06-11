import { Suspense, useState } from "react";
import { useLazyModuleFederation } from "use-lazy-module-federation";

type remoteModuleProps = {
  module?: string
  scope?: string
  url?: string
}

type AppProps = {
  title?: string
}

function App() {
  const [{ module, scope, url }, setSystem] = useState<remoteModuleProps>({});

  function setApp2() {
    setSystem({
      url: 'http://localhost:3002/remoteEntry.js',
      scope: 'app2',
      module: './Widget',
    });
  }

  function setApp3() {
    setSystem({
      url: 'http://localhost:3003/remoteEntry.js',
      scope: 'app3',
      module: './Widget',
    });
  }

  const { Component: FederatedComponent, errorLoading } = useLazyModuleFederation<AppProps>({url, scope, module});

  return (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      }}
    >
      <h1>Dynamic System Host</h1>
      <h2>App 1</h2>
      <p>
        The Dynamic System will take advantage Module Federation <strong>remotes</strong> and{' '}
        <strong>exposes</strong>. It will no load components that have been loaded already.
      </p>
      <button onClick={setApp2}>Load App 2 Widget</button>
      <button onClick={setApp3}>Load App 3 Widget</button>
      <div style={{ marginTop: '2em' }}>
        <Suspense fallback="Loading System">
          {errorLoading
            ? `Error loading module "${module}"`
            : FederatedComponent && <FederatedComponent title="hello" />}
        </Suspense>
      </div>
    </div>
  );
}

export default App;
