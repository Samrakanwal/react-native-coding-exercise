import { StyleSheet, Text, Button } from "react-native";
import { useDispatch } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';


// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://main--spacex-l4uc6p.apollographos.net/graphql',
  cache: new InMemoryCache()
});

const Root: React.FC = () => {
  return (
    <ApolloProvider client={client}>
     <SafeAreaView>
      <Text>Root Screen</Text>
      <Button 
        title={"Go to Ticket Screen"} 
        onPress={() => 
          router.push("/App/Ticket")
      }/>
    </SafeAreaView>
    </ApolloProvider>
  );
}

export default Root;