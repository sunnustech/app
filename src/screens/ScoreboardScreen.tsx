import { SetStateAction, useRef, useState } from 'react'
import {
  Animated,
  ImageBackground,
  OpaqueColorValue,
  SafeAreaView,
  Text,
} from 'react-native'
import { Tab, TabView } from 'react-native-elements'
import { Entypo } from '@expo/vector-icons'

/* sunnus components */
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
    team: 'Mock Data',
    score: 225,
  },
]

const SOARComparison = (x: DataTest, y: DataTest) => {
  if (x.score > y.score) {
    return -1
  } else if (x.score < y.score) {
    return 1
  } else {
    return x.team < y.team ? -1 : 1
  }
}

const sortLeaderboard = (arr: DataTest[]) => {
  return arr.sort(SOARComparison)
}

const ScoreboardScreen = () => {
  const [index, setIndex] = useState(0)

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
          [{ nativeEvent: { contentOffset: { y: new Animated.Value(0) } } }],
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
    <>
      <ImageBackground
        source={require('./imgs/sunnus-bg-old.jpg')}
        style={styles.imgBackground}
        resizeMode="cover"
      >
        <Tab
          value={index}
          onChange={(e: SetStateAction<number>) => setIndex(e)}
          indicatorStyle={{
            backgroundColor: '#f95b78',
            height: 2.5,
          }}
        >
          <Tab.Item titleStyle={styles.scoreboardTitle} title="SOAR 🎉" />
          <Tab.Item titleStyle={styles.scoreboardTitle} title="FRINGE 💃" />
        </Tab>
        <TabView value={index} onChange={setIndex} animationType="spring">
          <TabView.Item
            onMoveShouldSetResponder={(e: any) => e.stopPropagation()}
          >
            <SafeAreaView style={styles.container}>
              {animatedListRender(DATA, TEAM_ID)}
            </SafeAreaView>
          </TabView.Item>
          <TabView.Item
            onMoveShouldSetResponder={(e: any) => e.stopPropagation()}
          >
            <SafeAreaView style={styles.container}>
              {animatedListRender(DATA, undefined)}
            </SafeAreaView>
          </TabView.Item>
        </TabView>
      </ImageBackground>
    </>
  )
}

export default ScoreboardScreen
