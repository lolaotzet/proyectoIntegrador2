import React, { Component } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { db, auth } from "../firebase/config";

class NuevoPost extends Component {
  constructor(props){
    super(props);
    this.state = { text: "", error: "", loading: true };
  }

  onSubmit(){
    if(this.state.text.length === 0){
      this.setState({ error: "El mensaje no puede estar vacío" });
      return;
    }

    db.collection("posts").add({
      text: this.state.text,
      email: auth.currentUser.email,
      likes: [],
      createdAt: Date.now()
    })
    .then(response => {
      this.setState({ text: "", error: "", loading: false });
      this.props.navigation.navigate("Home");
    })
    .catch(error => this.setState({ error: "No se pudo crear el post" }));
  }

  render(){
    return (
      <View style={styles.page}>
        <View style={styles.card}>
          <Text style={styles.title}>Nuevo post</Text>
          {this.state.error ? <View style={styles.errorBox}><Text>{this.state.error}</Text></View> : null}

          <TextInput
            style={styles.field}
            placeholder="Escribí tu mensaje…"
            value={this.state.text}
            onChangeText={(t)=>this.setState({ text: t })}
          />

          <Pressable style={styles.btnOrange} onPress={()=>this.onSubmit()}>
            <Text style={styles.btnTxt}>Publicar</Text>
          </Pressable>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page:{ flex:1, padding:16, backgroundColor:"#fff" },
  card:{ backgroundColor:"#f2f2f2", borderRadius:12, padding:16, gap:12 },
  title:{ fontSize:30, fontWeight:"800" },
  field:{
    backgroundColor:"#fff", borderRadius:10, paddingHorizontal:12, paddingVertical:10,
    borderWidth:1, borderColor:"#ddd", minHeight:110, textAlignVertical:"top"
  },
  
  btnOrange:{ paddingVertical:12, borderRadius:10, alignItems:"center", backgroundColor:"#f4a62a" },
  btnTxt:{ color:"#000", fontWeight:"600" },
  error:{ color:"#b00020", fontWeight:"700" }
});

export default NuevoPost;