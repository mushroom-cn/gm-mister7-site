import { EventEmitter } from 'events';
import { createContext } from 'react';
export const EventBusContext = createContext<EventEmitter>(null);
