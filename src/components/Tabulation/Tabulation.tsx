import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { TodoListStore } from 'components/TodoList/TodoListStore';
import { observer } from 'mobx-react';
import { SERVICE_IDENTIFIER } from '../../inversify/inversifyTypes';
import { useInject } from '../../shared/hooks/useInject';
import { TabulationStore } from './TabulationStore';

export const Tabulation = observer(() => {
    const tabStore = useInject<TodoListStore>(SERVICE_IDENTIFIER.TodoListStore)
    return (
        <Tabs value={tabStore.currentTab} onChange={(event, tabNumber) => tabStore.onTabChange(tabNumber)} >
            <Tab label="Все" />
            <Tab label="Новые" />
            <Tab label="Выполненные" />
        </Tabs>
    );
});
