import React, { useState, useEffect } from "react";

const Posts = () => {
  const [postsList, setPostsList] = useState([]);
  const [buttonList, setButtonList] = useState(false);
  const [searchInput, setSearchInput] = useState(false);
  const [inputNumber, setInputNumber] = useState(0);
  const [selectedPost, setSelectedPost] = useState([]);
  const [inputPost, setInputPost] = useState("");
  const [addPost, setAddPost] = useState(false);

  const storage = localStorage.getItem("currentUser")
  const parsed = JSON.parse(storage)
  const userId = parsed.id

  const getPosts = () => {
    fetch(`http://localhost:4000/posts?userId=${userId}`)
      .then((res) => res.json()).then((data) => setPostsList(data))
  }
  useEffect(() => {
    getPosts();
  }, []);
// show all posts
  const showPosts = () => {
    setButtonList(!buttonList);
    setSearchInput(false);
  }
  //show buttons
  const showButtons = () => {
    setSearchInput(!searchInput)
    setButtonList(false)
  }
  //search by id
  function searchPostId() {
    const newPostsList = postsList;
    const map = newPostsList.filter((post) => post.id == inputNumber);
    if (inputNumber <= postsList.length && inputNumber > 0)  setSelectedPost(map[0])
    else  alert("post not found")
  }
// to change title
  const changeContent =  (id) => {
    const newpPostsList = postsList.map((post) =>
      post.id === id ? { ...post, title: inputPost } : post);
    setPostsList(newpPostsList);
    fetch(`http://localhost:4000/posts/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ title: inputPost }),
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json());
  };
  return (
    <div>
       <h1>{parsed.name}</h1>
      <button onClick={showPosts}  >All Posts</button>
      <button onClick={showButtons}>Search by Id</button>
      {postsList && buttonList && postsList.length > 0 && (
        postsList.map((post) => (
          <h3 key={post.id}>
            <details>
              <summary>{post.id}{" : "}{post.title}<span onClick={() =>setAddPost(true)}>✏️</span></summary>
              {addPost && <h1><input type="text" placeholder="Enter your post" className="input"
                onChange={(event) => setInputPost(event.target.value)} ></input>
                <button onClick={()=>changeContent(post.id)}>Change</button></h1>}
              <p >{post.body}</p>
            </details></h3>)))}
      {searchInput && <div> <input type="number" className="post"
        onChange={(event) => setInputNumber(event.target.value)} />
        <button onClick={searchPostId}>search</button>
        <h1>{selectedPost.id}{"    "}{selectedPost.title}</h1>
        <h3>{selectedPost.body}</h3></div>}
    </div>
  );
}

export default Posts;
