import { Outlet, NavLink } from "react-router-dom";

export default function RootLayout() {
  const storage = localStorage.getItem("currentUser")
  const parsed = JSON.parse(storage)
  const userId = parsed.id
  return (
    <div className="root-layout">
      <header>
        <nav>
          <h1>Welcome</h1>
          <NavLink to={`/home/${userId}`}>Home</NavLink>
          <NavLink to={`/todos/${userId}`}>Todos</NavLink>
          <NavLink to={`/posts/${userId}`}>Posts</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
