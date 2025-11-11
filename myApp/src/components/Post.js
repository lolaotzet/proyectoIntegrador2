import React, { Component } from "react"
import { View, Text, StyleSheet, Pressable } from "react-native"
import { db, auth } from "../firebase/config"
import firebase from "firebase"
import { Ionicons } from "@expo/vector-icons"

class Post extends Component {
  constructor(props){
    super(props)
    this.state = { liked: false }
  }

  componentDidMount(){
    this.setState({ liked: this.props.post.likes.includes(auth.currentUser.email) }) // likes viene de la propiedad likes que cree en CrearPost 
  }

  like(){
    db.collection("posts")
      .doc(this.props.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
      })
      .then(() => this.setState({ liked: true }))
  }

  unlike(){
    db.collection("posts")
      .doc(this.props.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
      })
      .then(() => this.setState({ liked: false }))
  }

  handleComentar() {
      this.props.navigation.navigate('Comentarios', { postId: this.props.id })
  }

  render(){
    return (
      <View style={styles.row}>
        <Text style={styles.email}>{this.props.post.email}</Text>
        <Text style={styles.text}>{this.props.post.text}</Text>

          <View style={styles.likeRow}>
            <Pressable
              style={styles.likeButton}
              onPress={() => (this.state.liked ? this.unlike() : this.like())}
            >
          <Ionicons
            name={this.state.liked ? "heart" : "heart-outline"}
            size={20}
            color={this.state.liked ? "#D81B60" : "#979797ff"}
          />
            <Text style={styles.likeCount}>{this.props.post.likes.length}</Text>
            </Pressable>
          </View>
          
          <Pressable onPress={() => this.handleComentar()} style={styles.commentRow}>
            <Ionicons name="chatbubble-ellipses-outline" size={20} color="#979797" />
            <Text style={styles.commentText}>Comentar</Text>
          </Pressable>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  row:{
    backgroundColor:"#fff", 
    borderRadius:10, 
    padding:16,
    borderWidth:1, 
    borderColor:"#e6e6e6", 
    marginBottom:6
  },
  email:{ 
    fontWeight:"700", 
    marginBottom:6 
  },
  text:{ 
    color:"#333", 
    fontSize: 18  
  },
  likeRow:{ 
    flexDirection:"row", 
    alignItems:"center", 
    marginTop:8 
  },
  likeButton:{ 
    flexDirection:"row", 
    alignItems:"center" 
  },
  likeCount:{ 
    marginLeft:6, 
    fontWeight:"600", 
    color:"#333" 
  },
  commentRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 8 
  },
  commentText: { 
    marginLeft: 6, 
    fontWeight: '500', 
    color: '#333' 
  }
})

export default Post