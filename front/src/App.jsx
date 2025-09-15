import AuthComponent from './components/AuthComponent'
import AppComponent from './components/AppComponent'
import { useState } from 'react'

function App() {
  const [user, setUser] = useState('babka');

  return (
    <>
      {user ? (
        <AppComponent username={user}/>
      ) : (
        <AuthComponent setUser={setUser} />
      )}
    </>
  )
}

export default App