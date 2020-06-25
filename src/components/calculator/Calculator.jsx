import React, {useState} from 'react';

import Button from '../button/Button';
import Display from '../display/Display';
import './Calculator.css';

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default () => {

    const [state, setState] = useState(initialState);

    const setOperation = (operation) => {
        if (state.current === 0) {
            setState(prevState => {
                return {
                    ...prevState,
                    operation,
                    current: 1,
                    clearDisplay:true
                }
            })
        } else {
            const equals = operation === '=';
            const currentOperation = state.operation;
            const values = [...state.values]
            try {
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
            } catch (e) {
                values[0] = state.values[0];
            }
            values[1] = 0;
            setState(prevState => {
                return {
                    ...prevState,
                    displayValue: values[0],
                    operation: equals ? null: operation,
                    current: equals ? 0 : 1,
                    clearDisplay: !equals
                }
            })
        }
    }

    const addDigit = (digit) => {
        if (digit === '.' && state.displayValue.includes('.')) {
            return
        }
        const clearDisplay = state.displayValue === '0' || state.clearDisplay;
        const currentValue = clearDisplay ? '' : state.displayValue;
        const displayValue = currentValue + digit;
        setState(prevState => {
            return {
                ...prevState,
                displayValue,
                clearDisplay: false
            }
        })
        if (digit !== '.') {
            const i        = state.current;
            const newValue = parseFloat(displayValue)
            const values   = [...state.values]
            values[i]      = newValue
            setState(prevState => {
                return {
                    ...prevState,
                    values
                }
            })
        }
    }

    const clearMemory = () => {
        setState(initialState)
    }

    return (
        <div className = "Calculator">
            <Display value = {state.displayValue}/>
            <Button  label = "AC" operation click = {clearMemory} triple/>
            <Button  label = "/"  operation click = {setOperation}/>
            <Button  label = "7"  click = {addDigit}/>
            <Button  label = "8"  click = {addDigit}/>
            <Button  label = "9"  click = {addDigit}/>
            <Button  label = "*"  operation click = {setOperation}/>
            <Button  label = "4"  click = {addDigit}/>
            <Button  label = "5"  click = {addDigit}/>
            <Button  label = "6"  click = {addDigit}/>
            <Button  label = "-"  operation click = {setOperation}/>
            <Button  label = "1"  click = {addDigit}/>
            <Button  label = "2"  click = {addDigit}/>
            <Button  label = "3"  click = {addDigit}/>
            <Button  label = "+"  operation click = {setOperation}/>
            <Button  label = "0"  click = {addDigit} double/>
            <Button  label = "."  click = {addDigit}/>
            <Button  label = "="  operation click = {setOperation}/>  
        </div>
    );
}