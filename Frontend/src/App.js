import React from 'react';
import TextInput from "./component/TextInput";
import ExtractKeywordsEntities from './component/ExtractKeywordsEntities';
import AllRoute from './component/AllRoute/AllRoutes';
import { BrowserRouter } from 'react-router-dom';

function App() {
    return (
      <BrowserRouter>
      <AllRoute />
    </BrowserRouter>
      );
}

export default App;
