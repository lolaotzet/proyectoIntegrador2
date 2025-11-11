import React, { Component } from 'react'
import { db, auth } from '../firebase/config'
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native'

class Register extends Component {
  constructor(props) {
    super(props)
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
        return auth.signOut()
      })
      .then(() => {
        this.props.navigation.navigate('Login');
      })
      .catch(error => console.log(error))
    }
    )
    .catch( error => {
      this.setState({ error: error.message })
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
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    width: '92%',     
    maxWidth: 700,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 16,
    color: '#2f3640',
    textAlign: 'center',
  },
  input: {
    width: '100%',   
    height: 48,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 12,
    fontSize: 16,
    color: '#2f3640',
    backgroundColor: '#f9f9f9',
  },
  registerButton: {
    backgroundColor: '#D81B60',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginVertical: 8,
    width: '100%',    
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#8E24AA',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginVertical: 8,
    width: '100%',     
    alignItems: 'center',
  },
  buttonText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  errorText: { 
    marginTop: 12, 
    marginBottom: 8, 
    color: '#D81B60', 
    textAlign: 'center' 
  }
})

export default Register