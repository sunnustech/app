import { ActivityIndicator, View, Text } from 'react-native'
import { login as styles } from '@/styles/fresh'

const LoginErrorMessage = ({ error }: { error: boolean }) => {
  return error ? (
    <Text style={styles.errorMessage}>
      Sorry, but this username does not exist!
    </Text>
  ) : null
}

const Loader = (props: { loading: boolean; error: boolean }) => {
  return (
    <View style={styles.spacer}>
      {props.error && !props.loading ? (
        <LoginErrorMessage error={props.error} />
      ) : (
        <ActivityIndicator
          animating={props.loading}
          style={styles.loadingIndicator}
        />
      )}
    </View>
  )
}

export default Loader
