// TODO: There are no tests at all
import React from 'react';
import styles from './InputNewTodo.module.css'

type InputNewTodoProps = {
    todoTitle: string,
    onChange: (todoTitle: string) => void,
    // TODO: Change type any => Todo, import types file with it
    onSubmit: (todo: any) => void,

}
type InputNewTodoState = {
    value: string
}

// TODO: change React.Component to React.PureComponent
export class InputNewTodo extends React.Component<InputNewTodoProps, InputNewTodoState> {
    // TODO: remove unused parameters
    // we do not need this processing 'cause we don't heed to have a copy of this value outside this component
    componentDidUpdate(prevProps: Readonly<InputNewTodoProps>, prevState: Readonly<InputNewTodoState>, snapshot?: any) {
        if (this.props.todoTitle !== prevProps.todoTitle) {
            this.setState({value: this.props.todoTitle})
        }
    }

    // TODO: React.createRef() is more convenient for such processing with <input ref=...
    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onChange(e.target.value);
    }

    // TODO: could be done via hidden input button and onFormSubmit event handler within form tag
    handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.keyCode !== 13) {
            return;
        }

        event.preventDefault();

        var val = this.state.value.trim();

        if (val) {
            this.props.onSubmit({
                title: this.state.value,
                isDone: false,
            });
            this.props.onChange('');
        }
    }

    render() {
        return (
            <input
                // TODO: Better to rename selector to .newTodo and call it like: styles.newTodo
                className={styles['new-todo']}
                type="text"
                value={this.props.todoTitle}
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown}
                placeholder="What needs to be done?"
            />
        );
    }
}
