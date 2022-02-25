import { useRef } from 'react'
import {
  Animated,
  ImageBackground,
  OpaqueColorValue,
  SafeAreaView,
  ScrollView,
  Text,
} from 'react-native'
import { Entypo } from '@expo/vector-icons'

import { scoreboard as styles } from '@/styles/main'

type DataTest = {
  id: number
  team: string
  score: number
}

const GOLD = '#ffd700'
const SILVER = '#c0c0c0'
const BRONZE = '#cd7f32'

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

const DADA: DataTest[] = [
  {
    id: 1,
    team: 'Hot Singles in your Area',
    score: 225,
  },
  {
    id: 2,
    team: 'Hong Sheng',
    score: 45,
  },
  {
    id: 3,
    team: 'Kermit the Frog',
    score: 23,
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
  // Get the current user's team
  // Ideally this shouldn't be useState, and should be a module function queried from firebase.
  // For testing purposes feel free to change this
  const TEAM_ID = 1

  const scrollY = useRef(new Animated.Value(0)).current

  const renderScoreboard = (
    item: { id?: number; team: any; score: any },
    pos: string | OpaqueColorValue | undefined,
    scale: Animated.AnimatedInterpolation,
    opacity: Animated.AnimatedInterpolation,
    team: number | undefined
  ) => {
    const normalRender = (
      <>
        <Text style={{ flex: 0.3 }}></Text>
        <Text numberOfLines={1} style={styles.itemName}>
          {item.team}
        </Text>
        <Text style={styles.itemScore}>{item.score}</Text>
      </>
    )
    const topThreeRender = (
      <>
        <Entypo name="trophy" size={24} color={pos} style={styles.itemTrophy} />
        <Text numberOfLines={1} style={styles.itemName}>
          {item.team}
        </Text>
        <Text style={styles.itemScore}>{item.score}</Text>
      </>
    )
    if (team === item.id) {
      return (
        <Animated.View
          style={{
            flexDirection: 'row',
            backgroundColor: '#e8d5b5',
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
            borderWidth: 2,
            borderColor: '#ff784f',
          }}
        >
          {typeof pos === 'undefined' ? normalRender : topThreeRender}
        </Animated.View>
      )
    } else {
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
          {typeof pos === 'undefined' ? normalRender : topThreeRender}
        </Animated.View>
      )
    }
  }

  const animatedListRender = (arr: DataTest[], id: number | undefined) => {
    return (
      <Animated.FlatList
        keyExtractor={(item) => item.id.toString()}
        data={sortLeaderboard(arr)}
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
          const sortedLeaderboard = sortLeaderboard(arr)
          switch (sortedLeaderboard.indexOf(item)) {
            case 0:
              return renderScoreboard(item, GOLD, scale, opacity, id)
            case 1:
              return renderScoreboard(item, SILVER, scale, opacity, id)
            case 2:
              return renderScoreboard(item, BRONZE, scale, opacity, id)
            default:
              return renderScoreboard(item, undefined, scale, opacity, id)
          }
        }}
      />
    )
  }

  return (
    <ScrollView
      horizontal={true}
      pagingEnabled={true}
      showsHorizontalScrollIndicator={true}
    >
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={require('./imgs/sunnus-bg-old.jpg')}
          style={styles.imgBackground}
          resizeMode="cover"
        >
          <Text style={styles.scoreboardTitle}>SOAR 🎉</Text>
          {animatedListRender(DATA, TEAM_ID)}
        </ImageBackground>
      </SafeAreaView>
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={require('./imgs/sunnus-bg-old.jpg')}
          style={styles.imgBackground}
          resizeMode="cover"
        >
          <Text style={styles.scoreboardTitle}>FRINGE 💃</Text>
          {animatedListRender(DADA, undefined)}
        </ImageBackground>
      </SafeAreaView>
    </ScrollView>
  )
}

export default ScoreboardScreen
