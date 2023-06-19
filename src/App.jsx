import "./App.css";
import Wrapper from "./component/Wrapper";
import Screen from "./component/Screen";
import ButtonBox from "./component/ButtonBox";
import Button from "./component/Button";
import CalcProvider from "./context/CalContext";

const btnValue = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "x"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

function App() {
  return (
    <CalcProvider >
      <Wrapper>
        <Screen />
        <ButtonBox>
          {btnValue.flat().map((btn, i) => (
            <Button value={btn} key={i} />
          ))}
        </ButtonBox>
      </Wrapper>
    </CalcProvider>
  );
}

export default App;
