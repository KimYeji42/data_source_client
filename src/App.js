import './App.css';

import AppRouter from "./routes/AppRouter";
import Header from "./Layout/Header/Header";

function App() {
  return (
      <div>
          <Header/>
          <AppRouter/>
          {/*<Normalization/>*/}
      </div>

  );
}

export default App;
