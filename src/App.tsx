import { Grid } from '@material-ui/core';
import { Bar } from 'components/Charts/BarChart';
import { FileUploader } from 'components/InputFile';
import { Tabulation } from 'components/Tabulation/Tabulation';
import { TaskCreator } from 'components/Task/Task';
import { TodoListStore } from 'components/TodoList/TodoListStore';
import { SERVICE_IDENTIFIER } from 'inversify/inversifyTypes';
import { observer } from 'mobx-react';
import React from 'react';
import { useInject } from 'shared/hooks/useInject';
import { TodoList } from './components/TodoList/TodoList';
import { Tabulation as ETabulation } from './typings/index';
import Typography from '@material-ui/core/Typography';

const App = observer(() => {
    const todoStore = useInject<TodoListStore>(SERVICE_IDENTIFIER.TodoListStore);

    return (
        <Grid
            container
            justify="center"
            direction="column"
            alignItems="center"
            style={{ maxWidth: 1000, marginLeft: 'auto', marginRight: 'auto' }}
        >
            <Grid item>
                <Tabulation />
            </Grid>

            <Grid item>
                <TodoList />
            </Grid>

            <Grid item>
                <TaskCreator />
            </Grid>

            {todoStore.currentTab === ETabulation.Completed && (
                <Grid item>
                    <Bar data={todoStore.historyData} width={500} height={300} />
                </Grid>
            )}

            <Grid item style={{ marginTop: 40 }}>
                <Typography variant="h5" component="h5">
                    Для обновления задач из файла, загрузите его (все существующие задачи удалятся){' '}
                </Typography>
                <FileUploader />
            </Grid>
        </Grid>
    );
});

export default App;
