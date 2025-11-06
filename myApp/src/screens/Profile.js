import React, { Component } from "react";
import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";
import { auth, db } from "../firebase/config";

class Profile extends Component {
  constructor(props){
    super(props);
    this.state = { posts: [], nombreUsuario: "" };
  }
  componentDidMount(){
    const user = auth.currentUser
    if(user){
      db.collection("posts").where("email","==",user.email).onSnapshot(
        doc => {
          let posts = [];
          doc.forEach(doc => {
            posts.push({id:doc.id,data:doc.data()})
          });
          this.setState({
            posts:posts
          })
        }
      )
      db.collection("users").where("email","==",user.email).onSnapshot(
        doc => {
          let nombre = ""
          doc.forEach(doc => {
            nombre = doc.data().nombreUsuario;
          });
          this.setState({ nombreUsuario: nombre });
        }
      )
    }
  }
    logout(){
        this.props.navigation.navigate("Login");
        auth.signOut()
    }
   
  render() {
    const user = auth.currentUser;
    return (
      <View style={styles.page}>
        <View style={styles.card}>
        <Text style={styles.title}>Mi Perfil</Text>
        <Text>Usuario:{this.state.nombreUsuario}</Text>
        <Text>Email:{user.email}</Text>
        <Text>Mis posteos</Text>
        <FlatList
        data={this.state.posts}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <Text>{item.data.text} </Text>}>
        </FlatList>
        <Pressable style={styles.btnOrange} onPress={() => this.logout()}> 
          <Text style={styles.btnTxt}>Cerrar Sesión</Text>
        </Pressable>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: { flex: 1, padding: 16, backgroundColor: "#fff" },
  card: {
    backgroundColor: "#f2f2f2",
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  title: { fontSize: 30, fontWeight: "800" },
  p: { color: "#333", lineHeight: 20 },
  btnBlue: { 
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center", 
    backgroundColor: "#77b3e1" },
  btnOrange: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center", 
    backgroundColor: "#f4a62a" },
  btnTxt: { color: "#000", fontWeight: "600" }
});

export default Profile

