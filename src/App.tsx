import { Grid } from '@material-ui/core';
import { Task } from 'components/Task/Task';
import React from 'react';
import { Tabulation } from './components/Tabulation/Tabulation';
import { TodoList } from './components/TodoList/TodoList';

function App() {
    return (
        <Grid container justify="center"   direction="column"   alignItems="center">
            <Grid item >
                <Tabulation />
            </Grid>

            <Grid item >
                <TodoList />
            </Grid>

            <Grid item >
                <Task />
            </Grid>
        </Grid>
    );
}

export default App;
