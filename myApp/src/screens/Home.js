import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { db, auth } from "../firebase/config";
import Post from "../components/Post";

class Home extends Component {
  constructor(props){
    super(props);
    this.state = { posts: [], loading: true };
  }

  componentDidMount(){

    auth.onAuthStateChanged(user => {
          if(!user){
            this.props.navigation.navigate('Login')
          }
        })

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
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false} // opcional: quita la barra de scroll
            />
          )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    padding: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#8E24AA', // lila consistente con el resto
    marginBottom: 12,
    marginTop: 10,
    paddingHorizontal: 8,
  },
  listContent: {
    paddingBottom: 100, // espacio extra al final para evitar que el último post quede tapado
  },
});

export default Home;
