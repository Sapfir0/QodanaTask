import { Container } from 'inversify';
import 'reflect-metadata';
import { HistoryModel } from 'serivces/HistoryModel';
import { TodoListModel } from 'serivces/TodoListModel';
import { TodoListStore } from '../components/TodoList/TodoListStore';
import { SERVICE_IDENTIFIER } from './inversifyTypes';


export const container = new Container();
container.bind(SERVICE_IDENTIFIER.TodoListStore).to(TodoListStore).inSingletonScope();
container.bind(SERVICE_IDENTIFIER.HistoryModel).to(HistoryModel).inSingletonScope();
container.bind(SERVICE_IDENTIFIER.TodoListModel).to(TodoListModel).inSingletonScope();
