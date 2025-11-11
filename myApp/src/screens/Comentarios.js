import React, { Component } from 'react'
import { View, Text, TextInput, Pressable, FlatList, ActivityIndicator, StyleSheet } from 'react-native'
import { db, auth } from '../firebase/config'
import { Ionicons } from '@expo/vector-icons'

class Comentarios extends Component {
  constructor(props) {
    super(props)
    this.state = {
      post: null,
      comentarios: [],
      text: '',
      error: ''
    }
  }

  componentDidMount() {
    db.collection('posts')
      .doc(this.props.route.params.postId)
      .onSnapshot(docs => {
        this.setState({ post: docs.data() })
      });

    db.collection('comments')
      .where('postId', '==', this.props.route.params.postId)
      .onSnapshot(docs => {
        let comentarios = [];
        docs.forEach((doc) => {
          comentarios.push({
            id: doc.id,
            data: doc.data()
          });
        });
        this.setState({ comentarios: comentarios, error: '' })
      });
  }

  handleAdd() {

    if(!this.state.text) {
      this.setState({ error: 'Escribí un comentario' })
      return
    }

    db.collection('comments')
      .add({
        postId: this.props.route.params.postId,
        text: this.state.text,
        email: auth.currentUser.email,
        createdAt: Date.now(),
      })
      .then(() => this.setState({ text: '', error: '' }))
      .catch(() => this.setState({ error: 'No se pudo comentar' }))
  }

  render() {

    return (
      this.state.post === null ? (
        <ActivityIndicator size="large" color="#8E24AA" />
      ) : (
        <View style={styles.panel}>
          <View style={styles.postCard}>
            <Text style={styles.postTop}>{this.state.post.email} posteó</Text>
            <Text style={styles.postText}>{this.state.post.text}</Text>
            
            <View style={styles.likeRow}>
                <Ionicons
                  name={this.state.post.likes.includes(auth.currentUser.email) ? 'heart' : 'heart-outline'}
                  size={20}
                  color={this.state.post.likes.includes(auth.currentUser.email) ? '#D81B60' : '#979797'}
                />
                <Text style={styles.likeCount}>{this.state.post.likes.length}</Text>
            </View>

          </View>

          {this.state.comentarios.length === 0 && (
            <Text>Aún no hay comentarios</Text>)
          }

         {this.state.comentarios.length > 0 && (
  <View style={styles.scroll}>
    <FlatList
      data={this.state.comentarios}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.commentBox}>
          <Text style={styles.commentEmail}>{item.data.email}</Text>
          <Text style={styles.commentText}>{item.data.text}</Text>
        </View>
      )}
    />
  </View>
)}
          <Text style={styles.error}>{this.state.error}</Text> 

          <View style={styles.form}>
            <TextInput
              placeholder="Escribí tu comentario..."
              value={this.state.text}
              onChangeText={(v) => this.setState({ text: v, error: "" })}
              style={styles.inputRounded}
              multiline
            />
            <Pressable onPress={() => this.handleAdd()} style={styles.commentButton}>
              <Text style={styles.buttonText}>Publicar comentario</Text>
            </Pressable>
          </View>
        </View>
      )
    );
  }
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: '#fff',
    borderRadius: 22,
    padding: 16,
    marginTop: 5,
    width: '92%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#e3e3e3',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  scroll: {
    flex: 1,
    maxHeight: 300
  },
  postCard: {
    paddingVertical: 8,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  postTop: {
    opacity: 0.7,
    marginBottom: 6,
    color: '#555',
  },
  postText: {
    fontSize: 18,
    marginBottom: 8,
    color: '#2f3640',
  },
  postLikes: {
    fontWeight: '600',
    marginBottom: 4,
    color: '#8E24AA',
  },
  postMeta: {
    fontSize: 12,
    opacity: 0.6,
    color: '#555',
  },
  commentBox: {
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e9e9e9',
    width: '100%',
    alignSelf: 'auto',
    backgroundColor: '#fafafa',
    marginBottom: 8,
  },
  commentEmail: {
    opacity: 0.7,
    marginBottom: 4,
    fontWeight: '500',
    color: '#8E24AA',
  },
  commentText: {
    fontSize: 16,
    marginBottom: 4,
    color: '#2f3640',
  },
  commentDate: {
    fontSize: 12,
    opacity: 0.6,
    color: '#666',
  },
  inputRounded: {
    borderRadius: 10,
    padding: 12,
    minHeight: 64,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
    alignSelf: 'auto',
    backgroundColor: '#f9f9f9',
    fontSize: 16,
    color: '#2f3640',
  },
  commentButton: {
    backgroundColor: '#8E24AA',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center',
    marginTop: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 16,
  },
  error: {
    color: '#D81B60',
    textAlign: 'center',
    marginTop: 8,
    fontWeight: '600',
  },
  likeRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 4 
  },
  likeCount: { 
    marginLeft: 6, 
    fontWeight: '600', 
    color: '#333' 
  },
})

export default Comentarios
