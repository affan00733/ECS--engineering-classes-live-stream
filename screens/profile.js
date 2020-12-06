import React from "react";
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity, Linking, FlatList,
    BackHandler, ToastAndroid, AppState

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
import auth from '@react-native-firebase/auth';

import { icon } from './iconConst'
let chapname = []

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fontsLoaded: false,
            meet: "",
            chapterName: [],
            user: ""

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


        this.setState({ fontsLoaded: true });

        await auth().onAuthStateChanged((user) => {
            if (user) {
                console.log(user)
                this.setState({ user: user.email })
            }

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
            <LineChart
                yMin={0}
                yMax={10}
                data={chart}
                style={{ flex: 2 }}
                curve={shape.curveMonotoneX}
                svg={{
                    stroke: theme.colors.primary,
                    strokeWidth: 1.25
                }}
                contentInset={{ left: theme.sizes.base, right: theme.sizes.base }}
            >
                <LineShadow belowChart={true} />
                <Line
                    key="zero-axis"
                    x1="0%"
                    x2="100%"
                    y1="50%"
                    y2="50%"
                    belowChart={true}
                    stroke={theme.colors.gray}
                    strokeDasharray={[2, 10]}
                    strokeWidth={1}
                />
            </LineChart>
        );
    }


    renderHeader() {
        const { user } = this.props;

        return (
            <Block flex={0.92} column style={{ paddingHorizontal: 15 }}>
                <Block flex={false} row style={{ paddingVertical: 15 }}>
                    <Block center>
                        <Text h3 white style={{ marginRight: -(25 + 5) }}>
                            Profile
            </Text>
                    </Block>
                    <Image style={styles.avatar} source={user.avatar} />
                </Block>
                <Block card shadow color="white" style={styles.headerChart}>
                    <ScrollView>
                        <Block center flex={1}>
                            <Text bold h2 style={{ color: "red" }}>
                                WELCOME TO ECS 2.0!
                        </Text>

                            <Block flex={false} row center style={{ paddingTop: 10 }}>
                                <Text title bold primary style={{ paddingHorizontal: 10 }}>
                                    Username :
                                </Text>
                                <Text style={{ textDecorationLine: "underline" }} bold title>{this.state.user}</Text>
                            </Block>
                            <Block flex={false} row center style={{ paddingTop: 10 }}>
                                <Text body semibold style={{ paddingHorizontal: 10 }}>
                                    ECS Academy welcomes you on our own personlised platform for smart learning.
                            </Text>
                            </Block>
                            <Block flex={false} row center style={{ paddingTop: 10 }}>
                                <Text title primary bold style={{ paddingHorizontal: 10 }}>
                                    What's New with 2.0?
                             </Text>
                            </Block>

                        </Block>
                        <Block flex={1}>
                            <Block flex={false} row style={{ paddingTop: 10 }}>
                                <Text body semibold style={{ paddingHorizontal: 10 }}>
                                    - Embedded zoom link for safe and quick login directing you to a live session with our very own Shaban Sir.
                             </Text>
                            </Block>

                            <Block flex={false} row style={{ paddingTop: 10 }}>
                                <Text body semibold style={{ paddingHorizontal: 10 }}>
                                    - Optimized video player with '10s' double tap skip gesture.

                             </Text>
                            </Block>

                            <Block flex={false} row style={{ paddingTop: 10 }}>
                                <Text body semibold style={{ paddingHorizontal: 10 }}>
                                    - New and Improved UI for efficient user experience.

                             </Text>
                            </Block>

                            <Block flex={false} row style={{ paddingTop: 10 }}>
                                <Text body semibold style={{ paddingHorizontal: 10 }}>
                                    For Further Support, feel free to contact us on,
                             </Text>
                            </Block>
                            <Block flex={false} row style={{ paddingTop: 10 }}>
                                <Text body semibold style={{ paddingHorizontal: 10 }}>
                                    Our helpline number - <Text bold
                                        onPress={() => Linking.openURL("whatsapp://send?phone=+918451067452")}

                                    >8451067452  </Text>
                                    <Font
                                        name={"whatsapp"}
                                        style={{
                                            // margin: 15
                                        }}
                                        size={20}
                                        color={"green"}
                                    />
                                </Text>
                            </Block>
                            <Block flex={false} row style={{ paddingTop: 10 }}>
                                <Text body semibold style={{ paddingHorizontal: 10 }}
                                    onPress={() => Linking.openURL("mailto:shabanrazvi@gmail.com ")}
                                >
                                    E-mail Address - <Text bold>shabanrazvi@gmail.com  </Text>
                                    <Font
                                        name={"envelope-open-text"}
                                        style={{
                                            // margin: 15
                                        }}
                                        size={20}
                                        color={"#D61B1F"}
                                    />
                                </Text>
                            </Block>
                            <Block flex={false} row style={{ paddingTop: 10 }}>
                                <Text body semibold style={{ paddingHorizontal: 10 }}
                                >
                                    You can also find us on,

                                </Text>
                            </Block>
                            <Block flex={false} row style={{ paddingTop: 10 }}>
                                <Text body style={{ paddingHorizontal: 10 }}
                                >
                                    - <Text bold
                                        onPress={() => Linking.openURL("https://instagram.com/ecsacademy?igshid=17ylvd47rpe6y")}
                                    >ECS ACADEMY  </Text>
                                    <Font
                                        name={"instagram"}
                                        style={{
                                            // margin: 15
                                        }}
                                        size={20}
                                        color={"#C13584"}
                                    />
                                </Text>
                            </Block>
                            <Block flex={false} row style={{ paddingTop: 10 }}>
                                <Text body style={{ paddingHorizontal: 10 }}
                                >
                                    - <Text bold
                                        onPress={() => Linking.openURL("https://www.youtube.com/channel/UC6FgV5ODbr32HbFLm65XPlw")}
                                    >ECS Academy by Shaban Sir  </Text>
                                    <Font
                                        name={"youtube"}
                                        style={{
                                            // margin: 15
                                        }}
                                        size={20}
                                        color={"#FF0000"}
                                    />
                                </Text>
                            </Block>
                        </Block>
                    </ScrollView>

                    {/* <Block row space="between" style={{ paddingHorizontal: 30 }}>
                       
                        <Block flex={false} row center>
                            <Text h3 bold primary style={{ paddingHorizontal: 10 }}>
                                User :
              </Text>
                            <Text bold h3>{this.state.user}</Text>
                        </Block>
                        
                    </Block> */}

                    {/* <Block
                        flex={0.5}
                        row
                        space="between"
                        style={{ paddingHorizontal: 30 }}
                    >
                        <Text caption semibold>
                            Shaban Sir
            </Text>
                        <Text caption semibold>
                            ECS ACADEMY
            </Text>
                    </Block> */}

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
                {/* {this.renderRequests()} */}
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
        color: "blue",
        textDecorationLine: "underline"
    },
    whats: {
        justifyContent: "center"
    }
});
