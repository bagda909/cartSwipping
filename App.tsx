import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import Swiper from 'react-native-deck-swiper';

const MySwiper = () => {
  const viewData = [
    { id: 1, title: 'View 1', color: 'red' },
    { id: 2, title: 'View 2', color: 'green' },
    { id: 3, title: 'View 3', color: 'blue' },
  ];

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const renderCard = (card, index) => (
    <View key={card.id} style={[styles.card, { backgroundColor: card.color }]}>
      {/* Animated right icon */}
      { (
        <Animated.Image
          source={require('./correct.png')}
          style={[styles.icon, { opacity: fadeAnim }]}
        />
      )}

      {/* Animated left icon */}
      { (
        <Animated.Image
          source={require('./remove.png')}
          style={[styles.iconLeft, { opacity: fadeAnim }]}
        />
      )}

      <Text style={styles.text}>{card.title}</Text>
    </View>
  );

  return (
    <Swiper
      cards={viewData}
      renderCard={(card, index) => renderCard(card, index)}
      onSwiped={(index) => {
        // Reset the fade animation for the next card
        fadeAnim.setValue(1);
      }}
      onSwipedRight={(index) => {
        
          // Fade in animation for the right icon
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false,
          }).start();
        
      }}
      onSwipedLeft={(index) => {
          // Fade in animation for the left icon
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false,
          }).start();
        }
      }
      onSwipedAll={() => console.log('All cards have been swiped')}
      cardIndex={0}
      backgroundColor="transparent"
      stackSize={2}
      infinite
    />
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
  icon: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 40,
    height: 40,
  },
  iconLeft: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 40,
    height: 40,
  },
});

export default MySwiper;
