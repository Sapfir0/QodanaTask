import { SERVICE_IDENTIFIER } from 'inversify/inversifyTypes';
import React, { ChangeEvent } from 'react';
import { useInject } from 'shared/hooks/useInject';
import { TodoListStore } from './TodoList/TodoListStore';

export type FileUploaderProps = {};

export const FileUploader = (props: FileUploaderProps) => {
    const todoStore = useInject<TodoListStore>(SERVICE_IDENTIFIER.TodoListStore);

    const handleFileInput = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length !== 0) {
            const file = event.target.files[0];

            const reader = new FileReader();
            reader.addEventListener('load', (event) => {
                if (!event.target || !event.target.result) {
                    return false;
                }
                const data = JSON.parse(event.target.result as string);
                todoStore.loadFile(data);
            });
            reader.readAsText(file);
        }
    };
    return (
        <div style={{ marginTop: 50 }}>
            <input type="file" onChange={handleFileInput} />
        </div>
    );
};
