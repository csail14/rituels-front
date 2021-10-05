import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  ScrollView,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Button,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BarChart } from "react-native-chart-kit";
import background from "../../assets/rituals-background.jpg";
import Header from "../../navigation/header-log";
import { connect } from "react-redux";
import { getstatbymonth, getstatbyweek } from "../../api/statApi";
import moment from "moment";
import "moment/locale/fr";
moment.locale("fr");
import { useMediaQuery } from "react-responsive";
import SelectInput from "react-native-select-input-ios";

const Stats = ({ navigation, user, theme }) => {
  const [scale, setScale] = useState("week");
  const [dataSet, setDataSet] = useState([]);
  const [labels, setlabels] = useState([]);
  const [alltheme, setallTheme] = useState(theme.allTheme);
  const [selectedCat, setSelectedCat] = useState(theme.allTheme[0]);
  const [weekColor, setWeekcolor] = useState("#bdbdde");
  const [monthColor, setMonthcolor] = useState("#8484a3");

  const isPhone = useMediaQuery({
    query: "(max-device-width:450)",
  });

  let isFamily = user && user.infos && user.infos.product === "family";

  useEffect(() => {
    if (user.subuser) {
      setData();
    }
  }, [user]);

  useEffect(() => {
    if (user.subuser) {
      setData();
    }
  }, [scale, selectedCat]);

  const setOptionsCatArray = () => {
    let array = [];
    alltheme.forEach((item) => {
      let index = { value: item.id, label: item.name };
      array.push(index);
    });
    return array;
  };
  const optionsCategoryFamily = setOptionsCatArray();
  const optionsCategoryKids = optionsCategoryFamily.filter(
    (item) => item.value === 1
  );

  const setCatFromSelect = (value) => {
    let themeSelected = [];
    alltheme.forEach((item) => {
      if (item.id === value) {
        themeSelected.push(item);
      }
    });
    if (themeSelected.length) {
      setSelectedCat(themeSelected[0]);
    }
  };

  const getDateOfWeek = (w) => {
    var d = 1 + w * 7; // 1st of January + 7 days for each week
    let year = new Date().getFullYear();
    let date = new Date(year, 0, d);
    date.setDate(date.getDate() - ((date.getDay() + 6) % 7));
    return moment(date).format("DD/MM");
  };

  const setData = async () => {
    let index = user.current_subuser;
    if (scale === "month") {
      getstatbymonth(user.subuser[index].id, selectedCat.id).then((res) => {
        let data = [];
        let thisMonth = new Date().getMonth();
        let thisYear = new Date().getFullYear();
        let calendar = [
          "Janvier",
          "Février",
          "Mars",
          "Avril",
          "Mai",
          "Juin",
          "Juillet",
          "Août",
          "Septembre",
          "Octobre",
          "Novembre",
          "Décembre",
        ];
        for (let i = -6; i < 1; i++) {
          if (thisMonth + i < 0) {
            if (
              res.resultPastYear.filter(
                (item) => item["MONTH(date)"] === thisMonth + i + 13
              ).length > 0
            ) {
              data.push({
                month: calendar[thisMonth + i + 12],
                data: res.resultPastYear.filter(
                  (item) => item["MONTH(date)"] === thisMonth + i + 13
                )[0]["count(*)"],
                year: thisYear - 1,
              });
            } else {
              data.push({
                month: calendar[thisMonth + i + 12],
                data: 0,
                year: thisYear - 1,
              });
            }
          } else {
            if (
              res.result.filter(
                (item) => item["MONTH(date)"] === thisMonth + i + 1
              ).length > 0
            ) {
              data.push({
                month: calendar[thisMonth + i],
                data: res.result.filter(
                  (item) => item["MONTH(date)"] === thisMonth + i + 1
                )[0]["count(*)"],
                year: thisYear,
              });
            } else {
              data.push({
                month: calendar[thisMonth + i],
                data: 0,
                year: thisYear,
              });
            }
          }
        }
        let label = data.map((item) => {
          return item.month;
        });
        setlabels(label);
        let dataStat = data.map((item) => {
          return item.data;
        });
        setDataSet(dataStat);
      });
    } else if (scale === "week") {
      var last_monday = new Date();
      let lab = [];
      let array = [];
      let datas = [];
      getstatbyweek(user.subuser[index].id, selectedCat.id).then((res) => {
        for (const key in res.result[0]) {
          array.push([key, res.result[0][key]]);
        }
        array.sort((a, b) => {
          return a[0] - b[0];
        });
        array.map((item) => {
          lab.push(getDateOfWeek(item[0]));
          datas.push(item[1]);
        });
        setlabels(lab);
        setDataSet(datas);
      });
    }
  };

  const screenWidth = Dimensions.get("window").width;
  const chartConfig = {
    backgroundColor: "#e26a00",
    backgroundGradientFromOpacity: 1,
    backgroundGradientToOpacity: 1,
    backgroundGradientFrom: "#bdbdde",
    backgroundGradientTo: "#8585e6",
    color: (opacity = 1) => `rgba(24, 24, 26, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 1,
  };

  const dataMonth = {
    labels: labels,
    datasets: [
      {
        data: dataSet,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ["Cycles validés"], // optional
  };
  return (
    <View style={styles.container}>
      <Header screen="Stat" navigation={navigation} />

      <ImageBackground source={background} style={styles.image}>
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: "center",
            height: hp("120%"),
          }}
        >
          {!isPhone && (
            <View style={styles.boutonView}>
              {alltheme.map((item) => {
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[styles.catbutton, { backgroundColor: item.color }]}
                    onPress={() => {
                      isFamily || item.id === 1 ? setSelectedCat(item) : null;
                    }}
                  >
                    <Text
                      style={[
                        styles.textcatbouton,
                        {
                          marginTop: 10,
                          opacity: isFamily || item.id === 1 ? 1 : 0.33,
                        },

                        selectedCat.id == item.id ? styles.pressed : "",
                      ]}
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
          <Text style={styles.text}>Nombre de Rituels validés</Text>
          {isPhone && (
            <>
              <Text style={styles.text}>Catégorie :</Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <SelectInput
                  value={selectedCat.id}
                  style={styles.selectInput}
                  labelStyle={{
                    color: "white",
                    fontSize: 20,
                  }}
                  cancelKeyText="Annuler"
                  submitKeyText="Valider"
                  onSubmitEditing={(value) => {
                    setCatFromSelect(value);
                  }}
                  options={
                    isFamily ? optionsCategoryFamily : optionsCategoryKids
                  }
                />
              </View>
            </>
          )}
          <BarChart
            data={dataMonth}
            width={screenWidth}
            height={hp("60%")}
            verticalLabelRotation={30}
            hideLegend={false}
            radius={32}
            style={{
              borderRadius: 16,
              paddingTop: 10,
              margin: 5,
              paddingTop: 30,
            }}
            chartConfig={chartConfig}
          />

          <View style={styles.boutonView}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setScale("week");
                setWeekcolor("#bdbdde");
                setMonthcolor("#8484a3");
              }}
            >
              <Text
                style={[styles.textbouton, { backgroundColor: monthColor }]}
              >
                Hebdo
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setScale("month");
                setWeekcolor("#8484a3");
                setMonthcolor("#bdbdde");
              }}
            >
              <Text style={[styles.textbouton, { backgroundColor: weekColor }]}>
                Mensuel
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 30,
    marginTop: 10,
  },
  boutonView: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 10,
  },
  textbouton: {
    backgroundColor: "#bdbdde",
    padding: 20,
    color: "white",
    borderColor: "white",
    borderRadius: 100,
  },
  catbutton: {
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
    //width:'10%',
    borderColor: "black",
    borderRadius: 5,
    borderWidth: 1,
  },
  pressed: {
    color: "white",
  },
  button: {
    borderRadius: 100,
  },
  selectInput: {
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    maxWidth: 500,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "white",
  },
});

mapDispatchToProps = {};

mapStateToProps = (store) => {
  return {
    user: store.user,
    theme: store.theme,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Stats);
