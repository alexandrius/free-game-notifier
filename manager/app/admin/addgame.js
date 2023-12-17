import { usePost } from "fetch-yo-mama";
import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, Button } from "react-native";

export default function AddGame() {
  const [title, setTitle] = useState("");
  const [untilDate, setUntilDate] = useState(1691597426);
  const [discount, setDiscount] = useState("100");
  const [photo, setPhoto] = useState("");
  const [offerLink, setOfferLink] = useState("");
  const [developer, setDeveloper] = useState("");
  const [publisher, setPublisher] = useState("");
  const [os, setOs] = useState(["Windows"]);
  const [description, setDescription] = useState("");
  const [store, setStore] = useState("63cd370b2588f3ed4fb192ee");
  const [releaseDate, setReleaseDate] = useState("");
  const [originalPrice, setOriginalPrice] = useState("6000");
  const [tags, setTags] = useState([
    "Action-Advanture",
    "RPG",
    "Puzzle",
    "Craft",
  ]);

  const [requestState, addGame] = usePost("/api/games", {
    loadOnMount: false,
    body: {
      title,
      until_date: untilDate,
      discount: Number(discount),
      photo,
      offer_link: offerLink,
      developer,
      publisher,
      os,
      description,
      store,
      release_date: releaseDate,
      original_price: Number(originalPrice),
      tags,
    },
  });

  return (
    <View style={styles.root}>
      <Text>Add Game</Text>
      {requestState.loading && <Text>Adding the game</Text>}
      <TextInput placeholder="Title" value={title} onChangeText={setTitle} />
      <TextInput
        placeholder="Discount"
        value={discount}
        onChangeText={setDiscount}
      />
      <TextInput placeholder="Photo" value={photo} onChangeText={setPhoto} />
      <TextInput
        placeholder="Offer Link"
        value={offerLink}
        onChangeText={setOfferLink}
      />
      <TextInput
        placeholder="Developer"
        value={developer}
        onChangeText={setDeveloper}
      />
      <TextInput
        placeholder="Publisher"
        value={publisher}
        onChangeText={setPublisher}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TextInput
        placeholder="Release Data"
        value={releaseDate}
        onChangeText={setReleaseDate}
      />
      <TextInput
        placeholder="Original Price"
        value={originalPrice}
        onChangeText={setOriginalPrice}
      />
      <Button title="Add Game" onPress={addGame} />
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
