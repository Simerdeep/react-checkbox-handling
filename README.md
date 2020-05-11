# react-checkbox-handling

A HOC to manage checkboxes state

## Installation

```sh
npm install react-checkbox-handling
```
## Usage

1 . Import handleCheckbox

```js
import  handleCheckbox  from 'react-checkbox-handling';
```

2 . Pass your component to handlechekbox

```js
export default handleCheckbox(ComponentName,Configuration(optional))
```

## Configuration Options

| Option                | Type                  | Default Value   | Description
| :-------------------- | :-------------------- | :------------   | :---------------------- |
| checkboxKey           | string                | 'CHECK_KEY'     | To provide custom key to check 
| isShiftRequired       | boolean               | false           | If shift key support is required or not

## Props Provided

| Prop Name                | Type                  | Default Value   | Description                         
| :----------------------- | :-------------------- | :------------   | :-----------------------------------|
| checkedItems             | Array                 | []              | Checked values                      
| checkAll                 | Function              | NA              | To check all tha values             
| uncheckAll               | Function              | NA              | To uncheck all tha values           
| updateCheckedItems       | Function              | NA              | To update the checked item array      
| updateTotalItems         | Function              | NA              | To update the total list of items


# Example

Copy the example folder in you project and run it.

## Demo (With Shift Key)

<img src = './demo.gif' />

