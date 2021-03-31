import { Grid } from '@material-ui/core';
import { FileUploader } from 'components/InputFile';
// import { Bar } from 'components/Charts/BarChart';
import { Task } from 'components/Task/Task';
import React from 'react';
import { Tabulation } from './components/Tabulation/Tabulation';
import { TodoList } from './components/TodoList/TodoList';

const data = [
    { x: 100, y: 110 },
    { x: 83, y: 43 },
    { x: 92, y: 28 },
    { x: 49, y: 74 },
    { x: 51, y: 10 },
    { x: 25, y: 98 },
    { x: 77, y: 30 },
    { x: 20, y: 83 },
    { x: 11, y: 63 },
    { x:  4, y: 55 },
    { x:  0, y:  0 },
    { x: 85, y: 100 },
    { x: 60, y: 40 },
    { x: 70, y: 80 },
    { x: 10, y: 20 },
    { x: 40, y: 50 },
    { x: 25, y: 31 }
];


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

            <Grid item >
                {/* <Bar
            data={data}
            width={300}
            height={200}
            top={20}
            bottom={30}
            left={30}
            right={0}
            /> */}
            <FileUploader />
            
            </Grid>
            
        </Grid>
    );
}

export default App;
