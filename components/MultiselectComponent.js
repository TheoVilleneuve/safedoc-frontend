import React, { useState, useRef } from 'react';
  import { StyleSheet, View } from 'react-native';
  import { MultiSelect } from 'react-native-element-dropdown';
  import AntDesign from '@expo/vector-icons/AntDesign';

  export default function MultiSelectComponent(props){
    const ref = useRef(null);
    const [selected, setSelected] = useState([]);
    const [isFocus, setIsFocus] = useState(false);

    return (
        <View style={[styles.multiSelectContainer,
        selected.length===0 && {height : 50} 
            ]}>
        <MultiSelect
        ref={ref}
        style={styles.multiselect}
        // fontFamily = {'Greycliff-Regular'}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        itemTextStyle = {styles.itemTextStyle}
        itemContainerStyle = {styles.itemContainerStyle}


        backgroundColor={'rgba(0,0,0,0.2)'}
        search
        data={props.data}
        alwaysRenderSelectedItem={true}
        labelField={props.labelField}
        valueField={props.valueField}
        placeholder={props.placeholder}
        searchPlaceholder={props.searchPlaceholder}
        value={selected}
        onChange={(item) => {
          setSelected(item);
        }}
        selectedStyle={styles.selectedStyle}
      />
      </View>
    );
  };

  MultiSelectComponent;

  const styles = StyleSheet.create({
    //MULTISELECT STYLE
multiSelectContainer: {
    marginTop: 9,
    marginBottom: 9,
    display: 'flex',
    justifyContent: 'flex-start', 
  },
  multiselect: {
    height: 50,
    paddingHorizontal: 14,
    borderColor: 'black',
    borderWidth: 0.8,
    borderRadius: 4,
    backgroundColor: '#fdfbfc',
  },
  inputSearchStyle: {
    height: 25,
    fontSize: 16,
  },
  selectedStyle: {
    backgroundColor: '#E9D3F1',
    borderRadius: 10,
    display: 'flex',
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 30,
    padding: 2,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  wrapSelectAll: {
    alignItems: 'flex-end',
    marginHorizontal: 16,
    marginVertical: 8,
  },
  });