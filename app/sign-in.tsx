import React from 'react';
import { Text, View, SafeAreaView, TextInput, StyleSheet, ActivityIndicator } from 'react-native';

import { useSession } from '../context';

export default function SignIn() {
  const { signIn, authLoading } = useSession();
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {authLoading && <ActivityIndicator />}
    <SafeAreaView>
      <Text>Email:</Text>
    <TextInput
      style={styles.input}
      onChangeText={setEmail}
      value={email}
      placeholder='Enter your email address'
    />
    <Text>Password:</Text>
    <TextInput
      style={styles.input}
      onChangeText={setPassword}
      value={password}
      secureTextEntry={true}
      placeholder='Enter your password'
    />
  </SafeAreaView>
      <Text
        style={authLoading ? styles.buttonLoading : styles.button}
        disabled={authLoading}
        onPress={() => {
          signIn({email, password});
        }}>
        Sign in
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      minWidth: '50%',
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    button: {
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
      color: 'white',
      textAlign: 'center',
      width:'50%'
    },
    buttonLoading: {
      backgroundColor: 'lightBlue',
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
      color: 'white',
      textAlign: 'center',
      width:'50%',
      opacity: 0.5
    }
  });
