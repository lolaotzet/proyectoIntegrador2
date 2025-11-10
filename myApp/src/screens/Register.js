import React, { Component } from 'react';
import { db, auth } from '../firebase/config';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      email: '',
      password: '',  
      error: ""
    };
  } 

    componentDidMount(){
      auth.onAuthStateChanged(user => {
          if(user){
              this.props.navigation.navigate('HomeMenu')
          }
        })
    }

  onSubmit() {
    if (!this.state.email || !this.state.password || !this.state.userName) {
      this.setState({ error: 'Completá todos los campos' })
      return
    }

   auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
   .then( response => {
      db.collection('users').add({
          email: this.state.email,
          nombreUsuario: this.state.userName,
          createdAt: Date.now()
      })
      .then(() => {
        // cerramos sesión para que no quede logueado automáticamente
        return auth.signOut();
      })
      .then(() => {
        this.props.navigation.navigate('Login');
      })
      .catch(error => console.log(error))
    }
    )
    .catch( error => {
      this.setState({error:"fallo en el registro"})
    })
  }

  render() {  
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Registro</Text>

          <TextInput
            style={styles.input}
            placeholder="Nombre de usuario"
            onChangeText={text => this.setState({ userName: text })}
            value={this.state.userName}
          />

          <TextInput
            style={styles.input}
            keyboardType="email-address"
            placeholder="Email"
            onChangeText={text => this.setState({ email: text })}
            value={this.state.email}
          />

          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry={true}
            onChangeText={text => this.setState({ password: text })}
            value={this.state.password}
          />

          <Text style={styles.errorText}>{this.state.error}</Text>

          <Pressable style={styles.registerButton} onPress={() => this.onSubmit()}>
            <Text style={styles.buttonText}>Registrarme</Text>
          </Pressable>
        
          <Pressable
            style={styles.backButton}
            onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Ya tengo cuenta</Text>
          </Pressable>
          
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: '50%',
    padding: 25,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2f3640',
  },
  input: {
    width: '90%',
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
    color: '#2f3640',
    backgroundColor: '#f9f9f9',
  },
  registerButton: {
    backgroundColor: '#D81B60', // rosa fuerte
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 8,
    width: '90%',
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#8E24AA', // lila/violeta
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 8,
    width: '90%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Register;