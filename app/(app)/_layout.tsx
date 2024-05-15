import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Text } from '@/components/Themed';
// import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useSession } from '../../context';
import { Redirect, Stack } from 'expo-router';
import { useColorScheme } from '@/components/useColorScheme';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });
  
  const { token, loading } = useSession();


  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      // set timeout after five seconds
      // setTimeout(SplashScreen.hideAsync, 2000);
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded ) {
    return null;
  }

  // This loading is triggered while getting the token/refreshToken from expo secureStore
  if(loading){
    return <Text>Loading ... </Text>
  }

  if (!token) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/sign-in" />;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  );
}


// import { Redirect, Stack } from 'expo-router';
// import { Text } from '@/components/Themed';
// import { useSession } from '../../context';

// export default function AppLayout() {
//   const { session, isLoading } = useSession();

//   // You can keep the splash screen open, or render a loading screen like we do here.
//   if (isLoading) {
//     return <Text>Loading...</Text>;
//   }

//   // Only require authentication within the (app) group's layout as users
//   // need to be able to access the (auth) group and sign in again.
//   if (!session) {
//     // On web, static rendering will stop here as the user is not authenticated
//     // in the headless Node process that the pages are rendered in.
//     return <Redirect href="/sign-in" />;
//   }

//   // This layout can be deferred because it's not the root layout.
//   return (

//           <Stack>
//             <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//             <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
//           </Stack>

//   );
// }
