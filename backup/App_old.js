import './App.css';
import TodoApp from './components/TodoApp';
import MyHeader from './components/myHeader';
import TodoWithCheckBox from './components/TodoWithCheckBox';

function App() {
  return (
    <div className="App">
      <MyHeader />
      <TodoApp />
      <hr></hr>
      <TodoWithCheckBox />
    </div>
  );
}

export default App;
