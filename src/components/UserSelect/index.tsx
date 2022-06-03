// TODO: Move to Container -> Component pattern for testing components separately
// TODO: There's no tests at all
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './UserSelect.module.css';

type UserSelectProps = {
    user?: number,
    idx: number,
}

function UserSelect(props: UserSelectProps) {
    const dispatch = useDispatch();
    // TODO: Change type: any[] => Todo[]
    const todos = useSelector((state: {list: { todos: any[] }}) => state.list.todos);
    React.useEffect(
        () => {
            // TODO: remove console.log
            console.log('userSelect');

            // TODO: move this function to a separate action with it's own redux state
            // we don't need to make this network call for every Todo component
            fetch('https://jsonplaceholder.typicode.com/users/').then(
                (users) => users.json(),
            ).then(users => setOptions(users))
        },
        [],
    )
    const [options, setOptions] = React.useState([]);

    const { idx } = props;
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        // TODO: t is meaningless name, change to something meaningful
        // t must have Todo type, better use own todo id, not array ids
        const changedTodos = todos.map((t, index) => {
            const res = { ...t }
            if (index == idx) {
                // TODO: remove console.log, here it's always undefined
                console.log('props.user', props.user);
                res.user = e.target.value;
            }
            return res;
        })
        // TODO: case 'CHANGE_TODO': processing is missed
        // move this code to a separate action file
        dispatch({type: 'CHANGE_TODO', payload: changedTodos})
    }

    return (
        <select name="user" className={styles.user} onChange={handleChange}>
            {/* TODO: Add User type to types file, change any => User */}
            {/* There's no check for selected element and there's no selected parameter */}
            {options.map((user: any) => <option value={user.id}>{user.name}</option>)}
        </select>
    );
}

export default UserSelect;
