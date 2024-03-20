import { router } from "expo-router";
import React, { useState } from 'react';
import {  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  RefreshControl,
  ActivityIndicator,
  Alert, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery ,gql} from '@apollo/client';
import { AppLogo,Banner, } from "../../../assets/vector";


  export const GET_LAUNCHES = gql`
  query GetLaunches($limit: Int!, $offset: Int!) {
    launchesPast(limit: $limit, offset: $offset, sort: "launch_year") {
      mission_name
      launch_date_local
      launch_success
      details
    }
  }
`;

const Ticket: React.FC = () => {

    // State for sorting, search, and pagination
  const [sortBy, setSortBy] = useState<string>('launch_date_local');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  // GraphQL query with sorting, filtering, and pagination
  const { loading, error, data, refetch } = useQuery(GET_LAUNCHES, {
    variables: {
      limit: itemsPerPage,
      offset: (currentPage - 1) * itemsPerPage,
      sort: `${sortBy}_${sortDirection.toUpperCase()}`,
      filter: { mission_name: { contains: searchQuery } }
    },
  });

  // Sorting function
  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }
  };

  // Pagination functions
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(data.launchesPast.length / itemsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Search function
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    setCurrentPage(1); // Reset to first page when searching
  };



  
  return (
    <SafeAreaView
    style={{
      flex: 1,
      backgroundColor: "#fff",
    }}
    contentContainerStyle={{
      alignItems: "center",
    }}
  >

<View>
    <Tec3dxt>Ticket Screen</Text>
    <Button 
      title={"Go Back"} 
      onPress={() => 
        router.back()
    }/>
  </View>


   <View style={styles.navBar}>
        <Image source={Banner} style={styles.backImage} />
         </View>

         <View >
         <Image source={AppLogo} style={styles.backImage} />
         </View>

         <View style={{flexdirection:"row"}}>
            {/* Render sorting UI  */}
      <Button title="Mission Name" onPress={() => handleSort('mission_name')} />
      <Button title="Launch Date" onPress={() => handleSort('launch_date_local')} />
      {/* Render other sorting buttons */}
  {/* Render search bar */}
  <TextInput
        placeholder="Search by Mission Name"
        onChangeText={handleSearch}
        value={searchQuery}
      />

         </View>

          {/* Render launch data */}
      {loading ? <Text>Loading...</Text> : (
        <>
          {data.launchesPast.map((launch: Launch) => (
            <View key={launch.mission_name}>
              <Text>{launch.mission_name}</Text>
              <Text>{launch.launch_date_local}</Text>
              <Text>{launch.launch_success ? 'Success' : 'Failure'}</Text>
              {/* Render other columns */}
            </View>
          ))}
        </>
      )}

      {/* Render pagination controls */}
      <Button title="Prev" onPress={handlePrevPage} />
      <Text>{currentPage}</Text>
      <Button title="Next" onPress={handleNextPage} />

      <FlatList
      data={data.launchesPast}
      renderItem={({ item }) => (
        <View>
          <Text>{item.mission_name}</Text>
          <Text>{item.launch_date_local}</Text>
          <Text>{item.launch_success ? 'Success' : 'Failure'}</Text>
          {/* Render other columns */}
        </View>
      )}
      keyExtractor={(item) => item.mission_name}
    />

  </SafeAreaView>
   
  );
};

export default Ticket;
const styles = StyleSheet.create({
  backImage: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  navBar: {
    width: "100%",
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
    marginBottom: 20,

  },
 
});

  