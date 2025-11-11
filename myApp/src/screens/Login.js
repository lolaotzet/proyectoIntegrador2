import React, { Component } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native'
import { auth } from '../firebase/config'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      error:""
    }
  }
  componentDidMount(){
    auth.onAuthStateChanged(user => {
        if(user){
            this.props.navigation.navigate('HomeMenu')
        }
      })
  }

  onSubmit() {
    if(!this.state.email.includes("@")){
       this.setState({error:"Email mal formateado"})
       return
    }
    if(this.state.password.length<6){
      this.setState({error:"La password debe tener una longitud mínima de 6 caracteres"})
      return
    }

    auth.signInWithEmailAndPassword(this.state.email, this.state.password)
       .then(
        response => {
          this.setState({ error: ''})
        }
       )
       .catch(
        error => {
          this.setState({error:"Credenciales inválidas"})
        }
       )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Formulario de Login</Text>

          <TextInput
            style={styles.input}
            keyboardType="email-address"
            placeholder="Email"
            onChangeText={text => this.setState({ email: text })}
            value={this.state.email}
          />

          <TextInput
            style={styles.input}
            keyboardType="default"
            placeholder="Contraseña"
            secureTextEntry={true}
            onChangeText={text => this.setState({ password: text })}
            value={this.state.password}
          />
          <Text style={styles.errorText}>{this.state.error}</Text>
          <Pressable style={styles.loginButton} onPress={() => this.onSubmit()}>
            <Text style={styles.loginText}>Log in</Text>
          </Pressable>

          <Pressable
            style={styles.buttonR}
            onPress={() => this.props.navigation.navigate('Register')}>
            <Text style={styles.buttonText}>Ir a registro</Text>
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
  loginButton: {
    backgroundColor: '#D81B60',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginTop: 12,
    marginBottom: 10,
    width: '100%',    
    alignItems: 'center',
  },
  loginText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  buttonR: {
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
    fontWeight: '500',
    textAlign: 'center',
  }
})

export default Login
