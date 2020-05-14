import React from 'react';
import { shallow } from "enzyme";
import { App, createDummyArray } from './example/App';
import handleCheckbox from "./index";
import { SHIFT_CODE } from "./HandleCheckboxHOC";

export const commonTestCase = (dataType = "Object", configuration = {}) => {

    const map = {};

    document.addEventListener = jest.fn((event, cb) => {
        map[event] = cb;
    });

    const HandleCheckboxWrapper = handleCheckbox(<App /> , configuration);
    const appWrapperInstance = shallow(<HandleCheckboxWrapper />).instance();

    let totalItems = createDummyArray(7,dataType);


    it("Should update overall list items", () => {
        appWrapperInstance.updateTotalItems(totalItems);
        appWrapperInstance.getKeyToCheck();
        expect(appWrapperInstance.totalItems).toEqual(totalItems);
      });
    
      it("Should add checked items if key doesnt exist", () => {
        let checkedItem = totalItems[0];
        appWrapperInstance.updateCheckedItems(checkedItem);
        expect(appWrapperInstance.state.checkedItems.length).toEqual(1);
        expect(appWrapperInstance.state.checkedItems[0]).toEqual(totalItems[0]);
        expect(appWrapperInstance.lastCheckedItem).toEqual(totalItems[0]);
        checkedItem = totalItems[1];
        appWrapperInstance.updateCheckedItems(checkedItem);
        expect(appWrapperInstance.state.checkedItems.length).toEqual(2);
        expect(appWrapperInstance.state.checkedItems[1]).toEqual(totalItems[1]);
        expect(appWrapperInstance.lastCheckedItem).toEqual(totalItems[1]);
      });
    
      it("Should remove key if already exist", () => {
        let checkedItem = totalItems[0];
        appWrapperInstance.updateCheckedItems(checkedItem);
        expect(appWrapperInstance.state.checkedItems.length).toEqual(1);
        expect(appWrapperInstance.state.checkedItems[0]).toEqual(totalItems[1]);
        expect(appWrapperInstance.lastCheckedItem).toEqual(totalItems[0]);
      });
    
      it("Should add all ids if check all", () => {
        appWrapperInstance.checkAll();
        expect(appWrapperInstance.state.checkedItems).toEqual(totalItems);
      });
    
      it("Should remove all ids if uncheck all", () => {
        appWrapperInstance.uncheckAll();
        expect(appWrapperInstance.state.checkedItems).toEqual([]);
      });
    
      /**  Shift key test cases -------------------------------- */

      if(map.keydown) {

        it("Should not set shift key property if any other key is pressed", () => {

            map.keydown({ keyCode: 7 });
            expect(appWrapperInstance.isShiftKeyPressed).toBeFalsy();
        
          });
        
          it("Should set shift key property to true", () => {
            
            map.keydown({ keyCode: SHIFT_CODE });
            expect(appWrapperInstance.isShiftKeyPressed).toBeTruthy();
           
          });
        
          it("Should add the element if no checked items is empty", () => {
    
            let checkedItem = totalItems[0];
            appWrapperInstance.updateCheckedItems(checkedItem);
            expect(appWrapperInstance.state.checkedItems.length).toEqual(1);
            expect(appWrapperInstance.state.checkedItems[0]).toEqual(totalItems[0]);
            expect(appWrapperInstance.lastCheckedItem).toEqual(totalItems[0]);
            map.keyup({ keyCode: SHIFT_CODE });
              
          });
        
          it("Should add all the element till 4 element", () => {
    
            map.keydown({ keyCode: SHIFT_CODE });
            let checkedItem = totalItems[4];
            appWrapperInstance.updateCheckedItems(checkedItem);
            expect(appWrapperInstance.state.checkedItems.length).toEqual(5);
            expect(appWrapperInstance.lastCheckedItem).toEqual(totalItems[4]);
            map.keyup({  keyCode: SHIFT_CODE });
    
          });
        
          it("Should remove all the element between 2 and 4 element as both are checked", () => {
        
            map.keydown({ keyCode: SHIFT_CODE });
            let checkedItem = totalItems[2];
            appWrapperInstance.updateCheckedItems(checkedItem);
            expect(appWrapperInstance.state.checkedItems.length).toEqual(2);
            expect(appWrapperInstance.lastCheckedItem).toEqual(totalItems[2]);
            map.keyup({  keyCode: SHIFT_CODE });
            
          });
        
          it("Should add or remove 2 element as current checked and last checked are same", () => {
        
            map.keydown({ keyCode: SHIFT_CODE });
            let checkedItem = totalItems[2];
            appWrapperInstance.updateCheckedItems(checkedItem);
            expect(appWrapperInstance.state.checkedItems.length).toEqual(3);
            expect(appWrapperInstance.lastCheckedItem).toEqual(totalItems[2]);
            map.keyup({  keyCode: SHIFT_CODE });
            map.keydown({ keyCode: SHIFT_CODE });
            checkedItem = totalItems[2];
            appWrapperInstance.updateCheckedItems(checkedItem);
            expect(appWrapperInstance.state.checkedItems.length).toEqual(2);
            expect(appWrapperInstance.lastCheckedItem).toEqual(totalItems[2]);
            map.keyup({  keyCode: SHIFT_CODE });
            
          });
        
          it("Shouldremove all elements as last checked is unchecked and current is checked", () => {
        
            map.keydown({ keyCode: SHIFT_CODE });
            let checkedItem = totalItems[0];
            appWrapperInstance.updateCheckedItems(checkedItem);
            expect(appWrapperInstance.state.checkedItems.length).toEqual(0);
            expect(appWrapperInstance.lastCheckedItem).toEqual(totalItems[0]);
            map.keyup({  keyCode: SHIFT_CODE });
            
          });
    
      }

      it("unmount should remove the listeners if exist", () => {

        appWrapperInstance.componentWillUnmount();
        
      });
    
      

}