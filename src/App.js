import './App.css';

import AppRouter from "./routes/AppRouter";
import Header from "./Layout/Header/Header";
import {useEffect} from "react";

function App() {
    useEffect(() => {
        document.title = 'NoDBService';
    }, []);

  return (
      <div>
          <Header/>
          <AppRouter/>
      </div>

  );
}

export default App;
