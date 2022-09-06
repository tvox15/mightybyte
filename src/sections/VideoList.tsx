/* eslint-disable */
import * as React from "react";
import { SafeAreaView, ScrollView, View, StyleSheet, ActivityIndicator, StatusBar } from "react-native";
import { YOUTUBE_REQUEST_URL, YOUTUBE_API_KEY, YOUTUBE_CHANNEL_PROFILE_PIC_URL, YOUTUBE_VIEW_COUNT_URL } from "../config";
import Card from "../components/Card";
import { VideoCard } from "../interfaces";

const styles = StyleSheet.create({
    container: {
        /*      flex: 1,
             justifyContent: "center",
             backgroundColor: "#ecf0f1",
             padding: 8 */
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    video_list: {
        flexDirection: "row",
        width: "100%",
        marginTop: "24px",
        display: "flex",
        flexWrap: "wrap",
        position: "relative",
        justifyContent: "flex-start",
    },


    scrollView: {
        backgroundColor: 'pink',
        marginHorizontal: 20,
    },
    card_wrapper: {
        alignItems: "center",
        marginBottom: "20px",
 
     },
    activity_indicator: {
        flex: 1,
        justifyContent: "center"
    }
});





const VideoList = () => {

    const [videoList, setVideoList] = React.useState<any>([]);
    const [nextPageToken, setNextPageToken] = React.useState<string>("");
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [loadMoreTriggered, setLoadMoreTriggered] = React.useState<boolean>(false);


    const create_video_card_obj = (items: any, profile_picture_list: any, video_api_call: any): VideoCard[] => {
        let video_card_array: VideoCard[] = [];
        items.forEach((item: any) => {
            let new_video_card: VideoCard = {
                videoId: item.id.videoId,
                publishedAt: item.snippet.publishedAt,
                channelId: item.snippet.channelId,
                title: item.snippet.title,
                description: item.snippet.description,
                thumbnail: item.snippet.thumbnails.high.url,
                channelTitle: item.snippet.channelTitle,
                liveBroadCastContent: item.snippet.liveBroadcastContent,
                publishTime: item.snippet.publishTime,
                channelPicture: profile_picture_list.items.filter((profile_picture_list_item: any) => profile_picture_list_item.id === item.snippet.channelId)[0].snippet.thumbnails.default.url,
                viewCount: video_api_call.items.filter((video_api_call_item: any) => video_api_call_item.id === item.id.videoId)[0].statistics.viewCount,
                duration: video_api_call.items.filter((video_api_call_item: any) => video_api_call_item.id === item.id.videoId)[0].contentDetails.duration
            };
            video_card_array.push(new_video_card);
        });
        return video_card_array;
    }

    // to get most of the card info
    const call_search_api = async () => {
        let url = `${YOUTUBE_REQUEST_URL}${YOUTUBE_API_KEY}`
        if (nextPageToken) {
            url += `&pageToken=${nextPageToken}`;
        }

        let response: Response = await fetch(url);
        let response_json = await response.json();
        return response_json;
    }

    // to get channel profile pic info
    const call_channel_api = async (new_channel_id_list: string) => {
        let url = `${YOUTUBE_CHANNEL_PROFILE_PIC_URL}${YOUTUBE_API_KEY}&id=${new_channel_id_list}`
        let response: Response = await fetch(url);
        let response_json = await response.json();
        return response_json;
    }

    const call_view_count_api = async (video_id_list: string) => {
        let url = `${YOUTUBE_VIEW_COUNT_URL}${YOUTUBE_API_KEY}&id=${video_id_list}`
        let response: Response = await fetch(url);
        let response_json = await response.json();
        return response_json;
    }


    const call_youtube_api = async () => {
        setIsLoading(true);

        // get search results
        let search_result = await call_search_api();

        // get comma separated string of channel names to use in api call to get channel profile pics
        let new_channel_id_list: string = search_result.items.map((item: any) => item.snippet.channelId).join(',');
        let video_id_list: string = search_result.items.map((item: any) => item.id.videoId).join(',');
        // call channel API
        let profile_picture_list = await call_channel_api(new_channel_id_list);

        let view_count_list = await call_view_count_api(video_id_list);

        setNextPageToken(search_result.nextPageToken);
        let newVideos: VideoCard[] = create_video_card_obj(search_result.items, profile_picture_list, view_count_list);
        setVideoList([...videoList, ...newVideos]);
        setIsLoading(false);
        setLoadMoreTriggered(false);
    }

    //@ts-ignore
    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };

    React.useEffect(() => {
        if (loadMoreTriggered) {
            call_youtube_api();
        }
        // eslint-disable-next-line
    }, [loadMoreTriggered])

    React.useEffect(() => {
        call_youtube_api();
        // eslint-disable-next-line
    }, [])

    if (isLoading && videoList.length === 0) {
        return <View style={styles.activity_indicator}> <ActivityIndicator size="large" /></View>
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                onScroll={({ nativeEvent }) => {
                    if (isCloseToBottom(nativeEvent)) {
                        setLoadMoreTriggered(true);
                    }
                }}
                scrollEventThrottle={400}
            >
                <View style={styles.video_list}>
                    {videoList.map((item: VideoCard) => {
                        return <View style={styles.card_wrapper} key={item.videoId}>
                            <Card key={item.videoId} item={item} />
                        </View>;
                    })}
                </View>
                {isLoading && <View style={styles.activity_indicator}> <ActivityIndicator size="large" /></View>}
            </ScrollView>
        </SafeAreaView >
    );
};

export default VideoList;
