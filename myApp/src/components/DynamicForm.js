import React, { Component } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

export default class Comentarios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comentario: '',
    };
  }

  enviarComentario() {
    console.log('Nuevo comentario:', this.state);
    this.setState({comentario: '' });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Dejá tu comentario</Text>

          <TextInput
            style={styles.input}
            placeholder="Escribí tu comentario..."
            onChangeText={text => this.setState({ comentario: text })}
            value={this.state.comentario}
          />

          <Pressable style={styles.commentButton} onPress={() => this.enviarComentario()}>
            <Text style={styles.buttonText}>Enviar</Text>
          </Pressable>
        </View>
          <View style={styles.previewSection}>
                  <Text style={styles.previewTitle}>Vista previa en tiempo real:</Text>
                  <Text style={styles.previewText}>{this.state.comentario}</Text>
                </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: '100%',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2f3640',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    color: '#2f3640',
    backgroundColor: '#f9f9f9',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  commentButton: {
    backgroundColor: '#44bd32',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
   previewSection: {
    backgroundColor: '#f1f2f6',
    marginTop: 25,
    padding: 15,
    width: '85%',
    borderRadius: 15,
  },
  previewTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#273c75',
    marginBottom: 10,
  },
  previewText: {
    fontSize: 15,
    color: '#2f3640',
    marginBottom: 5,
  },
});
