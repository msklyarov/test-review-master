// TODO: Move to Container -> Component pattern for testing components separately
import React from 'react';
// TODO: Remove unused import
import logo from '../../logo.svg';
import './App.css';
import MainApp from '../MainApp';
import {
    useSelector,
} from 'react-redux';

function App() {
    // TODO: Use Todo[] type instead of any[]
    const todos = useSelector((state: {list: { todos: any[] }}) => state.list.todos);
  return (
    // TODO: Obvious, meaningless comment, it doesn't clarify anything
    // also it uses Ruglish words (English in Russian letters), even if we allow comments in Russian
    // better to use formal style using English words to specify something
    // Suggest to remove it
      // туду лист для юзеров:
    <div className="App main">
      <header className="App-header">
        TODO list with users:
        {/* TODO: remove tag below if we don't need it */}
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
      </header>
        {/* TODO: Meaninless comment, better to remove */}
        {/* MAIN APP: */}
        {/* TODO: Create ErrorBoundary HOC to process rendering errors via componentDidCatch */}
        <MainApp todos={todos}/>

        {/* TODO: Replace link URL with correct address */}
        <footer className='App-footer'>
              <a
                href="https://example.org"
                target="_blank"
                className={"App-footer-link"}
              >
                {/* TODO: Must be "All rights reserved */}
                All right reserved
              </a>
        </footer>
    </div>
  );
}

export default App;
