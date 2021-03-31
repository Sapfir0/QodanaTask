import { Container } from 'inversify';
import 'reflect-metadata';
import { TodoListStore } from '../components/TodoList/TodoListStore';
import { TabulationStore } from '../components/Tabulation/TabulationStore';
import {IndexedDBHelper} from '../serivces/IndexedDBHelper'

import { SERVICE_IDENTIFIER } from './inversifyTypes';

export const container = new Container();
container.bind(SERVICE_IDENTIFIER.TodoListStore).to(TodoListStore).inSingletonScope();
container.bind(SERVICE_IDENTIFIER.TabulationStore).to(TabulationStore).inSingletonScope();
container.bind(SERVICE_IDENTIFIER.IndexedDBHelper).to(IndexedDBHelper).inSingletonScope();
