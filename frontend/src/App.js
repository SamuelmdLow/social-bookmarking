import logo from './logo.svg';
import './App.css';

function App() {

  var topstories = [
    {'id': 0, 'title': 'What is this?'},
    {'id': 1, 'title': 'What is this?'},
    {'id': 2, 'title': 'What is this?'},
    {'id': 3, 'title': 'What is this?'},
  ]

  return (
    <div className="window-container">

    <div className="window">
      <article className="coverstory">
        <h1>{topstories[0].title}</h1>
      </article>
      <div className="topstories">
        <ul>{topstories.slice(1).map(post =>
          <li key={post.id}>{post.title}</li>
        )}</ul>  
      </div>    
    </div>

    </div>
  );
}

export default App;
