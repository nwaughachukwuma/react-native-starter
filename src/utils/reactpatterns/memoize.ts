/**
 * This is a memoization helper for class functions
 * See doc: https://github.com/alexreardon/memoize-one
 */
import React from 'react'
import memoizeOne from 'memoize-one'
import isEqual from 'lodash.isequal'

export const memoHelper = (func: any) => memoizeOne(func, isEqual)

// example usage: 
// import { View, Text, TextInput } from 'react-native';
// class Example extends React.Component {
//     state = { filterText: "" };
//     filter = memoHelper(
//         (list: any[], filterText: any) => list.filter(item => item.text.includes(filterText))
//     );
//     handleChange = (event: { target: { value: any; }; }) => {
//         this.setState({ filterText: event.target.value });
//     };
//     render() {
//         const filteredList = this.filter(this.props.list, this.state.filterText);
//         return (
//             <>
//                 <TextInput
//                     style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
//                     onChangeText={this.handleChange}
//                     value={value}
//                 />
//                 <View>{filteredList.map(item => <Text key={ item.id } > { item.text } < /Text>)}</View>
//             </>
//         );
//     }
// };

export default memoHelper;