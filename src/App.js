import './App.css';
import {ProviderRpcClient} from 'everscale-inpage-provider';
import { EverscaleStandaloneClient } from 'everscale-standalone-client';

import {useCallback, useState} from "react";

function App() {
  const [boc, setBoc] = useState('');
  let encodeData = useCallback(async () => {
    const provider = new ProviderRpcClient({
      fallback: () =>
        EverscaleStandaloneClient.create({}),
      forceUseFallback: true,
    })
    const data = await provider.packIntoCell({
      data: {
        value: '100'
      },
      structure: [
        {name: 'value', type: 'uint256'}
      ],
    });
    setBoc(data.boc);
  }, [])

  return (
    <div className="App">
      <button onClick={encodeData} style={{marginTop: '20px'}}>
        Encode payload
      </button>
      <p>
        {boc}
      </p>
    </div>
  );
}

export default App;
