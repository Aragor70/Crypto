import React, { useMemo, useState } from 'react';
import Layout from './components/Layout';
import { AsiderContext } from './context/AsiderContext';
import { LanguageContext } from './context/LanguageContext';
import { XORContext } from './context/XORContext';
import './styles/style.scss';
import { defaultLanguage } from './utils/LanguageConfig';

const App = () => {

  const [ languageCode, setLanguageCode ] = useState(defaultLanguage)
  const [ xor, setXor ] = useState([])
  const [ isHidden, setIsHidden ] = useState<boolean>(false);
  
  const languageValue = useMemo(() => ({ languageCode, setLanguageCode }), [languageCode]);
  const xoreValue = useMemo(() => ({ xor, setXor }), [xor]);
  const asiderValue = useMemo(() => ({ isHidden, setIsHidden }), [isHidden]);
  
  return (
    <LanguageContext.Provider value={languageValue}>
      <XORContext.Provider value={xoreValue}>
        <AsiderContext.Provider value={asiderValue}>
          <Layout />
        </AsiderContext.Provider>
      </XORContext.Provider>
    </LanguageContext.Provider>
  );
}

export default App;
