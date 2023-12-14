import { createContext, ReactNode, useContext, useEffect, useState } from 'react';




const HistoricoContext = createContext();

export function HistoricoProvider({ children }) {

  const [historico, setHistorico] = useState(null)

  function handleHistorico(novoHistorico){
    
    setHistorico(novoHistorico)
    
  }

    
  return (
    <HistoricoContext.Provider
      value={{ historico, handleHistorico }}
    >
      {children}
    </HistoricoContext.Provider>
  );
}

export function useHistorico() {
  const context = useContext(HistoricoContext);

  return context;
}
