import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import VideoCapture from './VideoCapture';

const { width } = Dimensions.get('window');

const Card = ({ text, image }) => (
  <View style={styles.card}>
    <Image source={image} style={styles.cardImage} />
    <Text style={styles.cardText}>{text}</Text>
  </View>
);

const CircularCard = ({ image }) => (
  <View style={styles.circularCard}>
    <Image source={image} style={styles.circularCardImage} />
  </View>
);

export default function Home() {
  const [showVideoCapture, setShowVideoCapture] = useState(false);

  const handleAuthenticatePress = () => {
    setShowVideoCapture(true);
  };

  const handleCloseVideoCapture = () => {
    setShowVideoCapture(false);
  };

  return (
    <View style={styles.container}>
      {showVideoCapture ? (
        <VideoCapture onClose={handleCloseVideoCapture} />
      ) : (
        <>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
          <Text style={styles.title}>Search for a product ?</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardContainer}>
            <Card text="Shoes" image={require('../assets/cards1.jpg')} />
            <Card text="Hat" image={require('../assets/cards2.jpg')} />
            <Card text="Watches" image={require('../assets/cards3.jpg')} />
            <Card text="Jacket" image={require('../assets/cards4.jpg')} />
            <Card text="T-shirt" image={require('../assets/cards5.jpg')} />
          </ScrollView>
          <Text style={styles.featuredText}>Featured Brands</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.circularCardContainer}>
            <CircularCard image={require('../assets/brand1.jpg')} />
            <CircularCard image={require('../assets/brand2.jpg')} />
            <CircularCard image={require('../assets/brand3.jpg')} />
            <CircularCard image={require('../assets/brand4.jpg')} />
          </ScrollView>
          <View style={styles.buttonContainer}>
            <Text style={styles.bottomText}>Ready to authenticate your product? Work 24/7</Text>
            <TouchableOpacity style={styles.button} onPress={handleAuthenticatePress}>
              <Text style={styles.buttonText}>Let's authenticate!</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    position: 'absolute',
    top: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    position: 'absolute',
    top: 150,
    textAlign: 'center',
  },
  cardContainer: {
    position: 'absolute',
    top: 200,
    height: 200,
  },
  card: {
    width: 120,
    height: 150,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '80%',
    resizeMode: 'cover',
  },
  cardText: {
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
  },
  featuredText: {
    fontSize: 20,
    fontWeight: 'bold',
    position: 'absolute',
    top: 420,
    textAlign: 'center',
    width: '100%',
  },
  circularCardContainer: {
    position: 'absolute',
    top: 460,
    height: 120,
  },
  circularCard: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  circularCardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
    resizeMode: 'cover',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
  },
  bottomText: {
    marginBottom: 20,
    fontSize: 16,
    color: 'black',
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
