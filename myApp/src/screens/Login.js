import React, { Component } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import { auth } from '../firebase/config';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      userName: '',
      password: '',
      login: false,
      error:""
    };
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
          this.setState({ login: true})
        }
       )
       .catch(
        error => {
          this.setState({error:"Credenciales invalidas"})
        }
       )
  }

  render() {
     if(this.state.login){
         this.props.navigation.navigate('HomeMenu')
      }
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
          <Text styles={styles.errorText}>{this.state.error}</Text>
          <Pressable style={styles.loginButton} onPress={() => this.onSubmit()}>
            <Text style={styles.loginText}>Log in</Text>
          </Pressable>

          <Pressable
            style={styles.buttonR}
            onPress={() => this.props.navigation.navigate('Register')}>
            <Text style={styles.buttonText}>Ir a registro</Text>
          </Pressable>

          <Pressable
            style={styles.buttonA}
            onPress={() =>
              this.props.navigation.navigate('HomeMenu', { screen: 'Home' })
            }>
            <Text style={styles.buttonText}>Entrar a la app</Text>
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
  loginButton: {
    backgroundColor: '#44bd32',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    marginTop:10,
    width: '90%',
    alignItems: 'center',
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonR: {
    backgroundColor: '#40739e',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 8,
    width: '90%',
    alignItems: 'center',
  },
  buttonA: {
    backgroundColor: 'orange',
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
  errorText: {
    marginTop:20,
     marginBottom:20
  }
});