import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity, Linking, FlatList,
  BackHandler, ToastAndroid ,AppState,View

} from "react-native";
import Font from "react-native-vector-icons/FontAwesome5";
import { LineChart, Path } from "react-native-svg-charts";
import { Line } from "react-native-svg";
import * as shape from "d3-shape";
import Clipboard from '@react-native-community/clipboard';

import { Block, Text } from "../components";
import * as theme from "../theme";
import * as mocks from "../mocks";

import firestore from '@react-native-firebase/firestore';

import { icon } from './iconConst'
let chapname = []

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fontsLoaded: false,
      meet: "",
      chapterName: []

    };
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
  }

  _handleAppStateChange = nextAppState => {
    console.log("clipboard");
    Clipboard.setString('hello world');
  };


  componentDidMount = async () => {
    AppState.addEventListener("change", this._handleAppStateChange);

    console.log("icon", icon)

    this.setState({ fontsLoaded: true });


    await firestore()
      .collection('meetlink')
      .doc("meet")
      .get()
      .then(documentSnapshot => {
        console.log('meet exists: ', documentSnapshot.exists);
        if (documentSnapshot.exists) {
          console.log('meet data: ', documentSnapshot.data());
          this.setState({ meet: documentSnapshot.data().link })

        }
        else {
        }
      });
    console.log("meet", this.state.meet);




    await firestore()
      .collection('ChapterOnly')
      .onSnapshot(querySnapshot => {
        const users = [];

        querySnapshot.forEach(documentSnapshot => {
          users.push(
            documentSnapshot.data(),
            // key: documentSnapshot.id,
          );
        });
        this.setState({ chapterName: users })
        console.log("newchap", users)
      })

  }

  renderChart() {
    const { chart } = this.props;
    const LineShadow = ({ line }) => (
      <Path
        d={line}
        fill="none"
        stroke={theme.colors.primary}
        strokeWidth={7}
        strokeOpacity={0.07}
      />
    );

    return (
      <Text style={{ color: 'blue' }}
      >
        Google
      </Text>
    );
  }

  renderHeader() {
    const { user } = this.props;

    return (
      <Block flex={0.42} column style={{ paddingHorizontal: 15 }}>
        <Block flex={false} row style={{ paddingVertical: 15 }}>
          <Block center>
            <Text h3 white style={{ marginRight: -(25 + 5) }}>
              ECS DEGREE M3 IT/COMP
            </Text>
          </Block>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Profile")}
          >
            <Image style={styles.avatar} source={user.avatar} />
          </TouchableOpacity>
        </Block>
        <Block card shadow color="white" style={styles.headerChart}>
          <Block row space="between" style={{justifyContent : "center",
                alignContent : "center",
                alignItems : "center",
                alignSelf : "center",
                 paddingHorizontal: 30 }} >
            <Block flex={false} row center>
              <View 
              style={{
                flexDirection : "row",
                justifyContent : "center",
                alignContent : "center",
                alignItems : "center",
                alignSelf : "center",
                
              }}
              >
              <Font
              name={"video"}
              style={{
                paddingRight : 15
              }}
              size={32}
              color={"red"}
            />
              <Text
                style={styles.meet}
                onPress={() => Linking.openURL(this.state.meet)}
                h1>
                LIVE SESSION
                 </Text>
              {/* <Text caption bold tertiary style={{ paddingHorizontal: 10 }}>
                -12%
              </Text> */}
              </View>
            </Block>

          </Block>

        </Block>
      </Block>
    );
  }

  renderRequest(request, i) {
    return (
      <Block row card shadow color="white" style={styles.request}>
        <Block
          flex={0.25}
          card
          column
          color="secondary"
          style={styles.requestStatus}
        >
          <Block flex={0.25} middle center color={theme.colors.primary}>
            <Text large white style={{ textTransform: "uppercase" }}>
              {i + 1}
            </Text>
          </Block>
          <Block flex={0.7} center middle>
            {/* <Text h2 white>
              {request.bloodType}
            </Text> */}
            <Font
              name={icon[i]}
              // style={imageStyles}
              size={32}
              color={"white"}
            />
          </Block>
        </Block>
        <Block flex={0.75} column middle>
          <Text h3 style={{ paddingVertical: 8 }}>
            {request.chapterName}
          </Text>
          <Text caption semibold>
            {/* {request.age} • {request.gender} • {request.distance}km •{" "}
            {request.time}hrs */}
          </Text>
        </Block>
      </Block>
    );
  }

  handleNavigate = async (request) => {
    console.log("handleNavigate", request)

    this.props.navigation.navigate("ChapPoint", {
      req: [request]
    })



  }

  renderRequests() {
    const { requests } = this.props;
    return (
      <Block flex={0.8} column color="gray2" style={styles.requests}>

        <ScrollView showsVerticalScrollIndicator={false}>
          {this.state.chapterName.map((request, i) =>
            (

              <TouchableOpacity onPress={() => this.handleNavigate(request)}
                activeOpacity={0.8}
                key={`request-${request.id}`}
              >
                {this.renderRequest(request, i)}
              </TouchableOpacity>
            )

          )}

          {/* <FlatList 
          data= {this.state.chapterName}
          renderItem={this.renderRequest}
          /> */}
        </ScrollView>
      </Block>
    );
  }

  render() {
    if (!this.state.fontsLoaded) {
      return (
        <Block center middle>
          <Image
            style={{ width: 140, height: 140 }}
            source={require("../assets/icon.png")}
          />
        </Block>
      );
    }

    return (
      <SafeAreaView style={styles.safe}>
        {this.renderHeader()}
        {this.renderRequests()}
      </SafeAreaView>
    );
  }
}

App.defaultProps = {
  user: mocks.user,
  requests: mocks.requests,
  chart: mocks.chart
};

export default App;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.primary
  },
  headerChart: {
    paddingTop: 30,
    paddingBottom: 30,
    zIndex: 1
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 25 / 2,
    marginRight: 5
  },
  requests: {
    marginTop: -55,
    paddingTop: 55 + 20,
    paddingHorizontal: 15,
    zIndex: -1
  },
  requestsHeader: {
    paddingHorizontal: 20,
    paddingBottom: 15
  },
  request: {
    padding: 20,
    marginBottom: 15
  },
  requestStatus: {
    marginRight: 20,
    overflow: "hidden",
    height: 90
  },
  meet: {
    fontWeight: "bold",
    color: "red",
   // textDecorationLine: "underline"
  }
});
