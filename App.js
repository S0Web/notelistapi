import {useState, useEffect} from 'react'
import { View, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { s } from './App.style';
import {SafeAreaProvider} from 'react-native-safe-area-context'
import 'react-native-get-random-values';
import axios from 'axios';


export default function App() {
  const [articles, setArticles] = useState([]);
  const [isCompleteViewVisible, setCompleteViewVisible] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        const data = response.data;
        setArticles(data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des articles :', error);
      });
  }, []);

  const onViewComplete = (article) => {
    setSelectedArticle(article);
    setCompleteViewVisible(true);
  }

  const onDeleteArticle = (articleId) => {
    const updatedArticles = articles.filter(article => article.id !== articleId);
    setArticles(updatedArticles);
    setCompleteViewVisible(false);
  }

  return (
    <View style={{flex: 1}}>
      <SafeAreaProvider>
        <SafeAreaView style={s.app}>
          <ScrollView>
            <View style={{...styles.container}}>
              <View style={{alignContent: 'baseline' , flexDirection: 'row', flexWrap: 'wrap'}}>
                {
                  articles.map((article, id)=>{
                    return (
                      <TouchableOpacity onPress={() => onViewComplete(article)} key={id} style={{padding: 10, width: '43%', margin: 10, backgroundColor: 'white', border: "1px solid white"}}>
                        <Text style={{fontSize: 25}}>{article.title.substring(0,15) + '...'}</Text>
                        <Text>{article.body.substring(0,61) + '...'}</Text>
                      </TouchableOpacity>
                    );
                  })
                }              
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>   
      </SafeAreaProvider>

      {isCompleteViewVisible && (
        <CompleteView article={selectedArticle} onClose={() => setCompleteViewVisible(false)} onDelete={() => onDeleteArticle(selectedArticle.id)} />
      )}

    </View>
  );
}

const CompleteView = ({ article, onClose, onDelete }) => {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 25 }}>{article.title}</Text>
      <Text>{article.body}</Text>
      <TouchableOpacity onPress={onDelete} style={{ marginTop: 10, backgroundColor: 'red', padding: 5 }}>
        <Text style={{ color: 'white' }}>Supprimer</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onClose} style={{ marginTop: 10 }}>
        <Text style={{ color: 'blue' }}>Fermer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
    alignItems: 'flex-start',
  },
});