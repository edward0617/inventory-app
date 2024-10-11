import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { InventoryProvider } from './context/InventoryContext';
import InventoryView from './components/InventoryView';
import SelectionView from './components/SelectionView';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <InventoryProvider>
          <Router>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100vh'}}>
              <Routes>
                <Route path="/" element={
                  <>
                    <InventoryView />
                    <SelectionView />
                  </>
                } />
              </Routes>
            </div>
          </Router>
      </InventoryProvider>
    </DndProvider >
  )
}

export default App;
