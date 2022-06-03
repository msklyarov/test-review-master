import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
    reducer: {
        // TODO: set type of state
        // state: { todos: Todo[] } = { todos: [] }
        // set type of action to allow control of types by TypeScript
        list: (state = {todos: []}, action) => {
            switch (action.type) {
                // TODO: better to move all action type definitions to a separate constant file
                case 'ADD_TODO': {
                    // TODO: state mutation, reducer must be a pure function w/o side effects
                    // should be something like that:
                    // return { todos: [...state.todos, action.payload] };
                    const newState = state;
                    newState.todos.push(action.payload);
                    return newState;
                }

                // TODO: case 'CHANGE_TODO': processing is missed

                case 'REMOVE_TODO': {
                    return {
                        ...state,
                        // TODO: t: any => t: Todo, move type to a separate file
                        // It's not a good idea to use array index for such processing
                        // Better to add id inside Todo type
                        todos: state.todos.filter((t: any, index: number) => index !== action.payload),
                    };
                }

                // TODO: There's no reason to replace the whole state if we just need to enable/disable
                // isDone flag for one element. To have SET_IS_DONE action type to enable/disable todo flag
                // is better for this.
                case 'CHANGE_TODOS': {
                    return {
                        todos: action.payload,
                    };
                }
                default:
                    return state;
            }
        }
    }

    // TODO: disable devTools support for production
    // devTools: process.env.NODE_ENV !== 'production',
})
