import React from 'react';
import {
  Image,
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Alert,
} from 'react-native';
import tw from 'twrnc';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {} from 'react-native-gesture-handler';

const EducationScreen = () => {
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://192.168.8.101:5009/news');
        setNewsArticles(response.data);
        console.log('Good');
      } catch (error) {
        console.error(error);
        Alert.alert('Message', 'Check your connection!');
      }
    };

    fetchNews();
  }, []);

  return (
    <ScrollView>
      <View style={tw`bg-white overflow-visible`}>
        {newsArticles.map((news, index) => (
          <View key={index} style={tw``}>
            <View>
              <View style={tw``}>
                <Text style={tw`self-center text-2xl text-black`}>
                  {news.no}. {news.title}
                </Text>
              </View>
              <View>
                <Image
                  width={360}
                  height={200}
                  source={{uri: news.image}}
                  alt="hi"
                  onError={error =>
                    console.error('Image loading error:', error)
                  }
                />
              </View>
              <View style={tw`p-3`}>
                <View key={index}>
                  {activeIndex === index && <Text>{news.description}</Text>}
                  <TouchableOpacity
                    onPress={() =>
                      setActiveIndex(activeIndex === index ? null : index)
                    }
                    style={tw`bg-white border rounded`}>
                    <Text style={tw`text-black`}>
                      {activeIndex === index ? 'Hide Text' : 'Show Text'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default EducationScreen;
