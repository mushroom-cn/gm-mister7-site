import { EventBusContext } from '@common/global';
import EventEmitter from 'events';
import { memo, useMemo } from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import { DesktopLayout, MobelLayout } from './Layout';
import './common';
import './i18n';
import './plugins';
import './styles/App.css';
import { BrowserView, MobileView } from 'react-device-detect';

const App = memo(() => {
  const eventBus = useMemo(() => new EventEmitter(), []);
  return (
    <BrowserRouter>
      <EventBusContext.Provider value={eventBus}>
        <BrowserView style={{ width: '100%', height: '100%' }}>
          <DesktopLayout />
        </BrowserView>
        <MobileView style={{ width: '100%', height: '100%' }}>
          <MobelLayout />
        </MobileView>
      </EventBusContext.Provider>
    </BrowserRouter>
  );
});
App.displayName = 'App';
export default App;
