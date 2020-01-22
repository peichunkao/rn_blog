import React, { useContext } from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import { Context as BlogContext } from "../context/BlogContext";
import { Feather } from "@expo/vector-icons";

const IndexScreen = () => {
  const { state, addBlogPost } = useContext(BlogContext);
  return (
    <View>
      {/* <Text>This is my IndexScreen.</Text> */}
      <Button title="Add Post" onPress={addBlogPost}></Button>
      <FlatList
        keyExtractor={blogPost => blogPost.title}
        data={state}
        renderItem={({ item }) => {
          return (
            <View style={styles.row}>
              <Text style={styles.title}>{item.title}</Text>
              <Feather
                name="trash-2"
                style={styles.icon}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection:"row",
    justifyContent:"space-between",
    paddingVertical: 15,
    // borderTopWidth:1,
    borderBottomWidth:1,
    borderColor:"grey"
  },
  title: {
    fontSize: 18
  },
  icon: {
    fontSize: 24
  }
});

export default IndexScreen;
