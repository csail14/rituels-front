import {getstatbymonth} from '../api/statApi'


export async function  getStatByMonthData(id) {
    let data = []
    getstatbymonth(id).then(
        (res)=>{
            
            let thisMonth = (new Date()).getMonth()
            let thisYear = (new Date()).getFullYear()
            let calendar =["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet","Août","Septembre","Octobre","Novembre","Décembre"]
            let stat = [res.result[0].jan,res.result[0].fev,res.result[0].mars,res.result[0].april,res.result[0].may,res.result[0].june,res.result[0].july,res.result[0].augu,res.result[0].sept,res.result[0].oct,res.result[0].nov,res.result[0].dec]
            for (let i=-6;i<1;i++){
                if(thisMonth+i<0){
                    data.push({
                        month:calendar[thisMonth+i+12],
                        data: stat[thisMonth+i+12]
                    })
                }
                else{
                    data.push({
                        month:calendar[thisMonth+i],
                        data: stat[thisMonth+i]
                    })
                }
                
            }
            return data
        }
      )
    return data
  }

  