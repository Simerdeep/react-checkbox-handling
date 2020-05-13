//@flow

import React, { PureComponent } from 'react';
import Table from 'react-bootstrap/Table';

import './App.css';
import  handleCheckbox  from '../HandleCheckboxHOC';

function createDummyArray(arraySize) {
  
  let dummyData = [];

  for(let value = 0 ; value < arraySize ;value ++) {

    let dummyvalue = "Test" + value;

    dummyData.push ({
      fName: dummyvalue,
      lName: dummyvalue,
      username: dummyvalue,
      id: value,
    });
  }

  return dummyData;
}

type Props = {

  checkedItems: Array<Object>,
  uncheckAll: () => void,
  checkAll: () => void,
  updateCheckedItems: (checkedItems: Object) => void,
  updateTotalItems: (totalData: Array<Object>) => void
}

class App extends PureComponent<Props,{}> {

  dummyArray = createDummyArray(6);

  componentDidMount() {
    this.props.updateTotalItems(this.dummyArray);
  }

  componentDidUpdate() {
   // this.props.updateTotalItems(this.dummyArray);

  }

  render() {
   
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
    
        <tbody>
          <tr key={"All"}>
            <td>
              <input type="checkbox" id={"All"} name={"All"} checked={this.props.checkedItems.length === this.dummyArray.length} onChange={() => this.handleChange(null, true)}/>
            </td>
            <td>{"All"}</td>
            <td>{"All"}</td>
            <td>{"All"}</td>
          </tr>
    
          {
            this.dummyArray.map((data,index) =>{
              return (
                <tr key={index}>
                  <td>
                    <input type="checkbox" id={index} name={index} checked={this.isCheckboxValueExist(index)} onChange={() => this.handleChange(data)}/>
                  </td>
                  <td>{data.fName}</td>
                  <td>{data.lName}</td>
                  <td>{data.username}</td>
                </tr>
              )
            
            })
          }
        
        </tbody>
    
      </Table>
    );

  }

  isCheckboxValueExist = (index: number) => {

    return this.props.checkedItems.some((data) => {
      return data.id === this.dummyArray[index].id
    });
  }

  handleChange = (data: Object, isAll: boolean = false) => {
    if(isAll && this.props.checkedItems.length !== this.dummyArray.length)
      this.props.checkAll();
    else if( isAll )
      this.props.uncheckAll();
    else
      this.props.updateCheckedItems(data)
  }
  
}

export default handleCheckbox(App,{checkboxKey: 'id', isShiftRequired: true})

