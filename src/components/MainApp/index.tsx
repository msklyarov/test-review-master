// TODO: Move to Container -> Component pattern for testing components separately
// TODO: There are no tests at all
import React from 'react';
import { Form } from 'react-bootstrap';
// TODO: add default keyword to InputNewTodo export, we have no reason to export it by name there
import { InputNewTodo } from '../InputNewTodo';
import UserSelect from '../UserSelect';
// TODO: move all external libraries above our modules
import { connect } from 'react-redux';
import styles from './MainApp.module.css';

// TODO: Better to add id for each record in Type and use it as index for map functions
// move Todo type to a separate module types. We need it in several components
type Todo = {
    title: string,
    user?: number,
    isDone: boolean,
}

type MainAppProps = {
    todos: Todo[],
    addTodo: (t: Todo) => void,
    changeTodo: (todos: Todo[]) => void,
    // TODO: removeTodo is missed
}
type MainAppState = {
    todoTitle: string
};

class Index extends React.Component<MainAppProps, MainAppState> {

    // TODO: constructor could be replaced to property initialization:
    // state = { todoTitle: '' }
    constructor(props: MainAppProps) {
        super(props);
        this.state = { todoTitle: '' }
    }
    handleTodoTitle = (todoTitle: string) => {
        this.setState({ todoTitle })
    }

    // TODO: Type: any => Todo
    handleSubmitTodo = (todo: any) => {
        this.props.addTodo(todo)
    }

    render() {
        const { todoTitle } = this.state;

        // TODO: Move this logic to a separate method, must be called on ComponentDidMount and on isDone checkbox update
        // logic must be like that:
        // window.allTodosAreDone = this.props.todos.length > 0 && this.props.todos.every(item => item.isDone)
        window.allTodosIsDone = true;

        this.props.todos.map(t => {
            if (!t.isDone) {
                window.allTodosIsDone = false
            } else {
                window.allTodosIsDone = true
            }
        });

        return (
            <div>
                {/* TODO: There's no processing of onChange event to check all items as done */}
                <Form.Check type="checkbox" label="all todos is done!" checked={window.allTodosIsDone}/>
                <hr />
                {/* TODO: InputNewTodo must encapsulate todoTitle, no reason to have them on this level */}
                <InputNewTodo todoTitle={todoTitle} onChange={this.handleTodoTitle} onSubmit={this.handleSubmitTodo} />
                
                {this.props.todos.map((t, idx) => (
                    {/* TODO: Better move the code below to TodoItem component, which encapsulates UserSelect component */}
                    <div className={styles.todo} >
                        {t.title}
                        <UserSelect user={t.user} idx={idx}/>
                        <Form.Check
                            // TODO: move to .css file
                            style={{ marginTop: -8, marginLeft: 5 }}
                            type="checkbox" checked={t.isDone} onChange={(e) => {
                            // TODO: t is meaningless varriable name use something that matters ie: item
                            // according to recomendation in store/index.tsx:
                            // add action type SET_IS_DONE and setIsDone(index, true/false) action
                            const changedTodos = this.props.todos.map((t, index) => {
                                const res = { ...t }
                                if (index == idx) {
                                    res.isDone = !t.isDone;
                                }
                                return res;

                            })
                            this.props.changeTodo(changedTodos)

                        }}
                        />
                    </div>
                ))}
            </div>
        );
    }
}

export default connect(
    // TODO: replace with null if we don't need it
    (state) => ({}),
    // TODO: Move arrow functions to a separate redux actions file and import them as:
    // addTodo, changeTodo, removeTodo
    // we could change the code below to { addTodo, changeTodo, removeTodo } because
    // connect calls bindActionCreators implicitly
    (dispatch) => ({
        addTodo: (todo: any) => {
            dispatch({type: 'ADD_TODO', payload: todo});
        },
        // TODO: See remark in store/index.ts
        // about new SET_ALL_ARE_DONE action type, therefore this will be:
        // changeTodo => setAllAreDone(true/false) 
        changeTodo: (todos: any) => dispatch({ type: 'CHANGE_TODOS', payload: todos }),
        // TODO: removeTodo is never used. Do we need to add it or remove from the project?
        removeTodo: (index: number) => dispatch({type: 'REMOVE_TODOS', payload: index}),
    })

)(Index);
