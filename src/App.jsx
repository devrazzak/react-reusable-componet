import "./App.css";
import DynamicInput from "./components/dynamic-add-input-with-validation/DynamicInput";

function App(props) {
   
    return (
        <div className="app">
            <DynamicInput />
            {/* <CustomDynamicAddInput/> */}
        </div>
    );
}

export default App;
