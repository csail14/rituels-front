import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
} from "react-native";
import { config } from "../../../config";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import background from "../../assets/rituals-background.jpg";
import moment from "moment";
import "moment/locale/fr";
moment.locale("fr");
import { Video } from "expo-av";
import { loadProgress } from "../../actions/progress/progressActions";
import { sendNotification } from "../../helpers/notification";
import Menu from "../../navigation/menu";
import Validate from "../../component/validate";
import { getCycle, getVideo, getAllCycle } from "../../api/cycleApi";
import { buildI18n } from "../../i18n/index";
import { connect } from "react-redux";
import { loadCycleInfo } from "../../actions/cycle/cycleActions";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";
import { getStateByWeek } from "../../api/awardApi";

const Rituels = (props) => {
  const [video, setvideo] = useState("");
  const [cycle, setCycle] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [isCycleDone, setisCycleDone] = useState(false);
  const [list, setlist] = useState([]);
  const [index, setIndex] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [height, setHeight] = useState(hp("100%"));

  let ref = React.createRef();
  const i18n = buildI18n(props.user);
  useEffect(() => {
    if (true) {
      getAllCycle().then((res) => {
        props.loadCycleInfo(
          {},
          res.result,
          props.cycle.duration,
          props.cycle.cat
        );
      });
    }
    if (index == 0) {
      sendMessage();
    }
  }, []);

  const sendMessage = () => {
    let message =
      props.user.subuser[props.user.current_subuser].name + " lance un rituel.";
    sendNotification(message, props.user.infos.uuid);
  };

  useEffect(() => {
    randomCycle();
  }, [props.cycle.allCycle]);

  useEffect(() => {
    if (video) {
      if (ref.replayAsync) {
        ref.setPositionAsync(0);
        ref.playAsync();
      }
      setVideoUrl(config.video_url + video.url);
    }
  }, [video]);

  useEffect(() => {
    if (list) {
      if (list[0]) {
        getVideo(list[0]).then((res) => {
          setvideo(res.result[0]);
        });
      }
    }
  }, [list]);

  useEffect(() => {
    if (index == 7) {
      sendMessage();
    }
    if (index >= 0 && index < 11) {
      getVideo(list[index]).then((res) => {
        setvideo(res.result[0]);
      });
    }
  }, [index]);

  useEffect(() => {
    if (cycle) {
      let arrayVideo = JSON.parse(cycle.video);
      setlist(arrayVideo);
    }
  }, [cycle]);

  const filtreCycle = () => {
    let i = props.user.current_subuser;
    const lang =
      props.user && props.user.subuser[i] && props.user.subuser[i].lang;
    let age =
      Math.floor(
        new Date().getTime() -
          new Date(props.user.subuser[i].birth_date).getTime()
      ) /
      (365.24 * 24 * 3600 * 1000);
    let user_age = Math.trunc(age);

    let possibleCycle = props.cycle.allCycle.filter(
      (item) =>
        props.cycle.duration == item.duration &&
        item.age_min <= user_age &&
        item.age_max >= user_age &&
        props.cycle.cat.id == item.theme_id &&
        item.lang.toUpperCase() === lang.toUpperCase()
    );
    if (possibleCycle.length == 0 && props.cycle.allCycle.length !== 0) {
      window.alert(i18n.t("error.Aucun rituel disponible dans votre langue"));
      props.navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    }
    return possibleCycle;
  };

  const randomCycle = () => {
    let possibleCycle = filtreCycle();
    let max = possibleCycle.length - 1;
    let random = Math.floor(Math.random() * (max + 1));
    let selectedCycle = possibleCycle[random];
    setCycle(selectedCycle);
    setShowMenu(false);
    if (ref.replayAsync) {
      ref.setPositionAsync(0);
      ref.playAsync();
    }
  };

  const nextVideo = () => {
    if (index < 10) {
      setIndex(index + 1);
    }
  };

  const launchCelebration = () => {
    setVideoUrl(
      "https://res.cloudinary.com/dmpzubglr/video/upload/v1612448051/general/Vid%C3%A9o_Pr%C3%A9sentation-720p-210204_ywvr3d.mp4"
    );
  };

  const handleVideoRef = (component) => {
    ref = component;
  };

  const onSwipeLeft = (gestureState) => {
    let i = props.user.current_subuser;
    let age =
      Math.floor(
        new Date().getTime() -
          new Date(props.user.subuser[i].birth_date).getTime()
      ) /
      (365.24 * 24 * 3600 * 1000);
    let user_age = Math.trunc(age);
    ref.getStatusAsync().then((status) => {
      if (status.positionMillis === status.durationMillis || user_age > 18) {
        if (isCycleDone === true) {
          props.navigation.reset({
            index: 0,
            routes: [{ name: "Home" }],
          });
        } else {
          if (index === list.length - 1) {
            setVideoUrl(null);
            setisCycleDone(true);
          } else {
            ref.setPositionAsync(0);
            ref.playAsync();
            nextVideo();
          }
        }
      }
    });
  };
  const onSwipeRight = (gestureState) => {
    setShowMenu(true);
  };

  const restart = () => {
    setIndex(0);
    ref.setPositionAsync(0);
    ref.playAsync();
    setShowMenu(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.maincontent}>
        {showMenu && (
          <Menu
            screen="Rituels"
            randomCycle={randomCycle}
            restart={restart}
            setShowMenu={setShowMenu}
            navigation={props.navigation}
            style={styles.menu}
          />
        )}

        <GestureRecognizer
          onSwipeLeft={(state) => onSwipeLeft(state)}
          onSwipeRight={(state) => onSwipeRight(state)}
          config={{ velocityThreshold: 0.3, directionalOffsetThreshold: 80 }}
        >
          {videoUrl !== null && (
            <Video
              ref={handleVideoRef}
              source={{ uri: videoUrl }}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              useNativeControls={true}
              resizeMode="contain"
              shouldPlay={true}
              onTouchStart={true}
              fullscreen={false}
              isLooping={false}
              switchToLandscape={() => {
                setShowMenu(true);
              }}
              style={{ width: Dimensions.get("window").width, height: height }}
            />
          )}
        </GestureRecognizer>
        {isCycleDone && (
          <Validate
            cycle_id={cycle.id}
            theme_id={props.cycle.cat.id}
            launchCelebration={launchCelebration}
            navigation={props.navigation}
            t={i18n.t}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  maincontent: {
    display: "flex",
    flexDirection: "row",
  },
  menu: {
    position: "absolute",
    left: 0,
    bottom: 0,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

mapDispatchToProps = {
  loadCycleInfo,
  loadProgress,
};

mapStateToProps = (store) => {
  return {
    user: store.user,
    cycle: store.cycle,
    progress: store.progress,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Rituels);
