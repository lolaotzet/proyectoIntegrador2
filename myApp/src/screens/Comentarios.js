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
      <View style={styles.container}>

        {/* Post */}

        <View>
          <Text>{autor} posteó</Text>
          <Text>{cuerpo}</Text>
          <Text>❤️ {likes} likes</Text>
          <Text>{postDate}</Text> 
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
              <View>
                <Text>{email}</Text>
                <Text>{text}</Text>
                <Text>{new Date(createdAt).toLocaleString()}</Text> 
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
            style={styles.input}
            multiline
          />
          <Pressable onPress={() => this.handleAdd()} style={styles.btn}>
            <Text style={styles.btnText}>Publicar comentario</Text>
          </Pressable>
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
})

export default Comentarios