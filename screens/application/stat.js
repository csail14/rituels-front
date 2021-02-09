import React, { useState, useEffect } from 'react';
import {ImageBackground, StyleSheet, Text, View, Dimensions, TouchableOpacity,Button} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import {BarChart  } from "react-native-chart-kit";
import background from '../../assets/rituals-background.jpg'
import Header from '../../navigation/header-log'
import {connect} from 'react-redux';
import {getstatbymonth,getstatbyweek} from '../../api/statApi';
import moment from 'moment';
import 'moment/locale/fr';
moment.locale('fr');
import {getStatByMonthData} from '../../helpers/createStatCalendar'

const Stats = ({ navigation,user })=>{

  const [scale, setScale] = useState('week')
  const [dataSet, setDataSet] = useState([])
  const [labels,setlabels] = useState([])
  const [weekColor, setWeekcolor] = useState('#bdbdde')
  const [monthColor, setMonthcolor] = useState('#8484a3')

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

    const  setData = async ()=> {
      let index= user.current_subuser
      

      if(scale==='month'){
        getstatbymonth(user.subuser[index].id).then(
          (res)=>{
              let data =[]
              let thisMonth = (new Date()).getMonth()
              let thisYear = (new Date()).getFullYear()
              let calendar =["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet","Août","Septembre","Octobre","Novembre","Décembre"]
              let stat = [res.result[0].jan,res.result[0].fev,res.result[0].mars,res.result[0].april,res.result[0].may,res.result[0].june,res.result[0].july,res.result[0].augu,res.result[0].sept,res.result[0].oct,res.result[0].nov,res.result[0].dec]
              for (let i=-6;i<1;i++){
                  if(thisMonth+i<0){
                      data.push({
                          month:calendar[thisMonth+i+12],
                          data: stat[thisMonth+i+12],
                          year:thisYear-1
                      })
                  }
                  else{
                      data.push({
                          month:calendar[thisMonth+i],
                          data: stat[thisMonth+i],
                          year:thisYear
                      })
                  }
                }
                let label = data.map((item)=> {return item.month})
                setlabels(label)
                let dataStat = data.map((item)=> {return item.data})
                setDataSet(dataStat)
          }
        )
      }else if (scale==='week'){
        
        var last_monday= new Date();
        let lab = []
        let array=[]
        let datas = []
        getstatbyweek(user.subuser[index].id).then(
          (res)=>{
            for (const key in res.result[0]){
              array.push([key,res.result[0][key]])
            }
            array.sort( (a, b) => {
              return a[0] - b[0]
            })
            array.map((item)=>{
              lab.push(getDateOfWeek(item[0]))
              datas.push(item[1])
            })
            setlabels(lab)
            setDataSet(datas)
          }
        )
      }
    }

  const screenWidth = Dimensions.get("window").width;
  const chartConfig = {
    backgroundColor: "#e26a00",
    backgroundGradientFromOpacity: 1,
    backgroundGradientToOpacity: 1,
    backgroundGradientFrom: "#bdbdde",
    backgroundGradientTo: "#8585e6",
    color: (opacity = 1) => `rgba(24, 24, 26, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 1
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
            <Text  style={styles.text}>Rituels validés</Text>
            <BarChart
              data={dataMonth}
              width={screenWidth}
              height={hp('60%')}
              verticalLabelRotation={30}
              hideLegend={false}
              radius={32}
              style={{
                borderRadius: 16,
                paddingTop:40,
                marginBottom:5
              }}
              chartConfig={chartConfig}
            />
            
            <View style={styles.boutonView}>
            <TouchableOpacity style={styles.button}
                        onPress={
                          () => {
                            setScale('week')
                            setWeekcolor('#bdbdde')
                            setMonthcolor('#8484a3')
                            }
                        }>
                          <Text  style={[styles.textbouton, {backgroundColor:monthColor}]}>Hebdo</Text>   
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}
                        onPress={
                          () => {
                            setScale('month')
                            setWeekcolor('#8484a3')
                            setMonthcolor('#bdbdde')
                            }
                        }>
                          <Text  style={[styles.textbouton, {backgroundColor:weekColor}]}>Mensuel</Text>   
              </TouchableOpacity>
              
            </View>
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
    },
    text:{
      color:'white',
      textAlign:'center',
      fontSize:30
    },
    boutonView:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'center'
    },
    textbouton:{
      backgroundColor:'#bdbdde',
      padding:20,
      color:'white',
      borderColor:'white',
      borderRadius:100
    },
    button:{
      borderRadius:100
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