import { API, graphqlOperation, Auth } from "aws-amplify"
import React, { Component } from "react"
import { createPost } from "../graphql/mutations"

class CreatePost extends Component {
  state = {
    postOwnerId: "",
    postOwnerUsername: "",
    postTitle: "",
    postBody: "",
  }

  componentDidMount = async () => {
    await Auth.currentUserInfo().then((user) => {
      this.setState({
        postOwnerId: user.attributes.sub,
        postOwnerUsername: user.username,
      })
    })
  }

  handleChangePost = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleAddPost = async (event) => {
    event.preventDefault()

    const input = {
      postOwnerId: this.state.postOwnerId,
      postOwnerUsername: this.state.postOwnerUsername,
      postTitle: this.state.postTitle,
      postBody: this.state.postBody,
      createdAt: new Date().toISOString(),
    }

    await API.graphql(graphqlOperation(createPost, { input }))

    this.setState({ postTitle: "", postBody: "" })
  }

  render() {
    return (
      <form className="add-post" onSubmit={this.handleAddPost}>
        <input
          style={{ font: "19x" }}
          type="text"
          placeholder="Title"
          name="postTitle"
          required
          value={this.state.postTitle}
          onChange={this.handleChangePost}
        />

        <textarea
          type="text"
          name="postBody"
          rows="7"
          cols="40"
          required
          placeholder="New Blog Post"
          vale={this.state.postTitle}
          onChange={this.handleChangePost}
        />

        <input type="submit" className="btn" style={{ fontSize: "19px" }} />
      </form>
    )
  }
}

export default CreatePost
