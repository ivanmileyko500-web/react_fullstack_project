import AuthComponent from './components/AuthComponent'
import AppComponent from './components/AppComponent'
import { useState } from 'react'

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      {user ? (
        <AppComponent user={user}/>
      ) : (
        <AuthComponent setUser={setUser} />
      )}
    </>
  )
}

export default App