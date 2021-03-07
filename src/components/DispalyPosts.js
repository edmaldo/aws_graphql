import React, { Component } from "react"
import { listPosts } from "../graphql/queries"
import { API, graphqlOperation } from "aws-amplify"

class DisplayPosts extends Component {
  state = {
    posts: [],
  }
  componentDidMount = async () => {
    this.getPosts()
  }

  getPosts = async () => {
    const result = await API.graphql(graphqlOperation(listPosts))

    this.setState({ posts: result.data.listPosts.items })
  }

  render() {
    const { posts } = this.state
    return posts.map((post) => {
      return (
        <div className="posts" key={post.id}>
          <h1>{post.postTitle}</h1>
          <span>
            {"Written By: "}
            {post.postOwnerUsername}
            {" on "}
            <time> {new Date(post.createdAt).toDateString()}</time>
          </span>
        </div>
      )
    })
  }
}

export default DisplayPosts
