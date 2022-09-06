/* eslint-disable */
import * as React from "react";
import { Image, Text, View, StyleSheet, Pressable, Dimensions, Button } from "react-native";
import { VideoCard } from "../interfaces";
import moment from 'moment';
var { height, width } = Dimensions.get('window');
import { decode } from 'html-entities';

interface IProps {
    item: VideoCard
}

const styles = StyleSheet.create({


    image_wrapper: {
        position: "relative",
        width: '100%',
        alignItems: "center"
    },
    thumbnail: {
        width: 320,
        height: 193,
    },
    duration: {
        fontSize: 12,
        position: "absolute",
        bottom: "8px",
        right: "20px",
        backgroundColor: "black",
        color: "white",
        padding: "3px"
    },
    video_title_wrapper: {
        flexDirection: 'row',
        paddingBottom: "3px"
    },
    video_title: {
        width: 250,
        flex: 1,
        flexWrap: 'wrap',
        paddingBottom: "3px",

    },
    card_info: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    channel_image_wrapper: {
        padding: 4,
        borderRadius: 25,
        //  overflow: 'hidden'
    },

    card_text: {
        padding: 5,
        marginBottom: 10

    },
    channel_title: {
        maxWidth: "80%",
        color: "rgb(96,96,96)"
    },
    bottom_row_text: {
        maxWidth: "80%",
        color: "rgb(96,96,96)"
    },
    menu_button: {
        fontSize: 25,
    },
    menu: {

    },
    hover_buttons: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "white",
        marginTop: 15,
        width: "90%",
        position: "relative",
        bottom: 5,
        zIndex: 500,
        marginRight: 10,
        marginLeft: 10,
        justifyContent: "space-between",
    },
    hover_button: {
        backgroundColor: "#D7DBDD",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "50%",
        padding: 10,
        marginRight: 10,
        
        color: "#BDC3C7"
    },
     channel_image: {
   
        height: 40,
        width: 40,
        borderRadius: 25,
       
    }
});

const Card = ({ item }: IProps) => {

    const [isHovered, setIsHovered] = React.useState(false);
    const [isMenuPressed, setIsMenuPressed] = React.useState(false);
    console.log(item)

    const card_style = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: 'space-between',
        height: "auto",
               minHeight: "300px",
        marginBottom: 5,
        marginRight: 15,
         width: "98%",
        padding: 3,
        //paddingBottom: 20,
        cursor: "pointer",
        webkitTransition: "all .4s ease-in-out",
         transition: "all .4s ease-in-out",
        transform: isHovered ? "scale(1.1,1.1)" : "none",
        border: isHovered ? "#E5E4E2" : "none",
        position: "relative",
        opacity: 1,
        backgroundColor: "white",
        zIndex: isHovered ? 200 : 0,
        boxShadow: isHovered ? '2px 3px 9px #F4AAB9' : "none",
        
    };
   


    const format_number = (num: number): string => {
        return new Intl.NumberFormat('en-US', {
            //@ts-ignore
            notation: "compact",
            maximumFractionDigits: 1
        }).format(num)
    }

    const format_duration = (duration: string): string => {
        let string = moment.utc(moment.duration(duration, "seconds").asMilliseconds()).format("HH:mm:ss");
        let count = 0;
        for (let i = 0; i < string.length; i++) {
            if (string[i] === "0" || string[i] == ":") {
                count++;
            } else {
                break;
            }
        }
        return string.substring(count);

    }

    const handle_card_hover_enter = () => {
        console.log('hover');
        setIsHovered(true);
    }

    const handle_card_hover_leave = () => {
        setIsHovered(false);
    }

    const handle_menu_press = () => {
        setIsMenuPressed(true);

    }

    return (
        //@ts-ignore
        <View style={card_style} onMouseOver={() => handle_card_hover_enter()} onMouseLeave={() => handle_card_hover_leave()}>
            <View style={styles.image_wrapper}>
                <Image style={styles.thumbnail} source={{ uri: item.thumbnail }} />

                <Text style={styles.duration}>{format_duration(item.duration)}</Text>
            </View>
            <View style={styles.card_info}>
                <View style={styles.channel_image_wrapper}>
                    <Image style={styles.channel_image} source={{ uri: item.channelPicture }} />

                </View>
                <View style={styles.card_text}>
                    <View style={styles.video_title_wrapper}>
                        <Text style={styles.video_title}><b>{decode(item.title)}</b></Text>
                    </View>

                    <Text style={styles.channel_title}>{decode(item.channelTitle)}</Text>
                    <Text style={styles.bottom_row_text}>{format_number(item.viewCount)} views • {moment.utc(item.publishedAt).local().startOf('seconds').fromNow()}</Text>
                </View>
                <View>
                    {isHovered && <>
                        <Text onPress={() => handle_menu_press()} style={styles.menu_button}>&#8942;</Text>
                        {isMenuPressed && <View>
                            <Text>

                            </Text>
                        </View>}
                    </>
                    }
                </View>
            </View>
            {isHovered &&
                <View style={styles.hover_buttons}>
                    <Pressable style={styles.hover_button}><Text><b>WATCH LATER</b></Text></Pressable>
                    <Pressable style={styles.hover_button}><Text><b>ADD TO QUEUE</b></Text></Pressable>
                </View>}
        </View>
    )
}

export default Card;
