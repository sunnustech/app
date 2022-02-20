import React, { useRef } from 'react'
import {
  Animated,
  FlatList,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native'

type DataTest = {
  id: number
  team: string
  score: number
}

const DATA: DataTest[] = [
  {
    id: 1,
    team: 'Daddy Hong Sheng',
    score: 225,
  },
  {
    id: 2,
    team: 'Papa Jun Hong',
    score: 228,
  },
  {
    id: 3,
    team: 'Ryan',
    score: -1,
  },
  {
    id: 4,
    team: 'Khang',
    score: 225,
  },
  {
    id: 5,
    team: 'Benjy',
    score: 225,
  },
  {
    id: 6,
    team: 'a',
    score: -2,
  },
  {
    id: 7,
    team: 'ha',
    score: -2,
  },
  {
    id: 8,
    team: 'test',
    score: -2,
  },
  {
    id: 9,
    team: 'fff',
    score: -2,
  },
  {
    id: 10,
    team: 'xxx',
    score: -2,
  },
  {
    id: 11,
    team: 'abc',
    score: -2,
  },
  {
    id: 12,
    team: 'def',
    score: -2,
  },
  {
    id: 13,
    team: 'ggg',
    score: -2,
  },
  {
    id: 14,
    team: 'cocccc',
    score: -2,
  },
  {
    id: 15,
    team: 'qqqqqqqq',
    score: -2,
  },
  {
    id: 16,
    team: 'aaa',
    score: -2,
  },
  {
    id: 17,
    team: 'thisISaVERYlongTEAMnameWHATisDISPLAYED?',
    score: -2,
  },
  {
    id: 18,
    team: 'aaa',
    score: -2,
  },
  {
    id: 19,
    team: 'qqqqqqqq',
    score: -2,
  },
  {
    id: 20,
    team: 'aaa',
    score: -2,
  },
  {
    id: 21,
    team: 'qqqqqqqq',
    score: -2,
  },
  {
    id: 22,
    team: 'aaa',
    score: -2,
  },
]

const soarComparison = (x: DataTest, y: DataTest) => {
  if (x.score > y.score) {
    return -1
  } else if (x.score < y.score) {
    return 1
  } else {
    return x.team < y.team ? -1 : 1
  }
}

const sortLeaderboard = (arr: DataTest[]) => {
  return arr.sort(soarComparison)
}

const ScoreboardScreen = () => {
  const scrollY = useRef(new Animated.Value(0)).current

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('./imgs/sunnus-bg-old.jpg')}
        style={styles.imgBackground}
        resizeMode="cover"
      >
        <Animated.FlatList
          keyExtractor={(item) => item.id.toString()}
          data={sortLeaderboard(DATA)}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          contentContainerStyle={{
            padding: 20,
          }}
          renderItem={({ item, index }) => {
            const inputRange = [-1, 0, 64 * index, 64 * (index + 3)]
            const opacityRange = [-1, 0, 64 * index, 64 * (index + 1)]
            const scale = scrollY.interpolate({
              inputRange,
              outputRange: [1, 1, 1, 0],
            })
            const opacity = scrollY.interpolate({
              inputRange: opacityRange,
              outputRange: [1, 1, 1, 0],
            })
            return (
              <Animated.View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#ddd',
                  borderRadius: 12,
                  margin: 5,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 5,
                    height: 8,
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 5,
                  transform: [{ scale }],
                  opacity,
                }}
              >
                <Text style={styles.itemName}>{item.team}</Text>
                <Text style={styles.itemScore}>{item.score}</Text>
              </Animated.View>
            )
          }}
        />
      </ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#ddd',
    borderRadius: 12,
    margin: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  itemName: {
    flex: 0.5,
    alignItems: 'flex-start',
    padding: 10,
    marginVertical: 8,
    textAlign: 'center',
    fontWeight: '500',
  },
  itemScore: {
    flex: 0.5,
    alignItems: 'flex-start',
    padding: 10,
    marginVertical: 8,
    textAlign: 'center',
    color: '#f95b78',
    fontWeight: '500',
  },
  imgBackground: {
        width: '100%',
        height: '100%',
        flex: 1 
  },
})

export default ScoreboardScreen
