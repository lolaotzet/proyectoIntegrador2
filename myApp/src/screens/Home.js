import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { db } from "../firebase/config";
import Post from "../components/Post";

class Home extends Component {
  constructor(props){
    super(props);
    this.state = { posts: [], loading: true };
  }

  componentDidMount(){
    db.collection("posts").onSnapshot(
      docs => {
        let posts = [];
        docs.forEach(doc => {
          posts.push({ 
            id: doc.id, 
            data: doc.data() 
          })
        });
      this.setState({ 
        posts: posts,
        loading: false 
      });
    });
  }

  

  render() {
    return (
      <View style={styles.page}>
        <View style={styles.card}>
          <Text style={styles.title}>Home</Text>

          <FlatList
            data={this.state.posts}
            keyExtractor={(item)=>item.id.toString()}
            renderItem={({item}) =>
              <Post id={item.id} post={item.data} navigation={this.props.navigation}/> // a Post le llega una prop post que contiene el objeto id, text, email y createdAt
            }
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page:{ flex:1, padding:16, backgroundColor:"#fff" },
  card:{ backgroundColor:"#f2f2f2", borderRadius:12, padding:16, gap:12 },
  title:{ fontSize:30, fontWeight:"800" }
});

export default Home;
