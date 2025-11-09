import React, { Component } from 'react';
import { View, Text, TextInput, Pressable, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config'

class Comentarios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null,
      comentarios: [],
      text: '',
      loading: true,
      error: ''
    };
  }

  componentDidMount() {
    const postId = this.props.route.params.postId

    if (!postId) {
      this.setState({ loading: false, error: 'Falta postId' })
    return
    }

    // 1) traemos el post 
    db.collection('posts')
      .doc(postId) // viene un unico doc con postId con la data
      .onSnapshot(docs => {
        const data = docs.data()
        this.setState({ post: data })
      })

    // 2) traemos los comentarios de ese post
    db.collection('comments')
      .where('postId', '==', postId)
      .onSnapshot(
        docs => {
          let comentarios = []
          docs.forEach((doc) => {
            comentarios.push({ 
              id: doc.id, 
              data: doc.data() 
            })
          })
          this.setState({ comentarios: comentarios, loading: false, error: '' })
        }
      )
  }
  
  handleAdd() {
    const postId = this.props.route.params.postId // viene por params desde Post -> navigate('Comentarios', { postId })

    if (!this.state.text) return

    db.collection('comments')
      .add({
        postId: postId,
        text: this.state.text, 
        email: auth.currentUser.email,
        createdAt: Date.now(),
      })
      .then(() => this.setState({ text: '', error: '' }))
      .catch(() => this.setState({ error: 'No se pudo comentar' }));
  }

  render() {
    const comentarios = this.state.comentarios
    const text = this.state.text
    const loading = this.state.loading
    const error = this.state.error
    const p = this.state.post ? this.state.post : {}

    const autor = p.email ? p.email : '' //si el post tiene email lo usamo si no queda el string vacio
    const cuerpo = p.text ? p.text : '' //si el post tiene text lo usamos si no queda el string vacio
    const likes = p.likes && p.likes.length ? p.likes.length : 0 // si existe el aray likes y tiene elementos toma la cantidad ysi no es 0
    const postDate = new Date(p.createdAt).toLocaleString()

    return (
      <View style={styles.panel}>

        {/* Post */}
        <View style={styles.postCard}>
          <Text style={styles.postTop}>{autor} posteó</Text>
          <Text style={styles.postText}>{cuerpo}</Text>
          <Text style={styles.postLikes}>❤️ {likes} likes</Text>
          <Text style={styles.postMeta}>{postDate}</Text> 
        </View>

        {/* Lista de comentarios del post */}

        {loading ? <ActivityIndicator size="large" /> : null}
        {error ? <Text style={styles.error}>{error}</Text> : null}

        <FlatList
          data={comentarios}
          keyExtractor={(item)=>item.id.toString()}
          renderItem={({ item }) => {
            const email = item.data.email
            const text = item.data.text
            const createdAt = item.data.createdAt

            return (
              <View style={styles.commentBox}>
                <Text style={styles.commentEmail}>{email}</Text>
                <Text style={styles.commentText}>{text}</Text>
                <Text style={styles.commentDate}>{new Date(createdAt).toLocaleString()}</Text> 
              </View>
            )
          }}
          ListEmptyComponent={
            !loading && !error ? (
              <Text>
              Aún no hay comentarios
              </Text>
            ) : null
          }   
        />

        <View style={styles.form}>
          <TextInput
            placeholder="Escribí tu comentario..."
            value={text}
            onChangeText={(v) => this.setState({ text: v })}
            style={styles.inputRounded}
            multiline
          />
          <Pressable onPress={() => this.handleAdd()} style={styles.commentButton}>
            <Text style={styles.buttonText}>Publicar comentario</Text>
          </Pressable>
        </View>

      </View>
    );
  }
}
const styles = StyleSheet.create({
  panel: {
    backgroundColor: '#fff',
    borderRadius: 22,
    padding: 16,
    marginTop: 10,
    width: '92%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#e3e3e3',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
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
    shadowOffset: { width: 0, height: 2 },
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
});



export default Comentarios