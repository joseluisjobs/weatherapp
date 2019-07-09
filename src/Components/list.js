import React, { Component } from 'react'
import {
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    IconButton
  } from "@material-ui/core";
export default class list extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             main:''
        }
    }
  
    render() {
        
        console.log(list);
        return (
            <div>
      <ListItem key={1}>
          dk
        <ListItemText primary="BAIA" />
      </ListItem>

            </div>
        )
    }
}
