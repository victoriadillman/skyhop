import { set } from 'react-hook-form';
import Popup from './components/Popup';
import { useState } from 'react';

const App = () => {
  const [isOpen, setIsOpen ] = useState(true)
  return (
    <div className='mainContainer'>
      {isOpen ? 
        <Popup setIsOpen={setIsOpen} /> : 
        <button className='import-button' onClick={() => setIsOpen(true)}>Click to Upload Document</button>
      }
    </div>
  )
};

export default App;