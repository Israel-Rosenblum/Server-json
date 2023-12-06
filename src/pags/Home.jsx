export default function Home() {
  const storage = localStorage.getItem("currentUser")
  const parsed = JSON.parse(storage)
  return (
    <div className="home">
      <h2>{`Hello my name is: `}<h2>{parsed.name}</h2></h2>
      <h2>{`I live in `}<h2>{parsed.address.city}</h2></h2>
      <p>Here you can see all the information you have on the server</p>
      <p>Information can be deleted and information can be uploaded</p>
    </div>
  )
}




