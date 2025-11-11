import React, { Component } from "react";
import { View, Text, Pressable, StyleSheet, FlatList, ActivityIndicator} from "react-native"
import { auth, db } from "../firebase/config"

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = { posts: [], nombreUsuario: "", loading: true }
  }

  componentDidMount() {
    
    if (auth.currentUser) {
      db.collection("posts").where("email", "==", auth.currentUser.email).onSnapshot((doc) => {
        let posts = []
        doc.forEach((doc) => {
          posts.push({ id: doc.id, data: doc.data() })
        })
        this.setState({
          posts: posts,
        })
      })

      db.collection("users").where("email", "==", auth.currentUser.email).onSnapshot((doc) => {
        let nombre = ""
        doc.forEach((doc) => {
          nombre = doc.data().nombreUsuario
        });
        this.setState({ nombreUsuario: nombre, loading: false})
      });
    }
  }

  logout() {
    this.props.navigation.navigate("Login")
    auth.signOut()
  }

  render() {
    return (
      this.state.loading  ? (
              <ActivityIndicator size="large" color="#8E24AA" />
            ) : (
              <View style={styles.page}>
        <View style={styles.card}>
          <Text style={styles.title}>Mi Perfil</Text>
          <Text style={styles.infoText}>
            <Text style={styles.infoLabel}>Usuario:</Text> {this.state.nombreUsuario}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.infoLabel}>Email:</Text> {auth.currentUser.email}
          </Text>
          <Text style={styles.subtitle}>Mis posteos</Text>

          {this.state.posts.length === 0 ? (
            <Text>Aún no se han realizado posteos.</Text>
          ) : (
            <View style={styles.scroll}>
                <FlatList
                  data={this.state.posts}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                      <View style={styles.postCard}>
                        <Text style={styles.postHeader}>
                        {item.data.email} posteó
                        </Text>
                        <Text>{item.data.text}</Text>
                      </View>
                  )}
                  />
            </View>
          )}
          
          <Pressable style={styles.btnOrange} onPress={() => this.logout()}>
            <Text style={styles.btnTxt}>Cerrar Sesión</Text>
          </Pressable>
        </View>
      </View>
      ))}
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  card: {
    backgroundColor: "#f2f2f2",
    borderRadius: 16,
    padding: 20,
    gap: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#333",
    marginBottom: 10,
    color: "#8E24AA",
  },
  postCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#ddd",
    padding: 14,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  postHeader: {
    fontSize: 13,
    color: "#555",
    marginBottom: 6,
    fontStyle: "italic",
  },
  postText: {
    fontSize: 16,
    color: "#222",
  },
  btnOrange: {
    marginTop: 10,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#D81B60", 
  },
  btnTxt: {
    color: "white",
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#8E24AA",
    marginTop: 10,
  },
infoBox: {
  backgroundColor: "#fff",
  borderRadius: 12,
  padding: 12,
  borderWidth: 1,
  borderColor: "#ddd",
  marginBottom: 10,
  shadowColor: "#000",
  shadowOpacity: 0.05,
  shadowRadius: 2,
  elevation: 1,
},
infoText: {
  fontSize: 16,
  color: "#333",
  marginVertical: 3,
},
infoLabel: {
  fontWeight: "700",
  color: "#D81B60",
},
scroll:{
  flex:1,
  maxHeight: 300
}
})

export default Profile