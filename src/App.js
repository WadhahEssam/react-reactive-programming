// // Using Reactive Programming with class components
// import React from "react";
// import "./styles.css";
// import { from } from "rxjs";
// import { map, filter, delay, mergeMap } from "rxjs/operators";

// const numbersObservable = from([1, 2, 3, 4, 5]);
// let squaredNumbers = numbersObservable.pipe(
//   filter(number => number > 2),
//   mergeMap(val => from([val]).pipe(delay(1000 * val))),
//   map(number => number * number)
// );

// class App extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       currentNumber: 0
//     };
//   }

//   // we will store the subscription in the component
//   // so we can unsubscribe from it later to prevent
//   // memory leaks
//   componentDidMount() {
//     this.subscribtion = squaredNumbers.subscribe(resultNumber => {
//       this.setState({ currentNumber: resultNumber });
//     });
//   }

//   componentWillUnmount() {
//     this.subscribtion.unsubscribe();
//   }

//   render() {
//     return (
//       <div className="App">
//         <h1>Hello CodeSandbox</h1>
//         <h2>Start editing to see some magic happen!</h2>
//         <p>Current Number => {this.state.currentNumber}</p>
//       </div>
//     );
//   }
// }

// export default App;

// Using Reactive Programming with functional components
import React, { useState, useEffect } from "react";
import "./styles.css";
import { from } from "rxjs";
import { map, filter, delay, mergeMap } from "rxjs/operators";

const numbersObservable = from([1, 2, 3, 4, 5]);
let squaredNumbers = numbersObservable.pipe(
  filter(number => number > 2),
  mergeMap(val => from([val]).pipe(delay(1000 * val))),
  map(number => number * number)
);

const App = () => {
  const [currentNumber, setCurrentNumber] = useState(0);

  // works as ( componentDidMount )
  useEffect(() => {
    let subscribtion = squaredNumbers.subscribe(resultNumber => {
      setCurrentNumber(resultNumber);
    });

    // works as ( componentDidUnmount )
    return () => {
      subscribtion.unsubscribe();
    };
  }, []);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <p>Current Number => {currentNumber}</p>
    </div>
  );
};

export default App;
