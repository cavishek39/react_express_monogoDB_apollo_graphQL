import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { NavbarComponent } from './components/navbar/navbar.component'
import { Home, About, Contact, Services } from './pages'

const App = () => {
  return (
    <NavbarComponent>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/about' component={About} />
        <Route exact path='/service' component={Services} />
        <Route exact path='/contact' component={Contact} />
        <Redirect to='/' />
      </Switch>
    </NavbarComponent>
  )
}

export default App
