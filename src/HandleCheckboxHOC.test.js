import { commonTestCase } from "./SharedTestCases";


describe("App test cases", () => {

  let configuration = {
    checkboxKey: 'id', 
    isShiftRequired: true
  };

  describe('render Test cases with checkbox  data as string', () => {
    commonTestCase("string",configuration);
  });

  describe('render Test cases with checkbox  data as object', () => {
    commonTestCase("Object",configuration);
  });

  describe('render Test cases without configuration', () => {
    commonTestCase("Object");
  });


});