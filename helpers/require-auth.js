import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Routes from "../navigation/routes";
import axios from "axios";
import { config } from "../config";
import { connect } from "react-redux";
import { getCount } from "../api/eventApi";
import { getAllTheme } from "../api/themeApi";
import { loadUserInfo } from "../actions/user/userActions";
import MainAccount from "../screens/account/mainAccount";
import moment from "moment";
import "moment/locale/fr";
moment.locale("fr");
import { loadProgress } from "../actions/progress/progressActions";
import { getStateByWeek } from "../api/awardApi";
import { getAllLevel } from "../api/levelApi";
import { loadLevel } from "../actions/level/levelActions";
import { loadTheme } from "../actions/theme/themeActions";

const RequireAuth = (props) => {
  const [isLogged, setIsLogged] = useState(false);
  const [hasPaid, setHasPaid] = useState(false);

  useEffect(() => {
    retrieveData();
  }, []);

  useEffect(() => {}, [props.user]);

  const retrieveData = async () => {
    const token = await AsyncStorage.getItem("4brntoken");
    const storageSubuser = await AsyncStorage.getItem("@storage_subuser");
    if (props.user.isLogged === false || props.user.isLogged == null) {
      try {
        if (token === null) {
          setIsLogged(false);
          props.loadUserInfo(false, null, null, 0);
        } else {
          axios
            .get(config.api_url + "/api/v1/checkToken", {
              headers: { "x-access-token": token },
            })
            .then((response) => {
              if (response.data.status !== 200) {
                setIsLogged(false);
                props.loadUserInfo(false, null, null, 0);
              } else {
                setIsLogged(true);
                axios
                  .get(
                    config.api_url +
                      "/api/v1/subuser/get/all/" +
                      response.data.user.id,
                    { headers: { "x-access-token": token } }
                  )
                  .then((res) => {
                    let subuser = res.data.result;
                    let user = response.data.user;

                    if (user.isPaid) {
                      setHasPaid(true);
                    }
                    user.token = token;
                    let current_subuser = 0;
                    if (storageSubuser !== null) {
                      current_subuser = storageSubuser;
                    }
                    props.loadUserInfo(true, user, subuser, current_subuser);
                    getAllTheme().then((restheme) => {
                      loadTheme(restheme.result, restheme.result[0]);
                      getCount(
                        subuser[current_subuser].id,
                        moment(new Date()).format("W"),
                        restheme.result
                      ).then((resultobj) => {
                        getStateByWeek(
                          moment(new Date()).format("W"),
                          subuser[current_subuser].id,
                          restheme.result
                        ).then((resultstate) => {
                          props.loadProgress(resultstate, resultobj);
                        });
                      });
                      let allLevel = [];
                      for (let i = 0; i < restheme.result.length; i++) {
                        let item = {};
                        getAllLevel(
                          subuser[current_subuser].id,
                          restheme.result[i].id
                        ).then((result) => {
                          item.id = restheme.result[i].id;
                          item.level = result;
                          allLevel.push(item);
                        });
                      }
                      props.loadLevel(allLevel);
                    });
                  });
              }
            });
        }
      } catch (error) {
        console.log("error ?");
      }
    }
  };
  return <React.Fragment>{isLogged ? <Routes /> : <Routes />}</React.Fragment>;
};

mapDispatchToProps = {
  loadUserInfo,
  loadProgress,
  loadLevel,
  loadTheme,
};

mapStateToProps = (store) => {
  return {
    user: store.user,
    theme: store.theme,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RequireAuth);
