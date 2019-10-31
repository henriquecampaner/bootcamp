import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/Main';
import Repository from './pages/Repository';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        {/* utilizar o "exact" para indicar o caminho exato para nao haver conflito */}
        <Route path="/repository/:repository" component={Repository} />
      </Switch>
    </BrowserRouter>
  );
}

// Switch = garante que apenas uma tela seja mostrada
// Route = Da a instrucao para qual "/rota" e de qual component
