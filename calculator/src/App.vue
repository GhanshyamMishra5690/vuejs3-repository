<script setup lang="ts">
import { ref } from 'vue'

const  currentInput = ref(''); 
const previousInput = ref(''); 
const operation = ref(null);  

const appendNumber = (num) => {
   currentInput.value += num; 
}
const clear =() => {
   currentInput.value = '' ;
}
const action = (operator) =>{
  if( currentInput.value === '') return;
  operation.value = operator;
  previousInput.value =  currentInput.value;
  currentInput.value = '';
}
const compute = () =>{
  let computation;
  const prev = parseFloat(previousInput.value); 
  const current = parseFloat(currentInput.value); 
  
  if (isNaN(prev) || isNaN(current)) return; // If either input is not a number, return

  switch (operation.value) {
    case '+':
        computation = prev + current;
        break;
    case '-':
        computation = prev - current;
         break;
    case '*':
        computation = prev * current;
        break;
    case '/':
        computation = prev * current;
        break;    
    default:
      break;
  }
  currentInput.value = computation;
  operation.value = null;
  previousInput.value = ''
}
</script>

<template>
  <div class="calculator card">

  <input type="text" class="calculator-screen z-depth-1" v-model="currentInput"  />

  <div class="calculator-keys">

    <button  type="button"  class="operator btn btn-info btn-calculator" @click="action('+')" >+</button>
    <button  type="button"  class="operator btn btn-info btn-calculator" @click="action('-')">-</button>
    <button  type="button"  class="operator btn btn-info btn-calculator" @click="action('*')">&times;</button>
    <button  type="button"  class="operator btn btn-info btn-calculator" @click="action('/')">&divide;</button>

    <button  type="button"  @click="appendNumber(7)"  class="btn btn-light waves-effect">7</button>
    <button  type="button"  @click="appendNumber(8)"  class="btn btn-light waves-effect">8</button>
    <button  type="button"  @click="appendNumber(9)"  class="btn btn-light waves-effect">9</button> 

    <button  type="button"  @click="appendNumber(4)"  class="btn btn-light waves-effect">4</button>
    <button  type="button"  @click="appendNumber(5)"  class="btn btn-light waves-effect">5</button>
    <button  type="button"  @click="appendNumber(6)"  class="btn btn-light waves-effect">6</button> 

    <button  type="button"  @click="appendNumber(1)"  class="btn btn-light waves-effect">1</button>
    <button  type="button"  @click="appendNumber(2)"  class="btn btn-light waves-effect">2</button>
    <button  type="button"  @click="appendNumber(3)"  class="btn btn-light waves-effect">3</button>


    <button  type="button"  @click="appendNumber(0)"  class="btn btn-light waves-effect">0</button>
    <button  type="button"  class="decimal function btn btn-secondary" @click="appendNumber('.')">.</button>
    <button  type="button"  class="all-clear function btn btn-danger btn-sm" @click="clear">AC</button>

    <button  type="button"  class="equal-sign operator btn btn-default" @click="compute">=</button>

  </div>
</div>
</template>

<style scoped>
 html {
  font-size: 62.5%;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

.calculator {
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 400px;
}

.calculator-screen {
  width: 100%;
  height: 80px;
  border: none;
  background-color: #252525;
  color: #fff;
  text-align: right;
  padding-right: 20px;
  padding-left: 10px;
  font-size: 4rem;
}

button {
  height: 60px;
  font-size: 2rem!important;
}

.equal-sign {
  height: 98%;
  grid-area: 2 / 4 / 6 / 5;
}

.calculator-keys {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  padding: 20px;
}
.btn-light{
      color: #353333;
      background-color: #e9e9e9;
      border-color: #e9e9e9;
}
.btn-default{
      color: #353333;
      background-color: #e9e9e9;
      border-color: #e9e9e9;
}
.btn-calculator{
      color: #fff;
      background-color: #50abc8;
      border-color: #50abc8;
 
}
</style>
