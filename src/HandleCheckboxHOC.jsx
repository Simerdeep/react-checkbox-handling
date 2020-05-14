//@flow

import React, { PureComponent, type ComponentType } from "react";

export const SHIFT_CODE = 16;
export const CHECK_KEY = "CHECK_KEY";

export default function handleCheckbox<Props>(PassedComponent: ComponentType<Props>,Configuration: Object = {}) {

    type State = {
        checkedItems: Array<Object | string>
    };

    return class CheckedDataHandling extends PureComponent<Props,State> {

        state = {
            checkedItems: [], // checked data
        };

        isShiftKeyPressed = false;
        checkboxKey = null;
        totalItems = [];
        lastCheckedItem = null;

        componentDidMount() {

            this.checkboxKey = this.getKeyToCheck();

            // To add listeners if shift is required

            if(this.isShiftHandlingRequired()) {
                document.addEventListener("keydown", (event: Object) => this.keyUpDownListener(event,true));
                document.addEventListener("keyup", (event: Object) => this.keyUpDownListener(event,false));
            }
            

        }

        render() {
            
            const { checkedItems  } = this.state;

            return (
                <PassedComponent
                    checkedItems={checkedItems}
                    uncheckAll={this.uncheckAll}
                    checkAll={this.checkAll}
                    updateCheckedItems={this.updateCheckedItems}
                    updateTotalItems={this.updateTotalItems}
                    {...this.props}
                />

            );

        }

        componentWillUnmount() {

            if(this.isShiftHandlingRequired()) {
                document.removeEventListener("keydown", (event: Object) => this.keyUpDownListener(event,true));
                document.removeEventListener("keyup", (event: Object) => this.keyUpDownListener(event,false));
            }

        }

        updateTotalItems = (totalData: Array<Object | string>) => {
            this.totalItems = [...totalData];
        }

        /**
         *  To uncheck all checkboxes
         */
        uncheckAll = () => {

            this.lastCheckedItem = null;

            this.setState({
                checkedItems: []
            });

        }
        
        /**
         * To check all checkboxes
         */
        checkAll = () => {

            if(this.totalItems && this.totalItems.length > 0) {

                let newCheckedItems = [...this.totalItems];
                this.lastCheckedItem = null;
    
                this.setState({
                  checkedItems: newCheckedItems
                });

            }

        }

        /**
         * To get key tocheck in checkbox
         */
        getKeyToCheck = () => {

            if(typeof(this.totalItems[0]) === "string" || typeof(this.totalItems[0]) === "number")
                return null;
            else {
                
                const { checkboxKey } = Configuration;

                if(checkboxKey)
                    return checkboxKey;

            }

            return CHECK_KEY;

        }

        /**
         * Adding key down listener
         */
        keyUpDownListener = (event: Object,isKeyUpEvent: boolean) => {

            if(event.keyCode !== SHIFT_CODE)
                return;
            
            this.isShiftKeyPressed = isKeyUpEvent;

        }

        /**
         * To add or delete element from checked data
        */

        addOrDeleteCheckedItem = (checkedItems: Array<Object | string>, currentChecked ?:Object, isElementExist: Object) => {

            let newCheckedItems = [...checkedItems];

            const { isExist, elementIndex } = isElementExist;
             
            if(isExist)
                newCheckedItems.splice(elementIndex,1);
            else
                newCheckedItems.push(currentChecked);

            return newCheckedItems;
        }


        /**
         * To update the checked data
         */
        updateCheckedItems = (currentChecked: Object| string) => {

            const { checkedItems } = this.state;

            let newCheckedItems = [...checkedItems];

            if(this.lastCheckedItem != null) {

                const isCurrentCheckedIdExistObject = this.isCheckedElementExist(this.state.checkedItems,currentChecked);

                if(this.isShiftKeyPressed) {

                    const isLastCheckedIdExistObject = this.isCheckedElementExist(this.state.checkedItems,this.lastCheckedItem);
                    const lastCheckedIndex = isLastCheckedIdExistObject.elementIndex;
                    const lastCheckedExist = isLastCheckedIdExistObject.isExist;

                    if(this.getCheckedId(currentChecked) === this.getCheckedId(this.lastCheckedItem))
                        newCheckedItems = this.addOrDeleteCheckedItem(newCheckedItems,currentChecked,isLastCheckedIdExistObject);
                    else {

                        // Remove all
                        if(lastCheckedExist && isCurrentCheckedIdExistObject.isExist) {        
                            const indexToStart = Math.min(isCurrentCheckedIdExistObject.elementIndex,lastCheckedIndex);
                            const indexToEnd = Math.max(isCurrentCheckedIdExistObject.elementIndex,lastCheckedIndex);
                            newCheckedItems.splice(indexToStart, (indexToEnd - indexToStart + 1));
                        }

                        else {

                            // Iterate to add or remove element between them

                            newCheckedItems = this.getUpdatedShiftItems(currentChecked,lastCheckedExist,isCurrentCheckedIdExistObject);
                            
                        }
                    }

                }
                else 
                    newCheckedItems = this.addOrDeleteCheckedItem(newCheckedItems,currentChecked,isCurrentCheckedIdExistObject);

            }
            else 
                newCheckedItems.push(currentChecked);


            this.setState({
                checkedItems: newCheckedItems,
            });

            this.lastCheckedItem = currentChecked;


        }

        /**
         * To get data in case of shift key pressed
         */
        getUpdatedShiftItems = (currentChecked:  Object | string,lastCheckedExist: boolean,isCurrentCheckedIdExistObject: Object ) => {

            let checkedItemsCount = 0;
            let newCheckedItems = [...this.state.checkedItems];

            for (let data of this.totalItems) {

                if(this.getCheckedId(data) === this.getCheckedId(currentChecked) || this.getCheckedId(data) === this.getCheckedId(this.lastCheckedItem))
                    checkedItemsCount += 1;

                if(checkedItemsCount > 0) {

                    const { isExist, elementIndex } = this.isCheckedElementExist(newCheckedItems,data);

                    if(!lastCheckedExist && isCurrentCheckedIdExistObject.isExist) {

                        if(isExist)
                            newCheckedItems.splice(elementIndex,1);
                    }
                    
                    else {
                        if(!isExist)
                            newCheckedItems.push(data);
                    }

                }
                   
                if(checkedItemsCount === 2)
                    break;

            }

            return newCheckedItems;

        }

        /**
         * To get the checked id
         */
        getCheckedId = (checkedValue ?: Object) => {

            const key  = this.checkboxKey;

            if(key && typeof(checkedValue) === "object")
                return checkedValue[key];

            return checkedValue;

        }

        /**
         * To check if element exist or not
         */
        isCheckedElementExist = (checkedItems: Array<Object | string> ,currentChecked ?: Object) => {

            let elementIndex = -1;

            const isExist  = checkedItems.some((data,index) => {

                elementIndex = index;
                return (this.getCheckedId(data) === this.getCheckedId(currentChecked))
            });

            const elementExistObject = {
                isExist,
                elementIndex
            };

            return elementExistObject;

        }

        isShiftHandlingRequired = () => {

            const { isShiftRequired } = Configuration;
    
            if(isShiftRequired)
                return true;
    
            return false;
    
    
        }

    }
    
    


}