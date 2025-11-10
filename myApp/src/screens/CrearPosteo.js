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
      this.props.navigation.navigate("HomeStack");
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
  page: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f6fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    width: '90%',
    maxWidth: 500,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#8E24AA',
    marginBottom: 15,
    textAlign: 'center', // centrado
  },
  field: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    minHeight: 110,
    textAlignVertical: 'top',
    width: '100%',
    fontSize: 16,
    color: '#2f3640',
  },
  btnOrange: {
    backgroundColor: '#D81B60', // rosa fuerte (coherente con Register/Login)
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  btnTxt: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorBox: {
    backgroundColor: '#F8BBD0', // rosa claro para error
    borderRadius: 10,
    padding: 8,
    marginBottom: 8,
    width: '100%',
    alignItems: 'center',
  },
  error: {
    color: '#D81B60',
    fontWeight: '600',
    textAlign: 'center',
  },
});


export default NuevoPost;