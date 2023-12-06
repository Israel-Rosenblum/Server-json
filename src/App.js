import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'

// pages
import Home from './pags/Home'
import Todos from "./pags/Todos.1"
import Posts from './pags/Posts'
import Login from './pags/Login'

// layouts
import RootLayout from './Layots/RootLayout'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<Login />} />
      <Route path="/" element={<RootLayout />}>
      <Route path="/home/:id" element={<Home />} />
        <Route path="/todos/:id" element={<Todos />} />
        <Route path="/posts/:id" element={<Posts />} />
      </Route>
    </Route>
  )
)

function App() {
  return (
    
    <RouterProvider router={router} />
  );
}

export default App
