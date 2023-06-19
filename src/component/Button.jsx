import React, { useContext } from "react";
import { CalcContext } from "../context/CalContext";

const getStyledName = (btn) => {
  const className = {
    "=": "equals",
    x: "opt",
    "-": "opt",
    "+": "opt",
    "/": "opt",
  };
  return className[btn];
};

export default function Button({ value }) {
  const { calc, setCalc } = useContext(CalcContext);
  // commaclick
  const commaClick = () => {
    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  };
  // reset click
  const resetClick = () => {
    setCalc({ sign: "", num: 0, res: 0 });
  };
  //userClick number
  const handleClickButton = () => {
    const numberString = value.toString();

    let numberValue;
    if (numberString === "0" && calc.num === 0) {
      numberValue = "0";
    } else {
      numberValue = Number(calc.num + numberString);
    }
    setCalc({
      ...calc,
      num: numberValue,
    });
  };

  //user choose sign

  const signChoose = () => {
    setCalc({
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    });
  };

  //calculate result
  const equalsClick = () => {
    if(calc.num && calc.res) {
      const math = (a,b,sign)=> {
        const result = {
          '+': (a,b) => a+b,
          '-': (a,b) => a-b,
          'x': (a,b) => a*b,
          '/': (a,b) => a/b
        }
       return result[sign](a,b)
            }
            setCalc({
              res: math(calc.num,calc.res,calc.sign),
              sign:'',
              num: 0 
            })
    }
    
  }
//percent 
const percentClick =() => {
  setCalc({
    num:(calc.num/100),
    res:(calc.res/100),
    sign:''
  })
}
//invertClick 
const invertClick = ()=>{
  setCalc({
    num: calc.num ? calc.num * -1 : 0 ,
    res: calc.res ? calc.res * -1 : 0 ,
    sign:''
  })
}

  //get values
  const getValue = () => {
    const result = {
      ".": commaClick,
      'C': resetClick,
      "+": signChoose,
      'x': signChoose,
      "-": signChoose,
      "/": signChoose,
      "=" : equalsClick,
      "%" : percentClick,
      "+-":invertClick   
     };
    if (result[value]) {
      return result[value]();
    } else {
      return handleClickButton();
    }
  };
  return (
    <button onClick={getValue} className={`${getStyledName(value)} button`}>
      {value}
    </button>
  );
}
