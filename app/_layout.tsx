import { Slot } from 'expo-router';
import { SessionProvider } from '../context';
import { RootSiblingParent } from 'react-native-root-siblings';

export default function Root() {
  // Set up the auth context and render our layout inside of it.
  return (
    <SessionProvider>
      <RootSiblingParent>
      <Slot />
      </RootSiblingParent>
    </SessionProvider>
  );
}
