import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { auth, googleAuthProvider } from '../config/firebase-config';
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

export const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (auth.currentUser && auth.currentUser.email) {
    console.log(auth.currentUser.email);
  }

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Signed in successfully!');
    } catch (err) {
      Alert.alert('Error', err.message);
      console.log(err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider);
      Alert.alert('Success', 'Signed in with Google!');
    } catch (err) {
      Alert.alert('Error', err.message);
      console.log(err);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      Alert.alert('Success', 'Logged out successfully!');
    } catch (err) {
      Alert.alert('Error', err.message);
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email..."
        style={styles.input}
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        placeholder="Password..."
        style={styles.input}
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <Button title="Sign in" onPress={signIn} />
      <Button title="Sign In With Google" onPress={signInWithGoogle} />
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: '80%',
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 10,
    borderRadius: 5,
  },
});
