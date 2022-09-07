import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Pressable,Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [count,setCount] = useState(0);

  // const list = [];

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, [count]);


  const handleBarCodeScanned = ({ type, data }) => {
    setCount((count)=> count+1)
    if(count === 4){
      setScanned(true);
      setCount(0);
    }
    alert(`Bar code with type ->>>> ${type} and data is this ->>>>${data} has been scanned!`);
    // list.append(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
    <Image
          source={require('./logo.jpeg')}
          style={styles.img}
        />
    {/* <Text style = {styles.header}>AttendR</Text> */}
    <Text style = {styles.header}>Mark Your Presence</Text>
    <View style = {styles.barcode}>

      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.code}
      />

    </View>
      {scanned && <Pressable title={'Tap to Scan Again'} onPress={() => setScanned(false)} 
      style={styles.pres}> 
      <Text>Scan Again</Text>
      </Pressable>}
    </View>
  );
}

// changes
// charging ke jagah se color nikalna hai

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5a5a5a',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems : 'center',
  },

  code:{
    height : 550,
    width : 550,
  },

  barcode :{
    alignItems : 'center',
    justifyContent : 'center',
    height : 300,
    width : 300,
    overflow : 'hidden',
    borderRadius : 50,
  },
  header :{
    fontSize : 20,
    marginBottom : 20,
    color : 'white'
  },

  pres :{
    borderWidth : 1,
    borderRadius : 30,
    height : 40,
    marginTop : 30,
    padding : 5,
    width : 100,
    display : 'flex',
    alignItems : 'center',
    justifyContent : 'center',
    backgroundColor : 'aliceblue'
  },

  img :{
    height : 70,
    width : 70,
    marginBottom : 10,
  }

});
