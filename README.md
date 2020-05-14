# react-checkbox-handling

A HOC to manage checkboxes state

## Demo

[![Edit ReactCheckbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/sharp-raman-pzp90?fontsize=14&hidenavigation=1&theme=dark)

Or see it on [Github Page](https://simerdeep.github.io/react-checkbox-handling/).


## Installation

```sh
npm install react-checkbox-handling
```

or

```sh
yarn add react-checkbox-handling
```

## Usage

1 . Import handleCheckbox

```js
import  handleCheckbox  from 'react-checkbox-handling';
```

2 . Pass your component to handleCheckbox

```js
export default handleCheckbox(ComponentName,Configuration(optional))
```

## Configuration Options

| Option                | Type                  | Default Value   | Description
| :-------------------- | :-------------------- | :------------   | :---------------------- |
| checkboxKey           | string                | 'CHECK_KEY'     | To provide custom key to check 
| isShiftRequired       | boolean               | false           | If shift key support is required or not

## Props Provided

These are all of the available props (and their default values) provided by hoc.

```js
{
    checkedItems: [],  //Checked values
    checkAll:  () => void, //To check all the values  
    uncheckAll:  () => void, //To uncheck all the values 
    updateCheckedItems: (checkedItem : Array<Object> | Array<string> | Object | string , addItems: boolean = false ) => void // To update the checked item array , addItems value will be used when array is passed in checkedItem
    updateTotalItems: (totalItems: Array<Object> | Array<string>) => void //To update the total list of items
}
```

# Example

Copy the example folder in your project and run it.

## How it works

<img src = './demo.gif' />

