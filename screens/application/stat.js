import React, { useState, useEffect } from 'react';
import {ImageBackground, StyleSheet, Text, View, Dimensions, TouchableOpacity,Button} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import {BarChart  } from "react-native-chart-kit";
import background from '../../assets/rituals-background.jpg'
import Header from '../../navigation/header-account'
import {connect} from 'react-redux';
import {getstatbymonth,getstatbyweek} from '../../api/statApi';
import moment from 'moment';
import 'moment/locale/fr';
moment.locale('fr');

const Stats = ({ navigation,user })=>{

  const [scale, setScale] = useState('week')
  const [dataSet, setDataSet] = useState([])
  const [labels,setlabels] = useState([])

  useEffect(()=>{

    if(user.subuser){
        setData()
      }
    }, [user])

    useEffect(()=>{
      if(user.subuser){
          setData()
        }
      }, [scale])


      const getDateOfWeek = (w) => {
        var d = (1 + (w) * 7); // 1st of January + 7 days for each week
        let year = (new Date()).getFullYear()
        let date = new Date(year, 0, d);
        date.setDate(date.getDate() - (date.getDay() + 6) % 7);
        return moment(date).format('DD/MM');
    }

    const setData = ()=> {
      if(scale==='month'){
        setlabels(["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet","Août","Septembre","Octobre","Novembre","Décembre"])
        getstatbymonth(user.subuser[0].id).then(
          (res)=>{
            let data = [res.result[0].jan,res.result[0].fev,res.result[0].mars,res.result[0].april,res.result[0].may,res.result[0].june,res.result[0].july,res.result[0].augu,res.result[0].sept,res.result[0].oct,res.result[0].nov,res.result[0].dec]
            setDataSet(data)
          }
        )
      }else if (scale==='week'){
        
        var last_monday= new Date();
        console.log('semaine',getDateOfWeek(3,2021))
        let lab = []
        let datas = []
        getstatbyweek(user.subuser[0].id).then(
          (res)=>{
            let keys = Object.keys(res.result[0])
            let values = Object.values(res.result[0])
            keys.map((key)=>{
              lab.push(getDateOfWeek(key))
            })
            setlabels(lab)
            values.map((value)=>{
              datas.push(value)
            })
            setDataSet(datas)
          }
        )
      }
    }

  const screenWidth = Dimensions.get("window").width;
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0.5,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.4,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };


  const dataMonth = {
    labels:labels ,
    datasets: [
      {
        data: dataSet,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
    legend: ["Cycles validés"] // optional
  };
    return (
        <View style={styles.container}>
          <Header screen='Stat' navigation={navigation}/>
          
            <ImageBackground source={background} style={styles.image}>
            
            <BarChart
              data={dataMonth}
              width={screenWidth}
              height={400}
              verticalLabelRotation={30}
              chartConfig={chartConfig}
            />
            
            </ImageBackground>
            
            
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"
    }
  });

mapDispatchToProps = {

}

mapStateToProps = (store)=>{
    return {
        user: store.user
    }
}
export default  connect(mapStateToProps, mapDispatchToProps)(Stats);