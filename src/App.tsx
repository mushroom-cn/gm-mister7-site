import { EventBusContext } from '@common/global';
import EventEmitter from 'events';
import { memo, useMemo } from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import { Layout } from './Layout';
import './common';
import './i18n';
import './plugins';
import './styles/App.css';

const App = memo(() => {
  const eventBus = useMemo(() => new EventEmitter(), []);
  return (
    <BrowserRouter>
      <EventBusContext.Provider value={eventBus}>
        <Layout />
      </EventBusContext.Provider>
    </BrowserRouter>
  );
});
App.displayName = 'App';
export default App;
