import { Button } from '@material-ui/core';
import React from 'react';
import { Tabulation } from './components/Tabulation/Tabulation';
import { TodoList } from './components/TodoList/TodoList';

function App() {
    return (
        <div className="App">
            <Tabulation />
            <TodoList />
            <Button >Добавить</Button>
        </div>
    );
}

export default App;
