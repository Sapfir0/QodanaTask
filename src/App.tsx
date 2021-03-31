import { Grid } from '@material-ui/core';
import { Bar } from 'components/Charts/BarChart';
import { FileUploader } from 'components/InputFile';
import { Task } from 'components/Task/Task';
import React from 'react';
import { getChartData } from 'serivces/DateHelper';
import { Tabulation } from './components/Tabulation/Tabulation';
import { TodoList } from './components/TodoList/TodoList';

const data = getChartData()


function App() {
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
                <Bar data={data} width={500} height={300} />
            </Grid>

            <Grid item>
                <FileUploader />
            </Grid>
        </Grid>
    );
}

export default App;
