import { Button, Input } from '@material-ui/core';
import { TodoListStore } from 'components/TodoList/TodoListStore';
import { SERVICE_IDENTIFIER } from 'inversify/inversifyTypes';
import { observer } from 'mobx-react';
import React from 'react';
import { useInject } from 'shared/hooks/useInject';

export const TaskCreator = observer(() => {
    const todoStore = useInject<TodoListStore>(SERVICE_IDENTIFIER.TodoListStore);

    const onCreatingBlock = (
        <div>
            <Input onChange={(event) => todoStore.onTypingNewInput(event.target.value)} />
            <div style={{ marginTop: 10 }}>
                <Button onClick={() => todoStore.createNewTask()}>Добавить</Button>
                <Button onClick={() => todoStore.setCreating(false)}>Отменить</Button>
            </div>
        </div>
    );

    return (
        <>
            {!todoStore.onCreating && (
                <Button color="secondary" variant="contained" onClick={() => todoStore.setCreating(true)}>
                    +
                </Button>
            )}

            {todoStore.onCreating && onCreatingBlock}
        </>
    );
});
