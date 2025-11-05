import React, { Component } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { db, auth } from "../firebase/config";
import firebase from "firebase";

class Post extends Component {
  constructor(props){
    super(props);
    this.state = { liked: false }
  }

  componentDidMount(){
    const likes = this.props.post.likes // viene de la propiedad likes que cree en NuevoPost 
    const me = auth.currentUser.email
    this.setState({ liked: likes.includes(me) }) 
  }

  like(){
    const me = auth.currentUser.email
    db.collection("posts")
      .doc(this.props.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(me)
      })
      .then(() => this.setState({ liked: true }))
  }

  unlike(){
    const me = auth.currentUser.email
    db.collection("posts")
      .doc(this.props.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(me)
      })
      .then(() => this.setState({ liked: false }));
  }

    handleComentar() {
        this.props.navigation.navigate('Comentarios', { postId: this.props.id });
    };


  render(){
    const likes = this.props.post.likes || [];
    const count = likes.length;
    return (
      <View style={styles.row}>
        <Text style={styles.email}>{this.props.post.email}</Text>
        <Text style={styles.text}>{this.props.post.text}</Text>

        <View>
          <Text>❤️ {count}</Text>

          {this.state.liked
            ? (
              <Pressable onPress={()=>this.unlike()}>
                <Text>Quitar like</Text>
              </Pressable>
            ) : (
              <Pressable onPress={()=>this.like()}>
                <Text>Like</Text>
              </Pressable>
            )
          }
        </View>
        <Pressable onPress={()=>this.handleComentar()} style={styles.btnSecondary}>
            <Text style={styles.btnText}>💬 Comentar</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row:{
    backgroundColor:"#fff", borderRadius:10, padding:16,
    borderWidth:1, borderColor:"#e6e6e6", marginVertical:8
  },
  email:{ fontWeight:"700", marginBottom:6 },
  text:{ color:"#333", lineHeight:20 }
});

export default Post