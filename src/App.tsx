import { Grid } from '@material-ui/core';
import { Bar } from 'components/Charts/BarChart';
import { FileUploader } from 'components/InputFile';
import { Task } from 'components/Task/Task';
import { TodoListStore } from 'components/TodoList/TodoListStore';
import { SERVICE_IDENTIFIER } from 'inversify/inversifyTypes';
import { observer } from 'mobx-react';
import React from 'react';
import { useInject } from 'shared/hooks/useInject';
import { Tabulation } from './components/Tabulation/Tabulation';
import { TodoList } from './components/TodoList/TodoList';


const App = observer(() => {
    const todoStore = useInject<TodoListStore>(SERVICE_IDENTIFIER.TodoListStore);
    
    return (
        <Grid container justify="center" direction="column" alignItems="center">
            <Grid item>
                <Tabulation />
            </Grid>

            <Grid item>
                <TodoList />
            </Grid>

            <Grid item>
                <Task />
            </Grid>

            <Grid item>
                <Bar data={todoStore.historyData} width={500} height={300} />
            </Grid>

            <Grid item>
                <FileUploader />
            </Grid>
        </Grid>
    );
})

export default App;
