import React from "react"
import "./App.css"
import CreatePost from "./components/CreatePost"
import DisplayPosts from "./components/DispalyPosts"

function App() {
  return (
    <div className="App">
      <CreatePost />
      <DisplayPosts />
    </div>
  )
}

export default App
