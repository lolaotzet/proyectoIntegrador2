import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { db } from "../firebase/config";
import Post from "../components/Post";

class Home extends Component {
  constructor(props){
    super(props);
    this.state = { posts: [], loading: true };
  }

  componentDidMount(){
    db.collection("posts")
        .orderBy('createdAt','desc')
        .onSnapshot(
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
          <Text style={styles.title}>Posteos</Text>

          {this.state.loading ? (
            <ActivityIndicator size="large" color="#8E24AA" />
          ) : (
            <FlatList
              data={this.state.posts}
              keyExtractor={(item)=>item.id.toString()}
              renderItem={({item}) =>
                <Post id={item.id} post={item.data} navigation={this.props.navigation}/> 
              }
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f6fa', 
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    width: '92%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
    gap: 12,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#8E24AA', 
    marginBottom: 8,
  },
});

export default Home;
