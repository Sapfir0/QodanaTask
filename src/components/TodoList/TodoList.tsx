import { ListItemText } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { observer } from 'mobx-react';
import React from 'react';
import { SERVICE_IDENTIFIER } from '../../inversify/inversifyTypes';
import { useInject } from '../../shared/hooks/useInject';
import './TodoList.css';
import { TodoListStore } from './TodoListStore';

export type TodoListProps = {
    // data: TodoData[];
};

export const TodoList = observer((props: TodoListProps) => {
    const todoStore = useInject<TodoListStore>(SERVICE_IDENTIFIER.TodoListStore);

    return (
        <List>
            {todoStore.tabularData.map((el, i) => {
                const isSuccess = el.completed;
                return (
                    <ListItem className={isSuccess ? 'success' : 'new'} key={el.title}>
                        <Checkbox checked={isSuccess} onChange={todoStore.onChangeCheckbox(i)} />
                        <ListItemText primary={el.title} />
                    </ListItem>
                );
            })}
        </List>
    );
});
