import React, { Component } from 'react'
import NativeSelect from '@material-ui/core/NativeSelect';
import Button from '@material-ui/core/Button';
import Lists from './list';
import {
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    IconButton
  } from "@material-ui/core";
import { object } from 'prop-types';
var moment = require('moment');

export default class home extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {
             country:[{id:0,Nombre:''},{id:1,Nombre:'hn'},{id:2,Nombre:"usa"}],
             City:[{id:1,countryid:1,Nombre:'San Pedro Sula'},
             {id:2,countryid:1,Nombre:'Tegucigalpa'},
             {id:3,countryid:2,Nombre:'New York'},
             {id:4,countryid:2,Nombre:'San Francisco'}],
             clima:[],
             list:[],
             days:[],
             icon:'',
             max:0,
             min:0,
             actual:0,
             open:false,
             countryselected:0,
             cityselected:'',
            
        }
    }
    
    getClima=()=>{
        fetch(`http://api.openweathermap.org/data/2.5/forecast?appid=6df08d85734ed9d0d54672b831b8c9ae&q=`+this.state.cityselected+`,hn`).then(res => res.json()).then(
        data =>{
            let dias={};
            for(let x=0;x<data.list.length;x++){
                let item=data.list[x];
                let dia=moment(data.list[x].dt_txt).format('DD,MM');
               if(!(dia in dias))
                   dias[dia]=[];
               dias[dia].push(item);
            }
            let list=[];
               for(var e=0 ;e<Object.keys(dias).length;e++){
                   let keys=Object.keys(dias)[e];
                  list.push({temp:dias[keys][0].main.temp-273,
                            max:dias[keys][0].main.temp_max-273,
                            icon:dias[keys][0].weather.icon
                })
               }
               this.setState({list});
        });
    };

    generate=()=>{
        let dias={};
     for(let x=0;x<this.state.clima.list.length;x++){
         let item=this.state.clima.list[x];
         let dia=moment(this.state.clima.list[x].dt_txt).format('DD,MM');
        if(!(dia in dias))
            dias[dia]=[];
        dias[dia].push(item);
     }

        for(var e=0 ;e<Object.keys(dias).length;e++){
            let keys=Object.keys(dias)[e];
           console.log(keys);
        }
        
    }

    handleChangeCountry=(e,input)=>{
        this.setState({[input]:e.target.value});
    }
    
    generateCountry=()=>{
        return (<NativeSelect disableUnderline id="Country" defaultValue={this.state.countryselected} onChange={(e)=>this.handleChangeCountry(e,"countryselected")}>  
             {this.state.country.map(countrys=>
            <option value={countrys.id}>{countrys.Nombre}</option>
        )}
                </NativeSelect>);
    };

    
    
    generateCity=()=>{
        let selectCitys=[];
        let noSelected=[];
        {this.state.City.map(citys=>{
            if(citys.countryid==this.state.countryselected)
                selectCitys.push(citys);
            else{
                noSelected.push(citys);
            }
        })}    
        
        return (<NativeSelect disableUnderline id="City"  onChange={(e)=>this.handleChangeCountry(e,"cityselected")}>
        <option value="0"></option>  
        {selectCitys.map(citys=>
       <option value={citys.Nombre}>{citys.Nombre}</option>
   )}
           </NativeSelect>);

    }

    render() {
        let weathercard=[];
        for(let i=0;i<this.state.list.length;i++){
            weathercard.push(<div> temperatura maxima: {this.state.list[i].max} <br/> Temperatura actual: {this.state.list[i].temp}</div>)
        }

            return (
                <div style={{display: "flex",justifyContent: "center",alignItems:"center", textAlign: "center",  minHeight: 100}}> 
                {this.generateCountry()} {this.generateCity()}
                <Button onClick={this.getClima}>Clima</Button>
                
                <div>
                    {weathercard}
                </div>
                </div>
            );
       
        } 

}
