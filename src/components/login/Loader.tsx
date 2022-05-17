import { ActivityIndicator, View, Text } from 'react-native'
import { globalStyles } from '@/styles/global'

const LoginErrorMessage = ({ error }: { error: boolean }) => {
  return error ? (
    <Text style={globalStyles.others.errorMessage}>
      Sorry, but this username does not exist!
    </Text>
  ) : null
}

const Loader = (props: { loading: boolean; error: boolean }) => {
  return (
    <View style={globalStyles.others.spacer}>
      {props.error && !props.loading ? (
        <LoginErrorMessage error={props.error} />
      ) : (
        <ActivityIndicator
          animating={props.loading}
        />
      )}
    </View>
  )
}

export default Loader
